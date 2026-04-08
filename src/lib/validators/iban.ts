export type IBANValidationResult = {
  valid: boolean;
  error?: string;
};

/**
 * Validates an IBAN using the Mod-97 checksum algorithm.
 * Strips spaces and converts to uppercase before validation.
 */
export function validateIBAN(iban: string): IBANValidationResult {
  const cleaned = iban.replace(/\s+/g, '').toUpperCase();

  if (cleaned.length < 15) return { valid: false, error: 'IBAN is too short' };
  if (cleaned.length > 34) return { valid: false, error: 'IBAN is too long' };

  // Move first 4 chars to the end, then replace letters with numbers (A=10 … Z=35)
  const rearranged = cleaned.slice(4) + cleaned.slice(0, 4);
  const numeric = rearranged.replace(/[A-Z]/g, (ch) =>
    String(ch.charCodeAt(0) - 55),
  );

  // Digit-by-digit mod-97 — safe for arbitrarily long strings without BigInt
  const remainder = numeric
    .split('')
    .reduce((acc, ch) => (acc * 10 + parseInt(ch, 10)) % 97, 0);
  if (remainder !== 1) return { valid: false, error: 'Invalid IBAN checksum' };

  return { valid: true };
}

/**
 * Formats a raw IBAN into groups of 4 characters separated by spaces.
 * e.g. "DE89370400440532013000" → "DE89 3704 0044 0532 0130 00"
 */
export function formatIBAN(iban: string): string {
  const cleaned = iban.replace(/\s+/g, '').toUpperCase();
  return cleaned.replace(/(.{4})/g, '$1 ').trim();
}
