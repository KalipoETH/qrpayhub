const BASE_URL = 'https://www.qrpayhub.com';

export function buildAlternates(locale: string, path: string) {
  return {
    canonical: `${BASE_URL}/${locale}${path}`,
    languages: {
      'x-default': `${BASE_URL}/en${path}`,
      'en': `${BASE_URL}/en${path}`,
      'de': `${BASE_URL}/de${path}`,
    },
  };
}
