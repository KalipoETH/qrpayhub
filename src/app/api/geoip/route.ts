import { NextRequest } from 'next/server';

const countryToRegion: Record<string, string> = {
  // Europa
  DE: 'europe', AT: 'europe', FR: 'europe', IT: 'europe',
  ES: 'europe', NL: 'europe', BE: 'europe', PL: 'europe',
  PT: 'europe', FI: 'europe', IE: 'europe', GR: 'europe',
  SK: 'europe', SI: 'europe', EE: 'europe', LV: 'europe',
  LT: 'europe', LU: 'europe', MT: 'europe', CY: 'europe',
  CH: 'europe', LI: 'europe', GB: 'europe', HR: 'europe',
  HU: 'europe', RO: 'europe', BG: 'europe', CZ: 'europe',
  DK: 'europe', SE: 'europe', NO: 'europe', IS: 'europe',
  // Asien
  IN: 'asia', TH: 'asia', ID: 'asia', MY: 'asia',
  SG: 'asia', HK: 'asia', VN: 'asia', PH: 'asia',
  KH: 'asia', JP: 'asia', KR: 'asia', CN: 'asia', TW: 'asia',
  // Lateinamerika
  BR: 'latam', MX: 'latam', CO: 'latam', PE: 'latam',
  AR: 'latam', CL: 'latam', EC: 'latam', UY: 'latam',
  // Afrika
  KE: 'africa', TZ: 'africa', UG: 'africa', GH: 'africa',
  ZA: 'africa', NG: 'africa',
  // Naher Osten
  SA: 'middleeast', EG: 'middleeast', AE: 'middleeast',
  BH: 'middleeast', QA: 'middleeast', OM: 'middleeast',
  // Ozeanien
  AU: 'oceania', NZ: 'oceania',
};

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const isLocalhost =
    !forwardedFor ||
    forwardedFor === '::1' ||
    forwardedFor === '127.0.0.1';

  if (isLocalhost) {
    return Response.json({ country: 'DE', region: 'europe', source: 'dev-fallback' });
  }

  const country = request.geo?.country ?? null;
  const region = country ? (countryToRegion[country] ?? null) : null;

  return Response.json({ country, region, source: 'vercel-edge' });
}
