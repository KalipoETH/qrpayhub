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
    title: "VietQR – Vietnam's Bank Transfer QR Standard | QRPayHub",
    description:
      "Everything about VietQR: Vietnam's national bank transfer QR standard by NAPAS. Compatible with 50+ Vietnamese banks and e-wallets including MoMo and VNPay.",
    keywords: [
      'vietqr',
      'vietqr standard',
      'vietnam qr payment',
      'napas qr',
      'vietqr generator',
      'vietcombank qr code',
      'bidv qr code',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/vietqr'),
  };
}

const QUICK_FACTS = [
  { icon: '👥', value: '60M+',       label: 'Users' },
  { icon: '🏦', value: '50+ Banks',  label: 'Connected' },
  { icon: '💰', value: 'VND Instant', label: 'Currency' },
  { icon: '📅', value: 'Since 2022', label: 'Established' },
];

const SUB_PAGES: SubPage[] = [
  {
    icon: '⚡',
    title: 'VietQR Generator',
    description: 'Create VietQR codes instantly — works with all Vietnamese banks and e-wallets',
    href: '/vietqr/generator',
  },
];

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: "VietQR – Vietnam's Bank Transfer QR Standard",
  description: "Everything about VietQR: Vietnam's national bank transfer QR standard by NAPAS.",
  url: 'https://www.qrpayhub.com/en/vietqr',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',   item: 'https://www.qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'VietQR', item: 'https://www.qrpayhub.com/en/vietqr' },
    ],
  },
};

export default function VietQRHubPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-vietqr-hub"
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
            className="fi fi-vn"
            style={{
              width: '1.2em',
              height: '0.9em',
              display: 'inline-block',
              backgroundSize: 'cover',
              borderRadius: '2px',
              verticalAlign: 'middle',
            }}
          />{' '}
          Vietnamese Payment Standard
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          🇻🇳 VietQR – Vietnam&apos;s Bank Transfer QR Standard
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
          One QR code for instant bank transfers across 50+ Vietnamese banks —
          Vietcombank, BIDV, Agribank, Techcombank, MB Bank and more.
          Vietnam&apos;s unified payment standard since March 2022.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/vietqr/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#DA251D' }}
          >
            Generate VietQR Code →
          </Link>
          <a
            href="#what-is-vietqr"
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

      {/* ── What is VietQR ───────────────────────────────────────────────── */}
      <section id="what-is-vietqr" className="space-y-6 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          What is VietQR?
        </h2>
        <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed">
          <p>
            <strong>VietQR</strong> is Vietnam&apos;s national QR code standard for interbank
            bank transfers, developed by the <strong>National Payment Corporation of Vietnam
            (NAPAS)</strong> in cooperation with the State Bank of Vietnam (SBV). Officially
            launched in <strong>March 2022</strong>, VietQR enables Vietnamese bank customers
            to make and receive instant bank transfers by scanning a single standardised
            QR code — eliminating the need to manually enter bank account numbers, branch
            codes, or routing information.
          </p>
          <p>
            Prior to VietQR, Vietnamese customers performing bank transfers had to navigate
            fragmented interbank processes — entering the recipient&apos;s bank name, account
            number, and branch details separately. VietQR encodes all of this information
            in a single QR code. The scanning customer&apos;s banking app automatically
            populates the transfer form with the recipient&apos;s bank (identified by a
            6-digit <strong>NAPAS BIN</strong>), account number, and optionally a pre-filled
            amount and payment description — making the transfer as fast as a tap.
          </p>
          <p>
            VietQR is built on the <strong>EMV Merchant Presented Mode (MPM)</strong>{' '}
            specification, with the NAPAS application identifier{' '}
            <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">A000000727</code>{' '}
            encoded in field ID 38. The currency is always Vietnamese Đồng (VND, code{' '}
            <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">704</code>).
            Because VND is the smallest monetary unit — there are no xu (cent) denominations
            in everyday use — all amounts are encoded as whole integers with no decimal places,
            just like IDR in Indonesia&apos;s QRIS system.
          </p>
          <p>
            Adoption has been exceptionally rapid. Within two years of launch, over{' '}
            <strong>50 Vietnamese banks and financial institutions</strong> had implemented
            VietQR, covering virtually the entire formal banking sector. Major participating
            banks include the &ldquo;Big Four&rdquo; state-owned banks — Vietcombank,
            BIDV, Agribank, and Vietinbank — as well as leading private banks like
            Techcombank, MB Bank, VPBank, and TPBank. VietQR QR codes are also natively
            supported in major e-wallet and payment super-apps including <strong>MoMo</strong>,
            <strong>VNPay</strong>, ZaloPay, and ShopeePay Vietnam.
          </p>
          <p>
            A distinctive aspect of VietQR is its use of the bank&apos;s{' '}
            <strong>NAPAS BIN (Bank Identification Number)</strong> — a 6-digit code uniquely
            assigned to each financial institution — as the primary routing identifier rather
            than a bank-specific account format. This standardisation means any bank&apos;s
            app can route a payment to any other bank simply by reading the BIN, without
            requiring bilateral agreements between every pair of participating institutions.
          </p>
          <p>
            For account names, VietQR (like most banking systems globally) requires names
            to be entered in <strong>ASCII-compatible uppercase Latin characters without
            Vietnamese diacritical marks</strong> (tone marks and special characters such
            as ắ, ệ, ổ, ương, etc.). This is because the EMV standard encodes the name field
            in plain ASCII. For example, &ldquo;Nguyễn Văn An&rdquo; would be encoded as
            &ldquo;NGUYEN VAN AN&rdquo;.
          </p>
          <p>
            Vietnam&apos;s VietQR growth trajectory has been among the fastest in Southeast
            Asia after Indonesia&apos;s QRIS, with the State Bank of Vietnam reporting
            hundreds of millions of QR-based transactions monthly as of 2024. The government
            has set ambitious targets for cashless payments, with QR codes playing a central
            role in the national digital payments strategy.
          </p>
          <p>
            QRPayHub&apos;s VietQR generator creates fully NAPAS-compliant EMV payloads with
            a CRC16-CCITT checksum, supporting all 11 major Vietnamese bank BINs and custom
            BIN entry — all computed instantly in your browser without any server involvement.
          </p>
        </div>
      </section>

      {/* ── Sub-page Links ───────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">VietQR Tools</h2>
        <SubPageGrid pages={SUB_PAGES} />
      </section>

    </div>
  );
}
