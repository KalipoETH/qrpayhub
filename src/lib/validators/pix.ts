export type PIXKeyType = 'cpf' | 'cnpj' | 'phone' | 'email' | 'random';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Brazilian phone: +55 + DDD (2 digits) + number (8-9 digits)
const PHONE_LOOSE_RE = /^[+0][0-9+\s-]{9,14}$/;

export function detectPIXKeyType(key: string): PIXKeyType | null {
  const trimmed = key.trim();
  if (!trimmed) return null;

  // UUID / Random key (highest specificity — check first)
  if (UUID_RE.test(trimmed)) return 'random';

  // E-mail
  if (trimmed.includes('@') && EMAIL_RE.test(trimmed)) return 'email';

  // Phone (starts with + or 0)
  if (/^[+0]/.test(trimmed) && PHONE_LOOSE_RE.test(trimmed)) return 'phone';

  // CPF / CNPJ — extract only digits
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length === 11) return 'cpf';
  if (digits.length === 14) return 'cnpj';

  return null;
}

export function validatePIXKey(key: string): {
  valid: boolean;
  type: PIXKeyType | null;
  error?: string;
} {
  const trimmed = key.trim();
  if (!trimmed) return { valid: false, type: null, error: 'PIX key is required' };

  const type = detectPIXKeyType(trimmed);

  if (type === null) {
    return {
      valid: false,
      type: null,
      error: 'Unrecognized PIX key format (CPF, CNPJ, +55 phone, email or UUID)',
    };
  }

  switch (type) {
    case 'cpf': {
      const digits = trimmed.replace(/\D/g, '');
      if (digits.length !== 11) {
        return { valid: false, type, error: 'CPF must have exactly 11 digits' };
      }
      return { valid: true, type };
    }

    case 'cnpj': {
      const digits = trimmed.replace(/\D/g, '');
      if (digits.length !== 14) {
        return { valid: false, type, error: 'CNPJ must have exactly 14 digits' };
      }
      return { valid: true, type };
    }

    case 'phone': {
      const normalized = trimmed.replace(/[\s-]/g, '');
      if (!normalized.startsWith('+55')) {
        return {
          valid: false,
          type,
          error: 'Brazilian phone number must start with +55',
        };
      }
      const digits = normalized.replace(/\D/g, '');
      if (digits.length < 12 || digits.length > 13) {
        return { valid: false, type, error: 'Invalid Brazilian phone number length' };
      }
      return { valid: true, type };
    }

    case 'email': {
      if (!EMAIL_RE.test(trimmed)) {
        return { valid: false, type, error: 'Invalid email address' };
      }
      return { valid: true, type };
    }

    case 'random': {
      if (!UUID_RE.test(trimmed)) {
        return { valid: false, type, error: 'Random key must be a valid UUID' };
      }
      return { valid: true, type };
    }
  }
}
