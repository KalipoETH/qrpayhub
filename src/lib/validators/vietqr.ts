/**
 * Vietnamese bank BIN (Bank Identification Number) registry.
 * Each BIN is a 6-digit code assigned by NAPAS.
 */
export const VIETQR_BANKS: Record<string, string> = {
  '970436': 'Vietcombank',
  '970418': 'BIDV',
  '970405': 'Agribank',
  '970415': 'Vietinbank',
  '970407': 'Techcombank',
  '970422': 'MB Bank',
  '970432': 'VPBank',
  '970423': 'TPBank',
  '970403': 'Sacombank',
  '970425': 'ABBank',
  '970431': 'Eximbank',
};

/**
 * Validates a Vietnamese bank account number.
 * Rules: 6–19 digits, no spaces or special characters.
 */
export function validateVietnameseBankAccount(accountNumber: string): {
  valid: boolean;
  error?: string;
} {
  const trimmed = accountNumber.trim();
  if (!trimmed) {
    return { valid: false, error: 'Account number is required' };
  }
  if (!/^\d+$/.test(trimmed)) {
    return { valid: false, error: 'Account number must contain digits only' };
  }
  if (trimmed.length < 6 || trimmed.length > 19) {
    return { valid: false, error: 'Account number must be 6–19 digits' };
  }
  return { valid: true };
}

/**
 * Validates a VietQR bank BIN code.
 * Returns the bank name if the BIN is in the known registry.
 */
export function validateVietQRBin(bin: string): {
  valid: boolean;
  bankName?: string;
  error?: string;
} {
  const trimmed = bin.trim();
  if (!trimmed) {
    return { valid: false, error: 'Bank BIN is required' };
  }
  if (!/^\d{6}$/.test(trimmed)) {
    return { valid: false, error: 'Bank BIN must be exactly 6 digits' };
  }
  const bankName = VIETQR_BANKS[trimmed];
  if (bankName) {
    return { valid: true, bankName };
  }
  // Unknown BIN — still structurally valid (6 digits)
  return { valid: true };
}
