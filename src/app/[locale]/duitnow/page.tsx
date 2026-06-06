import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SubPageGrid from '@/components/ui/SubPageGrid';
import type { SubPage } from '@/components/ui/SubPageGrid';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  return {
    title: "DuitNow – Malaysia's National QR Payment Standard | QRPayHub",
    description:
      "Everything about DuitNow: Malaysia's national QR payment standard by PayNet. Compatible with all Malaysian banks and e-wallets including Maybank, CIMB, Touch'n Go and Boost.",
    keywords: [
      'duitnow',
      'duitnow qr',
      'malaysia qr payment',
      'paynet malaysia',
      'duitnow generator',
      'maybank duitnow',
      'touch n go duitnow',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/duitnow'),
  };
}

const QUICK_FACTS = [
  { icon: '👥', value: '30M+',       label: 'Users' },
  { icon: '🏦', value: 'All MY Banks', label: 'Connected' },
  { icon: '💰', value: 'MYR Instant', label: 'Currency' },
  { icon: '📅', value: 'Since 2018',  label: 'Established' },
];

const SUB_PAGES: SubPage[] = [
  {
    icon: '⚡',
    title: 'DuitNow Generator',
    description: 'Create DuitNow QR codes instantly — works with all DuitNow-enabled apps',
    href: '/duitnow/generator',
  },
  {
    icon: '📖',
    title: 'Technical Guide',
    description: 'DuitNow IDs, EMV payload format, mobile normalization and ASEAN cross-border docs',
    href: '/duitnow/guide',
  },
  {
    icon: '❓',
    title: 'FAQ',
    description: '25 questions about DuitNow QR codes answered',
    href: '/duitnow/faq',
  },
];

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: "DuitNow – Malaysia's National QR Payment Standard",
  description:
    "Everything about DuitNow: Malaysia's national QR payment standard by PayNet.",
  url: 'https://www.qrpayhub.com/en/duitnow',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',    item: 'https://www.qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'DuitNow', item: 'https://www.qrpayhub.com/en/duitnow' },
    ],
  },
};

export default function DuitNowHubPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-duitnow-hub"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <PageContent />
    </>
  );
}

function PageContent() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="text-center space-y-6">
        <div
          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full border"
          style={{ backgroundColor: '#fff5f5', color: '#9b1c1c', borderColor: '#fca5a5' }}
        >
          <span
            className="fi fi-my"
            style={{
              width: '1.2em',
              height: '0.9em',
              display: 'inline-block',
              backgroundSize: 'cover',
              borderRadius: '2px',
              verticalAlign: 'middle',
            }}
          />{' '}
          Malaysian Payment Standard
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          🇲🇾 DuitNow – Malaysia&apos;s National QR Payment
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
          One QR code for every Malaysian bank and e-wallet — Maybank, CIMB, Public Bank, RHB,
          Hong Leong, Touch&apos;n Go, Boost and more. Malaysia&apos;s unified payment standard since 2018.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/duitnow/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#CC0001' }}
          >
            Generate DuitNow QR Code →
          </Link>
          <a
            href="#what-is-duitnow"
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

      {/* ── What is DuitNow ──────────────────────────────────────────────── */}
      <section id="what-is-duitnow" className="space-y-6 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          What is DuitNow?
        </h2>
        <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed">
          <p>
            <strong>DuitNow</strong> is Malaysia&apos;s national real-time payment and QR code
            standard, introduced by <strong>Payments Network Malaysia (PayNet)</strong> in
            <strong> 2018</strong>. PayNet — a consortium jointly owned by Bank Negara Malaysia
            (BNM) and eleven major Malaysian financial institutions — designed DuitNow to unify
            all Malaysian banks and e-wallets under a single interoperable payment system,
            replacing the fragmented landscape of proprietary QR codes.
          </p>
          <p>
            The DuitNow QR standard is built on the <strong>EMV Merchant Presented Mode (MPM)</strong>{' '}
            specification, the same technical foundation used by PromptPay in Thailand, PayNow in
            Singapore, and QRIS in Indonesia. A merchant registers a DuitNow ID — typically their
            mobile number, MyKad IC number, or business registration number — and receives a single
            QR code that any participating bank app or e-wallet can scan to initiate payment.
          </p>
          <p>
            DuitNow supports five proxy key types for identifying payment recipients:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Mobile Number</strong> — Malaysian mobile numbers beginning with 01X
              (011 through 019), registered with a participating bank. This is the most
              common proxy type for personal payments.
            </li>
            <li>
              <strong>MyKad IC Number</strong> — Malaysia&apos;s 12-digit national identity card
              number (NRIC), formatted as YYMMDD-PB-XXXG. Widely used by individuals and
              sole proprietors who do not have a separate business registration.
            </li>
            <li>
              <strong>Passport Number</strong> — For foreign nationals resident in Malaysia who
              do not hold a MyKad, allowing non-citizens to participate in DuitNow payments.
            </li>
            <li>
              <strong>Business Registration Number (ROC/ROB)</strong> — The Companies Commission
              of Malaysia (SSM) registration number for legally incorporated businesses. Enables
              corporate entities to receive payments directly via DuitNow.
            </li>
            <li>
              <strong>Others</strong> — A catch-all category for additional identifier types
              that do not fit the above classifications.
            </li>
          </ul>
          <p>
            Malaysia&apos;s DuitNow ecosystem has grown rapidly since launch. The system now
            connects <strong>over 30 million registered users</strong> across all major Malaysian
            banks — including Maybank, CIMB Bank, Public Bank, RHB, Hong Leong Bank, AmBank,
            UOB Malaysia, Standard Chartered Malaysia, HSBC Malaysia, Affin Bank, and Alliance
            Bank — as well as leading e-wallets and fintech platforms such as Touch&apos;n Go
            eWallet, Boost, GrabPay, and ShopeePay Malaysia.
          </p>
          <p>
            DuitNow QR transactions are processed in real-time, typically settling in seconds,
            24 hours a day, 7 days a week. Both static QR codes (for open amounts, where the
            payer enters the payment value) and dynamic QR codes (with a pre-set amount encoded
            in the payload) are supported. Dynamic QR codes use initiation method{' '}
            <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">12</code>
            {' '}in the EMV payload, while static codes use{' '}
            <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">11</code>.
          </p>
          <p>
            The DuitNow network has also expanded beyond Malaysia&apos;s borders through
            cross-border QR payment linkages with Singapore (PayNow), Thailand (PromptPay),
            Indonesia (QRIS), and the Philippines (InstaPay QR Ph) — enabling Malaysian
            travellers to pay abroad and foreign visitors to Malaysia to pay using their
            home country payment apps at DuitNow-enabled merchants.
          </p>
          <p>
            QRPayHub&apos;s DuitNow generator produces fully spec-compliant EMV payloads with
            an application identifier (AID){' '}
            <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">A000000693010011</code>
            , currency code{' '}
            <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">458</code>
            {' '}(MYR), and a CRC16-CCITT checksum — all computed instantly in your browser
            without any server-side processing or data storage.
          </p>
        </div>
      </section>

      {/* ── Sub-page Links ───────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          DuitNow Tools
        </h2>
        <SubPageGrid pages={SUB_PAGES} />
      </section>

    </div>
  );
}
