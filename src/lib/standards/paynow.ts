import { validatePayNowKey, type PayNowKeyType } from '@/lib/validators/paynow';

export type { PayNowKeyType };

export type PayNowData = {
  proxyType: PayNowKeyType;
  proxyValue: string;
  merchantName: string;   // max 25 chars
  amount?: number;        // in SGD, 2 decimal places
  editable: boolean;      // allow payer to edit amount
  referenceId?: string;   // optional, max 25 chars
  expiryDate?: string;    // optional, YYYYMMDD
};

// ── EMV TLV helpers ───────────────────────────────────────────────────────────

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

// ── Proxy type code mapping ───────────────────────────────────────────────────

const PROXY_TYPE_CODE: Record<PayNowKeyType, string> = {
  mobile: '0',
  nric:   '1',
  uen:    '2',
};

// ── Key normalisation ─────────────────────────────────────────────────────────

/**
 * Normalises the proxy value for PayNow EMV payload encoding.
 * Mobile: always formatted as +65XXXXXXXX
 * UEN / NRIC: passed through as-is (uppercase)
 */
function normaliseProxyValue(value: string, type: PayNowKeyType): string {
  switch (type) {
    case 'mobile': {
      const trimmed = value.trim();
      const digits = trimmed.startsWith('+65')
        ? trimmed.slice(3)
        : trimmed;
      return `+65${digits}`;
    }
    default:
      return value.trim().toUpperCase();
  }
}

// ── Payload generator ─────────────────────────────────────────────────────────

/**
 * Generates a PayNow QR Code payload following the EMV Merchant Presented Mode
 * specification as defined by MAS (Monetary Authority of Singapore) and ABS.
 *
 * Field reference:
 *   ID 00 – Payload Format Indicator ("01")
 *   ID 01 – Point of Initiation Method ("11" static | "12" dynamic)
 *   ID 26 – PayNow Merchant Account Information (AID: SG.PAYNOW)
 *   ID 52 – Merchant Category Code ("0000")
 *   ID 53 – Transaction Currency ("702" = SGD)
 *   ID 54 – Transaction Amount (optional, 2 decimal places)
 *   ID 58 – Country Code ("SG")
 *   ID 59 – Merchant / Payee Name (max 25 chars, uppercase)
 *   ID 60 – Merchant City ("Singapore")
 *   ID 62 – Additional Data Field Template
 *   ID 63 – CRC16-CCITT checksum
 */
export function generatePayNowPayload(data: PayNowData): string {
  const merchantName  = data.merchantName.trim().toUpperCase().slice(0, 25);
  const normalisedKey = normaliseProxyValue(data.proxyValue, data.proxyType);
  const isDynamic     = data.amount !== undefined && data.amount > 0;

  // ID 26 – PayNow Merchant Account Information
  let mchAcct =
    buildTLV('00', 'SG.PAYNOW') +
    buildTLV('01', PROXY_TYPE_CODE[data.proxyType]) +
    buildTLV('02', normalisedKey) +
    buildTLV('03', data.editable ? '1' : '0');

  if (data.expiryDate?.trim()) {
    mchAcct += buildTLV('04', data.expiryDate.trim());
  }

  // ID 62 – Additional Data Field Template
  const refLabel = data.referenceId?.trim().slice(0, 25) ?? '';
  const addlData = buildTLV('01', refLabel) + buildTLV('05', refLabel || '***');

  const parts: string[] = [
    buildTLV('00', '01'),
    buildTLV('01', isDynamic ? '12' : '11'),
    buildTLV('26', mchAcct),
    buildTLV('52', '0000'),
    buildTLV('53', '702'),
  ];

  if (isDynamic) {
    parts.push(buildTLV('54', data.amount!.toFixed(2)));
  }

  parts.push(
    buildTLV('58', 'SG'),
    buildTLV('59', merchantName),
    buildTLV('60', 'Singapore'),
    buildTLV('62', addlData),
  );

  const payloadBeforeCRC = parts.join('') + '6304';
  const crc = crc16CCITT(payloadBeforeCRC);

  return payloadBeforeCRC + crc;
}

// ── Validator ─────────────────────────────────────────────────────────────────

export function validatePayNowData(data: PayNowData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.proxyValue.trim()) {
    errors.proxyValue = 'PayNow key is required';
  } else {
    const result = validatePayNowKey(data.proxyValue);
    if (!result.valid) {
      errors.proxyValue = result.error ?? 'Invalid PayNow key';
    }
  }

  if (!data.merchantName.trim()) {
    errors.merchantName = 'Payee name is required';
  } else if (data.merchantName.trim().length > 25) {
    errors.merchantName = 'Name must not exceed 25 characters';
  }

  if (data.amount !== undefined && data.amount !== null && String(data.amount) !== '') {
    if (data.amount <= 0) {
      errors.amount = 'Amount must be greater than 0';
    } else if (data.amount > 200_000) {
      errors.amount = 'Amount exceeds maximum (S$200,000)';
    }
  }

  if (data.referenceId && data.referenceId.trim().length > 25) {
    errors.referenceId = 'Reference ID must not exceed 25 characters';
  }

  if (data.expiryDate) {
    if (!/^\d{8}$/.test(data.expiryDate.trim())) {
      errors.expiryDate = 'Expiry date must be in YYYYMMDD format';
    }
  }

  return errors;
}
