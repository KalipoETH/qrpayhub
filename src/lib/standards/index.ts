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
    flag: '🇪🇺',
    region: 'europe',
    phase: 1,
    color: '#003399',
    available: true,
  },
  {
    id: 'swiss-qr',
    name: 'Swiss QR Code',
    countries: ['CH', 'LI'],
    flag: '🇨🇭',
    region: 'europe',
    phase: 1,
    color: '#FF0000',
    available: true,
  },
  {
    id: 'upi',
    name: 'UPI QR',
    countries: ['IN'],
    flag: '🇮🇳',
    region: 'asia',
    phase: 1,
    color: '#FF6B00',
    available: true,
  },
  {
    id: 'pix',
    name: 'PIX QR',
    countries: ['BR'],
    flag: '🇧🇷',
    region: 'latam',
    phase: 1,
    color: '#00B894',
    available: true,
  },
  {
    id: 'promptpay',
    name: 'PromptPay QR',
    countries: ['TH'],
    flag: '🇹🇭',
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
    flag: '🇮🇩',
    region: 'asia',
    phase: 2,
    color: '#E53E3E',
    available: false,
  },
  {
    id: 'duitnow',
    name: 'DuitNow QR',
    countries: ['MY'],
    flag: '🇲🇾',
    region: 'asia',
    phase: 2,
    color: '#CC0001',
    available: false,
  },
  {
    id: 'paynow',
    name: 'PayNow / SGQR',
    countries: ['SG'],
    flag: '🇸🇬',
    region: 'asia',
    phase: 2,
    color: '#EF4444',
    available: false,
  },
  {
    id: 'fps',
    name: 'FPS QR',
    countries: ['HK'],
    flag: '🇭🇰',
    region: 'asia',
    phase: 2,
    color: '#BA0C2F',
    available: false,
  },
  {
    id: 'vietqr',
    name: 'VietQR',
    countries: ['VN'],
    flag: '🇻🇳',
    region: 'asia',
    phase: 2,
    color: '#DA251D',
    available: false,
  },
  {
    id: 'qrph',
    name: 'QR Ph',
    countries: ['PH'],
    flag: '🇵🇭',
    region: 'asia',
    phase: 2,
    color: '#0038A8',
    available: false,
  },
  {
    id: 'codi',
    name: 'CoDi QR',
    countries: ['MX'],
    flag: '🇲🇽',
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
    flag: '🇬🇧',
    region: 'europe',
    phase: 3,
    color: '#012169',
    available: false,
  },
  {
    id: 'npp',
    name: 'NPP PayID QR',
    countries: ['AU'],
    flag: '🇦🇺',
    region: 'oceania',
    phase: 3,
    color: '#00008B',
    available: false,
  },
  {
    id: 'interac',
    name: 'Interac e-Transfer',
    countries: ['CA'],
    flag: '🇨🇦',
    region: 'latam',
    phase: 3,
    color: '#FF0000',
    available: false,
  },
];
