import { validatePIXKey } from '@/lib/validators/pix';

export type PIXData = {
  pixKey: string;
  merchantName: string;    // max 25 chars
  merchantCity: string;    // max 15 chars
  amount?: number;         // in BRL, optional
  transactionId?: string;  // max 25 chars, alphanumeric
  description?: string;    // max 72 chars
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

// ── Payload generator ─────────────────────────────────────────────────────────

/**
 * Generates a PIX QR Code payload following the EMV Merchant Presented Mode
 * specification as defined by Banco Central do Brasil (BCB).
 *
 * Field reference:
 *   ID 00 – Payload Format Indicator ("01")
 *   ID 01 – Point of Initiation Method ("11" static | "12" dynamic)
 *   ID 26 – Merchant Account Information (nested TLV)
 *   ID 52 – Merchant Category Code ("0000")
 *   ID 53 – Transaction Currency ("986" = BRL)
 *   ID 54 – Transaction Amount (optional)
 *   ID 58 – Country Code ("BR")
 *   ID 59 – Merchant Name (max 25 chars, uppercase)
 *   ID 60 – Merchant City (max 15 chars, uppercase)
 *   ID 62 – Additional Data Field Template (nested TLV)
 *   ID 63 – CRC16-CCITT checksum
 */
export function generatePIXPayload(data: PIXData): string {
  const pixKey = data.pixKey.trim();
  const merchantName = data.merchantName.trim().toUpperCase().slice(0, 25);
  const merchantCity = data.merchantCity.trim().toUpperCase().slice(0, 15);
  const isDynamic = data.amount !== undefined && data.amount > 0;

  // ID 26 – Merchant Account Information
  let mchAcct = buildTLV('00', 'BR.GOV.BCB.PIX');
  mchAcct += buildTLV('01', pixKey);
  if (data.description?.trim()) {
    mchAcct += buildTLV('02', data.description.trim().slice(0, 72));
  }

  // ID 62 – Additional Data Field Template (Reference Label, ID 05)
  const refLabel = data.transactionId?.trim().slice(0, 25) || '***';
  const addlData = buildTLV('05', refLabel);

  // Assemble payload without CRC
  const parts: string[] = [
    buildTLV('00', '01'),                      // Payload Format Indicator
    buildTLV('01', isDynamic ? '12' : '11'),   // Point of Initiation Method
    buildTLV('26', mchAcct),                   // Merchant Account Information
    buildTLV('52', '0000'),                    // Merchant Category Code
    buildTLV('53', '986'),                     // Transaction Currency (BRL)
  ];

  if (isDynamic) {
    parts.push(buildTLV('54', data.amount!.toFixed(2)));
  }

  parts.push(
    buildTLV('58', 'BR'),                      // Country Code
    buildTLV('59', merchantName),              // Merchant Name
    buildTLV('60', merchantCity),              // Merchant City
    buildTLV('62', addlData),                  // Additional Data Field
  );

  // CRC placeholder: "6304" triggers the checksum computation
  const payloadBeforeCRC = parts.join('') + '6304';
  const crc = crc16CCITT(payloadBeforeCRC);

  return payloadBeforeCRC + crc;
}

// ── Validator ─────────────────────────────────────────────────────────────────

export function validatePIXData(data: PIXData): Record<string, string> {
  const errors: Record<string, string> = {};

  // pixKey
  if (!data.pixKey.trim()) {
    errors.pixKey = 'PIX key is required';
  } else {
    const result = validatePIXKey(data.pixKey);
    if (!result.valid) {
      errors.pixKey = result.error ?? 'Invalid PIX key';
    }
  }

  // merchantName
  if (!data.merchantName.trim()) {
    errors.merchantName = 'Recipient name is required';
  } else if (data.merchantName.length > 25) {
    errors.merchantName = 'Name must not exceed 25 characters';
  }

  // merchantCity
  if (!data.merchantCity.trim()) {
    errors.merchantCity = 'City is required';
  } else if (data.merchantCity.length > 15) {
    errors.merchantCity = 'City must not exceed 15 characters';
  }

  // amount (optional)
  if (data.amount !== undefined && data.amount !== null && String(data.amount) !== '') {
    if (data.amount <= 0) {
      errors.amount = 'Amount must be greater than 0';
    } else if (data.amount > 999_999.99) {
      errors.amount = 'Amount exceeds maximum (R$ 999,999.99)';
    }
  }

  // description (optional)
  if (data.description && data.description.length > 72) {
    errors.description = 'Description must not exceed 72 characters';
  }

  // transactionId (optional, alphanumeric + spaces)
  if (data.transactionId) {
    if (data.transactionId.length > 25) {
      errors.transactionId = 'Transaction ID must not exceed 25 characters';
    } else if (!/^[a-zA-Z0-9 ]+$/.test(data.transactionId)) {
      errors.transactionId = 'Transaction ID must be alphanumeric';
    }
  }

  return errors;
}
