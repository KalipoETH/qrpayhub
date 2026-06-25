import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SubPageGrid from '@/components/ui/SubPageGrid';
import type { SubPage } from '@/components/ui/SubPageGrid';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'Paying in Indonesia as a Tourist 2026 – QRIS & QR Payment Guide';
const TITLE_DE = 'Bezahlen in Indonesien als Tourist 2026 – QRIS & QR-Zahlungsguide';
const DESC_EN =
  'Complete guide to cashless payments in Indonesia. QRIS works with GoPay, OVO, Dana and 50+ apps. Cross-border payments for tourists from SG, MY, TH and IN.';
const DESC_DE =
  'Der komplette Guide für bargeldlose Zahlungen in Indonesien. QRIS funktioniert mit GoPay, OVO, Dana und über 50 Apps. Grenzüberschreitende Zahlungen für Touristen aus SG, MY, TH und IN.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: [
      'indonesia qr payment',
      'qris tourist',
      'paying in indonesia',
      'indonesia cashless travel',
      'qris for foreigners',
      'gopay tourist',
      'bali cashless payment',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/indonesia'),
    openGraph: buildOpenGraph(locale, '/guides/indonesia', title, description),
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
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/indonesia' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',      item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'Guides',     item: 'https://qrpayhub.com/en/guides' },
      { '@type': 'ListItem', position: 3, name: 'Indonesia',  item: 'https://qrpayhub.com/en/guides/indonesia' },
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
    title: 'How to Use QRIS',
    description: 'Step-by-step: pay, receive and scan with QRIS',
    href: '/guides/indonesia/how-to-use-qris',
  },
  {
    icon: '🌍',
    title: 'QRIS for Foreigners',
    description: 'Expats and long-term visitors: how to get full QRIS',
    href: '/guides/indonesia/qris-for-foreigners',
  },
  {
    icon: '📱',
    title: 'Indonesia QR Payment',
    description: 'How the QRIS standard technically works',
    href: '/guides/indonesia/indonesia-qr-code-payment',
  },
  {
    icon: '✈️',
    title: 'Cashless Travel',
    description: 'Going cash-free across Jakarta, Yogyakarta and beyond',
    href: '/guides/indonesia/cashless-travel-indonesia',
  },
  {
    icon: '🏖️',
    title: 'Cashless Bali Guide',
    description: 'Beach clubs, warungs and villas — paying in Bali',
    href: '/guides/indonesia/cashless-travel-bali',
  },
  {
    icon: '📷',
    title: 'How to Scan QRIS',
    description: 'Scan a QRIS code with your home banking app',
    href: '/guides/indonesia/scan-qris-qr-code',
  },
];

const SUB_PAGES_DE: SubPage[] = [
  { ...SUB_PAGES[0], title: 'Wie man QRIS benutzt', description: 'Schritt für Schritt: bezahlen, empfangen und scannen mit QRIS' },
  { ...SUB_PAGES[1], title: 'QRIS für Ausländer', description: 'Expats und Langzeitbesucher: So bekommst du vollen QRIS-Zugang' },
  { ...SUB_PAGES[2], title: 'Indonesien QR-Zahlung', description: 'Wie der QRIS-Standard technisch funktioniert' },
  { ...SUB_PAGES[3], title: 'Bargeldlos reisen', description: 'Bargeldlos durch Jakarta, Yogyakarta und mehr' },
  { ...SUB_PAGES[4], title: 'Bargeldlos auf Bali', description: 'Beach Clubs, Warungs und Villen — Bezahlen auf Bali' },
  { ...SUB_PAGES[5], title: 'QRIS scannen', description: 'Einen QRIS-Code mit deiner heimischen Banking-App scannen' },
];

const QUICK_FACTS = (locale: 'en' | 'de') => [
  { icon: '💳', value: 'QRIS', label: locale === 'de' ? 'Hauptsystem' : 'Main System' },
  { icon: '📱', value: 'GoPay · OVO · Dana', label: locale === 'de' ? 'Top-Apps' : 'Top Apps' },
  { icon: '🌍', value: '5+', label: locale === 'de' ? 'Grenzüberschreitend' : 'Cross-border' },
  { icon: '💰', value: 'Rp IDR', label: locale === 'de' ? 'Währung' : 'Currency' },
];

const CROSS_BORDER_COUNTRIES = [
  { flag: 'sg', name: 'Singapore', app: 'PayNow' },
  { flag: 'my', name: 'Malaysia', app: 'DuitNow' },
  { flag: 'th', name: 'Thailand', app: 'PromptPay' },
  { flag: 'in', name: 'India', app: 'UPI' },
  { flag: 'jp', name: 'Japan', app: 'JCB QR' },
];

const WHERE_TO_PAY = [
  { icon: '🍜', en: 'Warungs and street food (most common use case)', de: 'Warungs und Streetfood (häufigster Anwendungsfall)' },
  { icon: '🏪', en: 'Alfamart and Indomaret (everywhere in Indonesia)', de: 'Alfamart und Indomaret (überall in Indonesien)' },
  { icon: '🛵', en: 'Gojek and Grab rides', de: 'Gojek- und Grab-Fahrten' },
  { icon: '🏨', en: 'Hotels and villas (especially in Bali)', de: 'Hotels und Villen (besonders auf Bali)' },
  { icon: '🏖️', en: 'Beach clubs and restaurants (Bali, Lombok)', de: 'Beach Clubs und Restaurants (Bali, Lombok)' },
  { icon: '🛍️', en: 'Shopping malls (Grand Indonesia, Senayan City)', de: 'Einkaufszentren (Grand Indonesia, Senayan City)' },
  { icon: '⛪', en: 'Temples and tourist attractions', de: 'Tempel und Touristenattraktionen' },
  { icon: '🎫', en: 'National park entry fees', de: 'Eintrittsgebühren für Nationalparks' },
];

export default function IndonesiaGuideHubPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script
        id="json-ld-indonesia-hub"
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

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Indonesia' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-sm font-medium px-4 py-1.5 rounded-full border border-red-200">
          <Flag code="id" /> {locale === 'de' ? 'Aktualisiert Juni 2026' : 'Updated June 2026'}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          {locale === 'de' ? 'In Indonesien bezahlen als Tourist' : 'Paying in Indonesia as a Tourist'}
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
          {locale === 'de'
            ? 'Alles, was du über QRIS und bargeldlose Zahlungen in Indonesien wissen musst'
            : 'Everything you need to know about QRIS and cashless payments in Indonesia'}
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
            ? 'Indonesien bietet exzellente grenzüberschreitende QR-Zahlungsunterstützung'
            : 'Indonesia has excellent cross-border QR payment support'}
        </p>
        <p className="text-green-700 max-w-2xl mx-auto">
          {locale === 'de'
            ? 'Besucher aus Singapur, Malaysia, Thailand und Indien können QRIS-Codes direkt mit ihrer heimischen Banking-App scannen. Über 30 Millionen Händler akzeptieren QRIS landesweit.'
            : 'Visitors from Singapore, Malaysia, Thailand and India can scan QRIS codes directly with their home banking apps. 30+ million merchants accept QRIS nationwide.'}
        </p>
      </section>

      {/* ── In This Guide ────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'de' ? 'In diesem Guide' : 'In This Guide'}
        </h2>
        <SubPageGrid pages={subPages} />
      </section>

      {/* ── Can Tourists Use QRIS? ────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'de' ? 'Können Touristen QRIS nutzen?' : 'Can Tourists Use QRIS?'}
        </h2>
        <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
          {locale === 'de' ? (
            <>
              <p>
                QRIS selbst erfordert für Händler ein indonesisches Bankkonto bzw. eine Registrierung
                bei einem teilnehmenden Anbieter. Als Tourist kannst du also nicht selbst Händler
                werden – <strong>aber das Scannen und Bezahlen funktioniert in vielen Fällen hervorragend.</strong>
              </p>
              <p>
                Bank Indonesia hat mit mehreren Nachbarländern grenzüberschreitende QR-Verbindungen
                aufgebaut. Wenn dein Heimatland angeschlossen ist, scannst du den QRIS-Code eines
                indonesischen Händlers einfach mit deiner eigenen Banking-App – die Umrechnung in
                Rupiah erfolgt automatisch.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>🇸🇬 <strong>Singapur</strong> → Jede PayNow-App (DBS, OCBC, GrabPay)</li>
                <li>🇲🇾 <strong>Malaysia</strong> → DuitNow / Touch n Go</li>
                <li>🇹🇭 <strong>Thailand</strong> → PromptPay-Apps</li>
                <li>🇮🇳 <strong>Indien</strong> → UPI-Apps (PhonePe, GPay, Paytm)</li>
                <li>🇯🇵 <strong>Japan</strong> → JCB QR</li>
                <li>🇨🇳 <strong>China</strong> → Alipay, WeChat Pay</li>
              </ul>
              <p>
                <strong>Andere Touristen</strong> (USA, EU, UK, Australien usw.) können einfach{' '}
                <strong>GoPay</strong> oder <strong>OVO</strong> mit einer internationalen Kredit- oder
                Debitkarte registrieren und aufladen – beide Apps funktionieren danach an allen
                30+ Millionen QRIS-Händlern landesweit.
              </p>
            </>
          ) : (
            <>
              <p>
                QRIS itself requires merchants to hold an Indonesian bank account or be registered
                with a participating provider. As a tourist, you can&apos;t become a merchant
                yourself — <strong>but scanning and paying works great in most cases.</strong>
              </p>
              <p>
                Bank Indonesia has built cross-border QR connections with several neighboring
                countries. If your home country is connected, you can simply scan an Indonesian
                merchant&apos;s QRIS code with your own banking app — conversion to Rupiah happens
                automatically.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>🇸🇬 <strong>Singapore</strong> → Any PayNow app (DBS, OCBC, GrabPay)</li>
                <li>🇲🇾 <strong>Malaysia</strong> → DuitNow / Touch n Go</li>
                <li>🇹🇭 <strong>Thailand</strong> → PromptPay apps</li>
                <li>🇮🇳 <strong>India</strong> → UPI apps (PhonePe, GPay, Paytm)</li>
                <li>🇯🇵 <strong>Japan</strong> → JCB QR</li>
                <li>🇨🇳 <strong>China</strong> → Alipay, WeChat Pay</li>
              </ul>
              <p>
                <strong>Other tourists</strong> (US, EU, UK, Australia, etc.) can simply download{' '}
                <strong>GoPay</strong> or <strong>OVO</strong>, register with an international credit
                or debit card, and top up — both apps then work at all 30+ million QRIS merchants
                nationwide.
              </p>
            </>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
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

      {/* ── Why QRIS is Special ──────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'de' ? 'Warum QRIS besonders ist' : 'Why QRIS is Special'}
        </h2>
        <div className="text-slate-600 leading-relaxed text-[15px] space-y-3">
          {locale === 'de' ? (
            <>
              <p>
                <strong>Vor QRIS:</strong> Jede App hatte ihren eigenen QR-Code — GoPay-QR, OVO-QR,
                Dana-QR. Händler mussten mehrere Aufkleber am Tresen anbringen.
              </p>
              <p>
                <strong>Nach QRIS:</strong> EIN Code funktioniert mit ALLEN Apps. Bank Indonesia
                machte QRIS 2020 verpflichtend für alle Zahlungsanbieter.
              </p>
              <p>Heute sind über 30 Millionen Händler registriert — von Streetfood-Warungs bis zu Beach Clubs auf Bali.</p>
            </>
          ) : (
            <>
              <p>
                <strong>Before QRIS:</strong> Every app had its own QR code — GoPay QR, OVO QR, Dana
                QR. Merchants needed multiple stickers at the counter.
              </p>
              <p>
                <strong>After QRIS:</strong> ONE code works with ALL apps. Bank Indonesia mandated
                QRIS for every payment provider in 2020.
              </p>
              <p>Today, over 30 million merchants are registered — from street warungs to beach clubs in Bali.</p>
            </>
          )}
        </div>
      </section>

      {/* ── Where to Pay ─────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'de' ? 'Wo man in Indonesien mit QRIS bezahlen kann' : 'Where to Pay with QRIS in Indonesia'}
        </h2>
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
            ? 'Bist du Händler oder empfängst Zahlungen in Indonesien?'
            : 'Are you a merchant or receiving payments in Indonesia?'}
        </p>
        <Link
          href="/qris/generator"
          className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
          style={{ backgroundColor: '#1A56DB' }}
        >
          {locale === 'de' ? 'QRIS-Code erstellen →' : 'Generate your QRIS code →'}
        </Link>
      </section>

      {/* ── Related Guides ────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'de' ? 'Weitere Reiseguides' : 'Related Guides'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { flag: 'th', href: '/guides/thailand' as `/${string}`, name: locale === 'de' ? 'Bezahlen in Thailand' : 'Paying in Thailand' },
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
