import { validateQRISMerchantId, validateQRISAmount, type QRISMerchantType } from '@/lib/validators/qris';

export type { QRISMerchantType };

export type QRISData = {
  merchantId: string;        // NMID – National Merchant ID
  merchantName: string;      // max 25 chars
  merchantCity: string;      // max 15 chars
  merchantType: QRISMerchantType;
  amount?: number;           // in IDR (integer, no decimals)
  terminalId?: string;       // optional
  referenceId?: string;      // optional
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

// ── Merchant criteria mapping ─────────────────────────────────────────────────

const MERCHANT_CRITERIA: Record<QRISMerchantType, string> = {
  micro:  'A',
  small:  'A',
  medium: 'B',
  large:  'C',
};

const MERCHANT_CATEGORY_CODE: Record<QRISMerchantType, string> = {
  micro:  '0000',
  small:  '0000',
  medium: '5999',
  large:  '5999',
};

// ── Payload generator ─────────────────────────────────────────────────────────

/**
 * Generates a QRIS QR Code payload following the EMV Merchant Presented Mode
 * specification as defined by Bank Indonesia (BI).
 *
 * Field reference:
 *   ID 00 – Payload Format Indicator ("01")
 *   ID 01 – Point of Initiation Method ("11" static | "12" dynamic)
 *   ID 26 – Merchant Account Information (nested TLV, AID: ID.CO.QRIS.WWW)
 *   ID 52 – Merchant Category Code
 *   ID 53 – Transaction Currency ("360" = IDR)
 *   ID 54 – Transaction Amount (integer, no decimals — only when set)
 *   ID 58 – Country Code ("ID")
 *   ID 59 – Merchant Name (max 25 chars, uppercase)
 *   ID 60 – Merchant City (max 15 chars, uppercase)
 *   ID 61 – Postal Code ("00000")
 *   ID 62 – Additional Data Field Template (nested TLV)
 *   ID 63 – CRC16-CCITT checksum
 */
export function generateQRISPayload(data: QRISData): string {
  const merchantId   = data.merchantId.trim();
  const merchantName = data.merchantName.trim().toUpperCase().slice(0, 25);
  const merchantCity = data.merchantCity.trim().toUpperCase().slice(0, 15);
  const isDynamic    = data.amount !== undefined && data.amount > 0;

  // ID 26 – Merchant Account Information (QRIS)
  let mchAcct = buildTLV('00', 'ID.CO.QRIS.WWW');
  mchAcct += buildTLV('01', merchantId);
  mchAcct += buildTLV('02', MERCHANT_CRITERIA[data.merchantType]);

  // ID 62 – Additional Data Field Template
  const refLabel  = data.referenceId?.trim() || '***';
  const termLabel = data.terminalId?.trim()  || '00000000';
  const addlData  = buildTLV('05', refLabel) + buildTLV('07', termLabel);

  // Assemble payload (without CRC)
  const parts: string[] = [
    buildTLV('00', '01'),                                       // Payload Format Indicator
    buildTLV('01', isDynamic ? '12' : '11'),                   // Point of Initiation Method
    buildTLV('26', mchAcct),                                    // Merchant Account Information
    buildTLV('52', MERCHANT_CATEGORY_CODE[data.merchantType]),  // Merchant Category Code
    buildTLV('53', '360'),                                      // Transaction Currency (IDR)
  ];

  if (isDynamic) {
    // IDR has no decimal places – encode as integer string
    parts.push(buildTLV('54', String(Math.round(data.amount!))));
  }

  parts.push(
    buildTLV('58', 'ID'),           // Country Code
    buildTLV('59', merchantName),   // Merchant Name
    buildTLV('60', merchantCity),   // Merchant City
    buildTLV('61', '00000'),        // Postal Code
    buildTLV('62', addlData),       // Additional Data Field
  );

  // CRC placeholder "6304" is included in the checksum calculation
  const payloadBeforeCRC = parts.join('') + '6304';
  const crc = crc16CCITT(payloadBeforeCRC);

  return payloadBeforeCRC + crc;
}

// ── Validator ─────────────────────────────────────────────────────────────────

export function validateQRISData(data: QRISData): Record<string, string> {
  const errors: Record<string, string> = {};

  // merchantId
  const idResult = validateQRISMerchantId(data.merchantId);
  if (!idResult.valid) {
    errors.merchantId = idResult.error ?? 'Invalid Merchant ID';
  }

  // merchantName
  if (!data.merchantName.trim()) {
    errors.merchantName = 'Merchant name is required';
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
    const amtResult = validateQRISAmount(data.amount);
    if (!amtResult.valid) {
      errors.amount = amtResult.error ?? 'Invalid amount';
    }
  }

  return errors;
}
