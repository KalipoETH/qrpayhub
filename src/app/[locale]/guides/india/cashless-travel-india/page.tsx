import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'Cashless Travel in India 2026 – Digital Payment Guide for Tourists';
const TITLE_DE = 'Bargeldlos reisen in Indien 2026 – Der Digitalzahlungsguide für Touristen';
const DESC_EN =
  'Travel India cashlessly in 2026. UPI, Wise card and apps work in most cities. City-by-city cashless guide for international tourists.';
const DESC_DE =
  'Reise 2026 bargeldlos durch Indien. UPI, Wise-Karte und Apps funktionieren in den meisten Städten. Stadt-für-Stadt-Guide für internationale Touristen.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['cashless travel india', 'india digital payments', 'mumbai cashless', 'delhi cashless', 'bangalore cashless', 'goa payments'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/india/cashless-travel-india'),
    openGraph: buildOpenGraph(locale, '/guides/india/cashless-travel-india', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const CASHLESS_METERS = [
  { city: 'Mumbai', cityDe: 'Mumbai', pct: 85 },
  { city: 'Delhi', cityDe: 'Delhi', pct: 82 },
  { city: 'Bangalore', cityDe: 'Bangalore', pct: 90 },
  { city: 'Goa (tourist)', cityDe: 'Goa (touristisch)', pct: 75 },
  { city: 'Jaipur', cityDe: 'Jaipur', pct: 65 },
  { city: 'Rural areas', cityDe: 'Ländliche Gebiete', pct: 30 },
];

const RANKED_METHODS = [
  { medal: '🥇', icon: '📱', nameEn: 'UPI (if G20 tourist or expat)', nameDe: 'UPI (wenn G20-Tourist oder Expat)', en: 'Accepted everywhere', de: 'Überall akzeptiert', stars: 5 },
  { medal: '🥈', icon: '💳', nameEn: 'Wise Card', nameDe: 'Wise-Karte', en: 'Best for non-UPI tourists — low fees, good INR rate', de: 'Am besten für Nicht-UPI-Touristen — niedrige Gebühren, guter INR-Kurs', stars: 5 },
  { medal: '🥉', icon: '💳', nameEn: 'Revolut Card', nameDe: 'Revolut-Karte', en: 'No foreign fees', de: 'Keine Auslandsgebühren', stars: 4 },
  { medal: '4.', icon: '💳', nameEn: 'International Visa/Mastercard', nameDe: 'Internationale Visa/Mastercard', en: 'Works at hotels/restaurants — ~2-3% foreign transaction fee', de: 'Funktioniert in Hotels/Restaurants — ~2-3% Auslandsgebühr', stars: 3 },
  { medal: '5.', icon: '🏧', nameEn: 'ATM Cash Withdrawal', nameDe: 'Geldautomat', en: 'Available everywhere — fee ₹200-300 per withdrawal', de: 'Überall verfügbar — Gebühr ₹200-300 pro Abhebung', stars: 3 },
  { medal: '6.', icon: '💵', nameEn: 'Cash (INR)', nameDe: 'Bargeld (INR)', en: 'Always a backup — exchange at authorised dealers', de: 'Immer als Backup — bei autorisierten Händlern wechseln', stars: 2 },
];

const APPS_CHECKLIST_EN = [
  'PhonePe or Paytm (if G20 tourist)',
  'Ola or Uber (transport)',
  'Zomato or Swiggy (food delivery)',
  'Wise (card management)',
  'Google Maps (ATM locator)',
  'IRCTC (train booking)',
];
const APPS_CHECKLIST_DE = [
  'PhonePe oder Paytm (wenn G20-Tourist)',
  'Ola oder Uber (Transport)',
  'Zomato oder Swiggy (Essenslieferung)',
  'Wise (Kartenverwaltung)',
  'Google Maps (Geldautomaten-Finder)',
  'IRCTC (Zugbuchung)',
];

const CITY_GUIDE = [
  {
    nameEn: 'Mumbai', nameDe: 'Mumbai',
    en: ['Local train: smart card (Ola money or station)', 'Metro: QR ticket at station', 'Autos/Cabs: Ola / Uber (card + UPI)', 'Restaurants: UPI + cards', 'Colaba Causeway shopping: UPI + haggle in cash'],
    de: ['Lokaler Zug: Smartcard (Ola Money oder Bahnhof)', 'Metro: QR-Ticket am Bahnhof', 'Autos/Taxis: Ola / Uber (Karte + UPI)', 'Restaurants: UPI + Karten', 'Colaba-Causeway-Shopping: UPI + in Bargeld verhandeln'],
  },
  {
    nameEn: 'Delhi', nameDe: 'Delhi',
    en: ['Delhi Metro: token or smart card', 'Rickshaws: UPI or negotiate', 'Chandni Chowk: mix (UPI growing)', 'South Delhi malls: cards + UPI', 'CP market: UPI'],
    de: ['Delhi-Metro: Token oder Smartcard', 'Rikschas: UPI oder verhandeln', 'Chandni Chowk: Mix (UPI wächst)', 'South-Delhi-Malls: Karten + UPI', 'CP-Markt: UPI'],
  },
  {
    nameEn: 'Bangalore', nameDe: 'Bangalore',
    en: ['Namma Metro: QR tickets', 'Auto apps: Namma Yatri (UPI native)', 'Tech corridors: fully cashless', 'UB City / Phoenix mall: all methods'],
    de: ['Namma Metro: QR-Tickets', 'Auto-Apps: Namma Yatri (nativ UPI)', 'Tech-Korridore: vollständig bargeldlos', 'UB City / Phoenix Mall: alle Methoden'],
  },
  {
    nameEn: 'Goa', nameDe: 'Goa',
    en: ['North Goa beaches: cards + UPI', 'Anjuna flea market: mix', 'Restaurants: UPI + cards', 'Scooter rental: often cash'],
    de: ['Strände in Nord-Goa: Karten + UPI', 'Anjuna-Flohmarkt: Mix', 'Restaurants: UPI + Karten', 'Roller-Vermietung: oft Bargeld'],
  },
  {
    nameEn: 'Rajasthan', nameDe: 'Rajasthan',
    en: ['Jaipur Pink City: UPI growing', 'Amber Fort: card at entrance', 'Local markets: mix', 'Village tours: cash'],
    de: ['Jaipur Pink City: UPI wächst', 'Amber Fort: Karte am Eingang', 'Lokale Märkte: Mix', 'Dorftouren: Bargeld'],
  },
];

const SCAMS_EN = [
  '"UPI not working" → merchant pressures you to pay cash instead — try a different app or leave',
  'QR code sticker replaced at merchant — always verify the merchant name shown in your app before paying',
  'Wrong amount pre-filled in QR — always check the amount before entering your PIN',
  '"Scan here for a refund" — legitimate refunds never require you to scan a QR code',
];
const SCAMS_DE = [
  '"UPI funktioniert nicht" → Händler drängt zur Barzahlung — andere App versuchen oder gehen',
  'QR-Code-Aufkleber beim Händler ausgetauscht — immer den in der App angezeigten Händlernamen prüfen',
  'Falscher Betrag im QR vorausgefüllt — immer den Betrag prüfen, bevor du die PIN eingibst',
  '"Hier scannen für Rückerstattung" — seriöse Rückerstattungen erfordern niemals das Scannen eines QR-Codes',
];

const ATM_TIPS_EN = [
  'Best: HDFC, ICICI, SBI ATMs',
  'Limit: ₹10,000 per withdrawal typically',
  'Fee: ₹200-300 for foreign cards',
  'DCC: ALWAYS decline (choose INR)',
  'Most reliable: bank ATMs, not standalone',
];
const ATM_TIPS_DE = [
  'Beste: HDFC-, ICICI-, SBI-Geldautomaten',
  'Limit: typischerweise ₹10.000 pro Abhebung',
  'Gebühr: ₹200-300 für ausländische Karten',
  'DCC: IMMER ablehnen (INR wählen)',
  'Am zuverlässigsten: Bank-Geldautomaten, keine freistehenden',
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE_EN,
  description: DESC_EN,
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/india/cashless-travel-india' },
};

function Stars({ count }: { count: number }) {
  return <span className="text-amber-500">{'⭐'.repeat(count)}</span>;
}

export default function CashlessTravelIndiaPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-cashless-india" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }} />
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
          { label: 'India', href: '/guides/india' },
          { label: locale === 'de' ? 'Bargeldlos reisen' : 'Cashless Travel' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'Bargeldlos reisen in Indien' : 'Cashless Travel in India'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? 'Indien verändert sich rasant – hier ist dein Überlebensguide für bargeldloses Reisen'
            : "India is transforming fast – here's your cashless survival guide"}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* Reality check */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Ist Indien bargeldlos? (Realitätscheck)' : 'Is India Cashless? (Reality Check)'}
          </h2>
          <ul className="text-sm text-slate-600 space-y-1.5">
            <li><strong>{locale === 'de' ? 'Großstädte' : 'Major cities'}:</strong> {locale === 'de' ? 'Stark bargeldlos' : 'Highly cashless'}</li>
            <li><strong>{locale === 'de' ? 'Touristenorte' : 'Tourist sites'}:</strong> {locale === 'de' ? 'Sehr gut' : 'Very good'}</li>
            <li><strong>{locale === 'de' ? 'Kleinstädte' : 'Small towns'}:</strong> {locale === 'de' ? 'Schnell wachsend' : 'Growing rapidly'}</li>
            <li><strong>{locale === 'de' ? 'Ländliche Dörfer' : 'Rural villages'}:</strong> {locale === 'de' ? 'Überwiegend Bargeld' : 'Mostly cash'}</li>
          </ul>
          <p className="text-sm text-slate-500 italic">
            {locale === 'de'
              ? 'Indien ist der am schnellsten wachsende bargeldlose Markt der Welt.'
              : 'India is the FASTEST growing cashless market globally.'}
          </p>
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
            {locale === 'de' ? 'Beste Zahlungsmethoden für Indien-Touristen' : 'Best Payment Methods for India Tourists'}
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

        {/* Apps */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Apps vor der Indien-Reise herunterladen' : 'Apps to Download Before India Trip'}
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
            {locale === 'de' ? 'Stadt-Zahlungsguide' : 'City Payment Guide'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CITY_GUIDE.map((c) => (
              <div key={c.nameEn} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-2">{locale === 'de' ? c.nameDe : c.nameEn}</h3>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  {(locale === 'de' ? c.de : c.en).map((line) => <li key={line}>• {line}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ATM tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Geldautomaten-Tipps für Indien' : 'ATM Tips for India'}
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

        {/* Scam awareness */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Betrug erkennen & vermeiden' : 'Scam Awareness'}
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 space-y-3">
            <p className="text-sm font-semibold text-red-800 mb-1">
              {locale === 'de' ? '⚠️ Häufige Touristenbetrugsmaschen:' : '⚠️ Common tourist payment scams:'}
            </p>
            <ul className="space-y-2">
              {(locale === 'de' ? SCAMS_DE : SCAMS_EN).map((scam) => (
                <li key={scam} className="flex gap-3 text-sm text-red-900">
                  <span className="flex-shrink-0 font-bold">•</span>
                  <span>{scam}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-blue-900 text-lg">
            {locale === 'de' ? 'Bist du Händler in Indien?' : 'Are you a merchant in India?'}
          </p>
          <Link
            href="/upi/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#1A56DB' }}
          >
            {locale === 'de' ? 'UPI-QR-Code erstellen →' : 'Generate UPI QR Code →'}
          </Link>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">{locale === 'de' ? 'Mehr zu Indien' : 'Related in India'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RelatedToolCard
              icon="🗺️"
              name={locale === 'de' ? 'UPI Touristen-Guide' : 'UPI Tourist Guide'}
              url="/guides/india/upi-tourist-guide"
              description={locale === 'de' ? 'Können Touristen UPI nutzen?' : 'Can tourists use UPI?'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="📷"
              name={locale === 'de' ? 'UPI-QR scannen' : 'How to Scan UPI QR Code'}
              url="/guides/india/scan-upi-qr-code"
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
