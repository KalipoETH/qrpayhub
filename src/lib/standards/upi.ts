import { validateUPIId, validateUPIAmount } from '@/lib/validators/upi';

export type UPIData = {
  payeeVPA: string;         // UPI ID e.g. "merchant@okhdfc"
  payeeName: string;        // Payee display name
  amount?: number;          // in INR, optional
  transactionNote?: string; // max 50 chars
  merchantCode?: string;    // optional MCC
  transactionRef?: string;  // optional reference
};

/**
 * Generates a UPI deep link payload (standard across all UPI apps).
 * Spec: NPCI UPI Linking Specification v1.6
 */
export function generateUPIPayload(data: UPIData): string {
  const params = new URLSearchParams();
  params.set('pa', data.payeeVPA.trim());
  params.set('pn', encodeURIComponent(data.payeeName.trim()));
  params.set('cu', 'INR');

  if (data.amount !== undefined && data.amount > 0) {
    params.set('am', data.amount.toFixed(2));
  }

  if (data.transactionNote?.trim()) {
    params.set('tn', encodeURIComponent(data.transactionNote.trim().slice(0, 50)));
  }

  if (data.merchantCode?.trim()) {
    params.set('mc', data.merchantCode.trim());
  }

  if (data.transactionRef?.trim()) {
    params.set('tr', data.transactionRef.trim());
  }

  // URLSearchParams double-encodes some chars — build manually for spec compliance
  const parts: string[] = [
    `pa=${encodeURIComponent(data.payeeVPA.trim())}`,
    `pn=${encodeURIComponent(data.payeeName.trim())}`,
    `cu=INR`,
  ];

  if (data.amount !== undefined && data.amount > 0) {
    parts.push(`am=${data.amount.toFixed(2)}`);
  }

  if (data.transactionNote?.trim()) {
    parts.push(`tn=${encodeURIComponent(data.transactionNote.trim().slice(0, 50))}`);
  }

  if (data.merchantCode?.trim()) {
    parts.push(`mc=${encodeURIComponent(data.merchantCode.trim())}`);
  }

  if (data.transactionRef?.trim()) {
    parts.push(`tr=${encodeURIComponent(data.transactionRef.trim())}`);
  }

  return `upi://pay?${parts.join('&')}`;
}

/**
 * Returns app-specific deep links for direct launch from mobile browsers.
 * Falls back to the standard upi:// scheme when app is not installed.
 */
export function getUPIAppLinks(data: UPIData): {
  phonepe: string;
  gpay: string;
  paytm: string;
} {
  const query = generateUPIPayload(data).replace('upi://pay?', '');
  return {
    phonepe: `phonepe://pay?${query}`,
    gpay: `tez://upi/pay?${query}`,
    paytm: `paytmmp://pay?${query}`,
  };
}

export function validateUPIData(data: UPIData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.payeeVPA.trim()) {
    errors.payeeVPA = 'UPI ID is required';
  } else {
    const result = validateUPIId(data.payeeVPA);
    if (!result.valid) {
      errors.payeeVPA = result.error ?? 'Invalid UPI ID';
    }
  }

  if (!data.payeeName.trim()) {
    errors.payeeName = 'Recipient name is required';
  } else if (data.payeeName.length > 50) {
    errors.payeeName = 'Name must not exceed 50 characters';
  }

  if (data.amount !== undefined && data.amount !== null && String(data.amount) !== '') {
    const result = validateUPIAmount(data.amount);
    if (!result.valid) {
      errors.amount = result.error ?? 'Invalid amount';
    }
  }

  if (data.transactionNote && data.transactionNote.length > 50) {
    errors.transactionNote = 'Note must not exceed 50 characters';
  }

  return errors;
}
