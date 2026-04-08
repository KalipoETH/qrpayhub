const COUNTRY_REGION_MAP: Record<string, string> = {
  // Europe (SEPA + CH + LI + GB)
  DE: 'europe', AT: 'europe', FR: 'europe', IT: 'europe', ES: 'europe',
  NL: 'europe', BE: 'europe', PL: 'europe', PT: 'europe', FI: 'europe',
  IE: 'europe', GR: 'europe', SK: 'europe', SI: 'europe', EE: 'europe',
  LV: 'europe', LT: 'europe', LU: 'europe', MT: 'europe', CY: 'europe',
  CH: 'europe', LI: 'europe', GB: 'europe',

  // Asia
  IN: 'asia', TH: 'asia', ID: 'asia', MY: 'asia', SG: 'asia',
  HK: 'asia', VN: 'asia', PH: 'asia', KH: 'asia', JP: 'asia',
  KR: 'asia', CN: 'asia', TW: 'asia',

  // Latin America
  BR: 'latam', MX: 'latam', CO: 'latam', PE: 'latam', AR: 'latam',
  CL: 'latam', EC: 'latam', UY: 'latam', PY: 'latam', BO: 'latam',
  VE: 'latam', CR: 'latam', CA: 'latam',

  // Africa
  KE: 'africa', TZ: 'africa', UG: 'africa', GH: 'africa', MZ: 'africa',
  ZA: 'africa', NG: 'africa', SN: 'africa', CI: 'africa', CM: 'africa',

  // Middle East
  SA: 'middleeast', EG: 'middleeast', AE: 'middleeast', BH: 'middleeast',
  QA: 'middleeast', OM: 'middleeast', KW: 'middleeast', JO: 'middleeast',

  // Oceania
  AU: 'oceania', NZ: 'oceania',
};

export async function getCountryFromIP(ip: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    clearTimeout(timeoutId);

    if (!res.ok) return null;

    const data = (await res.json()) as { country_code?: string };
    return data.country_code ?? null;
  } catch {
    return null;
  }
}

export function getRegionForCountry(countryCode: string): string | null {
  return COUNTRY_REGION_MAP[countryCode.toUpperCase()] ?? null;
}
