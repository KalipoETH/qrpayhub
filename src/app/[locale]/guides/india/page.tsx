import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SubPageGrid from '@/components/ui/SubPageGrid';
import type { SubPage } from '@/components/ui/SubPageGrid';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'Paying in India as a Tourist 2026 – UPI QR Payment Complete Guide';
const TITLE_DE = 'Bezahlen in Indien als Tourist 2026 – Der komplette UPI-QR-Zahlungsguide';
const DESC_EN =
  'Complete guide to UPI payments in India. 10 billion monthly transactions, PhonePe, Google Pay and Paytm. How tourists can pay with QR codes in India.';
const DESC_DE =
  'Der komplette Guide für UPI-Zahlungen in Indien. 10 Milliarden monatliche Transaktionen, PhonePe, Google Pay und Paytm. Wie Touristen in Indien mit QR-Codes bezahlen können.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: [
      'india qr payment',
      'upi tourist',
      'paying in india',
      'india cashless travel',
      'upi for foreigners',
      'phonepe tourist',
      'g20 upi',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/india'),
    openGraph: buildOpenGraph(locale, '/guides/india', title, description),
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
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/india' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',   item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'Guides',  item: 'https://qrpayhub.com/en/guides' },
      { '@type': 'ListItem', position: 3, name: 'India',   item: 'https://qrpayhub.com/en/guides/india' },
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
  { icon: '📖', title: 'How to Use UPI', description: 'Step-by-step: scan, pay and send with UPI', href: '/guides/india/how-to-use-upi' },
  { icon: '🌍', title: 'UPI Tourist Guide', description: 'Can foreigners use UPI? The 2023 G20 update', href: '/guides/india/upi-tourist-guide' },
  { icon: '📱', title: 'India QR Payment', description: 'How the UPI QR format technically works', href: '/guides/india/india-qr-code-payment' },
  { icon: '🤳', title: 'UPI for Foreigners', description: 'Expats and NRIs: how to get full UPI access', href: '/guides/india/upi-for-foreigners' },
  { icon: '✈️', title: 'Cashless Travel India', description: 'Going cash-free across Mumbai, Delhi and Goa', href: '/guides/india/cashless-travel-india' },
  { icon: '📷', title: 'Scan UPI QR Code', description: 'Scan a UPI code with PhonePe, GPay or Paytm', href: '/guides/india/scan-upi-qr-code' },
  { icon: '📊', title: 'UPI Apps Comparison', description: 'PhonePe vs Google Pay vs Paytm vs BHIM', href: '/guides/india/upi-apps-comparison' },
];

const SUB_PAGES_DE: SubPage[] = [
  { ...SUB_PAGES[0], title: 'Wie man UPI benutzt', description: 'Schritt für Schritt: scannen, bezahlen und senden mit UPI' },
  { ...SUB_PAGES[1], title: 'UPI Touristen-Guide', description: 'Können Ausländer UPI nutzen? Das G20-Update von 2023' },
  { ...SUB_PAGES[2], title: 'Indien QR-Zahlung', description: 'Wie das UPI-QR-Format technisch funktioniert' },
  { ...SUB_PAGES[3], title: 'UPI für Ausländer', description: 'Expats und NRIs: So bekommst du vollen UPI-Zugang' },
  { ...SUB_PAGES[4], title: 'Bargeldlos reisen', description: 'Bargeldlos durch Mumbai, Delhi und Goa' },
  { ...SUB_PAGES[5], title: 'UPI-QR scannen', description: 'Einen UPI-Code mit PhonePe, GPay oder Paytm scannen' },
  { ...SUB_PAGES[6], title: 'UPI-Apps im Vergleich', description: 'PhonePe vs Google Pay vs Paytm vs BHIM' },
];

const QUICK_FACTS = (locale: 'en' | 'de') => [
  { icon: '💳', value: 'UPI', label: locale === 'de' ? 'Hauptsystem' : 'Main System' },
  { icon: '📱', value: 'PhonePe · GPay · Paytm', label: locale === 'de' ? 'Top-Apps' : 'Top Apps' },
  { icon: '🌍', value: 'SG · UAE · UK · FR', label: locale === 'de' ? 'Grenzüberschreitend' : 'Cross-border' },
  { icon: '💰', value: '₹ INR', label: locale === 'de' ? 'Währung' : 'Currency' },
];

const WHERE_ACCEPTED = [
  { icon: '🏪', en: 'Kirana stores and supermarkets (everywhere)', de: 'Kirana-Läden und Supermärkte (überall)' },
  { icon: '🍛', en: 'Restaurants and dhabas', de: 'Restaurants und Dhabas' },
  { icon: '🛺', en: 'Auto-rickshaws and taxis', de: 'Auto-Rikschas und Taxis' },
  { icon: '🏨', en: 'Hotels and guesthouses', de: 'Hotels und Pensionen' },
  { icon: '✈️', en: 'Airports and railway stations', de: 'Flughäfen und Bahnhöfe' },
  { icon: '🏛️', en: 'Tourist attractions and monuments', de: 'Touristenattraktionen und Denkmäler' },
  { icon: '🛍️', en: 'Markets (Chandni Chowk, Colaba Causeway, etc.)', de: 'Märkte (Chandni Chowk, Colaba Causeway usw.)' },
  { icon: '📱', en: 'Online shopping (Amazon IN, Flipkart)', de: 'Online-Shopping (Amazon IN, Flipkart)' },
];

export default function IndiaGuideHubPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-india-hub" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }} />
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
          { label: 'India' },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 text-sm font-medium px-4 py-1.5 rounded-full border border-orange-200">
          <Flag code="in" /> {locale === 'de' ? 'Aktualisiert Juni 2026' : 'Updated June 2026'}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          {locale === 'de' ? 'In Indien bezahlen als Tourist' : 'Paying in India as a Tourist'}
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
          {locale === 'de'
            ? 'UPI – das größte Echtzeit-Zahlungssystem der Welt'
            : "UPI – the world's largest real-time payment system"}
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

      {/* ── Reality Check Banner ─────────────────────────────────────────── */}
      <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 text-center space-y-3">
        <p className="text-xl font-bold text-amber-800">
          ⚠️ {locale === 'de' ? 'UPI hat eingeschränkten Touristenzugang' : 'UPI has limited tourist access'}
        </p>
        <p className="text-amber-700 max-w-2xl mx-auto">
          {locale === 'de'
            ? 'Standard-UPI erfordert ein indisches Bankkonto. Seit 2023 können Besucher aus G20-Ländern UPI jedoch mit internationalen SIM-Karten nutzen. Hier erfährst du genau, was funktioniert.'
            : "Standard UPI requires an Indian bank account. However, since 2023, visitors from G20 countries can use UPI with international SIM cards. Here's exactly what works."}
        </p>
      </section>

      {/* ── In This Guide ────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'de' ? 'In diesem Guide' : 'In This Guide'}
        </h2>
        <SubPageGrid pages={subPages} />
      </section>

      {/* ── UPI Revolution ───────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'de' ? 'UPI – Indiens Zahlungsrevolution' : "UPI – India's Payment Revolution"}
        </h2>
        <div className="text-slate-600 leading-relaxed text-[15px] space-y-3">
          {locale === 'de' ? (
            <>
              <p>
                Die NPCI (National Payments Corporation of India) führte UPI 2016 ein. Heute
                verarbeitet das System über <strong>10 Milliarden Transaktionen pro Monat</strong> —
                Indien macht damit <strong>46% aller Echtzeitzahlungen weltweit</strong> aus.
              </p>
              <p>
                Über 500 Banken sind an das UPI-Netzwerk angeschlossen. Für Verbraucher ist UPI
                komplett kostenlos und funktioniert 24 Stunden am Tag, 7 Tage die Woche,
                365 Tage im Jahr — auch an Bankfeiertagen.
              </p>
            </>
          ) : (
            <>
              <p>
                NPCI (National Payments Corporation of India) launched UPI in 2016. Today the
                system processes over <strong>10 billion transactions per month</strong> —
                India accounts for <strong>46% of all real-time payments globally</strong>.
              </p>
              <p>
                Over 500 banks are connected to the UPI network. UPI is completely free for
                consumers and works 24 hours a day, 7 days a week, 365 days a year — including
                bank holidays.
              </p>
            </>
          )}
        </div>
      </section>

      {/* ── Can Tourists Use UPI? ─────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'de' ? 'Können Touristen UPI nutzen?' : 'Can Tourists Use UPI?'}
        </h2>
        <div className="text-slate-600 leading-relaxed text-[15px] space-y-3">
          {locale === 'de' ? (
            <>
              <p>
                <strong>Standard-UPI</strong> erfordert ein indisches Bankkonto und eine
                indische SIM-Karte. Seit der <strong>G20-Initiative 2023</strong> können
                Touristen aus folgenden Ländern UPI jedoch nutzen:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>USA, UK, Kanada, Australien, EU, Singapur, VAE, Japan, Südkorea, Saudi-Arabien, Argentinien, Südafrika, Brasilien, Mexiko, Indonesien, Türkei</li>
              </ul>
              <p>
                <strong>Voraussetzungen:</strong> Reisepass + internationale Telefonnummer.
                Funktioniert mit <strong>PhonePe</strong> und <strong>Paytm</strong> für die
                internationale Registrierung.
              </p>
              <p>
                <strong>Nicht-G20-Besucher</strong> nutzen am besten eine Wise-Karte oder
                internationale Kredit-/Debitkarten.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Standard UPI</strong> requires an Indian bank account and Indian SIM
                card. Since the <strong>2023 G20 Initiative</strong>, however, tourists from
                the following countries can now use UPI:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>USA, UK, Canada, Australia, EU, Singapore, UAE, Japan, South Korea, Saudi Arabia, Argentina, South Africa, Brazil, Mexico, Indonesia, Turkey</li>
              </ul>
              <p>
                <strong>Requirements:</strong> Passport + international phone number. Works
                with <strong>PhonePe</strong> and <strong>Paytm</strong> for international
                registration.
              </p>
              <p>
                <strong>Non-G20 visitors</strong> are best served by a Wise card or
                international credit/debit cards.
              </p>
            </>
          )}
        </div>
        <p className="text-sm">
          <Link href="/guides/india/upi-tourist-guide" className="text-blue-700 font-medium hover:underline">
            {locale === 'de' ? 'Vollständigen Touristen-Guide lesen →' : 'Read the full tourist guide →'}
          </Link>
        </p>
      </section>

      {/* ── Where Accepted ───────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'de' ? 'Wo UPI-QR akzeptiert wird' : 'Where UPI QR is Accepted'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {WHERE_ACCEPTED.map(({ icon, en, de }) => (
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
            ? 'Bist du Händler oder empfängst Zahlungen in Indien?'
            : 'Are you a merchant or receiving payments in India?'}
        </p>
        <Link
          href="/upi/generator"
          className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
          style={{ backgroundColor: '#1A56DB' }}
        >
          {locale === 'de' ? 'UPI-QR-Code erstellen →' : 'Generate your UPI QR code →'}
        </Link>
      </section>

      {/* ── Related Guides ───────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {locale === 'de' ? 'Weitere Reiseguides' : 'Related Guides'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { flag: 'th', name: locale === 'de' ? 'Bezahlen in Thailand' : 'Paying in Thailand', href: '/guides/thailand' },
            { flag: 'id', name: locale === 'de' ? 'Bezahlen in Indonesien' : 'Paying in Indonesia', href: '/guides/indonesia' },
          ].map(({ flag, name, href }) => (
            <Link
              key={flag}
              href={href as `/${string}`}
              className="relative bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:border-blue-100 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3"
            >
              <Flag code={flag} className="text-2xl flex-shrink-0" />
              <span className="text-sm font-medium text-slate-700">{name}</span>
            </Link>
          ))}
          <div className="relative bg-slate-50 border border-slate-100 rounded-2xl p-5 opacity-60 select-none flex items-center gap-3">
            <Flag code="sg" className="text-2xl flex-shrink-0" />
            <span className="text-sm font-medium text-slate-600">
              {locale === 'de' ? 'Bezahlen in Singapur' : 'Paying in Singapore'}
            </span>
            <span className="absolute top-3 right-3 text-xs font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
              {locale === 'de' ? 'Demnächst' : 'Coming Soon'}
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
