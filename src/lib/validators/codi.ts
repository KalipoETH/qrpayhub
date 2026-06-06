export type CoDiKeyType = 'phone' | 'clabe';

// CLABE bank code → bank name mapping
const CLABE_BANKS: Record<string, string> = {
  '002': 'BBVA México',
  '006': 'Bancomext',
  '009': 'Banobras',
  '012': 'BBVA Bancomer',
  '014': 'Santander',
  '021': 'HSBC',
  '030': 'Bajío',
  '032': 'IXE',
  '036': 'Inbursa',
  '037': 'Multiva',
  '042': 'Mifel',
  '044': 'Scotiabank',
  '058': 'Banregio',
  '059': 'Invex',
  '060': 'Bansi',
  '062': 'Afirme',
  '072': 'Banorte',
  '102': 'ABN AMRO',
  '106': 'BAMSA',
  '108': 'Tokyo',
  '110': 'JP Morgan',
  '112': 'Bansí',
  '113': 'Multiva',
  '116': 'ING',
  '124': 'Deutsche',
  '126': 'Credit Suisse',
  '127': 'Azteca',
  '128': 'Autofin',
  '129': 'Barclays',
  '130': 'Compartamos',
  '132': 'Akala',
  '133': 'Walmart',
  '136': 'HDFC (India)',
  '137': 'Intercam',
  '138': 'Real (ABN)',
  '140': 'Consubanco',
  '141': 'Volkswagen',
  '143': 'CIBanco',
  '145': 'Bbase',
  '147': 'Bankaool',
  '148': 'PagaTodo',
  '149': 'Inmobiliario Mx',
  '155': 'ICBC',
  '156': 'Sabadell',
  '168': 'HIPOTECARIA FED',
  '600': 'Monexcb',
  '601': 'GBM',
  '602': 'Bamsa',
  '605': 'Valué',
  '606': 'Fondivisa',
  '607': 'Base',
  '608': 'Finpatria',
  '611': 'HDI Seguros',
  '613': 'Multiva Cbolsa',
  '616': 'Finamex',
  '617': 'Valore',
  '618': 'Unicajacb',
  '619': 'MAPFRE',
  '620': 'Profuturo',
  '621': 'CB JP Morgan',
  '622': 'Oactin',
  '623': 'HAVRE',
  '626': 'CBDEUTSCHE',
  '627': 'Zurichvi',
  '628': 'Zusap',
  '629': 'SU CASITA',
  '630': 'CB Intercam',
  '631': 'CI Bolsa',
  '632': 'Bulltick CB',
  '633': 'Sterling',
  '636': 'HDI Seguros',
  '637': 'Order',
  '638': 'Akala',
  '640': 'CB JP Morgan2',
  '642': 'Reforma',
  '646': 'STP',
  '648': 'Evercore',
  '649': 'SKANDIA',
  '651': 'Segmenta',
  '652': 'Asea',
  '653': 'Kuspit',
  '655': 'Sofiexpress',
  '656': 'Unagra',
  '659': 'ASP Integra OPC',
  '670': 'Libertad',
  '674': 'Arcusfc',
  '677': 'Caja Pop Mexicana',
  '679': 'FdeEap',
  '684': 'Transfer',
  '685': 'Fdeam',
  '686': 'INVERCAP',
  '689': 'FDEAM (2)',
  '699': 'CoDi Valida',
  '706': 'Arcus',
  '710': 'Telecomunicaciones',
  '722': 'Mercado Pago',
  '723': 'Cuenca',
  '728': 'SPIN by OXXO',
  '730': 'Nvio',
  '732': 'Telecomunicaciones',
  '733': 'Actinver',
  '734': 'ARCUSFC2',
  '736': 'Hayalsa',
  '737': 'Caja Pop Mexicana2',
  '738': 'TRANSFER2',
  '741': 'Baz',
  '742': 'STP2',
  '743': 'Mercado Pago2',
  '744': 'Spin by OXXO2',
  '746': 'STP3',
  '748': 'Bienestar',
};

export function getBankName(clabe: string): string | undefined {
  return CLABE_BANKS[clabe.slice(0, 3)];
}

export function validateCoDiPhone(phone: string): { valid: boolean; error?: string } {
  const trimmed = phone.trim();
  if (!trimmed) return { valid: false, error: 'Phone number is required' };

  let digits: string;
  if (trimmed.startsWith('+52')) {
    digits = trimmed.slice(3);
  } else {
    digits = trimmed;
  }

  if (!/^\d{10}$/.test(digits)) {
    return { valid: false, error: 'Mexican phone must be 10 digits' };
  }

  return { valid: true };
}

/**
 * Validates an 18-digit CLABE using the Banxico checksum algorithm.
 *
 * Weights: [3, 7, 1] repeated × 6 (positions 0–16)
 * Each term = (digit × weight) mod 10
 * Sum of all 17 terms mod 10
 * Check digit = (10 − sum) mod 10
 */
export function validateCLABE(clabe: string): {
  valid: boolean;
  bankName?: string;
  error?: string;
} {
  const trimmed = clabe.trim();
  if (!trimmed) return { valid: false, error: 'CLABE is required' };
  if (!/^\d{18}$/.test(trimmed)) {
    return { valid: false, error: 'CLABE must be exactly 18 digits' };
  }

  const weights = [3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7];
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += (parseInt(trimmed[i], 10) * weights[i]) % 10;
  }
  const expectedCheckDigit = (10 - (sum % 10)) % 10;
  const actualCheckDigit = parseInt(trimmed[17], 10);

  if (expectedCheckDigit !== actualCheckDigit) {
    return { valid: false, error: 'Invalid CLABE – checksum mismatch' };
  }

  const bankName = getBankName(trimmed);
  return { valid: true, bankName };
}
