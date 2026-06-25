import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'QRIS for Foreigners & Expats in Indonesia 2026 – Complete Guide';
const TITLE_DE = 'QRIS für Ausländer & Expats in Indonesien 2026 – Der komplette Guide';
const DESC_EN =
  'Foreigners and expats in Indonesia can use QRIS fully with an Indonesian bank account. Learn which banks are expat-friendly and how to register.';
const DESC_DE =
  'Ausländer und Expats in Indonesien können QRIS mit einem indonesischen Bankkonto voll nutzen. Lerne, welche Banken expat-freundlich sind und wie du dich registrierst.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['qris for foreigners', 'qris expat', 'kitas bank account', 'bca foreigner', 'mandiri foreigner', 'bri foreigner'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/indonesia/qris-for-foreigners'),
    openGraph: buildOpenGraph(locale, '/guides/indonesia/qris-for-foreigners', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const STEPS_EN = [
  'Get a local SIM (Telkomsel, Indosat or XL)',
  'Open a bank account (BCA, Mandiri or BRI – most expat-friendly)',
  "Download the bank's app",
  'Register for QRIS in the app or at a branch',
  'Start using it at all 30M+ merchants',
];
const STEPS_DE = [
  'Hole dir eine lokale SIM (Telkomsel, Indosat oder XL)',
  'Eröffne ein Bankkonto (BCA, Mandiri oder BRI – am expat-freundlichsten)',
  'Lade die App der Bank herunter',
  'Registriere dich für QRIS in der App oder in der Filiale',
  'Nutze es bei allen über 30 Millionen Händlern',
];

const REQUIREMENTS_EN = [
  'KITAS (temporary stay permit) or KITAP',
  'Indonesian phone number (local SIM)',
  'Indonesian bank account',
];
const REQUIREMENTS_DE = [
  'KITAS (befristete Aufenthaltserlaubnis) oder KITAP',
  'Indonesische Telefonnummer (lokale SIM)',
  'Indonesisches Bankkonto',
];

const BANKS = [
  {
    icon: '🏦', name: 'Bank Central Asia (BCA)',
    en: ['Expats: ✅ With KITAS', 'App: myBCA (good English support)', 'QRIS: ✅ Built in'],
    de: ['Expats: ✅ Mit KITAS', 'App: myBCA (gute englische Unterstützung)', 'QRIS: ✅ Integriert'],
  },
  {
    icon: '🏦', name: 'Bank Mandiri',
    en: ["Expats: ✅ With KITAS", "App: Livin' by Mandiri", 'QRIS: ✅'],
    de: ['Expats: ✅ Mit KITAS', "App: Livin' by Mandiri", 'QRIS: ✅'],
  },
  {
    icon: '🏦', name: 'BRI (Bank Rakyat Indonesia)',
    en: ['Expats: ✅ Some branches', 'Note: Widest ATM network in Indonesia', 'QRIS: ✅'],
    de: ['Expats: ✅ Einige Filialen', 'Hinweis: Breitestes Geldautomatennetz in Indonesien', 'QRIS: ✅'],
  },
];

const TIPS_EN = [
  'Get a Telkomsel SIM first (best coverage)',
  'BCA is preferred for expats (English support)',
  'Register GoPay/OVO as a backup',
  'Keep cash for smaller towns outside Java/Bali',
];
const TIPS_DE = [
  'Hole dir zuerst eine Telkomsel-SIM (beste Abdeckung)',
  'BCA wird von Expats bevorzugt (englische Unterstützung)',
  'Registriere GoPay/OVO als Backup',
  'Habe Bargeld für kleinere Städte außerhalb von Java/Bali dabei',
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE_EN,
  description: DESC_EN,
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/indonesia/qris-for-foreigners' },
};

export default function QrisForForeignersPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-qris-foreigners" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }} />
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
          { label: locale === 'de' ? 'QRIS für Ausländer' : 'QRIS for Foreigners' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'QRIS für Ausländer und Expats' : 'QRIS for Foreigners and Expats'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? 'Langzeitansässige: vollen QRIS-Zugang in Indonesien erhalten'
            : 'Long-term residents: get full QRIS access in Indonesia'}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* Tourist vs expat */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Tourist vs. Expat' : 'Tourist vs Expat'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <p className="font-semibold text-slate-900 mb-1">1. {locale === 'de' ? 'Touristen' : 'Tourists'}</p>
              <p className="text-sm text-slate-600">
                →{' '}
                <Link href="/guides/indonesia/qris-tourist-guide" className="text-blue-700 font-medium hover:underline">
                  {locale === 'de' ? 'Grenzüberschreitend oder GoPay/OVO' : 'Cross-border or GoPay/OVO'}
                </Link>
              </p>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <p className="font-semibold text-slate-900 mb-1">2. {locale === 'de' ? 'Expats' : 'Expats'}</p>
              <p className="text-sm text-slate-600">
                {locale === 'de'
                  ? 'Vollen QRIS-Zugang über ein indonesisches Bankkonto'
                  : 'Full QRIS via Indonesian bank account'}
              </p>
            </div>
          </div>
        </section>

        {/* How to get full access */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Wie Expats vollen QRIS-Zugang erhalten' : 'How Expats Get Full QRIS Access'}
          </h2>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="font-semibold text-slate-700 text-sm mb-2">{locale === 'de' ? 'Voraussetzungen:' : 'Requirements:'}</p>
            <ul className="text-sm text-slate-600 space-y-1">
              {(locale === 'de' ? REQUIREMENTS_DE : REQUIREMENTS_EN).map((r) => <li key={r}>• {r}</li>)}
            </ul>
          </div>
          <ol className="space-y-3">
            {(locale === 'de' ? STEPS_DE : STEPS_EN).map((text, i) => (
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
        </section>

        {/* Banks */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Expat-freundliche Banken in Indonesien' : 'Expat-Friendly Banks in Indonesia'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {BANKS.map((bank) => (
              <div key={bank.name} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{bank.icon}</span>
                  <h3 className="font-semibold text-slate-900 text-sm">{bank.name}</h3>
                </div>
                <ul className="text-xs text-slate-600 space-y-1">
                  {(locale === 'de' ? bank.de : bank.en).map((line) => <li key={line}>{line}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Praktische Tipps für Expats' : 'Practical Expat Tips'}
          </h2>
          <ul className="space-y-2">
            {(locale === 'de' ? TIPS_DE : TIPS_EN).map((tip) => (
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
            {locale === 'de' ? 'Empfängst du Zahlungen als Expat oder Händler?' : 'Receiving payments as an expat or merchant?'}
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
              icon="🗺️"
              name={locale === 'de' ? 'Touristen-Guide' : 'QRIS Tourist Guide'}
              url="/guides/indonesia/qris-tourist-guide"
              description={locale === 'de' ? 'Für Kurzzeitbesucher ohne indonesisches Bankkonto' : 'For short-term visitors without an Indonesian bank account'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="📖"
              name={locale === 'de' ? 'Wie man QRIS benutzt' : 'How to Use QRIS'}
              url="/guides/indonesia/how-to-use-qris"
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
