export type PromptPayKeyType = 'phone' | 'nationalId' | 'taxId' | 'ewallet';

/**
 * Detects the PromptPay key type from a raw input string.
 * Detection order matters: e-wallet must be checked before phone
 * because both can start with '0'.
 */
export function detectPromptPayKeyType(key: string): PromptPayKeyType | null {
  const trimmed = key.trim();
  if (!trimmed) return null;

  // E-Wallet: "00" prefix + 13–15 digits (total 15–17 chars, all digits)
  if (/^00\d{13,15}$/.test(trimmed)) return 'ewallet';

  // Phone: +66 + 9 digits, or 0 + 9 digits (10 Thai digits total)
  if (/^\+66\d{9}$/.test(trimmed)) return 'phone';
  if (/^0\d{9}$/.test(trimmed)) return 'phone';

  // National ID / Tax ID: exactly 13 digits
  if (/^\d{13}$/.test(trimmed)) {
    // Thai tax IDs for juristic persons start with 0
    return trimmed.startsWith('0') ? 'taxId' : 'nationalId';
  }

  return null;
}

/**
 * Thai National ID checksum (mod-11 weighted sum algorithm).
 * Weights: 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 for digits 0–11.
 * Check digit = (11 − (sum mod 11)) mod 10.
 */
function validateThaiNationalIdChecksum(id: string): boolean {
  if (!/^\d{13}$/.test(id)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(id[i], 10) * (13 - i);
  }
  const expected = (11 - (sum % 11)) % 10;
  return expected === parseInt(id[12], 10);
}

export function validatePromptPayKey(key: string): {
  valid: boolean;
  type: PromptPayKeyType | null;
  error?: string;
} {
  const trimmed = key.trim();
  if (!trimmed) return { valid: false, type: null, error: 'PromptPay key is required' };

  const type = detectPromptPayKeyType(trimmed);

  if (type === null) {
    return { valid: false, type: null, error: 'Invalid key format' };
  }

  switch (type) {
    case 'phone': {
      // After stripping +66 or leading 0, the remaining 9 digits must start with 6, 8 or 9
      const digits = trimmed.startsWith('+66') ? trimmed.slice(3) : trimmed.slice(1);
      if (!/^[689]\d{8}$/.test(digits)) {
        return { valid: false, type, error: 'Invalid Thai phone number format' };
      }
      return { valid: true, type };
    }

    case 'nationalId': {
      if (!validateThaiNationalIdChecksum(trimmed)) {
        return { valid: false, type, error: 'National ID must be 13 digits' };
      }
      return { valid: true, type };
    }

    case 'taxId': {
      // Tax ID format check only — starts with 0, exactly 13 digits (already verified in detect)
      return { valid: true, type };
    }

    case 'ewallet': {
      return { valid: true, type };
    }
  }
}
