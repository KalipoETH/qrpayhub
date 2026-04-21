const BASE_URL = 'https://www.qrpayhub.com';
const locales = ['en', 'de', 'fr', 'es', 'pt', 'hi', 'id', 'th', 'vi', 'tl', 'ar', 'it', 'nl', 'pl'];

export function buildAlternates(locale: string, path: string) {
  const languages: Record<string, string> = {
    'x-default': `${BASE_URL}/en${path}`,
  };
  locales.forEach((l) => {
    languages[l] = `${BASE_URL}/${l}${path}`;
  });
  return {
    canonical: `${BASE_URL}/${locale}${path}`,
    languages,
  };
}
