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
    title: "FPS – Hong Kong Faster Payment System | QRPayHub",
    description:
      "Everything about FPS: Hong Kong's Faster Payment System by HKMA. Supports HKD and CNY. Compatible with all HK banks, PayMe, AlipayHK and WeChat Pay HK.",
    keywords: [
      'fps hong kong',
      'fps qr',
      'hong kong faster payment system',
      'hkma fps',
      'fps generator',
      'payme hong kong',
      'alipayhk fps',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/fps'),
  };
}

const QUICK_FACTS = [
  { icon: '👥', value: '7M+',        label: 'Registered Users' },
  { icon: '🏦', value: 'All HK Banks', label: 'Connected' },
  { icon: '💵', value: 'HKD + CNY',  label: 'Currencies' },
  { icon: '📅', value: 'Since 2018', label: 'Established' },
];

const SUB_PAGES: SubPage[] = [
  {
    icon: '⚡',
    title: 'FPS Generator',
    description: 'Create FPS QR codes instantly — works with all FPS-enabled apps and banks',
    href: '/fps/generator',
  },
  {
    icon: '📖',
    title: 'Technical Guide',
    description: 'Proxy types, HKD/CNY dual currency, EMV payload and FPS vs CHATS comparison',
    href: '/fps/guide',
  },
  {
    icon: '❓',
    title: 'FAQ',
    description: '25 questions about FPS QR codes answered',
    href: '/fps/faq',
  },
];

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: "FPS – Hong Kong Faster Payment System",
  description: "Everything about FPS: Hong Kong's Faster Payment System by HKMA.",
  url: 'https://www.qrpayhub.com/en/fps',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'FPS',  item: 'https://www.qrpayhub.com/en/fps' },
    ],
  },
};

export default function FPSHubPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-fps-hub"
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
          style={{ backgroundColor: '#fdf2f4', color: '#9b1c1c', borderColor: '#fca5a5' }}
        >
          <span
            className="fi fi-hk"
            style={{
              width: '1.2em',
              height: '0.9em',
              display: 'inline-block',
              backgroundSize: 'cover',
              borderRadius: '2px',
              verticalAlign: 'middle',
            }}
          />{' '}
          Hong Kong Payment Standard
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          🇭🇰 FPS – Hong Kong Faster Payment System
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
          Instant transfers in HKD and CNY — across every Hong Kong bank and major e-wallet.
          Launched by HKMA in September 2018.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/fps/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#BA0C2F' }}
          >
            Generate FPS QR Code →
          </Link>
          <a
            href="#what-is-fps"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-xl transition-colors"
          >
            Learn more ↓
          </a>
        </div>
      </section>

      {/* ── Quick Facts ──────────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {QUICK_FACTS.map(({ icon, value, label }) => (
          <div key={label} className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm">
            <div className="text-3xl mb-2">{icon}</div>
            <div className="text-2xl font-bold text-slate-900">{value}</div>
            <div className="text-sm text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </section>

      {/* ── What is FPS ──────────────────────────────────────────────────── */}
      <section id="what-is-fps" className="space-y-6 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          What is FPS?
        </h2>
        <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed">
          <p>
            <strong>FPS (Faster Payment System)</strong> is Hong Kong&apos;s real-time payment
            infrastructure, developed and regulated by the{' '}
            <strong>Hong Kong Monetary Authority (HKMA)</strong>. Launched on{' '}
            <strong>September 17, 2018</strong>, FPS allows individuals and businesses in
            Hong Kong to transfer money instantly using a mobile phone number, email address,
            or a unique <strong>FPS ID</strong> — without needing to know the recipient&apos;s
            bank account number or IBAN. Transfers settle in seconds, 24 hours a day,
            365 days a year.
          </p>
          <p>
            One of FPS&apos;s distinguishing features is its <strong>dual-currency support</strong>:
            it handles both <strong>Hong Kong Dollars (HKD)</strong> and{' '}
            <strong>Chinese Yuan Renminbi (CNY)</strong> in a single unified system. This makes
            FPS particularly valuable in Hong Kong&apos;s unique financial environment, where
            cross-border transactions between Hong Kong and mainland China are frequent and
            economically significant. A merchant can accept both HKD and CNY payments using
            the same FPS infrastructure.
          </p>
          <p>
            FPS QR codes are built on the <strong>EMV Merchant Presented Mode (MPM)</strong>{' '}
            specification with the application identifier{' '}
            <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">hk.edu.hkma.fps</code>.
            The system supports three types of payment identifiers:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Mobile Number</strong> — Hong Kong mobile numbers are 8 digits and
              start with 5, 6, 7, or 9, formatted as{' '}
              <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">+852XXXXXXXX</code>{' '}
              in the FPS payload. The most commonly used identifier for personal P2P transfers.
            </li>
            <li>
              <strong>Email Address</strong> — Any valid email address registered with a
              participating FPS bank or e-wallet. Useful for businesses and individuals who
              prefer not to share their phone number.
            </li>
            <li>
              <strong>FPS ID</strong> — A 7–9 digit numeric identifier assigned directly by
              the participating bank or e-wallet operator. Some apps (such as PayMe by HSBC)
              issue users a dedicated FPS ID as their primary payment identifier.
            </li>
          </ul>
          <p>
            FPS has achieved broad adoption across Hong Kong&apos;s financial ecosystem.
            All major retail banks participate, including HSBC, Hang Seng Bank, Bank of
            China (Hong Kong), Standard Chartered Hong Kong, DBS Hong Kong, Citibank
            Hong Kong, ICBC (Asia), and BOC Life. Beyond traditional banking, FPS is also
            integrated into leading e-wallets and fintech platforms: PayMe (HSBC),
            AlipayHK (Ant Group), WeChat Pay HK (Tencent), Tap &amp; Go (HKT), and
            BoC Pay. As of 2024, FPS processes over <strong>7 million registered accounts</strong>{' '}
            and handles millions of transactions monthly.
          </p>
          <p>
            For merchants, FPS provides a compelling alternative to card-based payments.
            Static FPS QR codes can be printed and displayed at point of sale — a customer
            scans the code and enters the amount in their banking app. Dynamic QR codes
            with pre-encoded amounts (using initiation method{' '}
            <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">12</code>)
            are commonly used at restaurant checkouts, vending machines, and e-commerce
            payment pages. Settlement is immediate, with no chargebacks and minimal
            transaction fees compared to credit card processing.
          </p>
          <p>
            QRPayHub&apos;s FPS generator produces fully compliant EMV payloads with HKD
            (code{' '}
            <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">344</code>)
            {' '}or CNY (code{' '}
            <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">156</code>)
            {' '}support, a CRC16-CCITT checksum, and optional memo and reference fields —
            all computed instantly in your browser.
          </p>
        </div>
      </section>

      {/* ── Sub-page Links ───────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">FPS Tools</h2>
        <SubPageGrid pages={SUB_PAGES} />
      </section>

    </div>
  );
}
