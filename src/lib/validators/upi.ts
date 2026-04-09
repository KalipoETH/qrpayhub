// UPI ID format: localpart@bankhandle
// localpart: 3–256 chars, alphanumeric + . - _
// bankhandle: 3–64 chars, alphanumeric + .
const LOCAL_PART_RE = /^[a-zA-Z0-9._-]{3,256}$/;
const HANDLE_RE = /^[a-zA-Z0-9.]{3,64}$/;

export function validateUPIId(upiId: string): { valid: boolean; error?: string } {
  const trimmed = upiId.trim();

  if (!trimmed.includes('@')) {
    return { valid: false, error: 'UPI ID must contain @' };
  }

  const atIndex = trimmed.lastIndexOf('@');
  const localPart = trimmed.slice(0, atIndex);
  const handle = trimmed.slice(atIndex + 1);

  if (!LOCAL_PART_RE.test(localPart)) {
    return { valid: false, error: 'Invalid format before @' };
  }

  if (!HANDLE_RE.test(handle)) {
    return { valid: false, error: 'Invalid bank handle after @' };
  }

  return { valid: true };
}

export function validateUPIAmount(amount: number): { valid: boolean; error?: string } {
  if (amount <= 0) {
    return { valid: false, error: 'Amount must be greater than 0' };
  }

  if (amount > 100_000) {
    return { valid: false, error: 'Amount cannot exceed ₹1,00,000 (1 Lakh)' };
  }

  // Allow at most 2 decimal places
  if (Math.round(amount * 100) !== amount * 100) {
    return { valid: false, error: 'Amount can have at most 2 decimal places' };
  }

  return { valid: true };
}
