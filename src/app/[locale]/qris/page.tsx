import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SubPageGrid from '@/components/ui/SubPageGrid';
import type { SubPage } from '@/components/ui/SubPageGrid';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';
import RelatedStandards from '@/components/ui/RelatedStandards';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const TITLE = "QRIS – Indonesia's Universal QR Payment Standard | QRPayHub";
  const DESCRIPTION =
    "QRIS is Indonesia's national QR payment standard by Bank Indonesia. Free generator for GoPay, OVO, Dana and 50+ QRIS member apps. No registration needed.";
  return {
    title: TITLE,
    description: DESCRIPTION,
    keywords: ['qris', 'bank indonesia qr', 'indonesia qr payment', 'qris standard', 'qris generator', 'gopay qris', 'ovo qris'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/qris'),
    openGraph: buildOpenGraph(locale, '/qris', TITLE, DESCRIPTION),
    twitter: buildTwitterCard(TITLE, DESCRIPTION),
  };
}

const QUICK_FACTS = [
  { icon: '👥', value: '100M+',  label: 'Active Users' },
  { icon: '📱', value: '50+',    label: 'Payment Apps' },
  { icon: '🏪', value: '30M+',   label: 'Merchants' },
  { icon: '📅', value: 'Since 2020', label: 'Established' },
];

const SUB_PAGES: SubPage[] = [
  {
    icon: '⚡',
    title: 'QRIS Generator',
    description: 'Create QRIS QR codes instantly — works with all QRIS-enabled apps',
    href: '/qris/generator',
  },
  {
    icon: '📖',
    title: 'Technical Guide',
    description: 'EMV TLV payload spec, CRC16, NMID, merchant criteria and BI integration docs',
    href: '/qris/guide',
  },
  {
    icon: '❓',
    title: 'FAQ',
    description: 'All questions about QRIS QR codes answered',
    href: '/qris/faq',
  },
];

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: "QRIS – Indonesia's Universal QR Payment Standard",
  description:
    "Everything about QRIS: Indonesia's national QR payment standard by Bank Indonesia.",
  url: 'https://www.qrpayhub.com/en/qris',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'QRIS', item: 'https://www.qrpayhub.com/en/qris' },
    ],
  },
};

export default function QRISHubPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script
        id="json-ld-qris-hub"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <PageContent locale={locale} />
    </>
  );
}

function PageContent({ locale }: { locale: 'en' | 'de' }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-sm font-medium px-4 py-1.5 rounded-full border border-red-200">
          <span
            className="fi fi-id"
            style={{
              width: '1.2em',
              height: '0.9em',
              display: 'inline-block',
              backgroundSize: 'cover',
              borderRadius: '2px',
              verticalAlign: 'middle',
            }}
          />{' '}
          Indonesian Payment Standard
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          🇮🇩 QRIS – Indonesia&apos;s Universal QR Payment Standard
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
          One QR code for every Indonesian payment app — GoPay, OVO, Dana, LinkAja,
          ShopeePay and 50+ more. Mandated by Bank Indonesia since 2020.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/qris/generator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-sm transition-colors"
          >
            Generate QRIS QR Code →
          </Link>
          <a
            href="#what-is-qris"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-xl transition-colors"
          >
            Learn more ↓
          </a>
        </div>
      </section>

      {/* ── Quick Facts ──────────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {QUICK_FACTS.map(({ icon, value, label }) => (
          <div
            key={label}
            className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm"
          >
            <div className="text-3xl mb-2">{icon}</div>
            <div className="text-2xl font-bold text-slate-900">{value}</div>
            <div className="text-sm text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </section>

      {/* ── What is QRIS ─────────────────────────────────────────────────── */}
      <section id="what-is-qris" className="space-y-6 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          What is QRIS?
        </h2>
        <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed">
          <p>
            <strong>QRIS</strong> (Quick Response Code Indonesian Standard) is Indonesia&apos;s
            national QR payment standard, introduced by <strong>Bank Indonesia (BI)</strong> and
            officially launched on <strong>January 1, 2020</strong>. Before QRIS, every payment
            app in Indonesia — GoPay, OVO, Dana, LinkAja, ShopeePay — used its own proprietary
            QR code format, forcing merchants to display multiple QR codes at their checkout counters.
            QRIS unified all of these into a single standard based on the
            <strong> EMV Merchant Presented Mode (MPM)</strong> specification.
          </p>
          <p>
            Today, any merchant registered with Bank Indonesia receives a single QRIS QR code
            that can be scanned by any of the 50+ participating payment apps and banking apps in
            Indonesia — including all major state banks (BCA Mobile, Mandiri Livin&apos;,
            BRI Mobile, BNI Mobile) and digital wallets. The customer&apos;s app handles the
            routing transparently: a GoPay user and an OVO user can both scan the same QRIS code.
          </p>
          <p>
            Indonesia&apos;s adoption of QRIS has been remarkable. Within three years of launch,
            over <strong>30 million merchants</strong> had registered — from street food vendors
            (warung) and motorbike taxi drivers to shopping malls and government offices. As of
            2024, QRIS processes hundreds of millions of transactions monthly, making Indonesia
            one of Southeast Asia&apos;s most active QR payment markets.
          </p>
          <p>
            The QRIS standard classifies merchants into four tiers based on annual revenue:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Usaha Mikro (Micro)</strong> — Annual revenue below Rp 300 million.
              The most common category, covering street vendors, food stalls and small craftspeople.
              Lower transaction fees apply (capped at 0.3% for micro-enterprises).
            </li>
            <li>
              <strong>Usaha Kecil (Small)</strong> — Annual revenue Rp 300 million to Rp 2.5 billion.
              Includes small shops, service providers and local restaurants.
            </li>
            <li>
              <strong>Usaha Menengah (Medium)</strong> — Annual revenue Rp 2.5 billion to
              Rp 50 billion. Covers mid-sized businesses and regional chains.
            </li>
            <li>
              <strong>Usaha Besar (Large)</strong> — Annual revenue above Rp 50 billion.
              Standard merchant discount rate (MDR) of 0.7% applies.
            </li>
          </ul>
          <p>
            Technically, a QRIS payload is a sequence of TLV (Tag-Length-Value) fields encoded
            as a plain ASCII string. The merchant&apos;s National Merchant ID (<strong>NMID</strong>)
            is assigned at registration and encoded in field ID 26 alongside the QRIS Application
            Identifier <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">ID.CO.QRIS.WWW</code>.
            The transaction currency is always IDR (code <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">360</code>)
            — Indonesian Rupiah has no decimal subdivision, so amounts are always whole numbers.
            The payload ends with a <strong>CRC16-CCITT</strong> checksum to prevent data corruption.
          </p>
          <p>
            <strong>Who uses QRIS?</strong> Nearly every segment of Indonesian commerce:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Street vendors and warungs</strong> display a printed QRIS sticker —
              customers scan and confirm payment in seconds without cash or change.
            </li>
            <li>
              <strong>E-commerce and ride-hailing apps</strong> (Tokopedia, Shopee, Gojek, Grab)
              generate dynamic QRIS codes at checkout with pre-filled amounts.
            </li>
            <li>
              <strong>Parking lots, toll gates and government counters</strong> use QRIS for
              contactless payment collection.
            </li>
            <li>
              <strong>Tourism businesses</strong> — hotels, tour operators, restaurants —
              increasingly rely on QRIS to serve both domestic and international visitors,
              as several foreign payment systems have been linked to QRIS via cross-border agreements.
            </li>
          </ul>
          <p>
            QRPayHub&apos;s QRIS generator produces fully spec-compliant EMV payloads
            with a CRC16 checksum computed entirely in your browser — free, instant and
            without any server-side processing or data collection.
          </p>
        </div>
      </section>

      {/* ── Sub-page Links ───────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          QRIS Tools
        </h2>
        <SubPageGrid pages={SUB_PAGES} />
      </section>

      {/* ── Travel Guide CTA ─────────────────────────────────────────────── */}
      <section className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center space-y-3">
        <p className="font-semibold text-blue-900 text-lg">
          {locale === 'de' ? 'Reist du nach Indonesien?' : 'Traveling to Indonesia?'}
        </p>
        <Link
          href="/guides/indonesia"
          className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
          style={{ backgroundColor: '#1A56DB' }}
        >
          {locale === 'de' ? 'Lies unseren Touristen-Guide →' : 'Read our tourist guide →'}
        </Link>
      </section>

      {/* ── Related Standards ────────────────────────────────────────────── */}
      <RelatedStandards
        standards={[
          { flag: '🇹🇭', name: 'PromptPay', href: '/promptpay' },
          { flag: '🇲🇾', name: 'DuitNow', href: '/duitnow' },
          { flag: '🇸🇬', name: 'PayNow', href: '/paynow' },
          { flag: '🇻🇳', name: 'VietQR', href: '/vietqr' },
        ]}
      />

    </div>
  );
}
