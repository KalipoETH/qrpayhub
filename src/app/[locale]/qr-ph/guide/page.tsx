import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'How QR Ph Works – Philippines Payment Guide | QRPayHub',
    description:
      "Complete guide to QR Ph: the Philippines' national QR payment standard by BSP. Proxy types, InstaPay network, GCash, Maya, EMV payload and financial inclusion.",
    keywords: [
      'qr ph guide',
      'how qr ph works',
      'instapay qr code',
      'philippines payment guide',
      'gcash qr ph',
      'bsp qr standard',
      'ph instapay me',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/qr-ph/guide'),
  };
}

const PROXY_TYPES = [
  {
    type: 'MSISDN (Mobile)',
    code: 'MSISDN',
    example: '09171234567',
    normalized: '+639171234567',
    usedBy: 'GCash, Maya, all mobile-linked accounts',
  },
  {
    type: 'ACCT (Account)',
    code: 'ACCT',
    example: '1234567890',
    normalized: '1234567890',
    usedBy: 'BDO, BPI, Metrobank, Landbank, UnionBank',
  },
  {
    type: 'EMAIL',
    code: 'EMAIL',
    example: 'juan@example.com',
    normalized: 'juan@example.com',
    usedBy: 'Banks supporting email-as-proxy registration',
  },
];

const EMV_TAGS = [
  { tag: '00',      value: '01',               required: true,  description: 'Payload Format Indicator (always "01")' },
  { tag: '01',      value: '11',               required: false, description: 'Point of Initiation (11=static, 12=dynamic)' },
  { tag: '26',      value: '...',              required: true,  description: 'Merchant Account Information (BSP/InstaPay)' },
  { tag: '26 › 00', value: 'PH.INSTAPAY.ME',  required: true,  description: 'QR Ph Application ID (AID)' },
  { tag: '26 › 01', value: 'MSISDN',          required: true,  description: 'Proxy type: MSISDN, ACCT, or EMAIL' },
  { tag: '26 › 02', value: '+639171234567',   required: true,  description: 'Proxy value (normalized phone, account, or email)' },
  { tag: '52',      value: '0000',            required: false, description: 'Merchant Category Code (MCC)' },
  { tag: '53',      value: '608',             required: true,  description: 'Transaction Currency (608 = PHP)' },
  { tag: '54',      value: '500.00',          required: false, description: 'Transaction Amount (with 2 decimals)' },
  { tag: '58',      value: 'PH',             required: true,  description: 'Country Code' },
  { tag: '59',      value: 'Juan dela Cruz', required: true,  description: 'Merchant / Payee Name (max 25 chars)' },
  { tag: '60',      value: 'Manila',         required: true,  description: 'Merchant City' },
  { tag: '62 › 05', value: 'Grocery payment', required: false, description: 'Purpose / Reference (max 35 chars)' },
  { tag: '63',      value: 'XXXX',           required: true,  description: 'CRC16-CCITT checksum (4 hex chars)' },
];

const INSTAPAY_VS_PESONET = [
  { feature: 'Transfer speed',     instapay: 'Real-time (seconds)',       pesonet: 'Same-day batch (1–3 hours)' },
  { feature: 'Max per transaction', instapay: '₱50,000',                  pesonet: 'Higher amounts (no fixed cap)' },
  { feature: 'Availability',       instapay: '24/7/365',                  pesonet: 'Business days (cutoff times)' },
  { feature: 'Use case',           instapay: 'QR Ph, small transfers',    pesonet: 'Payroll, large B2B' },
  { feature: 'Settlement',         instapay: 'Gross real-time',           pesonet: 'Net batch' },
  { feature: 'Network operator',   instapay: 'BancNet',                   pesonet: 'BancNet' },
];

const PH_BANKS = [
  { name: 'GCash',             type: 'E-Wallet',    users: '94M+' },
  { name: 'Maya (PayMaya)',    type: 'E-Wallet',    users: '50M+' },
  { name: 'BDO Unibank',      type: 'Bank',        users: '14M+' },
  { name: 'BPI Mobile',       type: 'Bank',        users: '8M+' },
  { name: 'UnionBank',        type: 'Bank',        users: '5M+' },
  { name: 'Metrobank',        type: 'Bank',        users: '4M+' },
  { name: 'Landbank',         type: 'Bank',        users: '3M+' },
  { name: 'RCBC DiskarTech', type: 'App/Bank',    users: '3M+' },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How QR Ph Works – Philippines Payment Guide',
  description:
    "Complete guide to QR Ph: the Philippines' national QR payment standard. Proxy types, InstaPay, GCash, Maya, and financial inclusion.",
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/qr-ph/guide' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'QR Ph', item: 'https://qrpayhub.com/en/qr-ph' },
      { '@type': 'ListItem', position: 3, name: 'Guide', item: 'https://qrpayhub.com/en/qr-ph/guide' },
    ],
  },
};

export default function QRPhGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-qrph-guide"
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
        { label: 'Home',  href: '/' },
        { label: 'QR Ph', href: '/qr-ph' },
        { label: 'Guide' },
      ]} />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          How QR Ph Works – Philippines Payment Guide
        </h1>
        <p className="text-lg text-slate-500">
          Everything about the Philippines&apos; national QR payment standard: proxy types, InstaPay network, GCash, Maya and financial inclusion.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/qr-ph/generator"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-white text-sm font-semibold rounded-xl transition-colors"
            style={{ backgroundColor: '#0038A8' }}
          >
            Try the Generator →
          </Link>
        </div>
      </header>

      <div className="space-y-14 pt-4">

        {/* ── Section 1: What is QR Ph ───────────────────────────────────────── */}
        <Section id="what-is-qrph" title="What is QR Ph?">
          <Prose>
            <p>
              <strong>QR Ph</strong> is the Philippines&apos; national QR code standard for financial
              transactions, developed and mandated by the{' '}
              <strong>Bangko Sentral ng Pilipinas (BSP)</strong> — the country&apos;s central bank.
              Launched in 2021–2022 as part of the Digital Payments Transformation Roadmap
              (2020–2023), QR Ph unified a fragmented payments landscape where each bank and e-wallet
              operated its own proprietary QR format.
            </p>
            <p>
              Under QR Ph, any consumer with a mobile banking or e-wallet app can scan a single QR
              code and pay instantly, regardless of which institution issued their account. The
              standard is built on the <strong>EMV QR Code Merchant Presented Mode (MPM)</strong>{' '}
              specification and uses the BSP Application ID{' '}
              <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">PH.INSTAPAY.ME</code>{' '}
              in EMV tag 26 for real-time interbank settlement via InstaPay.
            </p>
            <p>
              QR Ph supports three proxy types: mobile number (MSISDN), bank account number (ACCT),
              and email address (EMAIL). This flexibility accommodates both traditional bank accounts
              and mobile-first e-wallets like GCash and Maya.
            </p>
          </Prose>
        </Section>

        {/* ── Section 2: Step by Step ───────────────────────────────────────── */}
        <Section id="how-it-works" title="How QR Ph Works – Step by Step">
          <ol className="space-y-4">
            {[
              {
                step: 1,
                title: 'Payee generates a QR Ph code',
                body: 'Select proxy type (mobile/account/email), enter the proxy value, payee name, and optionally an amount and purpose. The QR encodes these as an EMV payload with the PH.INSTAPAY.ME AID.',
              },
              {
                step: 2,
                title: 'Payer opens any QR Ph-enabled app',
                body: 'GCash, Maya, BDO, BPI, Metrobank, Landbank, UnionBank or any other BSP-supervised institution — all support QR Ph scanning. Full interoperability across the InstaPay network.',
              },
              {
                step: 3,
                title: 'Payer scans the QR code',
                body: 'The app reads the EMV payload, extracts the proxy type and value, and looks up the destination account through the BSP registry.',
              },
              {
                step: 4,
                title: 'Payment details are pre-filled',
                body: 'The payee name, amount (if embedded), and purpose are displayed for review. The payer confirms the details before proceeding.',
              },
              {
                step: 5,
                title: 'Payer authenticates',
                body: 'The payer uses their app\'s authentication method (PIN, fingerprint, or face ID). No credentials are transmitted to the payee.',
              },
              {
                step: 6,
                title: 'Transfer settles via InstaPay',
                body: 'The transaction is processed through BancNet\'s InstaPay network in real time. Funds arrive within seconds, 24/7/365, including holidays.',
              },
              {
                step: 7,
                title: 'Confirmation for both parties',
                body: 'Both payer and payee receive instant transaction notifications. The ₱50,000 per-transaction limit applies; larger amounts require PESONet.',
              },
            ].map(({ step, title, body }) => (
              <li key={step} className="flex gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm"
                  style={{ backgroundColor: '#0038A8' }}
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

        {/* ── Section 3: Proxy Types ────────────────────────────────────────── */}
        <Section id="proxy-types" title="Proxy Types: Mobile, Account, Email">
          <Prose>
            <p>
              A <strong>proxy</strong> is an alias that represents a bank account or e-wallet in the
              QR Ph system. Instead of sharing a full account number and bank details, the payee
              registers a proxy — typically their mobile number — that the BSP registry maps to their
              financial account. This simplifies QR Ph for consumers and merchants alike.
            </p>
            <p>
              <strong>Philippine mobile number normalisation:</strong> Philippine mobile numbers
              (11 digits starting with 09) must be normalized to international format for QR Ph.
              Replace the leading <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">0</code>{' '}
              with <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">+63</code>.
              For example:{' '}
              <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">09171234567</code>{' '}
              →{' '}
              <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">+639171234567</code>.
              qrpayhub.com handles this normalisation automatically.
            </p>
          </Prose>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-3">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {['Proxy Type', 'Code', 'Example Input', 'Normalized', 'Used By'].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PROXY_TYPES.map(({ type, code, example, normalized, usedBy }) => (
                  <tr key={type} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-800">{type}</td>
                    <td className="px-4 py-3 font-mono font-bold" style={{ color: '#0038A8' }}>{code}</td>
                    <td className="px-4 py-3 font-mono text-slate-600 text-xs">{example}</td>
                    <td className="px-4 py-3 font-mono text-emerald-700 text-xs">{normalized}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{usedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── Section 4: EMV Payload ────────────────────────────────────────── */}
        <Section id="emv-payload" title="The QR Ph EMV Payload">
          <Prose>
            <p>
              QR Ph is based on the EMV QR Code Merchant Presented Mode specification. The BSP
              Application ID{' '}
              <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">PH.INSTAPAY.ME</code>{' '}
              is stored in <strong>tag 26 › tag 00</strong>. The proxy type and value follow in
              tag 01 and tag 02 respectively. All payloads end with a{' '}
              <strong>CRC16-CCITT checksum</strong> in tag 63.
            </p>
          </Prose>

          <pre className="bg-slate-900 text-emerald-400 text-sm font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4">
{`000201            ← Payload Format Indicator
010211            ← Point of Initiation: 11 (static)
2639              ← Merchant Account Information (ID 26)
  0015PH.INSTAPAY.ME  ← QR Ph Application ID
  0106MSISDN       ← Proxy type: MSISDN
  020[len]+63...   ← Normalized phone number
5204[mcc]         ← Merchant Category Code
5303608           ← Currency: PHP (608)
5406500.00        ← Amount: 500 PHP
5802PH            ← Country Code
5914Juan dela Cruz ← Payee Name
6006Manila        ← City
62[len]           ← Additional Data
  0514Grocery payment ← Purpose
6304XXXX          ← CRC16-CCITT checksum`}
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
                    <td className="px-4 py-3 font-mono font-bold" style={{ color: '#0038A8' }}>{tag}</td>
                    <td className="px-4 py-3 font-mono text-slate-600 text-xs">{value}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        required ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
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

        {/* ── Section 5: GCash & Maya ───────────────────────────────────────── */}
        <Section id="gcash-maya" title="GCash & Maya – The Dominant Apps">
          <Prose>
            <p>
              The Philippine digital payment ecosystem is dominated by two super-apps:{' '}
              <strong>GCash</strong> (by Globe Telecom) and <strong>Maya</strong> (formerly PayMaya,
              by PLDT). Together they account for the majority of QR Ph transactions.
            </p>
            <p>
              <strong>GCash</strong> has over 94 million registered users — roughly 85% of the
              Philippine adult population. A GCash account is linked to a mobile number (MSISDN proxy)
              and can be used to scan any QR Ph code. GCash-to-GCash transfers are instant and free
              within the GCash network; transfers to other banks use the QR Ph / InstaPay rail.
            </p>
            <p>
              <strong>Maya</strong> (formerly PayMaya) has 50+ million users and offers a broader
              financial services suite including virtual and physical Visa/Mastercard debit cards,
              savings accounts (Maya Bank), and crypto features. Maya supports QR Ph for both sending
              and receiving payments.
            </p>
            <p>
              <strong>Important distinction:</strong> &ldquo;GCash QR&rdquo; within the GCash app
              works for GCash-to-GCash merchant payments. <strong>QR Ph</strong> is the interoperable
              standard that works across all banks and e-wallets. GCash supports scanning QR Ph codes
              for interbank transfers, making both systems complementary rather than competing.
            </p>
          </Prose>
        </Section>

        {/* ── Section 6: InstaPay vs PESONet ───────────────────────────────── */}
        <Section id="instapay-pesonet" title="InstaPay vs PESONet">
          <Prose>
            <p>
              The Philippines operates two electronic fund transfer systems supervised by BSP.
              QR Ph uses <strong>InstaPay</strong> for real-time transfers. For larger amounts or
              batch processing, <strong>PESONet</strong> is the alternative.
            </p>
          </Prose>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-3">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">Feature</th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-200" style={{ color: '#0038A8' }}>InstaPay (QR Ph)</th>
                  <th className="px-4 py-3 font-semibold text-amber-700 border-b border-slate-200">PESONet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {INSTAPAY_VS_PESONET.map(({ feature, instapay, pesonet }) => (
                  <tr key={feature} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-700">{feature}</td>
                    <td className="px-4 py-3 text-slate-600">{instapay}</td>
                    <td className="px-4 py-3 text-slate-600">{pesonet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── Section 7: Supported Banks & Wallets ──────────────────────────── */}
        <Section id="supported-apps" title="Supported Banks & Wallets">
          <Prose>
            <p>
              All BSP-supervised financial institutions are required to support QR Ph. This includes
              commercial banks, rural banks, thrift banks, cooperative banks, and e-money issuers
              (EMIs). As of 2025, this covers hundreds of institutions across the Philippines.
            </p>
          </Prose>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {PH_BANKS.map(({ name, type, users }) => (
              <div
                key={name}
                className="bg-white border border-slate-100 rounded-xl p-3 flex items-center justify-between shadow-sm"
              >
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{name}</p>
                  <p className="text-xs text-slate-400">{type}</p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  {users}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Section 8: Financial Inclusion ───────────────────────────────── */}
        <Section id="financial-inclusion" title="Financial Inclusion in the Philippines">
          <Prose>
            <p>
              The Philippines has one of the largest unbanked populations in Southeast Asia —
              historically, over 70% of adults lacked a formal bank account. QR Ph and the broader
              digital payments ecosystem are central to BSP&apos;s strategy to change this.
            </p>
            <p>
              <strong>BSP&apos;s Digital Payments Transformation Roadmap</strong> targets 50% of
              retail payment transactions to be digital by 2023 and 70% of Filipino adults to have
              transaction accounts. QR Ph, InstaPay, and e-wallets like GCash are the primary
              instruments for achieving these goals.
            </p>
            <p>
              The combination of <strong>smartphone penetration</strong> (among the highest in
              Southeast Asia), GCash&apos;s near-universal adoption, and mandatory BSP compliance
              for all financial institutions has driven rapid progress. Sari-sari (convenience)
              stores, market vendors, and jeepney (public transport) operators across the archipelago
              now display QR Ph codes, enabling cashless payments even in remote barangays without
              card terminal infrastructure.
            </p>
            <p>
              QR Ph also supports the <strong>overseas Filipino worker (OFW)</strong> remittance
              corridor. The Philippines receives one of the world&apos;s largest remittance inflows
              (~$37B annually). BSP is working to integrate QR Ph with cross-border QR interoperability
              frameworks to reduce remittance costs and processing times.
            </p>
            <p>
              For businesses and developers, qrpayhub.com&apos;s QR Ph generator produces fully
              spec-compliant EMV payloads with automatic Philippine mobile number normalisation —
              free, in-browser, with no account needed.
            </p>
          </Prose>
        </Section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-6 text-center space-y-3"
          style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}
        >
          <p className="font-semibold text-lg" style={{ color: '#1e3a5f' }}>
            Ready to generate your QR Ph Code?
          </p>
          <p className="text-sm" style={{ color: '#1e40af' }}>
            Free, instant, works with GCash, Maya and all InstaPay apps.
          </p>
          <Link
            href="/qr-ph/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#0038A8' }}
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
