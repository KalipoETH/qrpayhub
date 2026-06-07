import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'How VietQR Works – Complete Guide | QRPayHub',
    description:
      "Complete guide to VietQR: Vietnam's national bank transfer QR standard by NAPAS. Learn about Bank BINs, EMV payload format, account name rules and supported apps.",
    keywords: [
      'vietqr guide',
      'how vietqr works',
      'vietqr emv payload',
      'napas bank bin',
      'vietnam qr payment guide',
      'vietqr account name rules',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/vietqr/guide'),
  };
}

const BANK_BINS = [
  { bin: '970436', name: 'Vietcombank',  short: 'VCB' },
  { bin: '970418', name: 'BIDV',         short: 'BIDV' },
  { bin: '970405', name: 'Agribank',     short: 'AGB' },
  { bin: '970415', name: 'Vietinbank',   short: 'CTG' },
  { bin: '970407', name: 'Techcombank',  short: 'TCB' },
  { bin: '970422', name: 'MB Bank',      short: 'MB' },
  { bin: '970432', name: 'VPBank',       short: 'VPB' },
  { bin: '970423', name: 'TPBank',       short: 'TPB' },
  { bin: '970403', name: 'Sacombank',    short: 'STB' },
  { bin: '970416', name: 'ACB',          short: 'ACB' },
  { bin: '970437', name: 'HDBank',       short: 'HDB' },
];

const EMV_TAGS = [
  { tag: '00',       value: '01',           required: true,  description: 'Payload Format Indicator (always "01")' },
  { tag: '01',       value: '11',           required: false, description: 'Point of Initiation Method (11=static, 12=dynamic)' },
  { tag: '38',       value: '...',          required: true,  description: 'NAPAS Merchant Account – contains BIN + account number' },
  { tag: '38 › 00',  value: 'A000000727',   required: true,  description: 'NAPAS Application ID (AID)' },
  { tag: '38 › 01',  value: '970436',       required: true,  description: 'Bank BIN (6 digits)' },
  { tag: '38 › 02',  value: '1234567890',   required: true,  description: 'Account number' },
  { tag: '52',       value: '4814',         required: false, description: 'Merchant Category Code (MCC)' },
  { tag: '53',       value: '704',          required: true,  description: 'Transaction Currency (704 = VND)' },
  { tag: '54',       value: '150000',       required: false, description: 'Transaction Amount (whole VND, no decimals)' },
  { tag: '58',       value: 'VN',           required: true,  description: 'Country Code' },
  { tag: '59',       value: 'NGUYEN VAN A', required: true,  description: 'Merchant Name (UPPERCASE ASCII, no diacritics)' },
  { tag: '60',       value: 'HA NOI',       required: true,  description: 'Merchant City (ASCII)' },
  { tag: '62 › 08',  value: 'Chuyen tien', required: false, description: 'Bill number / payment description' },
  { tag: '63',       value: 'XXXX',         required: true,  description: 'CRC16-CCITT checksum (4 hex chars)' },
];

const NAME_EXAMPLES = [
  { correct: 'NGUYEN VAN AN',  incorrect: 'Nguyễn Văn An',    note: 'Common Vietnamese name' },
  { correct: 'TRAN THI BICH',  incorrect: 'Trần Thị Bích',   note: 'Female name with tone marks' },
  { correct: 'LE HOANG LONG',  incorrect: 'Lê Hoàng Long',   note: 'Name with circumflex vowels' },
  { correct: 'PHAM DUC THANG', incorrect: 'Phạm Đức Thắng',  note: 'Name with đ character' },
];

const VIETQR_APPS = [
  { app: 'Vietcombank VCB-Mobile', type: 'Banking App', flag: '🏦' },
  { app: 'BIDV Smart Banking',     type: 'Banking App', flag: '🏦' },
  { app: 'Agribank E-Mobile',      type: 'Banking App', flag: '🏦' },
  { app: 'Techcombank Mobile',     type: 'Banking App', flag: '🏦' },
  { app: 'MB Bank',                type: 'Banking App', flag: '🏦' },
  { app: 'VPBank NEO',             type: 'Banking App', flag: '🏦' },
  { app: 'MoMo',                   type: 'E-Wallet',    flag: '👛' },
  { app: 'ZaloPay',                type: 'E-Wallet',    flag: '👛' },
  { app: 'VNPay',                  type: 'Payment App', flag: '💳' },
  { app: 'ShopeePay VN',           type: 'E-Wallet',    flag: '👛' },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How VietQR Works – Complete Guide',
  description:
    "Complete guide to VietQR: Vietnam's national bank transfer QR standard by NAPAS. Bank BINs, EMV payload, account name rules and supported apps.",
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/vietqr/guide' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',   item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'VietQR', item: 'https://qrpayhub.com/en/vietqr' },
      { '@type': 'ListItem', position: 3, name: 'Guide',  item: 'https://qrpayhub.com/en/vietqr/guide' },
    ],
  },
};

export default function VietQRGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-vietqr-guide"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }}
      />
      <PageContent />
    </>
  );
}

function PageContent() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">

      <Breadcrumb items={[
        { label: 'Home',   href: '/' },
        { label: 'VietQR', href: '/vietqr' },
        { label: 'Guide' },
      ]} />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          How VietQR Works – Complete Guide
        </h1>
        <p className="text-lg text-slate-500">
          Everything about Vietnam&apos;s national bank transfer QR standard: Bank BINs, EMV payload, account name rules and supported apps.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/vietqr/generator"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-white text-sm font-semibold rounded-xl transition-colors"
            style={{ backgroundColor: '#DA251D' }}
          >
            Try the Generator →
          </Link>
        </div>
      </header>

      <div className="space-y-14 pt-4">

        {/* ── Section 1: What is VietQR ──────────────────────────────────────── */}
        <Section id="what-is-vietqr" title="What is VietQR?">
          <Prose>
            <p>
              <strong>VietQR</strong> is Vietnam&apos;s national QR code standard for instant interbank
              bank transfers, developed by <strong>NAPAS (National Payment Corporation of Vietnam)</strong>{' '}
              in cooperation with the State Bank of Vietnam (SBV). Officially launched in{' '}
              <strong>March 2022</strong>, VietQR enables any Vietnamese bank customer to make and
              receive transfers by scanning a single standardised QR code — no manual account entry required.
            </p>
            <p>
              Before VietQR, transferring money to another bank required entering the recipient&apos;s
              bank name, account number, and branch details separately. VietQR encodes all of this in
              one QR code: the bank BIN identifies the receiving bank, and the account number identifies
              the recipient. The scanning customer&apos;s app populates the transfer form automatically.
            </p>
            <p>
              VietQR is built on the <strong>EMV Merchant Presented Mode (MPM)</strong> specification
              — the same global framework used by PromptPay, PIX, and QRIS — with one important
              difference: NAPAS uses <strong>field ID 38</strong> (instead of the more common ID 26)
              for the merchant account information.
            </p>
            <p>
              Over <strong>50 Vietnamese banks</strong> support VietQR, including the Big Four
              state-owned banks (Vietcombank, BIDV, Agribank, Vietinbank) and all major private banks.
              VietQR is also integrated in leading e-wallets including MoMo, ZaloPay, and VNPay.
            </p>
          </Prose>
        </Section>

        {/* ── Section 2: Step by Step ───────────────────────────────────────── */}
        <Section id="how-it-works" title="How VietQR Works – Step by Step">
          <ol className="space-y-4">
            {[
              {
                step: 1,
                title: 'Recipient generates a VietQR code',
                body: 'Enter your bank BIN (or select your bank), account number, account name in UPPERCASE, and optionally a pre-filled amount and description. The QR encodes all this as an EMV payload.',
              },
              {
                step: 2,
                title: 'Sender opens any supported banking app',
                body: 'All Vietnamese banking apps and major e-wallets (MoMo, ZaloPay, VNPay) support VietQR scanning. The system is fully interoperable across all NAPAS-member banks.',
              },
              {
                step: 3,
                title: 'Sender scans the QR code',
                body: 'The app reads the EMV payload, extracts the bank BIN (identifying the receiving bank), account number, and amount. No manual entry needed.',
              },
              {
                step: 4,
                title: 'Transfer form is pre-filled',
                body: 'The sender\'s app automatically identifies the recipient\'s bank from the BIN and pre-fills the account number, account name, and amount (if embedded). The sender reviews and confirms.',
              },
              {
                step: 5,
                title: 'Sender authenticates',
                body: 'The sender confirms the transfer using their bank\'s authentication (PIN, fingerprint or face ID). The credential never leaves their device.',
              },
              {
                step: 6,
                title: 'Transfer completes via NAPAS',
                body: 'NAPAS routes the interbank transfer in real time. Funds arrive in the recipient\'s account within seconds, 24/7, including weekends and public holidays.',
              },
              {
                step: 7,
                title: 'Both parties receive confirmation',
                body: 'The sender gets a transaction success notification. The recipient receives an instant credit alert via SMS and in-app notification from their bank.',
              },
            ].map(({ step, title, body }) => (
              <li key={step} className="flex gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm"
                  style={{ backgroundColor: '#DA251D' }}
                >
                  {step}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{title}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* ── Section 3: Bank BIN System ────────────────────────────────────── */}
        <Section id="bank-bins" title="Bank BIN System – Finding Your Bank's Code">
          <Prose>
            <p>
              A <strong>BIN (Bank Identification Number)</strong> is a 6-digit code uniquely assigned
              by NAPAS to each member bank. It is the primary routing identifier in VietQR — the
              recipient&apos;s bank app looks up the BIN to determine which institution to route the
              transfer to, without needing bilateral agreements between every pair of banks.
            </p>
            <p>
              The BIN is encoded in <strong>tag 01</strong> within the NAPAS merchant account field
              (field ID 38) of the EMV payload. qrpayhub.com includes a complete list of all major
              Vietnamese bank BINs and allows custom BIN entry for smaller institutions.
            </p>
          </Prose>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-3">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {['BIN', 'Bank Name', 'Short Code'].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {BANK_BINS.map(({ bin, name, short }) => (
                  <tr key={bin} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono font-bold" style={{ color: '#DA251D' }}>{bin}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{name}</td>
                    <td className="px-4 py-3 text-slate-500 font-mono">{short}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── Section 4: EMV Payload ────────────────────────────────────────── */}
        <Section id="emv-payload" title="The VietQR EMV Payload (Tag ID 38 – not ID 26!)">
          <Prose>
            <p>
              VietQR is built on the EMV QR Code Merchant Presented Mode specification, but with a
              critical distinction: <strong>NAPAS uses field ID 38</strong> for the merchant account
              information, whereas most other standards (PromptPay, PayNow, DuitNow) use ID 26.
              Any VietQR parser must look for the NAPAS AID{' '}
              <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">A000000727</code>{' '}
              in tag 38, not tag 26.
            </p>
          </Prose>

          <pre className="bg-slate-900 text-emerald-400 text-sm font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4">
{`000201          ← Payload Format Indicator
010211          ← Point of Initiation: 11 (static)
38[len]         ← NAPAS Merchant Account (ID 38, not 26!)
  0010A000000727  ← NAPAS AID
  01[len]970436   ← Bank BIN (Vietcombank)
  02[len]1234567890 ← Account Number
5204[mcc]       ← Merchant Category Code
5303704         ← Currency: VND (704)
5406150000      ← Amount: 150,000 VND
5802VN          ← Country Code
5913NGUYEN VAN A ← Merchant Name (UPPERCASE ASCII)
6010HA NOI      ← Merchant City
6233            ← Additional Data
  08[len]NOTE   ← Bill number / description
6304XXXX        ← CRC16-CCITT checksum`}
          </pre>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {['Tag', 'Example Value', 'Required', 'Description'].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {EMV_TAGS.map(({ tag, value, required, description }) => (
                  <tr key={tag} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono font-bold" style={{ color: '#DA251D' }}>{tag}</td>
                    <td className="px-4 py-3 font-mono text-slate-600 text-xs">{value}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        required ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {required ? 'Required' : 'Optional'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── Section 5: Account Name Rules ─────────────────────────────────── */}
        <Section id="account-name-rules" title="Vietnamese Account Name Rules">
          <Prose>
            <p>
              This is one of the most important and frequently misunderstood aspects of VietQR.
              The EMV standard encodes the merchant name field in <strong>plain ASCII</strong> —
              a character set that does not support Vietnamese diacritical marks (tone marks and
              special letters like ắ, ệ, ổ, ương, đ, ơ, ư, etc.).
            </p>
            <p>
              Bank systems throughout Vietnam use ASCII-compatible account databases. Account names
              are therefore stored and transmitted as <strong>UPPERCASE Latin characters without
              any Vietnamese accents</strong>. This is not a VietQR-specific limitation — it is
              a property of the underlying banking infrastructure.
            </p>
            <p>
              <strong>Rule:</strong> Convert all Vietnamese characters to their unaccented Latin
              equivalents and use UPPERCASE. For example: Đ → D, ắ → A, ệ → E, ổ → O, ư → U,
              ơ → O, ă → A. Tones (sắc, huyền, hỏi, ngã, nặng) are dropped entirely.
            </p>
          </Prose>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-4">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-emerald-700 border-b border-slate-200">✅ Correct (ASCII)</th>
                  <th className="px-4 py-3 font-semibold text-red-700 border-b border-slate-200">❌ Incorrect (Vietnamese)</th>
                  <th className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {NAME_EXAMPLES.map(({ correct, incorrect, note }) => (
                  <tr key={correct} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono font-bold text-emerald-700">{correct}</td>
                    <td className="px-4 py-3 font-mono text-red-600">{incorrect}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Prose className="mt-4">
            <p>
              qrpayhub.com&apos;s VietQR generator automatically normalises names: it converts
              lowercase to uppercase and warns users if Vietnamese diacritical characters are
              detected. The account name as stored by your bank is the authoritative reference —
              when in doubt, check your bank statement or banking app for the exact ASCII representation.
            </p>
          </Prose>
        </Section>

        {/* ── Section 6: Supported Apps ─────────────────────────────────────── */}
        <Section id="supported-apps" title="Supported Apps">
          <Prose>
            <p>
              All NAPAS-member banks are required to support VietQR in their mobile banking apps.
              As of 2025, this covers over 50 banks. Major e-wallets have also integrated VietQR
              scanning, making the standard accessible to virtually all Vietnamese mobile payment users.
            </p>
          </Prose>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {VIETQR_APPS.map(({ app, type, flag }) => (
              <div
                key={app}
                className="bg-white border border-slate-100 rounded-xl p-3 flex items-center gap-3 shadow-sm"
              >
                <span className="text-2xl">{flag}</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{app}</p>
                  <p className="text-xs text-slate-400">{type}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Section 7: VietQR for Merchants ──────────────────────────────── */}
        <Section id="merchants" title="VietQR for Merchants">
          <Prose>
            <p>
              Vietnamese merchants — from street food stalls to large retailers — increasingly use
              VietQR as their primary payment method. Printed VietQR codes are displayed at counters,
              tables, and storefronts. Customers scan and pay directly to the merchant&apos;s bank
              account, with no card terminal or payment hardware required.
            </p>
            <p>
              <strong>Static QR (no amount):</strong> A single printed QR code that the merchant
              uses repeatedly. Customers enter the amount themselves. Ideal for small shops and
              street vendors where transactions vary.
            </p>
            <p>
              <strong>Dynamic QR (with amount):</strong> Generated per transaction with the exact
              amount embedded. Reduces input errors and supports automatic reconciliation. Used by
              restaurants, online stores, and businesses needing precise payment matching.
            </p>
            <p>
              Merchants register for VietQR through their bank&apos;s merchant onboarding process.
              Some banks provide VietQR-branded display frames and stickers. The{' '}
              <strong>VietQR logo</strong> on a merchant&apos;s QR display indicates the code is
              NAPAS-compliant and accepted by all participating banks.
            </p>
            <p>
              qrpayhub.com&apos;s VietQR generator supports both static and dynamic QR code
              generation, allowing merchants to quickly create codes for display or integration
              into invoices and websites — free, in-browser, with no account needed.
            </p>
          </Prose>
        </Section>

        {/* ── Section 8: Vietnam's Cashless Vision ─────────────────────────── */}
        <Section id="cashless-vision" title="Vietnam's Cashless Payment Vision">
          <Prose>
            <p>
              The <strong>State Bank of Vietnam (SBV)</strong> has set ambitious national targets:
              at least <strong>80% of adults</strong> with a bank account by 2025, and{' '}
              <strong>cashless payments</strong> representing the majority of retail transactions.
              VietQR is central to this strategy.
            </p>
            <p>
              Vietnam&apos;s QR payment adoption has been remarkably fast. Within two years of launch,
              VietQR was supported by all major banks and processed hundreds of millions of transactions
              monthly. The combination of a young, tech-savvy population, widespread smartphone
              penetration, and government promotion has driven rapid uptake.
            </p>
            <p>
              Vietnam is also integrating into the <strong>ASEAN regional QR interoperability
              framework</strong>. Cross-border QR payment linkages with Thailand (PromptPay) have
              been announced, enabling Vietnamese travellers to pay in Thailand and Thai tourists
              to pay in Vietnam using their home banking apps.
            </p>
            <p>
              The e-wallet ecosystem — led by <strong>MoMo</strong> (31M+ users), <strong>ZaloPay</strong>{' '}
              (VNG), and <strong>VNPay</strong> — has amplified VietQR adoption by integrating the
              standard into super-apps used daily by tens of millions of Vietnamese consumers.
            </p>
            <p>
              For businesses operating in or with Vietnam, adopting VietQR is no longer optional —
              it is increasingly the expected payment method for B2C and B2B transactions at all
              price points.
            </p>
          </Prose>
        </Section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-6 text-center space-y-3"
          style={{ backgroundColor: '#fff5f5', border: '1px solid #fca5a5' }}
        >
          <p className="font-semibold text-lg" style={{ color: '#9b1c1c' }}>
            Ready to generate your VietQR Code?
          </p>
          <p className="text-sm" style={{ color: '#b91c1c' }}>
            Free, instant, works with all Vietnamese banking apps.
          </p>
          <Link
            href="/vietqr/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#DA251D' }}
          >
            Open Generator →
          </Link>
        </div>

      </div>
    </div>
  );
}

// ── Shared UI helpers ──────────────────────────────────────────────────────────

function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1 text-sm text-slate-400">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {item.href ? (
              <Link href={item.href as `/${string}`} className="hover:text-slate-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-900 font-semibold">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="space-y-4 scroll-mt-20">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      {children}
    </section>
  );
}

function Prose({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`space-y-3 text-slate-600 leading-relaxed text-[15px] ${className}`}>
      {children}
    </div>
  );
}
