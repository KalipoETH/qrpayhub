import { validateQRPhKey, normalizeQRPhMobile, type QRPhProxyType } from '@/lib/validators/qrph';

export type QRPhData = {
  proxyType: QRPhProxyType;
  proxyValue: string;
  merchantName: string;   // max 25 chars
  merchantCity: string;   // max 15 chars
  amount?: number;        // in PHP, 2 decimal places
  referenceId?: string;   // optional
  purpose?: string;       // optional, max 35 chars
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

// ── Proxy type mapping ────────────────────────────────────────────────────────

function proxyTypeToEMV(type: QRPhProxyType): string {
  switch (type) {
    case 'mobile':  return 'MSISDN';
    case 'account': return 'ACCT';
    case 'email':   return 'EMAIL';
  }
}

function normalizeProxyValue(type: QRPhProxyType, value: string): string {
  if (type === 'mobile') return normalizeQRPhMobile(value);
  return value.trim();
}

// ── Payload generator ─────────────────────────────────────────────────────────

/**
 * Generates a QR Ph payload following BSP EMV TLV specification.
 *
 * Field reference (EMV Merchant Presented Mode, QR Ph variant):
 *   ID 00 – Payload Format Indicator ("01")
 *   ID 01 – Point of Initiation Method ("11" static | "12" with amount)
 *   ID 26 – QR Ph Merchant Account Information
 *     ID 00 – AID: "PH.INSTAPAY.ME"
 *     ID 01 – Proxy Type: MSISDN | ACCT | EMAIL
 *     ID 02 – Proxy Value (normalised)
 *   ID 52 – Merchant Category Code ("0000")
 *   ID 53 – Transaction Currency ("608" = PHP)
 *   ID 54 – Transaction Amount (optional)
 *   ID 58 – Country Code ("PH")
 *   ID 59 – Merchant Name (uppercase, max 25 chars)
 *   ID 60 – Merchant City (uppercase, max 15 chars)
 *   ID 62 – Additional Data Field Template
 *     ID 05 – Reference / Bill Number
 *     ID 08 – Purpose / Terminal Label
 *   ID 63 – CRC16-CCITT
 */
export function generateQRPhPayload(data: QRPhData): string {
  const hasAmount = data.amount !== undefined && data.amount > 0;
  const proxyValue = normalizeProxyValue(data.proxyType, data.proxyValue);
  const emvType = proxyTypeToEMV(data.proxyType);

  const merchantName = data.merchantName.trim().toUpperCase().slice(0, 25);
  const merchantCity = data.merchantCity.trim().toUpperCase().slice(0, 15);

  // ID 26 – QR Ph merchant account (sub-TLV)
  const mchAcctContent =
    buildTLV('00', 'PH.INSTAPAY.ME') +
    buildTLV('01', emvType) +
    buildTLV('02', proxyValue);

  // ID 62 – Additional data
  const refValue = data.referenceId?.trim() || '***';
  const purposeValue = data.purpose?.trim().slice(0, 35) || '';
  let addlDataContent = buildTLV('05', refValue);
  if (purposeValue) addlDataContent += buildTLV('08', purposeValue);

  const parts: string[] = [
    buildTLV('00', '01'),
    buildTLV('01', hasAmount ? '12' : '11'),
    buildTLV('26', mchAcctContent),
    buildTLV('52', '0000'),
    buildTLV('53', '608'),
  ];

  if (hasAmount) {
    parts.push(buildTLV('54', data.amount!.toFixed(2)));
  }

  parts.push(
    buildTLV('58', 'PH'),
    buildTLV('59', merchantName),
    buildTLV('60', merchantCity),
    buildTLV('62', addlDataContent),
  );

  const payloadBeforeCRC = parts.join('') + '6304';
  const crc = crc16CCITT(payloadBeforeCRC);
  return payloadBeforeCRC + crc;
}

// ── Validator ─────────────────────────────────────────────────────────────────

export function validateQRPhData(data: QRPhData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.proxyValue.trim()) {
    errors.proxyValue = 'QR Ph key is required';
  } else {
    const result = validateQRPhKey(data.proxyValue);
    if (!result.valid) {
      errors.proxyValue = result.error ?? 'Invalid QR Ph key';
    }
  }

  if (!data.merchantName.trim()) {
    errors.merchantName = 'Payee name is required';
  } else if (data.merchantName.trim().length > 25) {
    errors.merchantName = 'Payee name must be 25 characters or fewer';
  }

  if (!data.merchantCity.trim()) {
    errors.merchantCity = 'City is required';
  } else if (data.merchantCity.trim().length > 15) {
    errors.merchantCity = 'City must be 15 characters or fewer';
  }

  if (data.amount !== undefined && data.amount !== null && String(data.amount) !== '') {
    if (data.amount <= 0) {
      errors.amount = 'Amount must be greater than 0';
    } else if (data.amount > 9_999_999.99) {
      errors.amount = 'Amount exceeds maximum (₱9,999,999.99)';
    }
  }

  if (data.purpose && data.purpose.trim().length > 35) {
    errors.purpose = 'Purpose must be 35 characters or fewer';
  }

  return errors;
}
