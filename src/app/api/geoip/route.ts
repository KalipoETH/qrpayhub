import { NextRequest, NextResponse } from 'next/server';
import { getCountryFromIP, getRegionForCountry } from '@/lib/geoip';

const LOCALHOST_IPS = new Set(['127.0.0.1', '::1', '::ffff:127.0.0.1']);

export async function GET(request: NextRequest) {
  // Extract client IP from headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  const rawIp =
    forwardedFor?.split(',')[0]?.trim() ??
    realIp ??
    null;

  // Dev fallback: localhost → Germany
  if (!rawIp || LOCALHOST_IPS.has(rawIp)) {
    return NextResponse.json({ country: 'DE', region: 'europe' });
  }

  const country = await getCountryFromIP(rawIp);
  const region = country ? getRegionForCountry(country) : null;

  return NextResponse.json({ country, region });
}
