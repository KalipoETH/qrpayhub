export type QRPhProxyType = 'mobile' | 'account' | 'email';

// Valid Philippine 3-digit network prefixes (digits 3–5 of an 09XX number)
const VALID_PH_PREFIXES = new Set([
  // 0905–0907
  '905', '906', '907',
  // 0908–0919
  '908', '909', '910', '911', '912', '913', '914', '915', '916', '917', '918', '919',
  // 0920–0930
  '920', '921', '922', '923', '924', '925', '926', '927', '928', '929', '930',
  // 0935–0939
  '935', '936', '937', '938', '939',
  // 0942–0947
  '942', '943', '944', '945', '946', '947',
  // 0950–0956
  '950', '951', '952', '953', '954', '955', '956',
  // 0961–0969
  '961', '962', '963', '964', '965', '966', '967', '968', '969',
  // 0970–0977
  '970', '971', '972', '973', '974', '975', '976', '977',
  // 0978–0979
  '978', '979',
  // 0991–0998
  '991', '992', '993', '994', '995', '996', '997', '998',
]);

function isValidPhMobile(trimmed: string): boolean {
  let digits: string;
  if (/^\+63\d{10}$/.test(trimmed)) {
    // +639XXXXXXXXX — 10 digits after +63, must start with 9
    digits = trimmed.slice(3); // e.g. "9171234567"
    if (!digits.startsWith('9')) return false;
    const prefix = digits.slice(1, 4); // e.g. "917"
    return VALID_PH_PREFIXES.has('0' + prefix.slice(0, 2) + prefix[2]) ||
      VALID_PH_PREFIXES.has(prefix);
  } else if (/^09\d{9}$/.test(trimmed)) {
    // 09XXXXXXXXX — 11 digits total
    const prefix = trimmed.slice(1, 4); // e.g. "917"
    return VALID_PH_PREFIXES.has(prefix);
  }
  return false;
}

export function validateQRPhKey(key: string): {
  valid: boolean;
  type: QRPhProxyType | null;
  error?: string;
} {
  const trimmed = key.trim();
  if (!trimmed) return { valid: false, type: null, error: 'QR Ph key is required' };

  // Email check first (unambiguous)
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { valid: true, type: 'email' };
  }

  // Mobile: +63XXXXXXXXXX or 09XXXXXXXXX
  if (trimmed.startsWith('+63') || trimmed.startsWith('09')) {
    if (isValidPhMobile(trimmed)) {
      return { valid: true, type: 'mobile' };
    }
    return { valid: false, type: 'mobile', error: 'Invalid Philippine mobile number' };
  }

  // Account number: 10–16 digits
  if (/^\d{10,16}$/.test(trimmed)) {
    return { valid: true, type: 'account' };
  }

  return { valid: false, type: null, error: 'Enter a Philippine mobile, account number or email' };
}

export function normalizeQRPhMobile(mobile: string): string {
  const trimmed = mobile.trim();
  if (trimmed.startsWith('+63')) return trimmed;
  // 09XXXXXXXXX → +639XXXXXXXXX
  return '+63' + trimmed.slice(1);
}
