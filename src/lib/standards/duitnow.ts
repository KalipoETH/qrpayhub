import { validateDuitNowKey, type DuitNowKeyType } from '@/lib/validators/duitnow';

export type { DuitNowKeyType };

export type DuitNowData = {
  proxyType: DuitNowKeyType;
  proxyValue: string;
  merchantName: string;   // max 25 chars
  merchantCity: string;   // max 15 chars
  amount?: number;        // in MYR, 2 decimal places
  referenceId?: string;   // optional
  billDetails?: string;   // optional, max 99 chars
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

const PROXY_TYPE_CODE: Record<DuitNowKeyType, string> = {
  mobile:   '01',
  ic:       '02',
  passport: '03',
  business: '04',
  others:   '05',
};

// ── Key normalisation ─────────────────────────────────────────────────────────

/**
 * Normalises the proxy value for the EMV payload.
 * Mobile: strips leading +60 / 0, then prepends "60" → "60123456789"
 * IC:     strips hyphens
 * Others: passes through as-is
 */
function normaliseProxyValue(value: string, type: DuitNowKeyType): string {
  switch (type) {
    case 'mobile': {
      const trimmed = value.trim();
      // Remove +60 or 60 prefix, then remove leading 0
      const stripped = trimmed.startsWith('+60')
        ? trimmed.slice(3)
        : trimmed.startsWith('60')
          ? trimmed.slice(2)
          : trimmed.startsWith('0')
            ? trimmed.slice(1)
            : trimmed;
      return `60${stripped}`;
    }
    case 'ic':
      return value.trim().replace(/-/g, '');
    default:
      return value.trim();
  }
}

// ── Payload generator ─────────────────────────────────────────────────────────

/**
 * Generates a DuitNow QR Code payload following the EMV Merchant Presented Mode
 * specification as defined by Payments Network Malaysia (PayNet).
 *
 * Field reference:
 *   ID 00 – Payload Format Indicator ("01")
 *   ID 01 – Point of Initiation Method ("11" static | "12" dynamic)
 *   ID 26 – DuitNow Merchant Account Information (AID: A000000693010011)
 *   ID 52 – Merchant Category Code ("0000")
 *   ID 53 – Transaction Currency ("458" = MYR)
 *   ID 54 – Transaction Amount (optional, 2 decimal places)
 *   ID 58 – Country Code ("MY")
 *   ID 59 – Merchant Name (max 25 chars, uppercase)
 *   ID 60 – Merchant City (max 15 chars, uppercase)
 *   ID 62 – Additional Data Field Template
 *   ID 63 – CRC16-CCITT checksum
 */
export function generateDuitNowPayload(data: DuitNowData): string {
  const merchantName  = data.merchantName.trim().toUpperCase().slice(0, 25);
  const merchantCity  = data.merchantCity.trim().toUpperCase().slice(0, 15);
  const normalisedKey = normaliseProxyValue(data.proxyValue, data.proxyType);
  const isDynamic     = data.amount !== undefined && data.amount > 0;

  // ID 26 – DuitNow Merchant Account Information
  const mchAcct =
    buildTLV('00', 'A000000693010011') +
    buildTLV('01', PROXY_TYPE_CODE[data.proxyType]) +
    buildTLV('02', normalisedKey);

  // ID 62 – Additional Data Field Template
  const billLabel = (data.billDetails?.trim() ?? '').slice(0, 99);
  const refLabel  = data.referenceId?.trim() || '***';
  const addlData  = buildTLV('01', billLabel) + buildTLV('05', refLabel);

  const parts: string[] = [
    buildTLV('00', '01'),
    buildTLV('01', isDynamic ? '12' : '11'),
    buildTLV('26', mchAcct),
    buildTLV('52', '0000'),
    buildTLV('53', '458'),
  ];

  if (isDynamic) {
    parts.push(buildTLV('54', data.amount!.toFixed(2)));
  }

  parts.push(
    buildTLV('58', 'MY'),
    buildTLV('59', merchantName),
    buildTLV('60', merchantCity),
    buildTLV('62', addlData),
  );

  const payloadBeforeCRC = parts.join('') + '6304';
  const crc = crc16CCITT(payloadBeforeCRC);

  return payloadBeforeCRC + crc;
}

// ── Validator ─────────────────────────────────────────────────────────────────

export function validateDuitNowData(data: DuitNowData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.proxyValue.trim()) {
    errors.proxyValue = 'DuitNow ID is required';
  } else {
    const result = validateDuitNowKey(data.proxyValue);
    if (!result.valid) {
      errors.proxyValue = result.error ?? 'Invalid DuitNow ID';
    }
  }

  if (!data.merchantName.trim()) {
    errors.merchantName = 'Merchant name is required';
  } else if (data.merchantName.trim().length > 25) {
    errors.merchantName = 'Name must not exceed 25 characters';
  }

  if (!data.merchantCity.trim()) {
    errors.merchantCity = 'City is required';
  } else if (data.merchantCity.trim().length > 15) {
    errors.merchantCity = 'City must not exceed 15 characters';
  }

  if (data.amount !== undefined && data.amount !== null && String(data.amount) !== '') {
    if (data.amount <= 0) {
      errors.amount = 'Amount must be greater than 0';
    } else if (data.amount > 9_999_999.99) {
      errors.amount = 'Amount exceeds maximum (RM 9,999,999.99)';
    }
  }

  if (data.billDetails && data.billDetails.trim().length > 99) {
    errors.billDetails = 'Bill details must not exceed 99 characters';
  }

  return errors;
}
