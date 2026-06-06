export type PayNowKeyType = 'mobile' | 'uen' | 'nric';

/**
 * Validates a PayNow proxy key and returns the detected type.
 *
 * Mobile: +65XXXXXXXX or 8/9XXXXXXX (8 digits after country code, starts with 8 or 9)
 * UEN:    9–10 chars ending with a letter (business entity number)
 * NRIC:   9 chars — starts with S/T/F/G, 7 digits, ends with a letter
 */
export function validatePayNowKey(key: string): {
  valid: boolean;
  type: PayNowKeyType | null;
  error?: string;
} {
  const trimmed = key.trim();
  if (!trimmed) {
    return { valid: false, type: null, error: 'PayNow key is required' };
  }

  // NRIC: S/T/F/G + 7 digits + letter (9 chars total)
  if (/^[STFGstfg]\d{7}[A-Za-z]$/.test(trimmed)) {
    return { valid: true, type: 'nric' };
  }

  // Mobile: +65XXXXXXXX or local 8/9XXXXXXX
  if (trimmed.startsWith('+65') || /^[89]/.test(trimmed)) {
    const digits = trimmed.startsWith('+65')
      ? trimmed.slice(3)
      : trimmed;
    if (!/^[89]\d{7}$/.test(digits)) {
      return {
        valid: false,
        type: 'mobile',
        error: 'Singapore mobile numbers must be 8 digits and start with 8 or 9',
      };
    }
    return { valid: true, type: 'mobile' };
  }

  // UEN: 9–10 alphanumeric chars ending with a letter
  if (/^[A-Za-z0-9]{8,9}[A-Za-z]$/.test(trimmed)) {
    return { valid: true, type: 'uen' };
  }

  return {
    valid: false,
    type: null,
    error: 'Unrecognised format. Enter a Singapore mobile (+65XXXXXXXX), UEN or NRIC/FIN',
  };
}
