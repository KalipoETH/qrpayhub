import { validateIBAN } from '@/lib/validators/iban';

export type GiroCodeData = {
  iban: string;
  name: string;
  amount?: number;
  reference?: string;
  bic?: string;
};

/**
 * Generates an EPC-compliant GiroCode / QR payload (Version 002).
 *
 * Format per EPC069-12:
 * Line 1 : Service Tag        → BCD
 * Line 2 : Version            → 002
 * Line 3 : Character set      → 1 (UTF-8)
 * Line 4 : Identification     → SCT
 * Line 5 : BIC                → (optional)
 * Line 6 : Beneficiary name   → max 70 chars
 * Line 7 : Account number     → IBAN (no spaces)
 * Line 8 : Amount             → "EUR" + decimal (e.g. EUR12.50) or empty
 * Line 9 : Purpose code       → (empty)
 * Line 10: Remittance ref     → (empty, structured)
 * Line 11: Remittance info    → free-text reference or empty
 */
export function generateGiroCodePayload(data: GiroCodeData): string {
  const iban = data.iban.replace(/\s+/g, '').toUpperCase();
  const name = data.name.slice(0, 70);
  const bic = (data.bic ?? '').replace(/\s+/g, '').toUpperCase();
  const amountStr =
    data.amount && data.amount > 0
      ? `EUR${data.amount.toFixed(2)}`
      : '';
  const reference = (data.reference ?? '').slice(0, 140);

  return [
    'BCD',
    '002',
    '1',
    'SCT',
    bic,
    name,
    iban,
    amountStr,
    '',        // purpose code
    '',        // structured remittance reference
    reference, // unstructured remittance information
  ].join('\n');
}

export type GiroCodeErrors = Record<string, string>;

/**
 * Returns a map of field names to error messages.
 * An empty object means the data is valid.
 */
export function validateGiroCodeData(data: GiroCodeData): GiroCodeErrors {
  const errors: GiroCodeErrors = {};

  // name
  if (!data.name.trim()) {
    errors.name = 'Recipient name is required';
  } else if (data.name.length > 70) {
    errors.name = 'Name must not exceed 70 characters';
  }

  // iban
  if (!data.iban.trim()) {
    errors.iban = 'IBAN is required';
  } else {
    const result = validateIBAN(data.iban);
    if (!result.valid) {
      errors.iban = result.error ?? 'Invalid IBAN';
    }
  }

  // amount (optional)
  if (data.amount !== undefined && data.amount !== null) {
    if (data.amount <= 0) {
      errors.amount = 'Amount must be greater than 0';
    } else if (data.amount > 999_999_999.99) {
      errors.amount = 'Amount exceeds the maximum allowed value';
    }
  }

  // reference (optional)
  if (data.reference && data.reference.length > 140) {
    errors.reference = 'Reference must not exceed 140 characters';
  }

  return errors;
}
