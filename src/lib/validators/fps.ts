export type FPSKeyType = 'mobile' | 'email' | 'fps_id';

/**
 * Validates a Hong Kong FPS (Faster Payment System) key.
 *
 * Supported proxy types:
 *  mobile  – 8-digit HK number, starting with 5/6/7/9, optionally prefixed with +852
 *  email   – standard e-mail address
 *  fps_id  – 7–9 numeric digits assigned by the bank
 */
export function validateFPSKey(key: string): {
  valid: boolean;
  type: FPSKeyType | null;
  error?: string;
} {
  const trimmed = key.trim();
  if (!trimmed) {
    return { valid: false, type: null, error: 'FPS key is required' };
  }

  // FPS ID: 7–9 digits
  if (/^\d{7,9}$/.test(trimmed)) {
    return { valid: true, type: 'fps_id' };
  }

  // Mobile: +852XXXXXXXX or local 8-digit starting with 5/6/7/9
  if (trimmed.startsWith('+852') || /^[56789]/.test(trimmed)) {
    const digits = trimmed.startsWith('+852') ? trimmed.slice(4) : trimmed;
    if (!/^[56789]\d{7}$/.test(digits)) {
      return {
        valid: false,
        type: 'mobile',
        error: 'HK mobile numbers must be 8 digits and start with 5, 6, 7 or 9',
      };
    }
    return { valid: true, type: 'mobile' };
  }

  // Email: simple RFC-compatible check
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { valid: true, type: 'email' };
  }

  return {
    valid: false,
    type: null,
    error: 'Enter a HK mobile number (+852XXXXXXXX), email address or 7–9 digit FPS ID',
  };
}
