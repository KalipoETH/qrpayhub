import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'PromptPay for Foreigners – Expats & Tourists in Thailand 2026';
const TITLE_DE = 'PromptPay für Ausländer – Expats & Touristen in Thailand 2026';
const DESC_EN =
  'Foreigners and expats in Thailand can use PromptPay with a Thai bank account. Learn how to register, which banks are foreigner-friendly and what you need.';
const DESC_DE =
  'Ausländer und Expats in Thailand können PromptPay mit einem thailändischen Bankkonto nutzen. Lerne, wie du dich registrierst, welche Banken ausländerfreundlich sind und was du brauchst.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['promptpay for foreigners', 'promptpay expat', 'thai bank account foreigner', 'bangkok bank foreigner', 'kbank foreigner'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/thailand/promptpay-for-foreigners'),
    openGraph: buildOpenGraph(locale, '/guides/thailand/promptpay-for-foreigners', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const STEPS_EN = [
  'Open a Thai bank account (requires passport + work permit/visa)',
  'Choose a foreigner-friendly bank: Bangkok Bank, Kasikorn (KBank), SCB',
  'Register PromptPay with your Thai phone number',
  'Link your phone number or passport number as your PromptPay proxy',
];
const STEPS_DE = [
  'Eröffne ein thailändisches Bankkonto (benötigt Pass + Arbeitserlaubnis/Visum)',
  'Wähle eine ausländerfreundliche Bank: Bangkok Bank, Kasikorn (KBank), SCB',
  'Registriere PromptPay mit deiner thailändischen Telefonnummer',
  'Verknüpfe deine Telefonnummer oder Passnummer als PromptPay-Proxy',
];

const DOC_ROWS = [
  { label: 'Passport', labelDe: 'Reisepass', tourist: '✅', expat: '✅' },
  { label: 'Thai SIM card', labelDe: 'Thai-SIM-Karte', tourist: '❌', expat: '✅' },
  { label: 'Work permit / Non-B visa', labelDe: 'Arbeitserlaubnis / Non-B-Visum', tourist: '❌', expat: '✅' },
  { label: 'Bank account', labelDe: 'Bankkonto', tourist: '❌', expat: '✅' },
];

const BANKS = [
  {
    icon: '🏦', name: 'Bangkok Bank',
    en: ['Foreigners: ✅ Accepted', 'Minimum deposit: ฿500', 'Note: Most foreigner-friendly, English staff'],
    de: ['Ausländer: ✅ Akzeptiert', 'Mindesteinlage: ฿500', 'Hinweis: Am ausländerfreundlichsten, englischsprachiges Personal'],
  },
  {
    icon: '🏦', name: 'Kasikorn Bank (KBank)',
    en: ['Foreigners: ✅ With passport', 'App: KBank Next (excellent English UI)'],
    de: ['Ausländer: ✅ Mit Reisepass', 'App: KBank Next (sehr gute englische Oberfläche)'],
  },
  {
    icon: '🏦', name: 'SCB (Siam Commercial Bank)',
    en: ['Foreigners: ✅ Some branches', 'Easiest for business accounts'],
    de: ['Ausländer: ✅ Einige Filialen', 'Am einfachsten für Geschäftskonten'],
  },
];

const TIPS_EN = [
  'Get a Thai SIM first (AIS, DTAC, or True)',
  'Use your phone number as PromptPay proxy (easier)',
  'Enable English in your banking app',
  'Set up PromptPay on day 1 after opening your account',
];
const TIPS_DE = [
  'Hole dir zuerst eine Thai-SIM (AIS, DTAC oder True)',
  'Nutze deine Telefonnummer als PromptPay-Proxy (einfacher)',
  'Aktiviere Englisch in deiner Banking-App',
  'Richte PromptPay direkt am ersten Tag nach Kontoeröffnung ein',
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE_EN,
  description: DESC_EN,
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/thailand/promptpay-for-foreigners' },
};

export default function PromptPayForForeignersPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-foreigners-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }} />
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
          { label: locale === 'de' ? 'PromptPay für Ausländer' : 'PromptPay for Foreigners' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'PromptPay für Ausländer in Thailand' : 'PromptPay for Foreigners in Thailand'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? 'Expats und Langzeitbesucher: So bekommst du PromptPay'
            : "Expats and long-term visitors: here's how to get PromptPay"}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* Two types */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Zwei Arten von Ausländern' : 'Two Types of Foreigners'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <p className="font-semibold text-slate-900 mb-1">
                1. {locale === 'de' ? 'Touristen (Kurzbesuch)' : 'Tourists (short visit)'}
              </p>
              <p className="text-sm text-slate-600">
                →{' '}
                <Link href="/guides/thailand/promptpay-tourist-guide" className="text-blue-700 font-medium hover:underline">
                  {locale === 'de'
                    ? 'Grenzüberschreitende QR-Zahlung nutzen (siehe Touristen-Guide)'
                    : 'Use cross-border QR (see tourist guide)'}
                </Link>
              </p>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <p className="font-semibold text-slate-900 mb-1">
                2. {locale === 'de' ? 'Expats (Langzeitansässige)' : 'Expats (long-term residents)'}
              </p>
              <p className="text-sm text-slate-600">
                {locale === 'de' ? 'Können vollständiges PromptPay erhalten' : 'Can get full PromptPay'}
              </p>
            </div>
          </div>
        </section>

        {/* How to get */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Wie Expats PromptPay erhalten können' : 'How Expats Can Get PromptPay'}
          </h2>
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

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {(locale === 'de'
                    ? ['Dokument', 'Tourist', 'Expat/Arbeitserlaubnis']
                    : ['Document', 'Tourist', 'Expat/Work Permit']
                  ).map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DOC_ROWS.map((row) => (
                  <tr key={row.label} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-700">{locale === 'de' ? row.labelDe : row.label}</td>
                    <td className="px-4 py-3 text-slate-600">{row.tourist}</td>
                    <td className="px-4 py-3 text-slate-600">{row.expat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Banks */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Ausländerfreundliche thailändische Banken' : 'Foreigner-Friendly Thai Banks'}
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
            {locale === 'de' ? 'Praktische Tipps für Expats' : 'Practical Tips for Expats'}
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
              description={locale === 'de' ? 'Für Kurzzeitbesucher ohne thailändisches Bankkonto' : 'For short-term visitors without a Thai bank account'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="📖"
              name={locale === 'de' ? 'Wie man PromptPay benutzt' : 'How to Use PromptPay'}
              url="/guides/thailand/how-to-use-promptpay"
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
