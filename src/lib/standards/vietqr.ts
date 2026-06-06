import {
  validateVietnameseBankAccount,
  validateVietQRBin,
} from '@/lib/validators/vietqr';

export type VietQRData = {
  bankBin: string;         // 6-digit NAPAS BIN
  accountNumber: string;   // bank account number
  accountName: string;     // account holder name, max 50 chars
  amount?: number;         // in VND, no decimal places
  description?: string;    // payment description, max 50 chars
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

// ── Payload generator ─────────────────────────────────────────────────────────

/**
 * Generates a VietQR Code payload following the EMV Merchant Presented Mode
 * specification as defined by NAPAS (National Payment Corporation of Vietnam).
 *
 * Field reference:
 *   ID 00 – Payload Format Indicator ("01")
 *   ID 01 – Point of Initiation Method ("11" static | "12" dynamic)
 *   ID 38 – VietQR Merchant Account Information (NAPAS AID: A000000727)
 *   ID 52 – Merchant Category Code ("0000")
 *   ID 53 – Transaction Currency ("704" = VND)
 *   ID 54 – Transaction Amount (optional, no decimal places — VND is indivisible)
 *   ID 58 – Country Code ("VN")
 *   ID 59 – Account Name (max 50 chars, uppercase)
 *   ID 60 – Merchant City ("Vietnam")
 *   ID 62 – Additional Data Field Template (sub-ID 08: description)
 *   ID 63 – CRC16-CCITT checksum
 */
export function generateVietQRPayload(data: VietQRData): string {
  const accountName = data.accountName.trim().toUpperCase().slice(0, 50);
  const isDynamic   = data.amount !== undefined && data.amount > 0;

  // ID 38 – VietQR Merchant Account Information
  const mchAcct =
    buildTLV('00', 'A000000727') +
    buildTLV('01', data.bankBin.trim()) +
    buildTLV('02', data.accountNumber.trim());

  // ID 62 – Additional Data Field Template
  const descLabel = (data.description?.trim() ?? '').slice(0, 50);
  const addlData  = buildTLV('08', descLabel);

  const parts: string[] = [
    buildTLV('00', '01'),
    buildTLV('01', isDynamic ? '12' : '11'),
    buildTLV('38', mchAcct),
    buildTLV('52', '0000'),
    buildTLV('53', '704'),
  ];

  if (isDynamic) {
    // VND has no decimal subdivision — encode as integer
    parts.push(buildTLV('54', String(Math.round(data.amount!))));
  }

  parts.push(
    buildTLV('58', 'VN'),
    buildTLV('59', accountName),
    buildTLV('60', 'Vietnam'),
    buildTLV('62', addlData),
  );

  const payloadBeforeCRC = parts.join('') + '6304';
  const crc = crc16CCITT(payloadBeforeCRC);

  return payloadBeforeCRC + crc;
}

// ── Validator ─────────────────────────────────────────────────────────────────

export function validateVietQRData(data: VietQRData): Record<string, string> {
  const errors: Record<string, string> = {};

  const binResult = validateVietQRBin(data.bankBin);
  if (!binResult.valid) {
    errors.bankBin = binResult.error ?? 'Invalid bank BIN';
  }

  const acctResult = validateVietnameseBankAccount(data.accountNumber);
  if (!acctResult.valid) {
    errors.accountNumber = acctResult.error ?? 'Invalid account number';
  }

  if (!data.accountName.trim()) {
    errors.accountName = 'Account name is required';
  } else if (data.accountName.trim().length > 50) {
    errors.accountName = 'Account name must not exceed 50 characters';
  }

  if (data.amount !== undefined && data.amount !== null && String(data.amount) !== '') {
    if (data.amount <= 0) {
      errors.amount = 'Amount must be greater than 0';
    } else if (!Number.isInteger(data.amount)) {
      errors.amount = 'VND has no decimal places — enter whole đồng only';
    } else if (data.amount > 999_999_999_999) {
      errors.amount = 'Amount exceeds maximum';
    }
  }

  if (data.description && data.description.trim().length > 50) {
    errors.description = 'Description must not exceed 50 characters';
  }

  return errors;
}
