'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { PaymentStandard } from '@/lib/standards';

type Region = PaymentStandard['region'] | 'all';

const REGION_KEYS: { value: Region; labelKey: string }[] = [
  { value: 'all',        labelKey: 'filterAll' },
  { value: 'europe',     labelKey: 'filterEurope' },
  { value: 'asia',       labelKey: 'filterAsia' },
  { value: 'latam',      labelKey: 'filterLatam' },
  { value: 'africa',     labelKey: 'filterAfrica' },
  { value: 'middleeast', labelKey: 'filterMiddleEast' },
  { value: 'oceania',    labelKey: 'filterOceania' },
];

type Props = {
  standards: PaymentStandard[];
  detectedRegion?: string;
  isGeoLoading?: boolean;
};

export default function CountryGrid({
  standards,
  detectedRegion,
  isGeoLoading = false,
}: Props) {
  const t = useTranslations('standards');
  const [search, setSearch] = useState('');
  const [activeRegion, setActiveRegion] = useState<Region>('all');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return standards.filter((s) => {
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.countries.some((c) => c.toLowerCase().includes(q));
      const matchesRegion = activeRegion === 'all' || s.region === activeRegion;
      return matchesSearch && matchesRegion;
    });
  }, [standards, search, activeRegion]);

  const recommended = useMemo(
    () => (detectedRegion ? filtered.filter((s) => s.region === detectedRegion) : []),
    [filtered, detectedRegion],
  );

  const mainList = useMemo(
    () =>
      detectedRegion
        ? filtered.filter((s) => s.region !== detectedRegion)
        : filtered,
    [filtered, detectedRegion],
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* ── Search ─────────────────────────────────────────────────────── */}
      <div className="relative max-w-xl mx-auto">
        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
          <svg
            className="w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full pl-11 pr-4 py-3 text-base border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        />
      </div>

      {/* ── Region Filter Tabs ──────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 justify-center">
        {REGION_KEYS.map(({ value, labelKey }) => {
          const isActive = activeRegion === value;
          const isDetected =
            !isActive && value !== 'all' && value === detectedRegion;

          return (
            <button
              key={value}
              onClick={() => setActiveRegion(value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : isDetected
                    ? 'bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-200'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {t(labelKey as Parameters<typeof t>[0])}
              {isDetected && (
                <span className="ml-1 text-blue-400 text-xs">📍</span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Recommended Section ─────────────────────────────────────────── */}
      {isGeoLoading ? (
        <RecommendedSkeleton />
      ) : recommended.length > 0 ? (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            📍 {t('recommendedForYou')}
          </h2>
          <StandardGrid standards={recommended} />
          <div className="border-t border-slate-100 pt-2" />
        </div>
      ) : null}

      {/* ── Main Grid ──────────────────────────────────────────────────── */}
      {mainList.length > 0 ? (
        <StandardGrid standards={mainList} />
      ) : !isGeoLoading ? (
        <div className="text-center py-16 text-slate-400">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-lg font-medium">No results found</p>
        </div>
      ) : null}
    </div>
  );
}

// ── Skeleton ─────────────────────────────────────────────────────────────────

function RecommendedSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 w-48 bg-slate-200 rounded-full" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-slate-100 rounded-2xl h-44 flex flex-col overflow-hidden"
          >
            <div className="h-1 w-full bg-slate-200 flex-shrink-0" />
            <div className="flex flex-col items-center gap-3 p-5 flex-1">
              <div className="w-12 h-12 rounded-full bg-slate-200" />
              <div className="h-3 w-24 bg-slate-200 rounded-full" />
              <div className="h-2 w-16 bg-slate-200 rounded-full" />
            </div>
            <div className="px-5 pb-4 flex justify-center">
              <div className="h-5 w-20 bg-slate-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-100 pt-2" />
    </div>
  );
}

// ── Grid + Card ───────────────────────────────────────────────────────────────

function StandardGrid({ standards }: { standards: PaymentStandard[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {standards.map((s) => (
        <StandardCard key={s.id} standard={s} />
      ))}
    </div>
  );
}

function StandardCard({ standard: s }: { standard: PaymentStandard }) {
  const t = useTranslations('standards');

  const visibleCountries = s.countries.slice(0, 3);
  const hiddenCount = s.countries.length - visibleCountries.length;

  const cardContent = (
    <div
      className={`relative bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full transition-all duration-200 ${
        s.available
          ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
          : 'opacity-75 cursor-default'
      }`}
    >
      {/* Accent top border */}
      <div
        className="h-1 w-full flex-shrink-0"
        style={{ backgroundColor: s.color }}
      />

      <div className="flex flex-col items-center gap-2 p-5 flex-1">
        {/* Flag */}
        <span
          className="text-5xl leading-none select-none"
          role="img"
          aria-label={s.name}
        >
          {s.flag}
        </span>

        {/* Name */}
        <p className="text-sm font-bold text-slate-900 text-center leading-snug">
          {s.name}
        </p>

        {/* Country list */}
        <p className="text-xs text-slate-400 text-center">
          {visibleCountries.join(', ')}
          {hiddenCount > 0 && (
            <span className="text-slate-300"> +{hiddenCount} more</span>
          )}
        </p>
      </div>

      {/* Badge */}
      <div className="px-5 pb-4 flex justify-center">
        {s.available ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {t('available')}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-50 text-slate-400 border border-slate-200">
            {t('comingSoon')}
          </span>
        )}
      </div>
    </div>
  );

  if (s.available) {
    // Each available standard links to its generator sub-page
    const href = `/${s.id}/generator` as `/${string}`;
    return (
      <Link href={href} className="block h-full">
        {cardContent}
      </Link>
    );
  }

  return <div className="h-full">{cardContent}</div>;
}
