'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import CountryGrid from '@/components/CountryGrid';
import { PAYMENT_STANDARDS } from '@/lib/standards';

const GEO_CACHE_KEY = 'qrpayhub_geo';
const GEO_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 Stunden in ms

type GeoCache = {
  country: string | null;
  region: string | null;
  timestamp: number;
};

export default function HomeContent() {
  const t = useTranslations('home');
  const [detectedRegion, setDetectedRegion] = useState<string | null>(null);
  const [isGeoLoading, setIsGeoLoading] = useState(true);

  useEffect(() => {
    async function detectGeo() {
      try {
        // 1. Prüfe localStorage Cache
        const cached = localStorage.getItem(GEO_CACHE_KEY);
        if (cached) {
          const parsed: GeoCache = JSON.parse(cached);
          const isExpired = Date.now() - parsed.timestamp > GEO_CACHE_TTL;

          if (!isExpired) {
            setDetectedRegion(parsed.region);
            setIsGeoLoading(false);
            return;
          }
        }

        // 2. Cache miss oder abgelaufen – API aufrufen
        const res = await fetch('/api/geoip');
        if (!res.ok) throw new Error('Geo API failed');

        const data: { country: string | null; region: string | null } = await res.json();

        // 3. Ergebnis cachen
        const cacheData: GeoCache = {
          country: data.country,
          region: data.region,
          timestamp: Date.now(),
        };
        localStorage.setItem(GEO_CACHE_KEY, JSON.stringify(cacheData));

        setDetectedRegion(data.region);
      } catch (error) {
        console.warn('Geo detection failed:', error);
        setDetectedRegion(null);
      } finally {
        setIsGeoLoading(false);
      }
    }

    detectGeo();
  }, []);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full border border-blue-200">
            🌍 Global QR Payment Platform
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
            {t('title')}
          </h1>

          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2">
            {[
              { value: '15+', label: 'Payment Standards' },
              { value: '50+', label: 'Countries' },
              { value: '14', label: 'Languages' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 text-sm text-slate-500"
              >
                <span className="font-bold text-slate-800 text-base">{value}</span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Country / Standard Grid ───────────────────────────────────────── */}
      <CountryGrid
        standards={PAYMENT_STANDARDS}
        detectedRegion={detectedRegion ?? undefined}
        isGeoLoading={isGeoLoading}
      />

    </>
  );
}
