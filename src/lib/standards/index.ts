export type PaymentStandard = {
  id: string;
  name: string;
  countries: string[];
  flag: string;
  region: 'europe' | 'asia' | 'latam' | 'africa' | 'middleeast' | 'oceania';
  phase: 1 | 2 | 3 | 4;
  color: string;
  available: boolean;
};

export const PAYMENT_STANDARDS: PaymentStandard[] = [
  // ── Phase 1 ────────────────────────────────────────────────────────────────
  {
    id: 'girocode',
    name: 'GiroCode / EPC',
    countries: ['DE', 'AT', 'FR', 'IT', 'ES', 'NL', 'BE', 'PL', 'PT', 'FI', 'IE', 'GR', 'SK', 'SI', 'EE', 'LV', 'LT', 'LU', 'MT', 'CY'],
    flag: 'eu',
    region: 'europe',
    phase: 1,
    color: '#003399',
    available: true,
  },
  {
    id: 'swiss-qr',
    name: 'Swiss QR Code',
    countries: ['CH', 'LI'],
    flag: 'ch',
    region: 'europe',
    phase: 1,
    color: '#FF0000',
    available: true,
  },
  {
    id: 'upi',
    name: 'UPI QR',
    countries: ['IN'],
    flag: 'in',
    region: 'asia',
    phase: 1,
    color: '#FF6B00',
    available: true,
  },
  {
    id: 'pix',
    name: 'PIX QR',
    countries: ['BR'],
    flag: 'br',
    region: 'latam',
    phase: 1,
    color: '#00B894',
    available: true,
  },
  {
    id: 'promptpay',
    name: 'PromptPay QR',
    countries: ['TH'],
    flag: 'th',
    region: 'asia',
    phase: 1,
    color: '#1A56DB',
    available: true,
  },

  // ── Phase 2 ────────────────────────────────────────────────────────────────
  {
    id: 'qris',
    name: 'QRIS',
    countries: ['ID'],
    flag: 'id',
    region: 'asia',
    phase: 2,
    color: '#E53E3E',
    available: false,
  },
  {
    id: 'duitnow',
    name: 'DuitNow QR',
    countries: ['MY'],
    flag: 'my',
    region: 'asia',
    phase: 2,
    color: '#CC0001',
    available: false,
  },
  {
    id: 'paynow',
    name: 'PayNow / SGQR',
    countries: ['SG'],
    flag: 'sg',
    region: 'asia',
    phase: 2,
    color: '#EF4444',
    available: false,
  },
  {
    id: 'fps',
    name: 'FPS QR',
    countries: ['HK'],
    flag: 'hk',
    region: 'asia',
    phase: 2,
    color: '#BA0C2F',
    available: false,
  },
  {
    id: 'vietqr',
    name: 'VietQR',
    countries: ['VN'],
    flag: 'vn',
    region: 'asia',
    phase: 2,
    color: '#DA251D',
    available: false,
  },
  {
    id: 'qrph',
    name: 'QR Ph',
    countries: ['PH'],
    flag: 'ph',
    region: 'asia',
    phase: 2,
    color: '#0038A8',
    available: false,
  },
  {
    id: 'codi',
    name: 'CoDi QR',
    countries: ['MX'],
    flag: 'mx',
    region: 'latam',
    phase: 2,
    color: '#006847',
    available: false,
  },

  // ── Phase 3 ────────────────────────────────────────────────────────────────
  {
    id: 'uk-fps',
    name: 'UK Faster Payments',
    countries: ['GB'],
    flag: 'gb',
    region: 'europe',
    phase: 3,
    color: '#012169',
    available: false,
  },
  {
    id: 'npp',
    name: 'NPP PayID QR',
    countries: ['AU'],
    flag: 'au',
    region: 'oceania',
    phase: 3,
    color: '#00008B',
    available: false,
  },
  {
    id: 'interac',
    name: 'Interac e-Transfer',
    countries: ['CA'],
    flag: 'ca',
    region: 'latam',
    phase: 3,
    color: '#FF0000',
    available: false,
  },
];
