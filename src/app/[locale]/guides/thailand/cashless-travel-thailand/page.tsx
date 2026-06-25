import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'Cashless Travel in Thailand 2026 – Complete Digital Payment Guide';
const TITLE_DE = 'Bargeldlos reisen in Thailand 2026 – Der komplette Digitalzahlungs-Guide';
const DESC_EN =
  'Travel Thailand cashlessly in 2026. QR codes, travel cards, apps and tips for going cash-free. Best options for tourists from any country.';
const DESC_DE =
  'Reise 2026 bargeldlos durch Thailand. QR-Codes, Reisekarten, Apps und Tipps für ein Leben ohne Bargeld. Die besten Optionen für Touristen aus jedem Land.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['cashless travel thailand', 'thailand digital payments', 'wise card thailand', 'revolut thailand', 'thailand atm tips'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/thailand/cashless-travel-thailand'),
    openGraph: buildOpenGraph(locale, '/guides/thailand/cashless-travel-thailand', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const CASHLESS_METERS = [
  { city: 'Bangkok', cityDe: 'Bangkok', pct: 80 },
  { city: 'Phuket', cityDe: 'Phuket', pct: 70 },
  { city: 'Chiang Mai', cityDe: 'Chiang Mai', pct: 60 },
  { city: 'Rural areas', cityDe: 'Ländliche Gebiete', pct: 40 },
];

const RANKED_METHODS = [
  {
    medal: '🥇', icon: '📱',
    nameEn: 'QR Payment (if from SG/MY/IN/ID)', nameDe: 'QR-Zahlung (wenn aus SG/MY/IN/ID)',
    en: 'Free, instant, accepted everywhere', de: 'Kostenlos, sofort, überall akzeptiert',
    stars: 5,
  },
  {
    medal: '🥈', icon: '💳',
    nameEn: 'Wise / Revolut Card', nameDe: 'Wise- / Revolut-Karte',
    en: 'Best for Western tourists — low fees, good exchange rate', de: 'Am besten für westliche Touristen — niedrige Gebühren, guter Wechselkurs',
    stars: 5,
  },
  {
    medal: '🥉', icon: '💳',
    nameEn: 'Credit/Debit Card (Visa/Mastercard)', nameDe: 'Kredit-/Debitkarte (Visa/Mastercard)',
    en: 'Accepted at hotels, malls, restaurants — 1–3% foreign transaction fee', de: 'Akzeptiert in Hotels, Malls, Restaurants — 1–3% Auslandsgebühr',
    stars: 4,
  },
  {
    medal: '4.', icon: '📱',
    nameEn: 'Grab App', nameDe: 'Grab-App',
    en: 'For transport: taxi, food delivery — accepts foreign cards', de: 'Für Transport: Taxi, Essenslieferung — akzeptiert ausländische Karten',
    stars: 4,
  },
  {
    medal: '5.', icon: '💵',
    nameEn: 'Cash (Thai Baht)', nameDe: 'Bargeld (Thai Baht)',
    en: 'Always as backup — exchange at SuperRich or banks', de: 'Immer als Backup — Wechsel bei SuperRich oder Banken',
    stars: 3,
  },
];

const CITY_SECTIONS = [
  {
    nameEn: 'Bangkok', nameDe: 'Bangkok',
    en: [
      'BTS Skytrain: Rabbit card or contactless card',
      'MRT: Stored value card',
      'Taxis: Grab (card) or cash',
      '7-Eleven: QR + card accepted',
      'Chatuchak Market: Mix of QR and cash',
      'High-end restaurants: Cards accepted',
    ],
    de: [
      'BTS Skytrain: Rabbit-Karte oder kontaktlose Karte',
      'MRT: Wertkarte',
      'Taxis: Grab (Karte) oder Bargeld',
      '7-Eleven: QR + Karte akzeptiert',
      'Chatuchak Market: Mix aus QR und Bargeld',
      'Gehobene Restaurants: Karten akzeptiert',
    ],
  },
  {
    nameEn: 'Phuket', nameDe: 'Phuket',
    en: ['Beach vendors: Mostly cash', 'Bangla Road bars: Cards/QR', 'Patong restaurants: Mix'],
    de: ['Strandverkäufer: Meist Bargeld', 'Bangla-Road-Bars: Karten/QR', 'Patong-Restaurants: Mix'],
  },
  {
    nameEn: 'Chiang Mai', nameDe: 'Chiang Mai',
    en: ['Night Bazaar: Mix', 'Nimman area: Very cashless-friendly', 'Mountain treks: Cash only'],
    de: ['Night Bazaar: Mix', 'Nimman-Viertel: Sehr bargeldlos-freundlich', 'Bergtouren: Nur Bargeld'],
  },
];

const APPS_CHECKLIST_EN = [
  'Your home banking app (for cross-border QR)',
  'Grab (transport + food)',
  'Wise (if from a Western country)',
  'Google Maps (navigate to ATMs)',
  'XE Currency (exchange rates)',
];
const APPS_CHECKLIST_DE = [
  'Deine heimische Banking-App (für grenzüberschreitendes QR)',
  'Grab (Transport + Essen)',
  'Wise (falls aus einem westlichen Land)',
  'Google Maps (Navigation zu Geldautomaten)',
  'XE Currency (Wechselkurse)',
];

const ATM_TIPS_EN = [
  'Best ATMs: AEON (lowest fees ~180฿)',
  'Avoid airport ATMs (high fees)',
  "Use your bank's fee reimbursement if available",
  'Always withdraw in local currency (reject DCC)',
];
const ATM_TIPS_DE = [
  'Beste Geldautomaten: AEON (niedrigste Gebühren ~180฿)',
  'Vermeide Flughafen-Geldautomaten (hohe Gebühren)',
  'Nutze die Gebührenerstattung deiner Bank, falls vorhanden',
  'Hebe immer in Landeswährung ab (DCC ablehnen)',
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE_EN,
  description: DESC_EN,
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/thailand/cashless-travel-thailand' },
};

function Stars({ count }: { count: number }) {
  return <span className="text-amber-500">{'⭐'.repeat(count)}</span>;
}

export default function CashlessTravelThailandPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-cashless-travel" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }} />
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
          { label: 'Thailand', href: '/guides/thailand' },
          { label: locale === 'de' ? 'Bargeldlos reisen' : 'Cashless Travel' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'Bargeldlos reisen in Thailand' : 'Cashless Travel in Thailand'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? 'Dein kompletter Guide für bargeldloses Reisen in Thailand 2026'
            : 'Your complete guide to going cash-free in Thailand 2026'}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* Reality check */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Ist Thailand bargeldlos? (Realitätscheck)' : 'Is Thailand Cashless? (Reality Check)'}
          </h2>
          <ul className="text-sm text-slate-600 space-y-1.5">
            <li>
              <strong>{locale === 'de' ? 'Touristengebiete (Bangkok, Phuket, Chiang Mai)' : 'Tourist areas (Bangkok, Phuket, Chiang Mai)'}:</strong>{' '}
              {locale === 'de' ? 'Sehr bargeldlos-freundlich' : 'Very cashless-friendly'}
            </li>
            <li>
              <strong>{locale === 'de' ? 'Ländliche Gebiete' : 'Rural areas'}:</strong> {locale === 'de' ? 'Bevorzugen weiterhin Bargeld' : 'Still prefer cash'}
            </li>
            <li>
              <strong>{locale === 'de' ? 'Empfehlung' : 'Recommendation'}:</strong>{' '}
              {locale === 'de' ? 'Habe ฿1.000–2.000 Bargeld als Backup' : 'Carry ฿1,000–2,000 cash as backup'}
            </li>
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
            {locale === 'de' ? 'Zahlungsmethoden für Touristen im Ranking' : 'Payment Methods Ranked for Tourists'}
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

        {/* By city */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Bargeldlos nach Stadt' : 'Cashless by City'}
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
        </section>

        {/* Apps checklist */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Apps, die du vor der Reise herunterladen solltest' : 'Apps to Download Before Traveling'}
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

        {/* ATM tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Geldautomaten-Tipps (wenn du Bargeld brauchst)' : 'ATM Tips (When You Need Cash)'}
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
            {locale === 'de' ? 'Bist du Händler in Thailand?' : 'Are you a merchant in Thailand?'}
          </p>
          <Link
            href="/promptpay/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#1A56DB' }}
          >
            {locale === 'de' ? 'PromptPay QR-Code erstellen →' : 'Generate PromptPay QR Code →'}
          </Link>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">{locale === 'de' ? 'Mehr zu Thailand' : 'Related in Thailand'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RelatedToolCard
              icon="🗺️"
              name={locale === 'de' ? 'Touristen-Guide' : 'PromptPay Tourist Guide'}
              url="/guides/thailand/promptpay-tourist-guide"
              description={locale === 'de' ? 'Können Touristen PromptPay nutzen?' : 'Can tourists use PromptPay?'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="📷"
              name={locale === 'de' ? 'Thai QR scannen' : 'How to Scan Thai QR Code'}
              url="/guides/thailand/scan-thai-qr-code"
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
