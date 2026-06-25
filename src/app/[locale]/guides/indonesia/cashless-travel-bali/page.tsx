import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'Cashless Payment in Bali 2026 – Complete Tourist Guide to QR & Cards';
const TITLE_DE = 'Bargeldlose Zahlung auf Bali 2026 – Der komplette Touristen-Guide zu QR & Karten';
const DESC_EN =
  'Bali is one of Asia\'s most cashless-friendly tourist destinations. QRIS, GoPay, OVO and international cards work at beach clubs, restaurants and shops.';
const DESC_DE =
  'Bali ist eines der bargeldlos-freundlichsten Reiseziele Asiens. QRIS, GoPay, OVO und internationale Karten funktionieren in Beach Clubs, Restaurants und Geschäften.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['cashless bali', 'bali qris', 'bali beach club payment', 'gopay bali', 'canggu payment', 'seminyak payment'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/indonesia/cashless-travel-bali'),
    openGraph: buildOpenGraph(locale, '/guides/indonesia/cashless-travel-bali', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const ZONES = [
  { labelEn: 'Very cashless', labelDe: 'Sehr bargeldlos', places: 'Seminyak, Kuta, Canggu, Sanur, Nusa Dua', color: 'bg-green-50 border-green-200 text-green-800' },
  { labelEn: 'Mostly cashless', labelDe: 'Überwiegend bargeldlos', places: 'Ubud, Legian, Jimbaran', color: 'bg-blue-50 border-blue-200 text-blue-800' },
  { labelEn: 'Mixed', labelDe: 'Gemischt', places: 'Lovina, Singaraja, Karangasem', color: 'bg-amber-50 border-amber-200 text-amber-800' },
  { labelEn: 'Cash preferred', labelDe: 'Bargeld bevorzugt', places: 'Rice fields, remote temples, small villages', placesDe: 'Reisfelder, entfernte Tempel, kleine Dörfer', color: 'bg-slate-50 border-slate-200 text-slate-700' },
];

const AREAS = [
  {
    nameEn: 'Seminyak & Kuta', nameDe: 'Seminyak & Kuta',
    en: ['Finns Beach Club: Cards + QRIS ✅', 'Potato Head: Cards + QRIS ✅', 'Restaurants: almost all accept QR + cards', 'Shops on Jalan Raya: mix', 'Nightlife: cards + cash'],
    de: ['Finns Beach Club: Karten + QRIS ✅', 'Potato Head: Karten + QRIS ✅', 'Restaurants: fast alle akzeptieren QR + Karten', 'Geschäfte auf der Jalan Raya: Mix', 'Nachtleben: Karten + Bargeld'],
  },
  {
    nameEn: 'Canggu', nameDe: 'Canggu',
    en: ['Beach clubs: QR + cards', 'Cafes (La Brisa, etc.): cards + QR', 'Surf schools: mix', 'Warung: QRIS growing, cash for older ones'],
    de: ['Beach Clubs: QR + Karten', 'Cafés (La Brisa, etc.): Karten + QR', 'Surfschulen: Mix', 'Warung: QRIS wächst, Bargeld bei älteren'],
  },
  {
    nameEn: 'Ubud', nameDe: 'Ubud',
    en: ['Restaurants: cards + QR', 'Monkey Forest: cards at entrance', 'Rice terrace: cash for local guides', 'Art market: prefer cash for negotiating'],
    de: ['Restaurants: Karten + QR', 'Monkey Forest: Karten am Eingang', 'Reisterrasse: Bargeld für lokale Guides', 'Kunstmarkt: Bargeld zum Verhandeln bevorzugt'],
  },
];

const BEACH_CLUBS = [
  { name: 'Finns', location: 'Canggu', qr: true, cards: true, cash: true },
  { name: 'Potato Head', location: 'Seminyak', qr: true, cards: true, cash: true },
  { name: 'Ku De Ta', location: 'Seminyak', qr: true, cards: true, cash: true },
  { name: 'Single Fin', location: 'Uluwatu', qr: true, cards: true, cash: true },
  { name: 'La Plancha', location: 'Seminyak', qr: false, cards: true, cash: true },
];

const BALI_APPS = [
  { en: 'Gojek: Dominant in Bali (cheaper than Grab)', de: 'Gojek: dominant auf Bali (günstiger als Grab)' },
  { en: 'Grab: also works, more used for food', de: 'Grab: funktioniert auch, eher für Essen genutzt' },
  { en: 'Traveloka: hotels + flights + attractions', de: 'Traveloka: Hotels + Flüge + Attraktionen' },
  { en: 'Klook: tours and activities', de: 'Klook: Touren und Aktivitäten' },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE_EN,
  description: DESC_EN,
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/indonesia/cashless-travel-bali' },
};

function Check({ ok }: { ok: boolean }) {
  return ok ? <span className="text-green-600">✅</span> : <span className="text-amber-500">⚠️</span>;
}

export default function CashlessTravelBaliPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-cashless-bali" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }} />
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
          { label: locale === 'de' ? 'Bargeldlos auf Bali' : 'Cashless Bali' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-200">
          🏖️ {locale === 'de' ? 'Bali-spezifischer Guide' : 'Bali-specific guide'}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'Bargeldlose Zahlung auf Bali' : 'Cashless Payment in Bali'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de' ? 'Bali 2026: Wo man mit QR, Karten oder Apps bezahlt' : 'Bali 2026: Where to pay with QR, cards or apps'}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* Why special */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Warum Bali besonders ist' : 'Why Bali is Special'}
          </h2>
          <ul className="text-sm text-slate-600 space-y-1.5">
            {locale === 'de' ? (
              <>
                <li>• Meistbesuchte indonesische Insel (über 6 Millionen Touristen/Jahr)</li>
                <li>• Touristeninfrastruktur → am bargeldlos-freundlichsten</li>
                <li>• Mischung aus Luxus (Beach Clubs) und Lokalem (Warungs)</li>
                <li>• Beide Extreme: High-End komplett bargeldlos, entfernte Dörfer nur Bargeld</li>
              </>
            ) : (
              <>
                <li>• Most visited Indonesian island (6M+ tourists/year)</li>
                <li>• Tourist infrastructure → the most cashless-friendly</li>
                <li>• Mix of luxury (beach clubs) and local (warungs)</li>
                <li>• Both extremes: high-end totally cashless, remote villages cash-only</li>
              </>
            )}
          </ul>
        </section>

        {/* Zones */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Bargeldlos-Zonen auf Bali' : 'Bali Cashless Zones'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ZONES.map((z) => (
              <div key={z.labelEn} className={`rounded-2xl border p-4 ${z.color}`}>
                <p className="font-semibold text-sm mb-1">{locale === 'de' ? z.labelDe : z.labelEn}</p>
                <p className="text-xs">{locale === 'de' && z.placesDe ? z.placesDe : z.places}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Area by area */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Gebiet-für-Gebiet-Zahlungsguide' : 'Area-by-Area Payment Guide'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {AREAS.map((a) => (
              <div key={a.nameEn} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-2">{locale === 'de' ? a.nameDe : a.nameEn}</h3>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  {(locale === 'de' ? a.de : a.en).map((line) => <li key={line}>• {line}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Beach clubs table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Beach Clubs: Zahlungsguide' : 'Beach Clubs: Payment Guide'}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {(locale === 'de'
                    ? ['Beach Club', 'Ort', 'QR', 'Karten', 'Bargeld']
                    : ['Beach Club', 'Location', 'QR', 'Cards', 'Cash']
                  ).map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {BEACH_CLUBS.map((b) => (
                  <tr key={b.name} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-blue-700">{b.name}</td>
                    <td className="px-4 py-3 text-slate-600">{b.location}</td>
                    <td className="px-4 py-3"><Check ok={b.qr} /></td>
                    <td className="px-4 py-3"><Check ok={b.cards} /></td>
                    <td className="px-4 py-3"><Check ok={b.cash} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bali apps */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Bali-spezifische Apps' : 'Bali Specific Apps'}
          </h2>
          <ul className="space-y-2">
            {BALI_APPS.map(({ en, de }) => (
              <li key={en} className="flex gap-3 text-sm text-slate-700">
                <span className="text-blue-600">•</span>
                <span>{locale === 'de' ? de : en}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Scam warning */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="font-semibold text-amber-900 mb-1">⚠️ {locale === 'de' ? 'Betrugswarnung' : 'Scam Warning'}</p>
          <p className="text-sm text-amber-800">
            {locale === 'de'
              ? 'Prüfe immer den Betrag auf dem QR-Code, bevor du bestätigst. In Touristengebieten setzen unseriöse Händler gelegentlich höhere Beträge an, in der Hoffnung, dass Touristen es nicht bemerken.'
              : "Always check the QR code amount before confirming. In tourist areas, unscrupulous merchants occasionally set higher amounts hoping tourists won't notice."}
          </p>
        </section>

        {/* GoPay recommendation */}
        <section className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-2">
          <h3 className="font-semibold text-slate-900">
            {locale === 'de' ? 'Empfohlen: GoPay für Bali-Touristen' : 'Recommended: GoPay for Bali Tourists'}
          </h3>
          <ul className="text-sm text-slate-600 space-y-1.5">
            {locale === 'de' ? (
              <>
                <li>• Aufladen bei Circle K, Alfamart, Indomaret</li>
                <li>• Nutzbar bei über 30 Mio. QRIS-Händlern</li>
                <li>• Keine Auslandsgebühren nach dem Aufladen</li>
                <li>• Am besten für: Streetfood, Warungs, lokale Geschäfte</li>
              </>
            ) : (
              <>
                <li>• Top up at Circle K, Alfamart, Indomaret</li>
                <li>• Use at 30M+ QRIS merchants</li>
                <li>• No foreign transaction fees after top-up</li>
                <li>• Best for: street food, warungs, local shops</li>
              </>
            )}
          </ul>
        </section>

        {/* CTA */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-blue-900 text-lg">
            {locale === 'de' ? 'Bist du Händler auf Bali?' : 'Are you a merchant in Bali?'}
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
              icon="✈️"
              name={locale === 'de' ? 'Bargeldlos in Indonesien reisen' : 'Cashless Travel Indonesia'}
              url="/guides/indonesia/cashless-travel-indonesia"
              description={locale === 'de' ? 'Der landesweite Guide für bargeldloses Reisen' : 'The nationwide guide to going cash-free'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="🗺️"
              name={locale === 'de' ? 'Touristen-Guide' : 'QRIS Tourist Guide'}
              url="/guides/indonesia/qris-tourist-guide"
              description={locale === 'de' ? 'Können Touristen QRIS nutzen?' : 'Can tourists use QRIS?'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
