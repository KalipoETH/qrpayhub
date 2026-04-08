import { validateSwissIBAN, validateSwissQRReference } from '@/lib/validators/swiss-qr';

export type SwissQRData = {
  iban: string;
  creditorName: string;
  creditorStreet?: string;
  creditorCity: string;
  creditorCountry: string; // "CH" or "LI"
  amount?: number;         // optional, CHF or EUR
  currency: 'CHF' | 'EUR';
  debtorName?: string;
  debtorCity?: string;
  debtorCountry?: string;
  reference?: string;      // QRR or SCOR formatted reference
  referenceType: 'QRR' | 'SCOR' | 'NON';
  message?: string;        // max 140 chars
};

/**
 * Generates a Swiss QR Bill payload per SIX Group specification (Version 0200).
 * Fields are joined with LF (\n) as required by the standard.
 */
export function generateSwissQRPayload(data: SwissQRData): string {
  const iban = data.iban.replace(/\s+/g, '').toUpperCase();
  const amountStr =
    data.amount !== undefined && data.amount > 0
      ? data.amount.toFixed(2)
      : '';

  const lines = [
    'SPC',                              // Header
    '0200',                             // Version
    '1',                                // Coding type (UTF-8)
    iban,                               // Creditor IBAN
    'K',                                // Creditor address type (combined)
    data.creditorName.slice(0, 70),     // Creditor name
    (data.creditorStreet ?? '').slice(0, 70), // Address line 1
    data.creditorCity.slice(0, 70),     // Address line 2
    '',                                 // Postal code (empty for K type)
    '',                                 // Town (empty for K type)
    data.creditorCountry,               // Creditor country
    // Ultimate Creditor (7 fields, always empty per SIX spec)
    '', '', '', '', '', '', '',
    amountStr,                          // Amount or empty
    data.currency,                      // Currency
    // Ultimate Debtor
    'K',                                // Debtor address type
    (data.debtorName ?? '').slice(0, 70),
    '',                                 // Debtor address line 1
    (data.debtorCity ?? '').slice(0, 70),
    '',                                 // Debtor postal code
    '',                                 // Debtor town
    data.debtorCountry ?? '',           // Debtor country
    data.referenceType,                 // QRR | SCOR | NON
    (data.reference ?? '').replace(/\s+/g, ''),
    (data.message ?? '').slice(0, 140), // Additional info
    'EPD',                              // Trailer
  ];

  return lines.join('\n');
}

export function validateSwissQRData(data: SwissQRData): Record<string, string> {
  const errors: Record<string, string> = {};

  // IBAN
  if (!data.iban.trim()) {
    errors.iban = 'IBAN is required';
  } else {
    const result = validateSwissIBAN(data.iban);
    if (!result.valid) {
      errors.iban = result.error ?? 'Invalid Swiss IBAN';
    }
  }

  // Creditor name
  if (!data.creditorName.trim()) {
    errors.creditorName = 'Name is required';
  } else if (data.creditorName.length > 70) {
    errors.creditorName = 'Name must not exceed 70 characters';
  }

  // Creditor city
  if (!data.creditorCity.trim()) {
    errors.creditorCity = 'City is required';
  } else if (data.creditorCity.length > 35) {
    errors.creditorCity = 'City must not exceed 35 characters';
  }

  // Creditor country
  if (!data.creditorCountry) {
    errors.creditorCountry = 'Country is required';
  } else if (data.creditorCountry !== 'CH' && data.creditorCountry !== 'LI') {
    errors.creditorCountry = 'Country must be CH or LI';
  }

  // Amount (optional)
  if (data.amount !== undefined && data.amount !== null) {
    if (data.amount <= 0) {
      errors.amount = 'Amount must be greater than 0';
    } else if (data.amount > 999_999_999.99) {
      errors.amount = 'Amount exceeds the maximum allowed value';
    }
  }

  // Reference (depends on type)
  if (data.referenceType !== 'NON') {
    if (!data.reference?.trim()) {
      errors.reference = 'Reference is required for the selected reference type';
    } else {
      const result = validateSwissQRReference(data.reference);
      if (!result.valid) {
        errors.reference = result.error ?? 'Invalid reference';
      } else if (result.type !== data.referenceType) {
        errors.reference = `Reference format does not match type ${data.referenceType}`;
      }
    }
  }

  // Message (optional)
  if (data.message && data.message.length > 140) {
    errors.message = 'Message must not exceed 140 characters';
  }

  return errors;
}
