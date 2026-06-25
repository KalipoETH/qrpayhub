import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Accordion from '@/components/ui/Accordion';
import type { AccordionItem } from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'UPI for Tourists in India 2026 – Can Foreigners Use UPI?';
const TITLE_DE = 'UPI für Touristen in Indien 2026 – Können Ausländer UPI nutzen?';
const DESC_EN =
  "Can tourists use UPI in India? Since 2023, G20 country visitors can use UPI with international phone numbers. Here's exactly how to set it up.";
const DESC_DE =
  'Können Touristen UPI in Indien nutzen? Seit 2023 können Besucher aus G20-Ländern UPI mit internationalen Telefonnummern nutzen. So richtest du es genau ein.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['upi tourist', 'can foreigners use upi', 'g20 upi', 'phonepe international', 'paytm international'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/india/upi-tourist-guide'),
    openGraph: buildOpenGraph(locale, '/guides/india/upi-tourist-guide', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const G20_COUNTRIES = [
  { flag: 'us', name: 'USA' },
  { flag: 'gb', name: 'UK' },
  { flag: 'ca', name: 'Canada' },
  { flag: 'au', name: 'Australia' },
  { flag: 'de', name: 'Germany' },
  { flag: 'fr', name: 'France' },
  { flag: 'it', name: 'Italy' },
  { flag: 'jp', name: 'Japan' },
  { flag: 'sg', name: 'Singapore' },
  { flag: 'ae', name: 'UAE' },
  { flag: 'sa', name: 'Saudi Arabia' },
  { flag: 'ar', name: 'Argentina' },
  { flag: 'br', name: 'Brazil' },
  { flag: 'kr', name: 'South Korea' },
  { flag: 'id', name: 'Indonesia' },
  { flag: 'mx', name: 'Mexico' },
  { flag: 'za', name: 'South Africa' },
  { flag: 'tr', name: 'Turkey' },
];

const REGISTER_STEPS_EN = [
  'Have your passport ready',
  'Get your international SIM working in India (roaming or local SIM)',
  'Download PhonePe or Paytm',
  'Register with your international phone number',
  'Complete KYC with a passport photo',
  'Set your UPI PIN',
  'Start paying!',
];
const REGISTER_STEPS_DE = [
  'Halte deinen Reisepass bereit',
  'Bringe deine internationale SIM in Indien zum Laufen (Roaming oder lokale SIM)',
  'Lade PhonePe oder Paytm herunter',
  'Registriere dich mit deiner internationalen Telefonnummer',
  'Schließe das KYC mit einem Passfoto ab',
  'Lege deine UPI-PIN fest',
  'Los geht\'s mit dem Bezahlen!',
];

const APP_SUPPORT = [
  { app: 'PhonePe', ok: '✅', en: 'Supports international numbers', de: 'Unterstützt internationale Nummern' },
  { app: 'Paytm', ok: '✅', en: 'Supports international numbers', de: 'Unterstützt internationale Nummern' },
  { app: 'Google Pay', ok: '⚠️', en: 'Usually requires an Indian number', de: 'Benötigt meist eine indische Nummer' },
  { app: 'BHIM', ok: '❌', en: 'Requires an Indian bank account', de: 'Benötigt ein indisches Bankkonto' },
];

const LIMITS_TABLE = [
  { feature: 'Max per transaction', featureDe: 'Max. pro Transaktion', tourist: '₹10,000', regular: '₹1,00,000' },
  { feature: 'Daily limit', featureDe: 'Tageslimit', tourist: '₹10,000', regular: 'Bank-defined' },
  { feature: 'Monthly limit', featureDe: 'Monatslimit', tourist: '₹1,00,000', regular: 'Bank-defined' },
  { feature: 'Bank required', featureDe: 'Bank erforderlich', tourist: '❌', regular: '✅' },
  { feature: 'Indian SIM required', featureDe: 'Indische SIM erforderlich', tourist: '❌', regular: '✅' },
];

const ALTERNATIVES_EN = [
  '💳 Wise card (best for India – low fees)',
  '💳 Revolut card',
  '💳 International Visa/Mastercard',
  '🏧 ATM (SBI, HDFC, ICICI widely available)',
  '💵 Cash (exchange at banks or authorised dealers)',
];
const ALTERNATIVES_DE = [
  '💳 Wise-Karte (am besten für Indien – niedrige Gebühren)',
  '💳 Revolut-Karte',
  '💳 Internationale Visa/Mastercard',
  '🏧 Geldautomat (SBI, HDFC, ICICI weit verbreitet)',
  '💵 Bargeld (bei Banken oder autorisierten Händlern wechseln)',
];

const CITY_TIPS = [
  {
    nameEn: 'Mumbai', nameDe: 'Mumbai',
    en: ['Metro: Token or card', 'Local trains: Season pass or QR ticket', 'Taxis: Ola/Uber (international cards)', 'Street food: Mostly UPI'],
    de: ['Metro: Token oder Karte', 'Lokale Züge: Saisonkarte oder QR-Ticket', 'Taxis: Ola/Uber (internationale Karten)', 'Streetfood: Meist UPI'],
  },
  {
    nameEn: 'Delhi', nameDe: 'Delhi',
    en: ['Metro: Smart card (buy at station)', 'Auto-rickshaw: Ola auto or negotiate + UPI', 'Markets: UPI everywhere'],
    de: ['Metro: Smartcard (am Bahnhof kaufen)', 'Auto-Rikscha: Ola Auto oder verhandeln + UPI', 'Märkte: UPI überall'],
  },
  {
    nameEn: 'Bangalore (Tech Hub)', nameDe: 'Bangalore (Tech-Hub)',
    en: ['Most cashless city in India', 'UPI literally everywhere', 'Namma Metro: QR tickets'],
    de: ['Bargeldloseste Stadt Indiens', 'UPI wirklich überall', 'Namma Metro: QR-Tickets'],
  },
  {
    nameEn: 'Goa', nameDe: 'Goa',
    en: ['Tourist areas: cards + UPI', 'Beaches: mix', 'Markets: UPI growing'],
    de: ['Touristengebiete: Karten + UPI', 'Strände: Mix', 'Märkte: UPI wächst'],
  },
];

const FAQ_EN: AccordionItem[] = [
  { id: 'faq-1', question: 'Is it safe to use UPI as a tourist?', answer: 'Yes – UPI requires a PIN for every transaction. Never share your PIN.' },
  { id: 'faq-2', question: 'What if my UPI transaction fails?', answer: 'Failed transactions are refunded within 24-48 hours automatically.' },
  { id: 'faq-3', question: 'Can I use Google Pay India as a tourist?', answer: 'Google Pay India typically requires an Indian phone number and bank account.' },
  { id: 'faq-4', question: 'Is there a fee for tourist UPI?', answer: 'UPI is free for consumers regardless of nationality.' },
  { id: 'faq-5', question: 'What is BHIM?', answer: 'BHIM is the official NPCI UPI app. It requires an Indian bank account, so most tourists use PhonePe or Paytm instead.' },
];
const FAQ_DE: AccordionItem[] = [
  { id: 'faq-1', question: 'Ist es als Tourist sicher, UPI zu nutzen?', answer: 'Ja – UPI erfordert bei jeder Transaktion eine PIN. Teile deine PIN niemals mit jemandem.' },
  { id: 'faq-2', question: 'Was, wenn meine UPI-Transaktion fehlschlägt?', answer: 'Fehlgeschlagene Transaktionen werden automatisch innerhalb von 24-48 Stunden zurückerstattet.' },
  { id: 'faq-3', question: 'Kann ich Google Pay India als Tourist nutzen?', answer: 'Google Pay India erfordert in der Regel eine indische Telefonnummer und ein Bankkonto.' },
  { id: 'faq-4', question: 'Gibt es eine Gebühr für Touristen-UPI?', answer: 'UPI ist für Verbraucher unabhängig von der Nationalität kostenlos.' },
  { id: 'faq-5', question: 'Was ist BHIM?', answer: 'BHIM ist die offizielle UPI-App der NPCI. Sie erfordert ein indisches Bankkonto, daher nutzen die meisten Touristen stattdessen PhonePe oder Paytm.' },
];

function buildJsonLdFaq(items: AccordionItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE_EN,
  description: DESC_EN,
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/india/upi-tourist-guide' },
};

function Flag({ code, className = '' }: { code: string; className?: string }) {
  return (
    <span
      className={`fi fi-${code} ${className}`}
      style={{ width: '1.2em', height: '0.9em', display: 'inline-block', backgroundSize: 'cover', borderRadius: '2px', verticalAlign: 'middle' }}
    />
  );
}

export default function UpiTouristGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  const jsonLdFaq = buildJsonLdFaq(locale === 'de' ? FAQ_DE : FAQ_EN);

  return (
    <>
      <Script id="json-ld-upi-tourist-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }} />
      <Script id="json-ld-upi-tourist-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
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
          { label: locale === 'de' ? 'Touristen-Guide' : 'Tourist Guide' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'UPI Touristen-Guide' : 'UPI Tourist Guide'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? 'Der definitive Guide für internationale Besucher Indiens'
            : 'The definitive guide for international visitors to India'}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* G20 update */}
        <section className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center space-y-2">
          <p className="font-bold text-green-800 text-lg">
            🎉 {locale === 'de' ? 'Wichtiges Update' : 'Major Update'}
          </p>
          <p className="text-green-700">
            {locale === 'de'
              ? 'Seit 2023 können Touristen aus G20-Ländern UPI in Indien ohne indisches Bankkonto nutzen!'
              : 'Since 2023, tourists from G20 countries can now use UPI in India without an Indian bank account!'}
          </p>
        </section>

        {/* G20 countries */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'G20-Länder, die UPI nutzen können' : 'G20 Countries That Can Use UPI'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {G20_COUNTRIES.map(({ flag, name }) => (
              <div key={flag} className="flex items-center gap-2 bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                <Flag code={flag} className="text-xl flex-shrink-0" />
                <span className="text-sm text-slate-700">{name}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            {locale === 'de' ? 'und weitere — Russland mit Einschränkungen' : 'and more — Russia with limitations'}
          </p>
        </section>

        {/* Registration */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Wie sich G20-Touristen für UPI registrieren' : 'How G20 Tourists Register for UPI'}
          </h2>
          <ol className="space-y-3">
            {(locale === 'de' ? REGISTER_STEPS_DE : REGISTER_STEPS_EN).map((text, i) => (
              <li key={i} className="flex gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm"
                  style={{ backgroundColor: '#1A56DB' }}
                >
                  {i + 1}
                </div>
                <p className="text-sm text-slate-700 pt-1">{text}</p>
              </li>
            ))}
          </ol>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {APP_SUPPORT.map(({ app, ok, en, de }) => (
              <div key={app} className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                <span>{ok}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{app}</p>
                  <p className="text-xs text-slate-500">{locale === 'de' ? de : en}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Limits table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Limits für Touristen-UPI-Konten' : 'Limits for Tourist UPI Accounts'}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {(locale === 'de'
                    ? ['Funktion', 'Touristen-UPI', 'Standard-UPI']
                    : ['Feature', 'Tourist UPI', 'Regular UPI']
                  ).map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {LIMITS_TABLE.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-700">{locale === 'de' ? row.featureDe : row.feature}</td>
                    <td className="px-4 py-3 text-slate-600">{row.tourist}</td>
                    <td className="px-4 py-3 text-slate-600">{row.regular}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Non-G20 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Nicht-G20-Touristen – Alternativen' : 'Non-G20 Tourists – Alternatives'}
          </h2>
          <ol className="space-y-2">
            {(locale === 'de' ? ALTERNATIVES_DE : ALTERNATIVES_EN).map((item, i) => (
              <li key={item} className="flex items-center gap-3 text-sm text-slate-700">
                <span className="font-bold text-slate-400 w-5">{i + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
          <p className="text-sm text-slate-500 bg-slate-50 border border-slate-200 rounded-xl p-4">
            {locale === 'de'
              ? 'Hinweis: Vermeide Wechselschalter am Flughafen – die Kurse sind schlecht.'
              : 'Note: Avoid airport exchange counters — rates are poor.'}
          </p>
        </section>

        {/* City tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Stadt-spezifische Tipps' : 'City-Specific Tips'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CITY_TIPS.map((c) => (
              <div key={c.nameEn} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-2">{locale === 'de' ? c.nameDe : c.nameEn}</h3>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  {(locale === 'de' ? c.de : c.en).map((line) => <li key={line}>• {line}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
          <Accordion items={locale === 'de' ? FAQ_DE : FAQ_EN} />
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
              icon="✈️"
              name={locale === 'de' ? 'Bargeldlos reisen' : 'Cashless Travel Guide'}
              url="/guides/india/cashless-travel-india"
              description={locale === 'de' ? 'Dein kompletter Guide für bargeldloses Reisen in Indien' : 'Your complete guide to going cash-free in India'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="📖"
              name={locale === 'de' ? 'Wie man UPI benutzt' : 'How to Use UPI'}
              url="/guides/india/how-to-use-upi"
              description={locale === 'de' ? 'Schritt-für-Schritt-Anleitung' : 'Step-by-step instructions'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
