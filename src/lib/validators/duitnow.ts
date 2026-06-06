export type DuitNowKeyType = 'mobile' | 'ic' | 'passport' | 'business' | 'others';

/**
 * Detects the DuitNow key type based on the format of the input string.
 *
 * Priority order:
 *  1. Mobile  – starts with +60 or 01, Malaysian mobile format
 *  2. IC      – exactly 12 digits (MyKad NRIC)
 *  3. Passport – starts with a letter, alphanumeric, 6–20 chars
 *  4. Business – starts with a digit, 9–12 chars (ROC/ROB number)
 *  5. Others  – fallback
 */
export function detectDuitNowKeyType(key: string): DuitNowKeyType | null {
  const trimmed = key.trim();
  if (!trimmed) return null;

  // Mobile: +60 prefix or starts with 01
  if (/^\+60/.test(trimmed) || /^01/.test(trimmed)) {
    return 'mobile';
  }

  // IC (MyKad): exactly 12 digits, optionally with hyphens (YYMMDD-PB-###G)
  const digitsOnly = trimmed.replace(/-/g, '');
  if (/^\d+$/.test(digitsOnly) && digitsOnly.length === 12) {
    return 'ic';
  }

  // Passport: starts with a letter, alphanumeric, 6–20 chars
  if (/^[A-Za-z][A-Za-z0-9]{5,19}$/.test(trimmed)) {
    return 'passport';
  }

  // Business (ROC/ROB): starts with a digit, 9–12 chars
  if (/^\d[A-Za-z0-9]{8,11}$/.test(trimmed)) {
    return 'business';
  }

  return 'others';
}

/**
 * Validates a DuitNow proxy key and returns the detected type.
 */
export function validateDuitNowKey(key: string): {
  valid: boolean;
  type: DuitNowKeyType | null;
  error?: string;
} {
  const trimmed = key.trim();
  if (!trimmed) {
    return { valid: false, type: null, error: 'DuitNow ID is required' };
  }

  const type = detectDuitNowKeyType(trimmed);

  switch (type) {
    case 'mobile': {
      // Normalise: strip +60 prefix if present, then check remaining digits
      const withoutCountry = trimmed.startsWith('+60')
        ? trimmed.slice(3)
        : trimmed.startsWith('60')
          ? trimmed.slice(2)
          : trimmed;
      const local = withoutCountry.startsWith('0') ? withoutCountry : `0${withoutCountry}`;
      if (!/^01[1-9]\d{7,8}$/.test(local)) {
        return {
          valid: false,
          type: 'mobile',
          error: 'Invalid Malaysian mobile number (must start with 011–019)',
        };
      }
      return { valid: true, type: 'mobile' };
    }

    case 'ic': {
      const digits = trimmed.replace(/-/g, '');
      if (digits.length !== 12 || !/^\d{12}$/.test(digits)) {
        return { valid: false, type: 'ic', error: 'IC number must be exactly 12 digits' };
      }
      return { valid: true, type: 'ic' };
    }

    case 'passport':
      return { valid: true, type: 'passport' };

    case 'business':
      return { valid: true, type: 'business' };

    case 'others':
      return { valid: true, type: 'others' };

    default:
      return { valid: false, type: null, error: 'Unable to detect DuitNow key type' };
  }
}
