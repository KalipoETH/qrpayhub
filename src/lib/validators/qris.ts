export type QRISMerchantType = 'micro' | 'small' | 'medium' | 'large';

/**
 * Validates a QRIS National Merchant ID (NMID).
 * Rules: alphanumeric + hyphen + underscore, 1–25 characters.
 */
export function validateQRISMerchantId(id: string): { valid: boolean; error?: string } {
  if (!id || id.trim().length === 0) {
    return { valid: false, error: 'Merchant ID is required' };
  }
  const trimmed = id.trim();
  if (trimmed.length > 25) {
    return { valid: false, error: 'Merchant ID must not exceed 25 characters' };
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
    return {
      valid: false,
      error: 'Only letters, digits, hyphens and underscores are allowed',
    };
  }
  return { valid: true };
}

/**
 * Validates an IDR amount for QRIS.
 * Rules: integer > 0, max 999,999,999 IDR (no decimal places).
 */
export function validateQRISAmount(amount: number): { valid: boolean; error?: string } {
  if (!Number.isFinite(amount) || amount <= 0) {
    return { valid: false, error: 'Amount must be greater than 0' };
  }
  if (!Number.isInteger(amount)) {
    return { valid: false, error: 'IDR has no decimal places — enter whole Rupiah only' };
  }
  if (amount > 999_999_999) {
    return { valid: false, error: 'Amount exceeds maximum (Rp 999,999,999)' };
  }
  return { valid: true };
}
