import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'Best UPI Apps in India 2026 – PhonePe vs Google Pay vs Paytm';
const TITLE_DE = 'Die besten UPI-Apps in Indien 2026 – PhonePe vs Google Pay vs Paytm';
const DESC_EN =
  'Compare the top UPI apps in India: PhonePe, Google Pay, Paytm, BHIM and more. Market share, features, tourist access and which app is best for you.';
const DESC_DE =
  'Vergleiche die wichtigsten UPI-Apps in Indien: PhonePe, Google Pay, Paytm, BHIM und mehr. Marktanteil, Funktionen, Touristenzugang und welche App am besten zu dir passt.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['phonepe vs google pay', 'best upi app', 'paytm vs phonepe', 'bhim app', 'upi app market share'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/india/upi-apps-comparison'),
    openGraph: buildOpenGraph(locale, '/guides/india/upi-apps-comparison', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const MARKET_SHARE = [
  { app: 'PhonePe', pct: 48 },
  { app: 'Google Pay', pct: 37 },
  { app: 'Paytm', pct: 8 },
  { app: 'BHIM + others', pct: 7 },
];

const COMPARISON = [
  { feature: 'Market share', featureDe: 'Marktanteil', phonepe: '48%', gpay: '37%', paytm: '8%', bhim: '<5%' },
  { feature: 'Tourist access', featureDe: 'Touristenzugang', phonepe: '✅', gpay: '⚠️', paytm: '✅', bhim: '❌' },
  { feature: 'International SIM', featureDe: 'Internationale SIM', phonepe: '✅', gpay: '⚠️', paytm: '✅', bhim: '❌' },
  { feature: 'Wallet feature', featureDe: 'Wallet-Funktion', phonepe: '✅', gpay: '❌', paytm: '✅', bhim: '❌' },
  { feature: 'Bill payments', featureDe: 'Rechnungszahlungen', phonepe: '✅', gpay: '✅', paytm: '✅', bhim: '✅' },
  { feature: 'Cashback', featureDe: 'Cashback', phonepe: '✅', gpay: '✅', paytm: '✅', bhim: '❌' },
  { feature: 'iOS support', featureDe: 'iOS-Unterstützung', phonepe: '✅', gpay: '✅', paytm: '✅', bhim: '✅' },
  { feature: 'English UI', featureDe: 'Englische Oberfläche', phonepe: '✅', gpay: '✅', paytm: '✅', bhim: '✅' },
];

const DEEP_DIVES = [
  {
    name: 'PhonePe', handle: '@ybl', badgeEn: 'Recommended for tourists', badgeDe: 'Empfohlen für Touristen',
    en: ['Owned by a Walmart subsidiary', '500M+ registered users', 'Supports international phone numbers', 'Best for: tourists, merchants, everyday use'],
    de: ['Gehört einer Walmart-Tochtergesellschaft', 'Über 500 Mio. registrierte Nutzer', 'Unterstützt internationale Telefonnummern', 'Am besten für: Touristen, Händler, Alltag'],
  },
  {
    name: 'Google Pay', handle: '@oksbi / @okicici', badgeEn: '', badgeDe: '',
    en: ["Google's UPI app", 'Clean interface', 'Deep integration with Google services', 'Best for: Android users with an Indian account'],
    de: ['Die UPI-App von Google', 'Übersichtliche Oberfläche', 'Tiefe Integration mit Google-Diensten', 'Am besten für: Android-Nutzer mit indischem Konto'],
  },
  {
    name: 'Paytm', handle: '@paytm', badgeEn: '', badgeDe: '',
    en: ['Pioneer of digital payments in India', 'Has wallet + UPI + bank', 'Accepts some international numbers', 'Paytm Payments Bank', 'Best for: tourists, e-commerce'],
    de: ['Pionier digitaler Zahlungen in Indien', 'Hat Wallet + UPI + Bank', 'Akzeptiert einige internationale Nummern', 'Paytm Payments Bank', 'Am besten für: Touristen, E-Commerce'],
  },
  {
    name: 'BHIM', handle: '@upi', badgeEn: 'Official NPCI app', badgeDe: 'Offizielle NPCI-App',
    en: ['Government-backed', 'No cashback/rewards', 'Requires an Indian bank', 'Best for: privacy-focused users'],
    de: ['Staatlich unterstützt', 'Kein Cashback/Prämien', 'Erfordert eine indische Bank', 'Am besten für: datenschutzbewusste Nutzer'],
  },
];

const NEWER_APPS = [
  { name: 'Cred', en: 'Premium credit-card bill payments + rewards', de: 'Premium Kreditkarten-Abrechnung + Prämien' },
  { name: 'Slice', en: 'Credit-linked UPI for younger users', de: 'Kreditbasiertes UPI für jüngere Nutzer' },
  { name: 'Jupiter', en: 'Neo-bank with built-in UPI', de: 'Neo-Bank mit integriertem UPI' },
  { name: 'Fi Money', en: 'Salary account + UPI + spending insights', de: 'Gehaltskonto + UPI + Ausgabenanalyse' },
];

const DECISION_TREE_EN = [
  'Tourist from a G20 country? → PhonePe or Paytm',
  'Have an Indian bank account? → Any app (Google Pay is most popular)',
  'Running a business? → PhonePe or Paytm Business',
  'Want simplicity? → Google Pay',
  'Official/Government? → BHIM',
];
const DECISION_TREE_DE = [
  'Tourist aus einem G20-Land? → PhonePe oder Paytm',
  'Hast du ein indisches Bankkonto? → Jede App (Google Pay am beliebtesten)',
  'Betreibst du ein Geschäft? → PhonePe oder Paytm Business',
  'Willst du Einfachheit? → Google Pay',
  'Offiziell/staatlich? → BHIM',
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE_EN,
  description: DESC_EN,
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/india/upi-apps-comparison' },
};

export default function UpiAppsComparisonPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-upi-apps-comparison" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }} />
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
          { label: locale === 'de' ? 'UPI-Apps im Vergleich' : 'UPI Apps Comparison' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'Die besten UPI-Apps in Indien 2026' : 'Best UPI Apps in India 2026'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? 'PhonePe vs Google Pay vs Paytm – welche ist die richtige für dich?'
            : 'PhonePe vs Google Pay vs Paytm – which is right for you?'}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* Market share */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Marktanteil 2026' : 'Market Share 2026'}
          </h2>
          <div className="space-y-3">
            {MARKET_SHARE.map(({ app, pct }) => (
              <div key={app} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{app}</span>
                  <span className="text-slate-500">{pct}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Detaillierter App-Vergleich' : 'Detailed App Comparison Table'}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {(locale === 'de'
                    ? ['Funktion', 'PhonePe', 'Google Pay', 'Paytm', 'BHIM']
                    : ['Feature', 'PhonePe', 'Google Pay', 'Paytm', 'BHIM']
                  ).map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-700">{locale === 'de' ? row.featureDe : row.feature}</td>
                    <td className="px-4 py-3 text-slate-600">{row.phonepe}</td>
                    <td className="px-4 py-3 text-slate-600">{row.gpay}</td>
                    <td className="px-4 py-3 text-slate-600">{row.paytm}</td>
                    <td className="px-4 py-3 text-slate-600">{row.bhim}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Deep dives */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'App-Deep-Dives' : 'App Deep-Dives'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DEEP_DIVES.map((app) => (
              <div key={app.name} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-2">
                <div className="flex items-center gap-2 flex-wrap justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900">{app.name}</h3>
                    {(locale === 'de' ? app.badgeDe : app.badgeEn) && (
                      <span className="text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
                        {locale === 'de' ? app.badgeDe : app.badgeEn}
                      </span>
                    )}
                  </div>
                  <code className="text-xs font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded">{app.handle}</code>
                </div>
                <ul className="text-xs text-slate-600 space-y-1">
                  {(locale === 'de' ? app.de : app.en).map((line) => <li key={line}>• {line}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Decision tree */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Welche App solltest du wählen?' : 'Which App Should You Choose?'}
          </h2>
          <ul className="space-y-2">
            {(locale === 'de' ? DECISION_TREE_DE : DECISION_TREE_EN).map((item) => (
              <li key={item} className="flex gap-3 text-sm text-slate-700">
                <span className="text-blue-600">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Newer apps */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Neuere UPI-Apps' : 'Newer UPI Apps Worth Knowing'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {NEWER_APPS.map((app) => (
              <div key={app.name} className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                <span className="text-lg flex-shrink-0">📱</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{app.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{locale === 'de' ? app.de : app.en}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-blue-900 text-lg">
            {locale === 'de' ? 'Erstelle einen UPI-QR-Code' : 'Generate a UPI QR Code'}
          </p>
          <Link
            href="/upi/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#1A56DB' }}
          >
            {locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
          </Link>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">{locale === 'de' ? 'Mehr zu Indien' : 'Related in India'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RelatedToolCard
              icon="📖"
              name={locale === 'de' ? 'Wie man UPI benutzt' : 'How to Use UPI'}
              url="/guides/india/how-to-use-upi"
              description={locale === 'de' ? 'Schritt-für-Schritt-Anleitung' : 'Step-by-step instructions'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="📷"
              name={locale === 'de' ? 'UPI-QR scannen' : 'Scan UPI QR Code'}
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
