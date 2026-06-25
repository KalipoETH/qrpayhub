import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SubPageGrid from '@/components/ui/SubPageGrid';
import type { SubPage } from '@/components/ui/SubPageGrid';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'Paying in Thailand as a Tourist 2026 – Complete QR Payment Guide';
const TITLE_DE = 'Bezahlen in Thailand als Tourist 2026 – Der komplette QR-Zahlungsguide';
const DESC_EN =
  'Complete guide to cashless payments in Thailand. PromptPay QR codes, tourist-friendly apps, cross-border payments from Singapore, Malaysia and India.';
const DESC_DE =
  'Der komplette Guide für bargeldlose Zahlungen in Thailand. PromptPay QR-Codes, touristenfreundliche Apps, grenzüberschreitende Zahlungen aus Singapur, Malaysia und Indien.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: [
      'thailand qr payment',
      'promptpay tourist',
      'paying in thailand',
      'thailand cashless travel',
      'promptpay for foreigners',
      'thai qr code payment',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/thailand'),
    openGraph: buildOpenGraph(locale, '/guides/thailand', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE_EN,
  description: DESC_EN,
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/thailand' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',     item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'Guides',    item: 'https://qrpayhub.com/en/guides' },
      { '@type': 'ListItem', position: 3, name: 'Thailand',  item: 'https://qrpayhub.com/en/guides/thailand' },
    ],
  },
};

function Flag({ code, className = '' }: { code: string; className?: string }) {
  return (
    <span
      className={`fi fi-${code} ${className}`}
      style={{ width: '1.2em', height: '0.9em', display: 'inline-block', backgroundSize: 'cover', borderRadius: '2px', verticalAlign: 'middle' }}
    />
  );
}

const SUB_PAGES: SubPage[] = [
  {
    icon: '📖',
    title: 'How to Use PromptPay',
    description: 'Step-by-step: send, receive and pay with PromptPay',
    href: '/guides/thailand/how-to-use-promptpay',
  },
  {
    icon: '🌍',
    title: 'PromptPay for Foreigners',
    description: 'Expats and long-term visitors: how to register PromptPay',
    href: '/guides/thailand/promptpay-for-foreigners',
  },
  {
    icon: '📱',
    title: 'Thai QR Code Payment',
    description: 'How the Thai QR payment standard technically works',
    href: '/guides/thailand/thai-qr-code-payment',
  },
  {
    icon: '✈️',
    title: 'Cashless Travel Guide',
    description: 'Going cash-free across Bangkok, Phuket and Chiang Mai',
    href: '/guides/thailand/cashless-travel-thailand',
  },
  {
    icon: '📷',
    title: 'How to Scan Thai QR',
    description: 'Scan a Thai QR code with your home banking app',
    href: '/guides/thailand/scan-thai-qr-code',
  },
  {
    icon: '🗺️',
    title: 'Tourist Guide',
    description: 'Can tourists use PromptPay? The honest answer',
    href: '/guides/thailand/promptpay-tourist-guide',
  },
];

const SUB_PAGES_DE: SubPage[] = [
  { ...SUB_PAGES[0], title: 'Wie man PromptPay benutzt', description: 'Schritt für Schritt: Geld senden, empfangen und bezahlen mit PromptPay' },
  { ...SUB_PAGES[1], title: 'PromptPay für Ausländer', description: 'Expats und Langzeitbesucher: So registrierst du PromptPay' },
  { ...SUB_PAGES[2], title: 'Thai QR-Code-Zahlung', description: 'Wie der thailändische QR-Zahlungsstandard technisch funktioniert' },
  { ...SUB_PAGES[3], title: 'Bargeldlos reisen', description: 'Bargeldlos durch Bangkok, Phuket und Chiang Mai' },
  { ...SUB_PAGES[4], title: 'Thai QR scannen', description: 'Einen thailändischen QR-Code mit deiner Banking-App scannen' },
  { ...SUB_PAGES[5], title: 'Touristen-Guide', description: 'Können Touristen PromptPay nutzen? Die ehrliche Antwort' },
];

const QUICK_FACTS = (locale: 'en' | 'de') => [
  { icon: '💳', value: 'PromptPay', label: locale === 'de' ? 'Hauptzahlungssystem' : 'Main Payment System' },
  { icon: '📱', value: 'BBL · KBank · SCB', label: locale === 'de' ? 'Beliebteste Apps' : 'Most Popular Apps' },
  { icon: '🌍', value: '4+', label: locale === 'de' ? 'Grenzüberschreitende Länder' : 'Cross-border Countries' },
  { icon: '💰', value: '฿ THB', label: locale === 'de' ? 'Währung' : 'Currency' },
];

const CROSS_BORDER_COUNTRIES = [
  { flag: 'sg', name: 'Singapore', app: 'PayNow' },
  { flag: 'my', name: 'Malaysia', app: 'DuitNow' },
  { flag: 'in', name: 'India', app: 'UPI' },
  { flag: 'id', name: 'Indonesia', app: 'QRIS' },
];

const WHERE_TO_PAY = [
  { icon: '🍜', en: 'Street food & markets (most common)', de: 'Streetfood & Märkte (am häufigsten)' },
  { icon: '🏪', en: "7-Eleven, Lotus's, Big C", de: "7-Eleven, Lotus's, Big C" },
  { icon: '🚕', en: 'Grab, Bolt taxis', de: 'Grab- und Bolt-Taxis' },
  { icon: '🏨', en: 'Hotels and guesthouses', de: 'Hotels und Guesthouses' },
  { icon: '🛍️', en: 'Shopping malls (CentralWorld, MBK, ICON SIAM)', de: 'Einkaufszentren (CentralWorld, MBK, ICON SIAM)' },
  { icon: '🏖️', en: 'Beach vendors in Phuket, Koh Samui, Pattaya', de: 'Strandverkäufer in Phuket, Koh Samui, Pattaya' },
  { icon: '⛩️', en: 'Temples (donation boxes)', de: 'Tempel (Spendenboxen)' },
];

export default function ThailandGuideHubPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script
        id="json-ld-thailand-hub"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }}
      />
      <PageContent locale={locale} />
    </>
  );
}

function PageContent({ locale }: { locale: 'en' | 'de' }) {
  const facts = QUICK_FACTS(locale);
  const subPages = locale === 'de' ? SUB_PAGES_DE : SUB_PAGES;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: locale === 'de' ? 'Guides' : 'Guides', href: '/guides' },
          { label: 'Thailand' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full border border-blue-200">
          <Flag code="th" /> {locale === 'de' ? 'Aktualisiert Juni 2026' : 'Updated June 2026'}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          {locale === 'de' ? 'In Thailand bezahlen als Tourist' : 'Paying in Thailand as a Tourist'}
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
          {locale === 'de'
            ? 'Alles, was du über bargeldlose Zahlungen in Thailand wissen musst'
            : 'Everything you need to know about cashless payments in Thailand'}
        </p>
      </section>

      {/* ── Quick Facts ──────────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {facts.map(({ icon, value, label }) => (
          <div key={label} className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm">
            <div className="text-3xl mb-2">{icon}</div>
            <div className="text-lg font-bold text-slate-900">{value}</div>
            <div className="text-sm text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </section>

      {/* ── Tourist-Friendly Banner ──────────────────────────────────────── */}
      <section className="bg-green-50 border border-green-200 rounded-2xl p-6 sm:p-8 text-center space-y-3">
        <p className="text-xl font-bold text-green-800">
          ✅ {locale === 'de'
            ? 'Thailand ist sehr touristenfreundlich für QR-Zahlungen'
            : 'Thailand is highly tourist-friendly for QR payments'}
        </p>
        <p className="text-green-700 max-w-2xl mx-auto">
          {locale === 'de'
            ? 'Besucher aus Singapur, Malaysia, Indien und Indonesien können bei thailändischen Händlern mit ihrer heimischen Banking-App bezahlen – kein thailändisches Bankkonto nötig.'
            : 'Visitors from Singapore, Malaysia, India and Indonesia can pay at Thai merchants using their home banking apps – no Thai bank account needed.'}
        </p>
      </section>

      {/* ── In This Guide ────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'de' ? 'In diesem Guide' : 'In This Guide'}
        </h2>
        <SubPageGrid pages={subPages} />
      </section>

      {/* ── Can Tourists Use PromptPay? ──────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'de' ? 'Können Touristen PromptPay nutzen?' : 'Can Tourists Use PromptPay?'}
        </h2>
        <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
          {locale === 'de' ? (
            <>
              <p>
                Die kurze Antwort lautet: <strong>nicht direkt registrieren</strong>, aber <strong>oft trotzdem bezahlen</strong>.
                PromptPay selbst erfordert ein thailändisches Bankkonto und eine thailändische Telefonnummer oder
                nationale ID, um einen eigenen PromptPay-Schlüssel zu registrieren. Als kurzzeitiger Tourist kannst
                du dich also nicht offiziell bei PromptPay anmelden.
              </p>
              <p>
                Der entscheidende Unterschied ist jedoch das <strong>grenzüberschreitende QR-Zahlungsnetzwerk</strong>,
                das die Bank of Thailand mit mehreren Partnerländern aufgebaut hat. Wenn dein Heimatland an dieses
                Netzwerk angeschlossen ist, kannst du den PromptPay-QR-Code eines thailändischen Händlers direkt mit
                deiner eigenen Banking-App scannen – die Umrechnung in Baht erfolgt automatisch, und das Geld kommt
                sofort beim Händler an.
              </p>
              <p>Folgende Länder können direkt bei thailändischen Händlern bezahlen:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>🇸🇬 <strong>Singapur</strong> → PayNow-App</li>
                <li>🇲🇾 <strong>Malaysia</strong> → DuitNow-App (Touch n Go)</li>
                <li>🇮🇳 <strong>Indien</strong> → UPI-Apps (PhonePe, GPay, Paytm)</li>
                <li>🇮🇩 <strong>Indonesien</strong> → QRIS-Apps (GoPay, OVO, Dana)</li>
                <li>🇯🇵 <strong>Japan</strong> → JCB QR</li>
                <li>🇨🇳 <strong>China</strong> → WeChat Pay, Alipay</li>
              </ul>
              <p>
                Für westliche Touristen aus den USA, der EU, Großbritannien oder Australien gibt es kein direktes
                Banking-App-Pendant im PromptPay-Netzwerk. Die praktikabelsten Alternativen sind eine{' '}
                <strong>Wise-Karte</strong>, <strong>Revolut</strong> oder die internationale Version von{' '}
                <strong>WeChat Pay</strong>, die alle an thailändischen Kartenterminals und teilweise an QR-Ständen
                funktionieren.
              </p>
            </>
          ) : (
            <>
              <p>
                The short answer is: you <strong>can&apos;t register directly</strong>, but you <strong>can often still
                pay</strong>. PromptPay itself requires a Thai bank account and a Thai phone number or National ID to
                register your own PromptPay key — so as a short-term tourist, you can&apos;t officially sign up for it.
              </p>
              <p>
                The key difference is the <strong>cross-border QR payment network</strong> the Bank of Thailand has
                built with several partner countries. If your home country is connected to this network, you can scan
                a Thai merchant&apos;s PromptPay QR code directly with your own banking app — the conversion to Baht
                happens automatically, and the merchant receives the money instantly.
              </p>
              <p>The following countries can pay directly at Thai merchants:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>🇸🇬 <strong>Singapore</strong> → PayNow app</li>
                <li>🇲🇾 <strong>Malaysia</strong> → DuitNow app (Touch n Go)</li>
                <li>🇮🇳 <strong>India</strong> → UPI apps (PhonePe, GPay, Paytm)</li>
                <li>🇮🇩 <strong>Indonesia</strong> → QRIS apps (GoPay, OVO, Dana)</li>
                <li>🇯🇵 <strong>Japan</strong> → JCB QR</li>
                <li>🇨🇳 <strong>China</strong> → WeChat Pay, Alipay</li>
              </ul>
              <p>
                Western tourists from the US, EU, UK or Australia don&apos;t have a direct banking-app equivalent
                inside the PromptPay network. The most practical alternatives are a <strong>Wise card</strong>,{' '}
                <strong>Revolut</strong>, or the international version of <strong>WeChat Pay</strong>, all of which
                work at Thai card terminals and, in some cases, at QR stands too.
              </p>
            </>
          )}
        </div>

        {/* Cross-border country cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {CROSS_BORDER_COUNTRIES.map(({ flag, name, app }) => (
            <div key={flag} className="bg-white border border-slate-100 rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <Flag code={flag} className="text-3xl flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 text-sm">{name}</p>
                <p className="text-xs text-slate-500">{app}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Where to Pay with QR ─────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'de' ? 'Wo man in Thailand mit QR bezahlen kann' : 'Where to Pay with QR in Thailand'}
        </h2>
        <p className="text-slate-600 leading-relaxed text-[15px]">
          {locale === 'de'
            ? 'QR-Zahlungen sind in praktisch jedem Geschäft in Thailand verfügbar, das einen festen Standort hat. Das PromptPay-Logo oder das rot-weiße "Thai QR Payment"-Logo findet sich an folgenden Orten:'
            : 'QR payments are available at virtually every business in Thailand with a fixed location. Look for the PromptPay logo or the red-and-white "Thai QR Payment" logo at:'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {WHERE_TO_PAY.map(({ icon, en, de }) => (
            <div key={en} className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
              <span className="text-2xl flex-shrink-0">{icon}</span>
              <span className="text-sm text-slate-700 font-medium">{locale === 'de' ? de : en}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Generator CTA ────────────────────────────────────────────────── */}
      <section className="bg-blue-50 border border-blue-100 rounded-2xl p-6 sm:p-8 text-center space-y-3">
        <p className="font-semibold text-blue-900 text-lg">
          {locale === 'de'
            ? 'Bist du Händler oder empfängst Zahlungen in Thailand?'
            : 'Are you a merchant or receiving payments in Thailand?'}
        </p>
        <Link
          href="/promptpay/generator"
          className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
          style={{ backgroundColor: '#1A56DB' }}
        >
          {locale === 'de' ? 'PromptPay QR-Code erstellen →' : 'Generate your PromptPay QR code →'}
        </Link>
      </section>

      {/* ── Related Guides (other countries) ─────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'de' ? 'Weitere Reiseguides' : 'Related Guides'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { flag: 'id', href: '/guides/indonesia' as `/${string}`, name: locale === 'de' ? 'Bezahlen in Indonesien' : 'Paying in Indonesia' },
            { flag: 'in', href: '/guides/india' as `/${string}`, name: locale === 'de' ? 'Bezahlen in Indien' : 'Paying in India' },
          ].map(({ flag, href, name }) => (
            <Link
              key={flag}
              href={href}
              className="relative bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:border-blue-100 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3"
            >
              <Flag code={flag} className="text-2xl flex-shrink-0" />
              <span className="text-sm font-medium text-slate-700">{name}</span>
            </Link>
          ))}
          {[
            { flag: 'sg', name: locale === 'de' ? 'Bezahlen in Singapur' : 'Paying in Singapore' },
            { flag: 'my', name: locale === 'de' ? 'Bezahlen in Malaysia' : 'Paying in Malaysia' },
          ].map(({ flag, name }) => (
            <div
              key={flag}
              className="relative bg-slate-50 border border-slate-100 rounded-2xl p-5 opacity-60 select-none flex items-center gap-3"
            >
              <Flag code={flag} className="text-2xl flex-shrink-0" />
              <span className="text-sm font-medium text-slate-600">{name}</span>
              <span className="absolute top-3 right-3 text-xs font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                {locale === 'de' ? 'Demnächst' : 'Coming Soon'}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
