import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'Cashless Travel in Indonesia 2026 – Complete Digital Payment Guide';
const TITLE_DE = 'Bargeldlos reisen in Indonesien 2026 – Der komplette Digitalzahlungs-Guide';
const DESC_EN =
  'Travel Indonesia cashlessly. QRIS, GoPay, OVO and travel cards work in most tourist areas. Complete guide for visitors from any country.';
const DESC_DE =
  'Reise bargeldlos durch Indonesien. QRIS, GoPay, OVO und Reisekarten funktionieren in den meisten Touristengebieten. Der komplette Guide für Besucher aus jedem Land.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['cashless travel indonesia', 'indonesia digital payments', 'gopay tourist', 'jakarta cashless', 'yogyakarta payments'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/indonesia/cashless-travel-indonesia'),
    openGraph: buildOpenGraph(locale, '/guides/indonesia/cashless-travel-indonesia', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const CASHLESS_METERS = [
  { city: 'Jakarta', cityDe: 'Jakarta', pct: 80 },
  { city: 'Bali tourist areas', cityDe: 'Bali Touristengebiete', pct: 75 },
  { city: 'Yogyakarta', cityDe: 'Yogyakarta', pct: 60 },
  { city: 'Lombok', cityDe: 'Lombok', pct: 50 },
  { city: 'Remote areas', cityDe: 'Entfernte Gebiete', pct: 20 },
];

const RANKED_METHODS = [
  {
    medal: '🥇', icon: '📱',
    nameEn: 'Cross-border QR (SG/MY/TH/IN visitors)', nameDe: 'Grenzüberschreitendes QR (SG/MY/TH/IN-Besucher)',
    en: 'Free, instant, 30M+ merchants', de: 'Kostenlos, sofort, über 30 Mio. Händler',
    stars: 5,
  },
  {
    medal: '🥈', icon: '📱',
    nameEn: 'GoPay / OVO with international card', nameDe: 'GoPay / OVO mit internationaler Karte',
    en: 'Best for Western tourists — most accepted e-wallet in Indonesia', de: 'Am besten für westliche Touristen — meistakzeptierte E-Wallet in Indonesien',
    stars: 5,
  },
  {
    medal: '🥉', icon: '💳',
    nameEn: 'Wise / Revolut Card', nameDe: 'Wise- / Revolut-Karte',
    en: 'Good exchange rates — accepted at hotels, restaurants, malls', de: 'Gute Wechselkurse — akzeptiert in Hotels, Restaurants, Malls',
    stars: 4,
  },
  {
    medal: '4.', icon: '🛵',
    nameEn: 'Grab / Gojek', nameDe: 'Grab / Gojek',
    en: 'Transport + food delivery — accepts foreign cards', de: 'Transport + Essenslieferung — akzeptiert ausländische Karten',
    stars: 4,
  },
  {
    medal: '5.', icon: '💵',
    nameEn: 'Cash (Indonesian Rupiah)', nameDe: 'Bargeld (indonesische Rupiah)',
    en: 'Always a backup — exchange at money changers, NOT banks', de: 'Immer als Backup — bei Geldwechslern wechseln, NICHT bei Banken',
    stars: 3,
  },
];

const APPS_CHECKLIST_EN = [
  'GoPay or OVO (QRIS payments)',
  'Grab or Gojek (transport)',
  'Wise (card + exchange)',
  'Google Maps (navigate, find ATMs)',
  'XE Currency (IDR converter)',
];
const APPS_CHECKLIST_DE = [
  'GoPay oder OVO (QRIS-Zahlungen)',
  'Grab oder Gojek (Transport)',
  'Wise (Karte + Wechsel)',
  'Google Maps (Navigation, Geldautomaten finden)',
  'XE Currency (IDR-Umrechner)',
];

const CITY_SECTIONS = [
  {
    nameEn: 'Jakarta', nameDe: 'Jakarta',
    en: [
      'MRT/Commuter Rail: Multi-Trip Card',
      'Gojek: most popular (cheaper than Grab)',
      'Grand Indonesia Mall: all payment methods',
      'Street food (GoFood/GrabFood): very QR-friendly',
    ],
    de: [
      'MRT/Pendlerbahn: Multi-Trip-Karte',
      'Gojek: am beliebtesten (günstiger als Grab)',
      'Grand Indonesia Mall: alle Zahlungsmethoden',
      'Streetfood (GoFood/GrabFood): sehr QR-freundlich',
    ],
  },
  {
    nameEn: 'Bali', nameDe: 'Bali',
    en: ['Kuta/Seminyak: cards + QR everywhere', 'Ubud: mix', 'Tanah Lot temple: cash preferred', 'Bali Safari & Waterbom: cards + QR'],
    de: ['Kuta/Seminyak: Karten + QR überall', 'Ubud: Mix', 'Tanah-Lot-Tempel: Bargeld bevorzugt', 'Bali Safari & Waterbom: Karten + QR'],
  },
  {
    nameEn: 'Yogyakarta', nameDe: 'Yogyakarta',
    en: ['Prambanan/Borobudur: cards at entrance', 'Malioboro Street: mix (QRIS growing)', 'Local warungs: prefer cash'],
    de: ['Prambanan/Borobudur: Karten am Eingang', 'Malioboro Street: Mix (QRIS wächst)', 'Lokale Warungs: bevorzugen Bargeld'],
  },
];

const ATM_TIPS_EN = [
  'Best: BCA and Mandiri ATMs (English, reliable)',
  'Avoid DCC (always choose local currency IDR)',
  'Fees: ~Rp 25,000–50,000 per withdrawal',
  'Best rates: money changers in Kuta, Sanur',
];
const ATM_TIPS_DE = [
  'Beste: BCA- und Mandiri-Geldautomaten (Englisch, zuverlässig)',
  'DCC vermeiden (immer Landeswährung IDR wählen)',
  'Gebühren: ~Rp 25.000–50.000 pro Abhebung',
  'Beste Kurse: Geldwechsler in Kuta, Sanur',
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE_EN,
  description: DESC_EN,
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/indonesia/cashless-travel-indonesia' },
};

function Stars({ count }: { count: number }) {
  return <span className="text-amber-500">{'⭐'.repeat(count)}</span>;
}

export default function CashlessTravelIndonesiaPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-cashless-indonesia" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }} />
      <PageContent locale={locale} />
    </>
  );
}

function PageContent({ locale }: { locale: 'en' | 'de' }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Indonesia', href: '/guides/indonesia' },
          { label: locale === 'de' ? 'Bargeldlos reisen' : 'Cashless Travel' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'Bargeldlos reisen in Indonesien' : 'Cashless Travel in Indonesia'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? 'Dein 2026-Guide für bargeldloses Reisen in Indonesien'
            : 'Your 2026 guide to going cash-free in Indonesia'}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* Reality check */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Realitätscheck: Ist Indonesien bargeldlos?' : 'Reality Check: Is Indonesia Cashless?'}
          </h2>
          <ul className="text-sm text-slate-600 space-y-1.5">
            <li><strong>{locale === 'de' ? 'Großstädte (Jakarta, Surabaya)' : 'Major cities (Jakarta, Surabaya)'}:</strong> {locale === 'de' ? 'Sehr bargeldlos-freundlich' : 'Very cashless-friendly'}</li>
            <li><strong>{locale === 'de' ? 'Touristengebiete auf Bali' : 'Bali tourist areas'}:</strong> {locale === 'de' ? 'Stark bargeldlos' : 'Highly cashless'}</li>
            <li><strong>{locale === 'de' ? 'Kleinere Städte' : 'Smaller cities'}:</strong> {locale === 'de' ? 'Gemischt' : 'Mixed'}</li>
            <li><strong>{locale === 'de' ? 'Ländliche Gebiete und Dörfer' : 'Rural areas and villages'}:</strong> {locale === 'de' ? 'Überwiegend Bargeld' : 'Mostly cash'}</li>
          </ul>
          <div className="space-y-3 pt-2">
            {CASHLESS_METERS.map(({ city, cityDe, pct }) => (
              <div key={city} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{locale === 'de' ? cityDe : city}</span>
                  <span className="text-slate-500">{pct}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ranked methods */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Beste Zahlungsmethoden im Ranking' : 'Best Payment Methods Ranked'}
          </h2>
          <ol className="space-y-3">
            {RANKED_METHODS.map((m) => (
              <li key={m.nameEn} className="flex items-start gap-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                <span className="text-2xl flex-shrink-0">{m.medal}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm">{m.icon} {locale === 'de' ? m.nameDe : m.nameEn}</p>
                  <p className="text-sm text-slate-600 mt-0.5">{locale === 'de' ? m.de : m.en}</p>
                  <Stars count={m.stars} />
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Apps checklist */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Apps-Checkliste' : 'Apps Checklist'}
          </h2>
          <ul className="space-y-2">
            {(locale === 'de' ? APPS_CHECKLIST_DE : APPS_CHECKLIST_EN).map((item) => (
              <li key={item} className="flex gap-3 text-sm text-slate-700">
                <span>☐</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* City guide */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Stadt-für-Stadt-Guide' : 'City-by-City Guide'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CITY_SECTIONS.map((c) => (
              <div key={c.nameEn} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-2">{locale === 'de' ? c.nameDe : c.nameEn}</h3>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  {(locale === 'de' ? c.de : c.en).map((line) => <li key={line}>• {line}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-sm">
            <Link href="/guides/indonesia/cashless-travel-bali" className="text-blue-700 font-medium hover:underline">
              {locale === 'de' ? 'Vollständigen Bali-Guide lesen →' : 'Read the full Bali guide →'}
            </Link>
          </p>
        </section>

        {/* ATM tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Geldautomaten-Tipps' : 'ATM Tips'}
          </h2>
          <ul className="space-y-2">
            {(locale === 'de' ? ATM_TIPS_DE : ATM_TIPS_EN).map((tip) => (
              <li key={tip} className="flex gap-3 text-sm text-slate-700">
                <span className="text-blue-600">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-blue-900 text-lg">
            {locale === 'de' ? 'Bist du Händler in Indonesien?' : 'Are you a merchant in Indonesia?'}
          </p>
          <Link
            href="/qris/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#1A56DB' }}
          >
            {locale === 'de' ? 'QRIS-Code erstellen →' : 'Generate QRIS Code →'}
          </Link>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">{locale === 'de' ? 'Mehr zu Indonesien' : 'Related in Indonesia'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RelatedToolCard
              icon="🏖️"
              name={locale === 'de' ? 'Bargeldlos auf Bali' : 'Cashless Bali Guide'}
              url="/guides/indonesia/cashless-travel-bali"
              description={locale === 'de' ? 'Beach Clubs, Warungs und Villen' : 'Beach clubs, warungs and villas'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="📷"
              name={locale === 'de' ? 'QRIS scannen' : 'How to Scan QRIS'}
              url="/guides/indonesia/scan-qris-qr-code"
              description={locale === 'de' ? 'QR-Codes mit deiner Banking-App scannen' : 'Scan QR codes with your banking app'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
