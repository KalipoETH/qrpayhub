import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SubPageGrid from '@/components/ui/SubPageGrid';
import type { SubPage } from '@/components/ui/SubPageGrid';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'Tourist Payment Guides – QR Payments in Every Country | QRPayHub';
const TITLE_DE = 'Touristen-Zahlungsguides – QR-Zahlungen in jedem Land | QRPayHub';
const DESC_EN =
  'Country-by-country guides for tourists: how to use QR payment systems in Thailand, Indonesia, India, Brazil, Singapore and more.';
const DESC_DE =
  'Länderweise Guides für Touristen: Wie man QR-Zahlungssysteme in Thailand, Indonesien, Indien, Brasilien, Singapur und mehr nutzt.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title,
    description,
    keywords: ['travel payment guides', 'qr payment by country', 'tourist payment guide', 'thailand payment guide'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides'),
    openGraph: buildOpenGraph(locale, '/guides', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

function Flag({ code, className = '' }: { code: string; className?: string }) {
  return (
    <span
      className={`fi fi-${code} ${className}`}
      style={{ width: '1.2em', height: '0.9em', display: 'inline-block', backgroundSize: 'cover', borderRadius: '2px', verticalAlign: 'middle' }}
    />
  );
}

const THAILAND_GUIDES: SubPage[] = [
  { icon: '🇹🇭', title: 'Thailand Hub', description: 'Start here — everything about paying in Thailand', href: '/guides/thailand' },
  { icon: '📖', title: 'How to Use PromptPay', description: 'Step-by-step instructions', href: '/guides/thailand/how-to-use-promptpay' },
  { icon: '🗺️', title: 'Tourist Guide', description: 'Can tourists use PromptPay?', href: '/guides/thailand/promptpay-tourist-guide' },
  { icon: '📱', title: 'Thai QR Code Payment', description: 'The technical standard explained', href: '/guides/thailand/thai-qr-code-payment' },
  { icon: '🌍', title: 'PromptPay for Foreigners', description: 'Expats and long-term visitors', href: '/guides/thailand/promptpay-for-foreigners' },
  { icon: '✈️', title: 'Cashless Travel Guide', description: 'Going cash-free across Thailand', href: '/guides/thailand/cashless-travel-thailand' },
  { icon: '📷', title: 'How to Scan Thai QR', description: 'Scan with your home banking app', href: '/guides/thailand/scan-thai-qr-code' },
];

const THAILAND_GUIDES_DE: SubPage[] = [
  { ...THAILAND_GUIDES[0], title: 'Thailand Hub', description: 'Hier starten — alles über Bezahlen in Thailand' },
  { ...THAILAND_GUIDES[1], title: 'Wie man PromptPay benutzt', description: 'Schritt-für-Schritt-Anleitung' },
  { ...THAILAND_GUIDES[2], title: 'Touristen-Guide', description: 'Können Touristen PromptPay nutzen?' },
  { ...THAILAND_GUIDES[3], title: 'Thai QR-Code-Zahlung', description: 'Der technische Standard erklärt' },
  { ...THAILAND_GUIDES[4], title: 'PromptPay für Ausländer', description: 'Expats und Langzeitbesucher' },
  { ...THAILAND_GUIDES[5], title: 'Bargeldlos reisen', description: 'Bargeldlos durch Thailand' },
  { ...THAILAND_GUIDES[6], title: 'Thai QR scannen', description: 'Mit deiner heimischen Banking-App scannen' },
];

const INDONESIA_GUIDES: SubPage[] = [
  { icon: '🇮🇩', title: 'Indonesia Hub', description: 'Start here — everything about paying in Indonesia', href: '/guides/indonesia' },
  { icon: '📖', title: 'How to Use QRIS', description: 'Step-by-step instructions', href: '/guides/indonesia/how-to-use-qris' },
  { icon: '🗺️', title: 'Tourist Guide', description: 'Can tourists use QRIS?', href: '/guides/indonesia/qris-tourist-guide' },
  { icon: '📱', title: 'Indonesia QR Payment', description: 'The technical QRIS standard explained', href: '/guides/indonesia/indonesia-qr-code-payment' },
  { icon: '🌍', title: 'QRIS for Foreigners', description: 'Expats and long-term visitors', href: '/guides/indonesia/qris-for-foreigners' },
  { icon: '✈️', title: 'Cashless Travel', description: 'Going cash-free across Indonesia', href: '/guides/indonesia/cashless-travel-indonesia' },
  { icon: '🏖️', title: 'Cashless Bali Guide', description: 'Beach clubs, warungs and villas', href: '/guides/indonesia/cashless-travel-bali' },
  { icon: '📷', title: 'How to Scan QRIS', description: 'Scan with your home banking app', href: '/guides/indonesia/scan-qris-qr-code' },
];

const INDONESIA_GUIDES_DE: SubPage[] = [
  { ...INDONESIA_GUIDES[0], title: 'Indonesien Hub', description: 'Hier starten — alles über Bezahlen in Indonesien' },
  { ...INDONESIA_GUIDES[1], title: 'Wie man QRIS benutzt', description: 'Schritt-für-Schritt-Anleitung' },
  { ...INDONESIA_GUIDES[2], title: 'Touristen-Guide', description: 'Können Touristen QRIS nutzen?' },
  { ...INDONESIA_GUIDES[3], title: 'Indonesien QR-Zahlung', description: 'Der technische QRIS-Standard erklärt' },
  { ...INDONESIA_GUIDES[4], title: 'QRIS für Ausländer', description: 'Expats und Langzeitbesucher' },
  { ...INDONESIA_GUIDES[5], title: 'Bargeldlos reisen', description: 'Bargeldlos durch Indonesien' },
  { ...INDONESIA_GUIDES[6], title: 'Bargeldlos auf Bali', description: 'Beach Clubs, Warungs und Villen' },
  { ...INDONESIA_GUIDES[7], title: 'QRIS scannen', description: 'Mit deiner heimischen Banking-App scannen' },
];

const INDIA_GUIDES: SubPage[] = [
  { icon: '🇮🇳', title: 'India Hub', description: 'Start here — everything about paying in India', href: '/guides/india' },
  { icon: '📖', title: 'How to Use UPI', description: 'Step-by-step instructions', href: '/guides/india/how-to-use-upi' },
  { icon: '🌍', title: 'UPI Tourist Guide', description: 'Can foreigners use UPI?', href: '/guides/india/upi-tourist-guide' },
  { icon: '📱', title: 'India QR Payment', description: 'The technical UPI QR format explained', href: '/guides/india/india-qr-code-payment' },
  { icon: '🤳', title: 'UPI for Foreigners', description: 'Expats and NRIs', href: '/guides/india/upi-for-foreigners' },
  { icon: '✈️', title: 'Cashless Travel', description: 'Going cash-free across India', href: '/guides/india/cashless-travel-india' },
  { icon: '📷', title: 'Scan UPI QR Code', description: 'Scan with PhonePe, GPay or Paytm', href: '/guides/india/scan-upi-qr-code' },
  { icon: '📊', title: 'UPI Apps Comparison', description: 'PhonePe vs Google Pay vs Paytm vs BHIM', href: '/guides/india/upi-apps-comparison' },
];

const INDIA_GUIDES_DE: SubPage[] = [
  { ...INDIA_GUIDES[0], title: 'Indien Hub', description: 'Hier starten — alles über Bezahlen in Indien' },
  { ...INDIA_GUIDES[1], title: 'Wie man UPI benutzt', description: 'Schritt-für-Schritt-Anleitung' },
  { ...INDIA_GUIDES[2], title: 'UPI Touristen-Guide', description: 'Können Ausländer UPI nutzen?' },
  { ...INDIA_GUIDES[3], title: 'Indien QR-Zahlung', description: 'Das technische UPI-QR-Format erklärt' },
  { ...INDIA_GUIDES[4], title: 'UPI für Ausländer', description: 'Expats und NRIs' },
  { ...INDIA_GUIDES[5], title: 'Bargeldlos reisen', description: 'Bargeldlos durch Indien' },
  { ...INDIA_GUIDES[6], title: 'UPI-QR scannen', description: 'Mit PhonePe, GPay oder Paytm scannen' },
  { ...INDIA_GUIDES[7], title: 'UPI-Apps im Vergleich', description: 'PhonePe vs Google Pay vs Paytm vs BHIM' },
];

const COMING_SOON = [
  { flag: 'br', en: 'Brazil', de: 'Brasilien' },
  { flag: 'sg', en: 'Singapore', de: 'Singapur' },
  { flag: 'my', en: 'Malaysia', de: 'Malaysia' },
  { flag: 'hk', en: 'Hong Kong', de: 'Hongkong' },
  { flag: 'vn', en: 'Vietnam', de: 'Vietnam' },
  { flag: 'ph', en: 'Philippines', de: 'Philippinen' },
  { flag: 'mx', en: 'Mexico', de: 'Mexiko' },
  { flag: 'eu', en: 'Europe', de: 'Europa' },
  { flag: 'ch', en: 'Switzerland', de: 'Schweiz' },
];

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: TITLE_EN,
  description: DESC_EN,
  url: 'https://qrpayhub.com/en/guides',
};

export default function GuidesHubPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-guides-hub" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <PageContent locale={locale} />
    </>
  );
}

function PageContent({ locale }: { locale: 'en' | 'de' }) {
  const thailandGuides = locale === 'de' ? THAILAND_GUIDES_DE : THAILAND_GUIDES;
  const indonesiaGuides = locale === 'de' ? INDONESIA_GUIDES_DE : INDONESIA_GUIDES;
  const indiaGuides     = locale === 'de' ? INDIA_GUIDES_DE    : INDIA_GUIDES;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Guides' }]} />

      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          {locale === 'de' ? 'Bezahle wie ein Local – wo immer du reist 🌍' : 'Pay Like a Local – Wherever You Travel 🌍'}
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
          {locale === 'de'
            ? 'Länderweise Guides für QR-Zahlungen, lokale Banking-Apps und bargeldloses Reisen.'
            : 'Country-by-country guides for QR payments, local banking apps and cashless travel.'}
        </p>
      </section>

      {/* Thailand — live */}
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <Flag code="th" className="text-2xl" />
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {locale === 'de' ? 'Thailand' : 'Thailand'}
          </h2>
          <span className="text-xs font-medium bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">
            {locale === 'de' ? 'Live' : 'Live'}
          </span>
        </div>
        <SubPageGrid pages={thailandGuides} />
      </section>

      {/* Indonesia — live */}
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <Flag code="id" className="text-2xl" />
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {locale === 'de' ? 'Indonesien' : 'Indonesia'}
          </h2>
          <span className="text-xs font-medium bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">
            {locale === 'de' ? 'Live' : 'Live'}
          </span>
        </div>
        <SubPageGrid pages={indonesiaGuides} />
      </section>

      {/* India — live */}
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <Flag code="in" className="text-2xl" />
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {locale === 'de' ? 'Indien' : 'India'}
          </h2>
          <span className="text-xs font-medium bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">
            {locale === 'de' ? 'Live' : 'Live'}
          </span>
        </div>
        <SubPageGrid pages={indiaGuides} />
      </section>

      {/* Coming soon */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'de' ? 'Demnächst' : 'Coming Soon'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {COMING_SOON.map(({ flag, en, de }) => (
            <div
              key={flag}
              className="relative bg-slate-50 border border-slate-100 rounded-2xl p-4 opacity-60 select-none flex items-center gap-2.5"
            >
              <Flag code={flag} className="text-xl flex-shrink-0" />
              <span className="text-sm font-medium text-slate-600">{locale === 'de' ? de : en}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
