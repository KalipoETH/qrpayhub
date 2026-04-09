import { validatePromptPayKey, type PromptPayKeyType } from '@/lib/validators/promptpay';

export type PromptPayData = {
  promptPayKey: string;  // Phone, National ID or Tax ID
  amount?: number;       // in THB, optional
  ref1?: string;         // optional reference
};

// ── EMV TLV helpers ───────────────────────────────────────────────────────────

/** Builds a single EMV TLV element: {id}{length_2digits}{value} */
function buildTLV(id: string, value: string): string {
  const length = String(value.length).padStart(2, '0');
  return `${id}${length}${value}`;
}

// ── CRC16-CCITT (polynomial 0x1021, init 0xFFFF) ─────────────────────────────

function crc16CCITT(data: string): string {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

// ── Key normalisation ─────────────────────────────────────────────────────────

/**
 * Normalises a PromptPay key for inclusion in the EMV payload.
 *
 * Phone:      "0812345678"  → "0066812345678"
 *             "+66812345678" → "0066812345678"
 * National ID / Tax ID: digits only, passed through as-is (13 chars)
 * E-Wallet:   passed through as-is
 */
function normalisePromptPayKey(key: string, type: PromptPayKeyType): string {
  switch (type) {
    case 'phone': {
      const stripped = key.trim().startsWith('+66')
        ? key.trim().slice(3)   // remove "+66"
        : key.trim().slice(1);  // remove leading "0"
      return `0066${stripped}`;
    }
    case 'nationalId':
    case 'taxId':
      return key.trim().replace(/\D/g, '');
    case 'ewallet':
      return key.trim();
  }
}

// ── Payload generator ─────────────────────────────────────────────────────────

/**
 * Generates a PromptPay QR Code payload following the EMV Merchant Presented
 * Mode (MPM) specification as adapted by Bank of Thailand / Thai Bankers'
 * Association.
 *
 * Field reference:
 *   ID 00 – Payload Format Indicator ("01")
 *   ID 01 – Point of Initiation Method ("11" static | "12" with amount)
 *   ID 29 – Merchant Account Information (PromptPay AID A000000677010111)
 *   ID 52 – Merchant Category Code ("0000")
 *   ID 53 – Transaction Currency ("764" = THB)
 *   ID 54 – Transaction Amount (optional, 2 decimal places)
 *   ID 58 – Country Code ("TH")
 *   ID 59 – Merchant Name ("N/A" — PromptPay is not personalised)
 *   ID 60 – Merchant City ("Bangkok")
 *   ID 62 – Additional Data Field Template (sub-ID 07: reference)
 *   ID 63 – CRC16-CCITT checksum
 */
export function generatePromptPayPayload(data: PromptPayData): string {
  const keyResult = validatePromptPayKey(data.promptPayKey);
  const keyType = keyResult.type!;
  const normalisedKey = normalisePromptPayKey(data.promptPayKey, keyType);
  const hasAmount = data.amount !== undefined && data.amount > 0;

  // ID 29 – Merchant Account Information (PromptPay)
  const mchAcctContent =
    buildTLV('00', 'A000000677010111') +
    buildTLV('01', normalisedKey);

  // ID 62 – Additional Data Field Template
  const refLabel = data.ref1?.trim() || '***';
  const addlDataContent = buildTLV('07', refLabel);

  const parts: string[] = [
    buildTLV('00', '01'),
    buildTLV('01', hasAmount ? '12' : '11'),
    buildTLV('29', mchAcctContent),
    buildTLV('52', '0000'),
    buildTLV('53', '764'),
  ];

  if (hasAmount) {
    parts.push(buildTLV('54', data.amount!.toFixed(2)));
  }

  parts.push(
    buildTLV('58', 'TH'),
    buildTLV('59', 'N/A'),
    buildTLV('60', 'Bangkok'),
    buildTLV('62', addlDataContent),
  );

  const payloadBeforeCRC = parts.join('') + '6304';
  const crc = crc16CCITT(payloadBeforeCRC);

  return payloadBeforeCRC + crc;
}

// ── Validator ─────────────────────────────────────────────────────────────────

export function validatePromptPayData(data: PromptPayData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.promptPayKey.trim()) {
    errors.promptPayKey = 'PromptPay key is required';
  } else {
    const result = validatePromptPayKey(data.promptPayKey);
    if (!result.valid) {
      errors.promptPayKey = result.error ?? 'Invalid PromptPay key';
    }
  }

  if (data.amount !== undefined && data.amount !== null && String(data.amount) !== '') {
    if (data.amount <= 0) {
      errors.amount = 'Amount must be greater than 0';
    } else if (data.amount > 9_999_999.99) {
      errors.amount = 'Amount exceeds maximum (฿9,999,999.99)';
    }
  }

  return errors;
}
