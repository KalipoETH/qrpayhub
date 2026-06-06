import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: "How FPS Works – Hong Kong Faster Payment System Guide | QRPayHub",
    description:
      "Complete guide to FPS: Hong Kong's Faster Payment System. Proxy types, dual HKD/CNY currency, EMV QR format, supported banks and cross-border payments.",
    keywords: [
      'fps guide',
      'hong kong fps',
      'how fps works',
      'fps qr format',
      'hkma fps guide',
      'fps hkd cny',
      'fps emv payload',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/fps/guide'),
  };
}

const PROXY_TYPES = [
  {
    type: 'Mobile Number',
    tag: '2',
    format: '+852XXXXXXXX',
    example: '91234567 → +85291234567',
    useCase: 'Most common for P2P transfers',
    color: 'bg-red-50 text-red-700 border-red-200',
  },
  {
    type: 'Email Address',
    tag: '3',
    format: 'user@example.com',
    example: 'john@company.hk',
    useCase: 'Business and privacy-conscious users',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    type: 'FPS ID',
    tag: '4',
    format: '7–9 digit number',
    example: '1234567',
    useCase: 'Bank-assigned identifier; extra privacy layer',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
  },
];

const EMV_TAGS = [
  { id: '00', name: 'Payload Format Indicator',   value: '01',               required: true,  description: 'Always "01" – EMV Merchant Presented Mode version' },
  { id: '01', name: 'Initiation Method',           value: '11 or 12',         required: true,  description: '11 = static (payer enters amount), 12 = dynamic (amount in QR)' },
  { id: '26', name: 'Merchant Account – FPS',      value: 'AID + proxy',      required: true,  description: 'AID: hk.edu.hkma.fps; sub-tags 00 = AID, 01 = proxy type, 02 = proxy value' },
  { id: '52', name: 'Merchant Category Code',      value: '0000',             required: true,  description: 'ISO 18245 MCC – 0000 for general/not assigned' },
  { id: '53', name: 'Transaction Currency',        value: '344 or 156',       required: true,  description: '344 = HKD, 156 = CNY – unique dual-currency feature of FPS' },
  { id: '54', name: 'Transaction Amount',          value: '88.50',            required: false, description: 'Present in dynamic QR only; omitted in static codes' },
  { id: '58', name: 'Country Code',               value: 'HK',               required: true,  description: 'ISO 3166-1 alpha-2 – Hong Kong' },
  { id: '59', name: 'Merchant Name',              value: 'Cheung\'s Store',   required: true,  description: 'Displayed to payer on confirmation screen, max 25 chars' },
  { id: '60', name: 'Merchant City',              value: 'Hong Kong',         required: true,  description: 'City of the merchant' },
  { id: '62', name: 'Additional Data Field',      value: 'reference / memo',  required: false, description: 'Optional reference ID, memo, or terminal ID' },
  { id: '63', name: 'CRC',                        value: '4-digit hex',       required: true,  description: 'CRC16-CCITT checksum of entire payload including "6304"' },
];

const BANKS_WALLETS = [
  { name: 'HSBC HK',          type: 'bank',   color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'Hang Seng Bank',   type: 'bank',   color: 'bg-green-100 text-green-700 border-green-200' },
  { name: 'Bank of China HK', type: 'bank',   color: 'bg-red-100 text-red-800 border-red-200' },
  { name: 'Standard Chartered HK', type: 'bank', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { name: 'DBS HK',           type: 'bank',   color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'Citibank HK',      type: 'bank',   color: 'bg-sky-100 text-sky-700 border-sky-200' },
  { name: 'OCBC HK',          type: 'bank',   color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'ICBC (Asia)',       type: 'bank',   color: 'bg-red-100 text-red-800 border-red-200' },
  { name: 'PayMe by HSBC',    type: 'wallet', color: 'bg-pink-100 text-pink-700 border-pink-200' },
  { name: 'AlipayHK',         type: 'wallet', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { name: 'WeChat Pay HK',    type: 'wallet', color: 'bg-green-100 text-green-700 border-green-200' },
  { name: 'Tap & Go (HKT)',   type: 'wallet', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { name: 'All licensed banks', type: 'bank', color: 'bg-slate-100 text-slate-500 border-slate-200' },
];

const CHATS_COMPARISON = [
  { feature: 'Purpose',          fps: 'Retail & everyday transfers',      chats: 'High-value interbank (corporates)' },
  { feature: 'Settlement',       fps: 'Real-time (seconds)',               chats: 'Same-day or next-day' },
  { feature: 'Availability',     fps: '24/7/365',                         chats: 'Business hours only' },
  { feature: 'Typical amount',   fps: 'Up to HK$1,000,000',               chats: 'Millions / no upper limit' },
  { feature: 'Cost (consumer)',  fps: 'Free at most banks',               chats: 'Fee per transaction' },
  { feature: 'Identifier',       fps: 'Phone / email / FPS ID',           chats: 'Bank account + sort code' },
  { feature: 'QR code support',  fps: 'Native FPS QR (EMV MPM)',          chats: 'Not applicable' },
  { feature: 'Currency',         fps: 'HKD + CNY',                       chats: 'Multi-currency (HKD, USD, EUR…)' },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "How FPS Works – Hong Kong Faster Payment System Guide",
  description:
    "Complete guide to FPS: Hong Kong's Faster Payment System. Proxy types, dual HKD/CNY currency, EMV QR format, supported banks and cross-border payments.",
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/fps/guide' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'FPS',  item: 'https://qrpayhub.com/en/fps' },
      { '@type': 'ListItem', position: 3, name: 'Guide', item: 'https://qrpayhub.com/en/fps/guide' },
    ],
  },
};

// Hong Kong red
const HK_RED = '#BA0C2F';

export default function FPSGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-fps-guide"
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
        { label: 'Home', href: '/' },
        { label: 'FPS',  href: '/fps' },
        { label: 'Guide' },
      ]} />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          How FPS Works – Complete Guide
        </h1>
        <p className="text-lg text-slate-500">
          Everything about Hong Kong&apos;s Faster Payment System: proxy types, dual HKD/CNY
          currency, EMV QR format, supported banks and cross-border payments.
        </p>
        <Link
          href="/fps/generator"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-white text-sm font-semibold rounded-xl transition-colors"
          style={{ backgroundColor: HK_RED }}
        >
          Try the FPS Generator →
        </Link>
      </header>

      <div className="space-y-14 pt-4">

        {/* Section 1: What is FPS */}
        <Section id="what-is-fps" title="What is FPS?">
          <Prose>
            <p>
              <strong>FPS (Faster Payment System)</strong> is Hong Kong&apos;s real-time interbank
              payment infrastructure, operated by{' '}
              <strong>HKICL (Hong Kong Interbank Clearing Limited)</strong> under regulation by the{' '}
              <strong>Hong Kong Monetary Authority (HKMA)</strong>. Launched on{' '}
              <strong>September 30, 2018</strong>, FPS enables individuals and businesses to
              transfer money instantly using a mobile phone number, email address, or FPS ID —
              without needing to know the recipient&apos;s bank account number. Transfers settle
              within seconds, <strong>24 hours a day, 365 days a year</strong>.
            </p>
            <p>
              FPS has a feature that sets it apart from every other major instant payment system
              in the world: <strong>native dual-currency support</strong>. A single FPS infrastructure
              processes payments in both <strong>Hong Kong Dollar (HKD)</strong> and{' '}
              <strong>Chinese Yuan Renminbi (CNY)</strong>. This is not an afterthought — it
              reflects Hong Kong&apos;s unique position as a global financial hub that sits at the
              intersection of international finance (HKD) and mainland China&apos;s vast economy (CNY).
            </p>
            <p>
              As of 2025, FPS connects over <strong>7 million registered accounts</strong> across
              all licensed Hong Kong banks and major e-wallets including HSBC, Hang Seng Bank,
              Bank of China HK, Standard Chartered HK, DBS HK — as well as popular apps PayMe
              by HSBC, AlipayHK, WeChat Pay HK, and Tap &amp; Go. Monthly transaction volumes
              run into the hundreds of billions of HKD.
            </p>
            <p>
              FPS QR codes are built on the <strong>EMV Merchant Presented Mode (MPM)</strong>{' '}
              standard with Application Identifier (AID){' '}
              <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">hk.edu.hkma.fps</code>{' '}
              in EMV tag ID 26. The currency code in tag 53 determines whether the payment is
              in HKD (<code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">344</code>)
              or CNY (<code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">156</code>).
            </p>
          </Prose>
        </Section>

        {/* Section 2: Step by Step */}
        <Section id="how-it-works" title="How FPS Works – Step by Step">
          <ol className="space-y-4">
            {[
              {
                step: 1,
                title: 'Merchant displays FPS QR code',
                body: 'Static QR codes (open amount, payer enters value) are printed at the counter. Dynamic codes with pre-encoded amounts are generated per transaction for restaurants, vending machines, and e-commerce.',
              },
              {
                step: 2,
                title: 'Customer opens any FPS-enabled app',
                body: 'HSBC HK, Hang Seng, Bank of China HK, PayMe, AlipayHK, WeChat Pay HK, Tap & Go — all apps are interoperable through HKICL\'s FPS switching infrastructure.',
              },
              {
                step: 3,
                title: 'Customer selects currency (HKD or CNY)',
                body: 'For merchants that accept both currencies, the customer\'s app may prompt currency selection. The FPS QR payload specifies the merchant\'s preferred currency via EMV tag 53.',
              },
              {
                step: 4,
                title: 'Customer scans the FPS QR code',
                body: 'The app parses the EMV payload, extracts the AID (hk.edu.hkma.fps), proxy type, proxy value, and amount. Merchant name and city are shown for confirmation.',
              },
              {
                step: 5,
                title: 'Customer enters amount (if static QR)',
                body: 'For static QR codes, the customer enters the payment amount. For dynamic QR, the amount is pre-filled from the payload.',
              },
              {
                step: 6,
                title: 'Customer authenticates the payment',
                body: 'Authentication (PIN, biometrics, or in-app password) is completed in the customer\'s banking app. No credentials are stored in the QR code.',
              },
              {
                step: 7,
                title: 'HKICL routes and settles in real time',
                body: "HKICL's FPS infrastructure processes and settles the payment within seconds. Both payer and merchant receive immediate confirmation.",
              },
            ].map(({ step, title, body }) => (
              <li key={step} className="flex gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm"
                  style={{ backgroundColor: HK_RED }}
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

        {/* Section 3: Proxy Types */}
        <Section id="proxy-types" title="FPS Proxy Types">
          <Prose>
            <p>
              FPS uses <strong>proxy identifiers</strong> registered in HKICL&apos;s central registry
              to route payments without exposing bank account numbers. The proxy type is encoded
              in tag 26 of the FPS QR payload. Each bank or e-wallet may support a different
              subset of proxy types for registration.
            </p>
          </Prose>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-4">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {['Type', 'Tag', 'Format', 'Example', 'Use Case'].map(h => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PROXY_TYPES.map(({ type, tag, format, example, useCase, color }) => (
                  <tr key={type} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${color}`}>{type}</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600">{tag}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{format}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">{example}</td>
                    <td className="px-4 py-3 text-slate-600 text-sm">{useCase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Section 4: Dual Currency */}
        <Section id="dual-currency" title="Dual Currency: HKD and CNY">
          <Prose>
            <p>
              FPS&apos;s dual-currency capability is its most distinctive technical feature.
              No other ASEAN-region fast payment system natively processes two currencies
              within a single infrastructure. This design reflects Hong Kong&apos;s role as the
              primary financial gateway between the global economy (priced in USD/HKD) and
              mainland China (priced in CNY).
            </p>
          </Prose>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🟡</span>
                <h3 className="font-bold text-slate-800">HKD (Hong Kong Dollar)</h3>
              </div>
              <dl className="text-sm space-y-1.5">
                <div className="flex gap-2">
                  <dt className="text-slate-400 flex-shrink-0 w-28">Currency code</dt>
                  <dd className="font-mono font-bold" style={{ color: HK_RED }}>344</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-slate-400 flex-shrink-0 w-28">Best for</dt>
                  <dd className="text-slate-600">Local HK payments, retail, consumer transfers</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-slate-400 flex-shrink-0 w-28">Decimals</dt>
                  <dd className="text-slate-600">2 (cents)</dd>
                </div>
              </dl>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔴</span>
                <h3 className="font-bold text-slate-800">CNY (Chinese Yuan)</h3>
              </div>
              <dl className="text-sm space-y-1.5">
                <div className="flex gap-2">
                  <dt className="text-slate-400 flex-shrink-0 w-28">Currency code</dt>
                  <dd className="font-mono font-bold text-red-800">156</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-slate-400 flex-shrink-0 w-28">Best for</dt>
                  <dd className="text-slate-600">Cross-border with mainland China, CNY accounts</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-slate-400 flex-shrink-0 w-28">Decimals</dt>
                  <dd className="text-slate-600">2 (fen)</dd>
                </div>
              </dl>
            </div>
          </div>
          <Prose className="mt-4">
            <p>
              When generating an FPS QR code in CNY, the payer&apos;s app must have a CNY-enabled
              bank account registered with FPS. Settlement occurs in CNY through HKMA&apos;s
              designated CNY settlement bank. For most retail use cases involving Hong Kong
              residents, HKD (code 344) is the correct choice.
            </p>
          </Prose>
        </Section>

        {/* Section 5: EMV Payload */}
        <Section id="emv-payload" title="The FPS QR Payload – EMV Format">
          <Prose>
            <p>
              An FPS QR code is a TLV (Tag-Length-Value) ASCII string following the EMV MPM
              specification. Here is a complete example of a static FPS QR code using a mobile
              number proxy, HKD currency:
            </p>
          </Prose>

          <pre className="bg-slate-900 text-emerald-400 text-xs font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4 whitespace-pre-wrap break-all">
{`000201
010211
3162
  0019hk.edu.hkma.fps
  02  +85291234567
  0124Mobile Number
52040000
5303344
5802HK
5912Cheungs Store
6009Hong Kong
630412CD`}
          </pre>

          <Prose>
            <p>
              The AID <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">hk.edu.hkma.fps</code>{' '}
              in tag 26 sub-tag 00 identifies this as an FPS payment. Sub-tag 02 holds the
              normalized mobile number in international format. Tag 53 contains{' '}
              <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">344</code>{' '}
              (HKD). Tag 63 has the CRC16-CCITT checksum (4-char hex).
            </p>
          </Prose>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-4">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {['Tag ID', 'Field Name', 'Example', 'Required', 'Description'].map(h => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {EMV_TAGS.map(({ id, name, value, required, description }) => (
                  <tr key={id} className={id === '26' || id === '53' ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-slate-50'}>
                    <td className="px-4 py-3 font-mono font-bold" style={{ color: HK_RED }}>{id}</td>
                    <td className="px-4 py-3 font-semibold text-slate-700">{name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{value}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${required ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'}`}>
                        {required ? 'Required' : 'Optional'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-sm">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Section 6: Mobile Number Format */}
        <Section id="mobile-format" title="Mobile Number Format">
          <Prose>
            <p>
              Hong Kong mobile numbers must be normalized to international format before embedding
              in an FPS QR payload. The rule: prefix with{' '}
              <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">+852</code>{' '}
              (Hong Kong country code). Hong Kong numbers are always 8 digits and begin with
              5, 6, 7, or 9.
            </p>
          </Prose>
          <div className="overflow-x-auto rounded-2xl border border-slate-100 mt-3 bg-slate-50 p-4">
            <div className="space-y-2 text-sm font-mono">
              {[
                { input: '91234567', output: '+85291234567' },
                { input: '+85291234567', output: '+85291234567', note: '(already normalized)' },
                { input: '85291234567', output: '+85291234567', note: '(add + prefix)' },
              ].map(({ input, output, note }) => (
                <div key={input} className="flex items-center gap-3">
                  <span className="text-slate-400">Input:</span>
                  <code className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-slate-700">{input}</code>
                  <span className="text-slate-400">→</span>
                  <code className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-green-700">{output}</code>
                  {note && <span className="text-xs text-slate-400">{note}</span>}
                </div>
              ))}
            </div>
          </div>
          <Prose className="mt-3">
            <p>
              Email addresses and FPS IDs are used as-is without normalization. FPS IDs are
              purely numeric 7–9 digit strings assigned by the bank at registration time.
            </p>
          </Prose>
        </Section>

        {/* Section 7: Banks & Wallets */}
        <Section id="banks" title="Supported Banks &amp; E-Wallets">
          <Prose>
            <p>
              All licensed Hong Kong banks and major e-wallets participate in FPS. Every app is
              fully interoperable — a transfer from HSBC arrives instantly in an AlipayHK account,
              and vice versa. HKICL operates the central switching infrastructure that connects
              all participants.
            </p>
          </Prose>
          <div className="flex flex-wrap gap-2.5 mt-3">
            {BANKS_WALLETS.map(({ name, type, color }) => (
              <span key={name} className={`px-3 py-1.5 rounded-xl border text-sm font-semibold ${color}`}>
                {name}
                {type === 'wallet' && <span className="ml-1.5 text-xs opacity-60">wallet</span>}
              </span>
            ))}
          </div>
        </Section>

        {/* Section 8: FPS vs CHATS */}
        <Section id="fps-vs-chats" title="FPS vs CHATS – When to Use Which">
          <Prose>
            <p>
              Hong Kong&apos;s payment infrastructure has two main interbank clearing systems:
              <strong> FPS</strong> for retail and everyday transfers, and{' '}
              <strong>CHATS (Clearing House Automated Transfer System)</strong> for high-value
              corporate transactions. They serve complementary purposes.
            </p>
          </Prose>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-4">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">Feature</th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-200" style={{ color: HK_RED }}>FPS (retail)</th>
                  <th className="px-4 py-3 font-semibold text-slate-500 border-b border-slate-200">CHATS (corporate)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {CHATS_COMPARISON.map(({ feature, fps, chats }) => (
                  <tr key={feature} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-700">{feature}</td>
                    <td className="px-4 py-3 text-green-700 font-medium">{fps}</td>
                    <td className="px-4 py-3 text-slate-500">{chats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Prose className="mt-4">
            <p>
              For everyday consumer and small-business payments, FPS is the clear choice: instant,
              free, and available 24/7. CHATS remains essential for large corporate transactions,
              securities settlement, and foreign currency transfers where SWIFT or RTGS infrastructure
              is required.
            </p>
          </Prose>
        </Section>

        {/* CTA */}
        <div
          className="rounded-2xl p-6 text-center space-y-3"
          style={{ backgroundColor: '#fdf2f4', borderWidth: 1, borderStyle: 'solid', borderColor: '#fca5a5' }}
        >
          <p className="font-semibold text-lg" style={{ color: '#7f1d1d' }}>
            Ready to generate your FPS QR Code?
          </p>
          <p className="text-sm" style={{ color: '#991b1b' }}>
            Free, instant — HKD or CNY — works with HSBC, Hang Seng, PayMe, AlipayHK and all FPS apps.
          </p>
          <Link
            href="/fps/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: HK_RED }}
          >
            Open FPS Generator →
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
              <Link href={item.href as `/${string}`} className="hover:text-slate-600 transition-colors">{item.label}</Link>
            ) : (
              <span className="text-slate-900 font-semibold">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
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
