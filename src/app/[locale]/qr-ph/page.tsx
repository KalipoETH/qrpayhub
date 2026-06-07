import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SubPageGrid from '@/components/ui/SubPageGrid';
import type { SubPage } from '@/components/ui/SubPageGrid';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';
import RelatedStandards from '@/components/ui/RelatedStandards';

const TITLE = 'QR Ph – Philippines National QR Payment Standard | QRPayHub';
const DESCRIPTION =
  'QR Ph is the Philippines\' national QR payment standard by BSP. Free generator for GCash, Maya, BDO, BPI and all InstaPay-enabled apps.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: TITLE,
    description: DESCRIPTION,
    keywords: ['qr ph', 'philippines qr payment', 'instapay qr', 'gcash qr', 'maya qr', 'bsp qr code', 'philippine payment'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/qr-ph'),
    openGraph: buildOpenGraph(locale, '/qr-ph', TITLE, DESCRIPTION),
    twitter: buildTwitterCard(TITLE, DESCRIPTION),
  };
}

const QUICK_FACTS = [
  { icon: '👥', value: '50M+',      label: 'Active Users' },
  { icon: '🌐', value: 'InstaPay',  label: 'Network' },
  { icon: '⚡', value: 'PHP Instant', label: 'Transfer' },
  { icon: '📅', value: 'BSP 2022',  label: 'Standard' },
];

const SUB_PAGES: SubPage[] = [
  {
    icon: '⚡',
    title: 'QR Ph Generator',
    description: 'Create QR Ph codes instantly — works with GCash, Maya, BDO, BPI and all InstaPay apps',
    href: '/qr-ph/generator',
  },
  {
    icon: '📖',
    title: 'Guide',
    description: "Complete guide to QR Ph: proxy types, InstaPay network, GCash, Maya and financial inclusion",
    href: '/qr-ph/guide',
  },
  {
    icon: '❓',
    title: 'FAQ',
    description: '25 questions about QR Ph answered — InstaPay, PESONet, GCash and BSP standards',
    href: '/qr-ph/faq',
  },
];

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'QR Ph – Philippines National QR Payment',
  description: 'Generate QR Ph codes for Philippine payments. Compatible with GCash, Maya, BDO, BPI and InstaPay.',
  url: 'https://qrpayhub.com/en/qr-ph',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',   item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'QR Ph',  item: 'https://qrpayhub.com/en/qr-ph' },
    ],
  },
};

export default function QRPhHubPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-qrph-hub"
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
          className="inline-flex items-center gap-2 text-white text-sm font-medium px-4 py-1.5 rounded-full"
          style={{ backgroundColor: '#0038A8' }}
        >
          <span className="fi fi-ph" style={{ width: '1.2em', height: '0.9em', display: 'inline-block', backgroundSize: 'cover', borderRadius: '2px', verticalAlign: 'middle' }} />
          Philippine Payment Standard
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          QR Ph – Philippines National QR Payment
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
          Over 50 million Filipinos use QR Ph for instant transfers — GCash, Maya, BDO, BPI and
          all InstaPay-enabled banks speak the same BSP standard.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/qr-ph/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#0038A8' }}
          >
            Generate QR Ph Code →
          </Link>
          <a
            href="#what-is-qrph"
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

      {/* ── What is QR Ph ────────────────────────────────────────────────── */}
      <section id="what-is-qrph" className="space-y-6 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          What is QR Ph?
        </h2>
        <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed">
          <p>
            <strong>QR Ph</strong> is the Philippines&apos; national QR payment standard, developed
            and mandated by the{' '}
            <strong>Bangko Sentral ng Pilipinas (BSP)</strong> — the country&apos;s central bank.
            Launched in 2022, QR Ph unified a fragmented payments landscape where each bank and
            e-wallet operated its own proprietary QR format. Under QR Ph, any consumer with a
            mobile banking or e-wallet app can scan a single QR code and pay instantly, regardless
            of which institution issued their account.
          </p>
          <p>
            The standard is built on the{' '}
            <strong>EMV QR Code Merchant Presented Mode (MPM)</strong> specification — the same
            global framework used by PromptPay (Thailand), PIX (Brazil) and QRIS (Indonesia).
            A QR Ph payload is a TLV (Tag-Length-Value) encoded string anchored to the BSP
            Application ID <code className="font-mono text-xs bg-slate-100 px-1 rounded">PH.INSTAPAY.ME</code>,
            validated by a <strong>CRC16-CCITT checksum</strong>, and transmitted via the{' '}
            <strong>InstaPay</strong> interbank network for real-time settlement.
          </p>
          <p>
            <strong>Proxy types supported by QR Ph:</strong>
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>MSISDN (Mobile):</strong> A Philippine mobile number (09XX or +63 9XX) linked
              to a bank account or e-wallet. GCash and Maya accounts are typically identified by
              mobile number.
            </li>
            <li>
              <strong>ACCT (Account Number):</strong> A 10–16 digit bank account number. Used by
              most traditional banks like BDO, BPI, Metrobank and Landbank.
            </li>
            <li>
              <strong>EMAIL:</strong> An email address registered as a payment proxy with a
              participating institution.
            </li>
          </ul>
          <p>
            <strong>Who uses QR Ph?</strong> The ecosystem is wide and growing rapidly:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>GCash</strong> (over 80 million registered users) and{' '}
              <strong>Maya (formerly PayMaya)</strong> — the two dominant super-apps in the
              Philippines — both fully support QR Ph, allowing their tens of millions of users
              to pay any QR Ph code in seconds.
            </li>
            <li>
              <strong>Traditional banks</strong> including BDO Unibank, BPI (Bank of the Philippine
              Islands), Metrobank, Landbank and UnionBank have all integrated QR Ph into their
              mobile banking apps.
            </li>
            <li>
              <strong>Sari-sari stores and market vendors</strong> across the archipelago display
              printed QR Ph codes at their counters, enabling cashless payments even in remote
              communities without card terminals.
            </li>
            <li>
              <strong>Online sellers and freelancers</strong> embed QR Ph codes in invoices and
              social media posts to collect payments instantly without sharing full account details.
            </li>
          </ul>
          <p>
            QR Ph payments settle through the{' '}
            <strong>InstaPay</strong> clearing network, which processes transfers in real time,
            24 hours a day, 7 days a week, including weekends and public holidays. Transaction
            fees are regulated by BSP and are either free or minimal for consumer-to-merchant
            payments below the prescribed threshold.
          </p>
          <p>
            QRPayHub&apos;s QR Ph generator produces fully spec-compliant EMV payloads with the
            CRC16-CCITT checksum computed entirely in your browser — free, instant, and without
            any server-side processing or data collection.
          </p>
        </div>
      </section>

      {/* ── Sub-page Links ───────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          QR Ph Tools
        </h2>
        <SubPageGrid pages={SUB_PAGES} />
      </section>

      {/* ── Related Standards ────────────────────────────────────────────── */}
      <RelatedStandards
        standards={[
          { flag: '🇮🇩', name: 'QRIS', href: '/qris' },
          { flag: '🇲🇾', name: 'DuitNow', href: '/duitnow' },
        ]}
      />

    </div>
  );
}
