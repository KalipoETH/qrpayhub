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

export function buildOpenGraph(
  locale: string,
  path: string,
  title: string,
  description: string
) {
  return {
    title,
    description,
    url: `${BASE_URL}/${locale}${path}`,
    siteName: 'QRPayHub',
    type: 'website' as const,
    locale: locale === 'de' ? 'de_DE' : 'en_US',
    images: [
      {
        url: `${BASE_URL}/og/image`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  };
}

export function buildTwitterCard(title: string, description: string) {
  return {
    card: 'summary_large_image' as const,
    title,
    description,
    images: [`${BASE_URL}/og/image`],
  };
}
