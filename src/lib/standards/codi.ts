import { validateCoDiPhone, validateCLABE } from '@/lib/validators/codi';

export type CoDiData = {
  concept: string;       // Concepto del cobro, max 35 chars
  amount: number;        // Amount in MXN, REQUIRED for CoDi
  reference: string;     // Referencia numérica, max 7 digits
  clabe?: string;        // CLABE of recipient (optional)
  phone?: string;        // Phone number (alternative to CLABE)
  merchantName: string;  // Nombre del beneficiario
};

// ── Payload generator ─────────────────────────────────────────────────────────

/**
 * Generates a CoDi QR payload based on the Banxico SPEI format.
 *
 * Format: BXC://SPEI?data={url-encoded string}
 * Encoded string: "SPEI|{clabe_or_phone}|{amount}|{concept}|{reference}|{merchantName}"
 */
export function generateCoDiPayload(data: CoDiData): string {
  const recipient = data.clabe?.trim() || data.phone?.trim() || '';
  const amount = data.amount.toFixed(2);
  const concept = data.concept.trim().slice(0, 35);
  const reference = data.reference.trim().slice(0, 7);
  const merchantName = data.merchantName.trim();

  const base = `SPEI|${recipient}|${amount}|${concept}|${reference}|${merchantName}`;
  const encoded = encodeURIComponent(base);
  return `BXC://SPEI?data=${encoded}`;
}

// ── Validator ─────────────────────────────────────────────────────────────────

export function validateCoDiData(data: CoDiData): Record<string, string> {
  const errors: Record<string, string> = {};

  // At least one of CLABE or phone required
  const hasClabe = !!data.clabe?.trim();
  const hasPhone = !!data.phone?.trim();

  if (!hasClabe && !hasPhone) {
    errors.recipient = 'CLABE or phone number is required';
  } else if (hasClabe) {
    const clabeResult = validateCLABE(data.clabe!);
    if (!clabeResult.valid) {
      errors.clabe = clabeResult.error ?? 'Invalid CLABE';
    }
  } else if (hasPhone) {
    const phoneResult = validateCoDiPhone(data.phone!);
    if (!phoneResult.valid) {
      errors.phone = phoneResult.error ?? 'Invalid Mexican phone number';
    }
  }

  if (!data.merchantName.trim()) {
    errors.merchantName = 'Beneficiary name is required';
  } else if (data.merchantName.trim().length > 50) {
    errors.merchantName = 'Beneficiary name must be 50 characters or fewer';
  }

  if (!data.concept.trim()) {
    errors.concept = 'Concept is required';
  } else if (data.concept.trim().length > 35) {
    errors.concept = 'Concept must be 35 characters or fewer';
  }

  if (data.amount === undefined || data.amount === null || String(data.amount) === '') {
    errors.amount = 'Amount is required for CoDi payments';
  } else if (data.amount <= 0) {
    errors.amount = 'Amount must be greater than 0';
  } else if (data.amount > 9_999_999.99) {
    errors.amount = 'Amount exceeds maximum ($9,999,999.99)';
  }

  if (!data.reference.trim()) {
    errors.reference = 'Numeric reference is required';
  } else if (!/^\d{1,7}$/.test(data.reference.trim())) {
    errors.reference = 'Reference must be 1–7 digits';
  }

  return errors;
}
