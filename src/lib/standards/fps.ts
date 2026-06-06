import { validateFPSKey, type FPSKeyType } from '@/lib/validators/fps';

export type { FPSKeyType };

export type FPSData = {
  fpsKey: string;
  merchantName: string;       // max 25 chars
  amount?: number;            // in HKD or CNY, 2 decimal places
  currency: 'HKD' | 'CNY';   // default HKD
  referenceId?: string;
  memo?: string;              // max 40 chars
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

const PROXY_TYPE_CODE: Record<FPSKeyType, string> = {
  fps_id: '1',
  mobile: '2',
  email:  '3',
};

// ── Currency code mapping ─────────────────────────────────────────────────────

const CURRENCY_CODE: Record<'HKD' | 'CNY', string> = {
  HKD: '344',
  CNY: '156',
};

// ── Key normalisation ─────────────────────────────────────────────────────────

function normaliseKey(key: string, type: FPSKeyType): string {
  switch (type) {
    case 'mobile': {
      const trimmed = key.trim();
      const digits = trimmed.startsWith('+852') ? trimmed.slice(4) : trimmed;
      return `+852${digits}`;
    }
    case 'email':
      return key.trim().toLowerCase();
    default:
      return key.trim();
  }
}

// ── Payload generator ─────────────────────────────────────────────────────────

/**
 * Generates an FPS QR Code payload following the EMV Merchant Presented Mode
 * specification as adapted by HKMA (Hong Kong Monetary Authority).
 *
 * Field reference:
 *   ID 00 – Payload Format Indicator ("01")
 *   ID 01 – Point of Initiation Method ("11" static | "12" dynamic)
 *   ID 26 – FPS Merchant Account Information (AID: hk.edu.hkma.fps)
 *   ID 52 – Merchant Category Code ("0000")
 *   ID 53 – Transaction Currency ("344" HKD | "156" CNY)
 *   ID 54 – Transaction Amount (optional, 2 decimal places)
 *   ID 58 – Country Code ("HK")
 *   ID 59 – Merchant / Payee Name (max 25 chars, uppercase)
 *   ID 60 – Merchant City ("Hong Kong")
 *   ID 62 – Additional Data Field Template
 *   ID 63 – CRC16-CCITT checksum
 */
export function generateFPSPayload(data: FPSData): string {
  const keyResult     = validateFPSKey(data.fpsKey);
  const keyType       = keyResult.type!;
  const normalisedKey = normaliseKey(data.fpsKey, keyType);
  const merchantName  = data.merchantName.trim().toUpperCase().slice(0, 25);
  const isDynamic     = data.amount !== undefined && data.amount > 0;

  // ID 26 – FPS Merchant Account Information
  const mchAcct =
    buildTLV('00', 'hk.edu.hkma.fps') +
    buildTLV('01', PROXY_TYPE_CODE[keyType]) +
    buildTLV('02', normalisedKey);

  // ID 62 – Additional Data Field Template
  const memoLabel = (data.memo?.trim() ?? '').slice(0, 40);
  const refLabel  = data.referenceId?.trim() || '***';
  const addlData  = buildTLV('01', memoLabel) + buildTLV('05', refLabel);

  const parts: string[] = [
    buildTLV('00', '01'),
    buildTLV('01', isDynamic ? '12' : '11'),
    buildTLV('26', mchAcct),
    buildTLV('52', '0000'),
    buildTLV('53', CURRENCY_CODE[data.currency]),
  ];

  if (isDynamic) {
    parts.push(buildTLV('54', data.amount!.toFixed(2)));
  }

  parts.push(
    buildTLV('58', 'HK'),
    buildTLV('59', merchantName),
    buildTLV('60', 'Hong Kong'),
    buildTLV('62', addlData),
  );

  const payloadBeforeCRC = parts.join('') + '6304';
  const crc = crc16CCITT(payloadBeforeCRC);

  return payloadBeforeCRC + crc;
}

// ── Validator ─────────────────────────────────────────────────────────────────

export function validateFPSData(data: FPSData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.fpsKey.trim()) {
    errors.fpsKey = 'FPS key is required';
  } else {
    const result = validateFPSKey(data.fpsKey);
    if (!result.valid) {
      errors.fpsKey = result.error ?? 'Invalid FPS key';
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
    } else if (data.amount > 9_999_999.99) {
      errors.amount = 'Amount exceeds maximum';
    }
  }

  if (data.memo && data.memo.trim().length > 40) {
    errors.memo = 'Memo must not exceed 40 characters';
  }

  return errors;
}
