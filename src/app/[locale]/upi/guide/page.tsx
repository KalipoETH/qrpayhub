import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: "How UPI Works – Complete Guide to India's Payment System | QRPayHub",
  description:
    "Complete guide to UPI (Unified Payments Interface): how it works, UPI IDs, QR code format, supported apps and India's payment revolution.",
  keywords: [
    'upi guide',
    'how upi works',
    'upi qr code format',
    'unified payments interface',
    'upi id explained',
    'npci upi',
  ],
};

const BANK_HANDLES = [
  { handle: '@okicici',   bank: 'ICICI Bank',              app: 'Google Pay / third-party' },
  { handle: '@ybl',       bank: 'Yes Bank',                app: 'PhonePe' },
  { handle: '@paytm',     bank: 'Paytm Payments Bank',     app: 'Paytm' },
  { handle: '@oksbi',     bank: 'State Bank of India',     app: 'Google Pay (SBI)' },
  { handle: '@upi',       bank: 'NPCI / all banks',        app: 'BHIM' },
  { handle: '@axl',       bank: 'Axis Bank',               app: 'Axis Pay' },
  { handle: '@hdfcbank',  bank: 'HDFC Bank',               app: 'HDFC MobileBanking' },
  { handle: '@okaxis',    bank: 'Axis Bank',               app: 'Google Pay (Axis)' },
  { handle: '@ibl',       bank: 'IndusInd Bank',           app: 'IndusInd' },
  { handle: '@kotak',     bank: 'Kotak Mahindra Bank',     app: 'Kotak Pay' },
];

const PAYLOAD_PARAMS = [
  { param: 'pa',  value: 'merchant@okhdfc',    required: true,  description: 'Payee UPI ID (Virtual Payment Address)' },
  { param: 'pn',  value: 'Raj Stores',         required: true,  description: 'Payee name – URL-encoded, max 50 characters' },
  { param: 'am',  value: '150.00',             required: false, description: 'Amount in INR – decimal with dot (omit for static QR)' },
  { param: 'cu',  value: 'INR',                required: false, description: 'Currency – always INR for UPI' },
  { param: 'tn',  value: 'Invoice 001',        required: false, description: 'Transaction note / payment purpose – max 50 chars' },
  { param: 'mc',  value: '5411',               required: false, description: 'Merchant Category Code (4-digit MCC)' },
  { param: 'tr',  value: 'TXN001',             required: false, description: 'Transaction reference – for merchant reconciliation' },
];

const STATIC_VS_DYNAMIC = [
  { feature: 'Amount embedded',   staticQr: 'No – payer enters amount',  dynamicQr: 'Yes – fixed in QR code' },
  { feature: 'Best for',          staticQr: 'Shops, general use',         dynamicQr: 'Invoices, e-commerce checkout' },
  { feature: 'Reusability',       staticQr: 'Print once, use forever',    dynamicQr: 'New code per transaction' },
  { feature: 'Payer input',       staticQr: 'Amount + PIN',               dynamicQr: 'PIN only' },
  { feature: 'Reconciliation',    staticQr: 'Manual matching',            dynamicQr: 'Automatic via transaction ref' },
];

const UPI_APPS = [
  { app: 'PhonePe',     share: '~48%', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { app: 'Google Pay',  share: '~37%', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { app: 'Paytm',       share: '~8%',  color: 'bg-sky-100 text-sky-700 border-sky-200' },
  { app: 'BHIM',        share: '~3%',  color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { app: 'Amazon Pay',  share: '~2%',  color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { app: 'Others',      share: '~2%',  color: 'bg-slate-100 text-slate-600 border-slate-200' },
];

const GLOBAL_COUNTRIES = [
  { country: 'Singapore',  network: 'PayNow',          flag: '🇸🇬' },
  { country: 'UAE',         network: 'AECB / Mashreq', flag: '🇦🇪' },
  { country: 'France',      network: 'LYRA',           flag: '🇫🇷' },
  { country: 'UK',          network: 'PayXpert',       flag: '🇬🇧' },
  { country: 'Bahrain',     network: 'BFC',            flag: '🇧🇭' },
  { country: 'Mauritius',   network: 'MCB',            flag: '🇲🇺' },
  { country: 'Nepal',       network: 'NPI / Fonepay',  flag: '🇳🇵' },
  { country: 'Bhutan',      network: 'BNBL',           flag: '🇧🇹' },
  { country: 'Malaysia',    network: 'DuitNow (planned)', flag: '🇲🇾' },
  { country: 'Thailand',    network: 'PromptPay (planned)', flag: '🇹🇭' },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "How UPI Works – Complete Guide to India's Payment System",
  description:
    "Complete guide to UPI (Unified Payments Interface): how it works, UPI IDs, QR code format, supported apps and India's payment revolution.",
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/upi/guide' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',   item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'UPI QR', item: 'https://qrpayhub.com/en/upi' },
      { '@type': 'ListItem', position: 3, name: 'Guide',  item: 'https://qrpayhub.com/en/upi/guide' },
    ],
  },
};

export default function UPIGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-upi-guide"
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

      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <Breadcrumb items={[
        { label: 'Home',   href: '/' },
        { label: 'UPI QR', href: '/upi' },
        { label: 'Guide' },
      ]} />

      {/* ── Title ────────────────────────────────────────────────────────── */}
      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          How UPI Works – Complete Guide
        </h1>
        <p className="text-lg text-slate-500">
          Everything about India&apos;s Unified Payments Interface: UPI IDs, QR format, apps and global expansion.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/upi/generator"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Try the Generator →
          </Link>
        </div>
      </header>

      <div className="space-y-14 pt-4">

        {/* ── Section 1: What is UPI ───────────────────────────────────────── */}
        <Section id="what-is-upi" title="What is UPI?">
          <Prose>
            <p>
              <strong>UPI</strong> — the <strong>Unified Payments Interface</strong> — is India&apos;s
              national real-time payment system, developed and operated by the{' '}
              <strong>National Payments Corporation of India (NPCI)</strong> under the oversight of
              the Reserve Bank of India (RBI). Launched in April 2016, UPI has grown into the
              world&apos;s largest instant payment network by transaction volume, processing{' '}
              <strong>over 10 billion transactions per month</strong> as of 2026.
            </p>
            <p>
              UPI allows any two bank account holders in India to transfer money instantly,{' '}
              <strong>24 hours a day, 7 days a week</strong> — including bank holidays — at zero
              cost to consumers. Instead of requiring account numbers and IFSC codes, UPI uses a
              simple address called a <strong>Virtual Payment Address (VPA)</strong> or UPI ID in
              the format <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">username@bankhandle</code>.
            </p>
            <p>
              Today, over <strong>500 banks</strong> and dozens of consumer apps participate in the
              UPI ecosystem. India accounts for approximately <strong>46% of all real-time payment
              transactions globally</strong> — more than the US, EU and China combined — largely
              thanks to UPI.
            </p>
          </Prose>
        </Section>

        {/* ── Section 2: Step by Step ──────────────────────────────────────── */}
        <Section id="how-it-works" title="How UPI Works – Step by Step">
          <ol className="space-y-4">
            {[
              {
                step: 1,
                title: 'Merchant displays UPI QR code',
                body: 'A static QR code (for any amount) is printed or displayed at the counter. For invoices and e-commerce, a dynamic QR with the exact amount is generated per transaction.',
              },
              {
                step: 2,
                title: 'Customer opens any UPI app',
                body: 'PhonePe, Google Pay, Paytm, BHIM, Amazon Pay, WhatsApp Pay or any banking app work identically. UPI is fully interoperable across all participating apps and banks.',
              },
              {
                step: 3,
                title: 'Customer scans the QR code',
                body: 'The app activates the camera. The UPI QR can be scanned from a printed slip, a phone screen or a digital PDF – any surface works.',
              },
              {
                step: 4,
                title: 'Payment details are pre-filled',
                body: 'The payee UPI ID, name, and amount (if embedded in the QR) are instantly extracted. No manual entry, no typos, no wrong IFSC codes.',
              },
              {
                step: 5,
                title: 'Customer enters UPI PIN',
                body: 'The 4- or 6-digit UPI PIN is the final authentication step. It never leaves the device and is never stored anywhere outside the bank\'s secure system.',
              },
              {
                step: 6,
                title: 'Transfer completes within seconds',
                body: 'The NPCI infrastructure processes the transfer in real time. Funds move directly between bank accounts – no intermediary wallet involved.',
              },
              {
                step: 7,
                title: 'Both parties receive confirmation',
                body: 'The payer gets a transaction success notification. The payee receives an instant credit alert via SMS and in-app notification. The transaction ID is shared for reference.',
              },
            ].map(({ step, title, body }) => (
              <li key={step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">
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

        {/* ── Section 3: UPI IDs ───────────────────────────────────────────── */}
        <Section id="upi-ids" title="Understanding UPI IDs">
          <Prose>
            <p>
              A <strong>UPI ID</strong> (Virtual Payment Address / VPA) is the human-readable
              address of a bank account in the UPI system. The format is always{' '}
              <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">username@bankhandle</code>.
              The username part can be a mobile number, name or custom string chosen by the user.
              The bank handle identifies the bank or payment app.
            </p>
            <p>
              One person can have <strong>multiple UPI IDs</strong> linked to the same or different
              bank accounts — for example, one via PhonePe and another via Google Pay. All UPI IDs
              belonging to the same account receive the same money; they are just different
              addresses for the same destination.
            </p>
          </Prose>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-3">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {['Handle', 'Bank', 'App / Usage'].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {BANK_HANDLES.map(({ handle, bank, app }) => (
                  <tr key={handle} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-orange-600 font-semibold">{handle}</td>
                    <td className="px-4 py-3 text-slate-800 font-medium">{bank}</td>
                    <td className="px-4 py-3 text-slate-500">{app}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── Section 4: Payload Format ────────────────────────────────────── */}
        <Section id="payload-format" title="The UPI QR Payload Format">
          <Prose>
            <p>
              A UPI QR code encodes a standard deep link using the{' '}
              <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">upi://pay</code>{' '}
              URI scheme. The payload is defined by the NPCI UPI Deep Link specification and is
              recognized by all UPI-compliant apps. Here is a complete example:
            </p>
          </Prose>

          <pre className="bg-slate-900 text-emerald-400 text-sm font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4">
{`upi://pay?pa=merchant@okhdfc&pn=Raj%20Stores&am=150.00&cu=INR&tn=Invoice%20001`}
          </pre>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {['Parameter', 'Example Value', 'Required', 'Description'].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PAYLOAD_PARAMS.map(({ param, value, required, description }) => (
                  <tr key={param} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-orange-600 font-bold">{param}</td>
                    <td className="px-4 py-3 font-mono text-slate-600 text-xs">{value}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        required
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-slate-100 text-slate-500'
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

        {/* ── Section 5: Static vs Dynamic ─────────────────────────────────── */}
        <Section id="static-vs-dynamic" title="Static vs Dynamic QR Codes">
          <Prose>
            <p>
              There are two types of UPI QR codes. Choosing the right one depends on your use case:
              static for shops and recurring use, dynamic for precise invoice or checkout amounts.
            </p>
          </Prose>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-3">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">Feature</th>
                  <th className="px-4 py-3 font-semibold text-orange-700 border-b border-slate-200">Static QR</th>
                  <th className="px-4 py-3 font-semibold text-blue-700 border-b border-slate-200">Dynamic QR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {STATIC_VS_DYNAMIC.map(({ feature, staticQr, dynamicQr }) => (
                  <tr key={feature} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-700">{feature}</td>
                    <td className="px-4 py-3 text-slate-600">{staticQr}</td>
                    <td className="px-4 py-3 text-slate-600">{dynamicQr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── Section 6: Apps Ecosystem ────────────────────────────────────── */}
        <Section id="apps" title="UPI Apps Ecosystem">
          <Prose>
            <p>
              All UPI apps are <strong>fully interoperable</strong> — a payment from PhonePe lands
              instantly in an account linked to BHIM, Paytm or any banking app. There is no
              lock-in to any specific app or bank. As of 2025, market share by transaction volume:
            </p>
          </Prose>
          <div className="flex flex-wrap gap-3 mt-3">
            {UPI_APPS.map(({ app, share, color }) => (
              <div
                key={app}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold ${color}`}
              >
                <span>{app}</span>
                <span className="opacity-70 font-normal">{share}</span>
              </div>
            ))}
          </div>
          <Prose className="mt-4">
            <p>
              Beyond consumer apps, every major Indian bank has its own UPI-enabled mobile banking
              app: SBI YONO, HDFC Mobile Banking, ICICI iMobile, Axis Pay, Kotak Pay and many more.
              All use the same underlying UPI infrastructure and accept QR codes from any source.
            </p>
          </Prose>
        </Section>

        {/* ── Section 7: Global Expansion ──────────────────────────────────── */}
        <Section id="global" title="UPI's Global Expansion">
          <Prose>
            <p>
              UPI is no longer limited to India. NPCI International, a subsidiary of NPCI, has been
              extending UPI acceptance to countries with large Indian diaspora communities and strong
              trade ties with India. Cross-border UPI transactions link directly to partner payment
              networks in each country.
            </p>
          </Prose>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
            {GLOBAL_COUNTRIES.map(({ country, network, flag }) => (
              <div
                key={country}
                className="bg-white border border-slate-100 rounded-xl p-3 flex items-start gap-2.5 shadow-sm"
              >
                <span className="text-2xl flex-shrink-0">{flag}</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{country}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{network}</p>
                </div>
              </div>
            ))}
          </div>
          <Prose className="mt-4">
            <p>
              In Singapore, Indian travellers can pay at merchants that display the PayNow QR code
              using their UPI app — the transaction is settled in SGD from the Indian bank account
              in INR. Similar corridors are active with UAE and Bahrain. The G20 mandate to
              interlink fast payment systems globally will further expand UPI&apos;s reach.
            </p>
          </Prose>
        </Section>

        {/* ── Section 8: Security & Privacy ────────────────────────────────── */}
        <Section id="security" title="Security &amp; Privacy">
          <ul className="space-y-3">
            {[
              { icon: '🔒', text: 'PIN never in QR code: The UPI PIN is entered by the payer in their own banking app and is never encoded in the QR code or transmitted to the merchant.' },
              { icon: '✅', text: 'Payment always authorized by payer: No charge can occur without the payer actively entering their PIN or biometric. QR codes are read-only payment requests.' },
              { icon: '🏦', text: 'NPCI regulated, RBI supervised: UPI operates under the Payment and Settlement Systems Act, 2007. All transactions are logged and audited by NPCI.' },
              { icon: '⚡', text: 'Instant refunds for failures: Failed or disputed transactions trigger automatic refunds within 24–48 hours per RBI circular.' },
              { icon: '🛡️', text: 'Safe to share QR publicly: A UPI QR contains only your UPI ID and name – no bank account details, no IFSC, no sensitive data.' },
              { icon: '🌐', text: 'Client-side generation: QRPayHub generates UPI QR codes entirely in your browser. No payment data is sent to our servers.' },
            ].map(({ icon, text }) => (
              <li key={text} className="flex gap-3 text-sm text-slate-600">
                <span className="text-lg flex-shrink-0">{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-orange-900 text-lg">Ready to generate your UPI QR Code?</p>
          <p className="text-orange-700 text-sm">Free, instant, works with all UPI apps.</p>
          <Link
            href="/upi/generator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-sm transition-colors"
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
