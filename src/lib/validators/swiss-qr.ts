import { validateIBAN } from './iban';

export function validateSwissIBAN(iban: string): { valid: boolean; error?: string } {
  const cleaned = iban.replace(/\s+/g, '').toUpperCase();

  if (!cleaned.startsWith('CH') && !cleaned.startsWith('LI')) {
    return { valid: false, error: 'Must be a Swiss (CH) or Liechtenstein (LI) IBAN' };
  }

  if (cleaned.length !== 21) {
    return { valid: false, error: 'Swiss IBAN must be exactly 21 characters' };
  }

  const result = validateIBAN(cleaned);
  if (!result.valid) {
    return { valid: false, error: 'Invalid IBAN checksum' };
  }

  return { valid: true };
}

// Modulo 10 recursive (Luhn-like) as specified by SIX Group for QR-Reference
function mod10Recursive(digits: string): number {
  const TABLE = [0, 9, 4, 6, 8, 2, 7, 1, 3, 5];
  let carry = 0;
  for (const ch of digits) {
    carry = TABLE[(carry + parseInt(ch, 10)) % 10];
  }
  return (10 - carry) % 10;
}

export function validateSwissQRReference(
  ref: string,
): { valid: boolean; type: 'QRR' | 'SCOR' | 'NON'; error?: string } {
  const cleaned = ref.replace(/\s+/g, '');

  if (cleaned === '') {
    return { valid: true, type: 'NON' };
  }

  if (cleaned.toUpperCase().startsWith('RF')) {
    if (cleaned.length < 5 || cleaned.length > 25) {
      return { valid: false, type: 'SCOR', error: 'Creditor Reference must be 5–25 characters' };
    }
    return { valid: true, type: 'SCOR' };
  }

  if (/^\d{27}$/.test(cleaned)) {
    const checkDigit = parseInt(cleaned[26], 10);
    const expected = mod10Recursive(cleaned.slice(0, 26));
    if (checkDigit !== expected) {
      return { valid: false, type: 'QRR', error: 'Invalid QR-Reference checksum' };
    }
    return { valid: true, type: 'QRR' };
  }

  return { valid: false, type: 'NON', error: 'Invalid reference format' };
}
