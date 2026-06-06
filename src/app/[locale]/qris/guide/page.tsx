import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: "How QRIS Works – Complete Guide to Indonesia's QR Payment | QRPayHub",
    description:
      "Complete guide to QRIS: Indonesia's national QR payment standard. NMID, merchant types, EMV format, cross-border payments and how to generate QRIS for free.",
    keywords: [
      'qris guide',
      'how qris works',
      'qris emv payload',
      'qris nmid',
      'indonesia qr payment guide',
      'bank indonesia qris',
      'qris merchant types',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/qris/guide'),
  };
}

const MERCHANT_CATEGORIES = [
  {
    type: 'Usaha Mikro',
    english: 'Micro',
    criteria: 'A',
    revenue: '< Rp 300 million / year',
    mdr: '0.3%',
    examples: 'Street vendors, warungs, food stalls',
    color: 'bg-green-50 text-green-700 border-green-200',
  },
  {
    type: 'Usaha Kecil',
    english: 'Small',
    criteria: 'A',
    revenue: 'Rp 300M – 2.5B / year',
    mdr: '0.7%',
    examples: 'Local shops, small restaurants, service providers',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    type: 'Usaha Menengah',
    english: 'Medium',
    criteria: 'B',
    revenue: 'Rp 2.5B – 50B / year',
    mdr: '0.7%',
    examples: 'Regional chains, mid-sized businesses',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
  },
  {
    type: 'Usaha Besar',
    english: 'Large',
    criteria: 'C',
    revenue: '> Rp 50 billion / year',
    mdr: '0.7%',
    examples: 'Shopping malls, major retailers, corporations',
    color: 'bg-red-50 text-red-700 border-red-200',
  },
];

const EMV_TAGS = [
  { id: '00', name: 'Payload Format Indicator',     value: '01',                    required: true,  description: 'Always "01" – EMV Merchant Presented Mode' },
  { id: '01', name: 'Point of Initiation Method',   value: '11 or 12',              required: true,  description: '11 = static (no preset amount), 12 = dynamic (amount embedded)' },
  { id: '26', name: 'Merchant Account – QRIS',      value: 'ID.CO.QRIS.WWW + NMID', required: true,  description: 'Application Identifier + National Merchant ID' },
  { id: '52', name: 'Merchant Category Code',       value: '0000',                  required: true,  description: 'ISO 18245 MCC – business category of merchant' },
  { id: '53', name: 'Transaction Currency',         value: '360',                   required: true,  description: 'ISO 4217 numeric code for Indonesian Rupiah (IDR)' },
  { id: '54', name: 'Transaction Amount',           value: '50000',                 required: false, description: 'Present only in dynamic QR codes; absent in static codes' },
  { id: '58', name: 'Country Code',                 value: 'ID',                    required: true,  description: 'ISO 3166-1 alpha-2 – Indonesia' },
  { id: '59', name: 'Merchant Name',                value: 'Warung Pak Budi',       required: true,  description: 'Name displayed on payer\'s screen, max 25 characters' },
  { id: '60', name: 'Merchant City',                value: 'Jakarta',               required: true,  description: 'City of merchant location' },
  { id: '62', name: 'Additional Data Field',        value: 'terminal / reference',  required: false, description: 'Optional terminal ID, reference ID, or customer label' },
  { id: '63', name: 'CRC',                          value: '4-digit hex',           required: true,  description: 'CRC16-CCITT checksum of the entire payload including "6304"' },
];

const CROSS_BORDER = [
  { country: 'Thailand',     network: 'PromptPay',   flag: '🇹🇭', since: '2021' },
  { country: 'Malaysia',     network: 'DuitNow',     flag: '🇲🇾', since: '2022' },
  { country: 'Singapore',    network: 'PayNow',      flag: '🇸🇬', since: '2022' },
  { country: 'Philippines',  network: 'QR Ph',       flag: '🇵🇭', since: '2023' },
  { country: 'Vietnam',      network: 'VietQR',      flag: '🇻🇳', since: '2023' },
  { country: 'India',        network: 'UPI',         flag: '🇮🇳', since: '2023' },
  { country: 'Japan',        network: 'JCB / local', flag: '🇯🇵', since: '2024' },
];

const BEFORE_AFTER = [
  { aspect: 'QR codes needed',    before: '5+ (GoPay, OVO, Dana, LinkAja…)', after: '1 (QRIS)' },
  { aspect: 'Counter space',      before: 'Multiple stickers cluttering desk', after: 'One clean QRIS sticker' },
  { aspect: 'App compatibility',  before: 'Each code only for one app',        after: 'Any QRIS-enabled app' },
  { aspect: 'Merchant setup',     before: 'Register with each wallet separately', after: 'One Bank Indonesia registration' },
  { aspect: 'Settlement',         before: 'Fragmented across app wallets',     after: 'Unified via BI-FAST' },
];

const QRIS_APPS = [
  { name: 'GoPay',      color: 'bg-green-100 text-green-700 border-green-200' },
  { name: 'OVO',        color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { name: 'Dana',       color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { name: 'LinkAja',    color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'ShopeePay', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { name: 'BCA Mobile', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  { name: 'Mandiri',    color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { name: 'BRI',        color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { name: 'BNI',        color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { name: 'CIMB Niaga', color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'Permata',    color: 'bg-teal-100 text-teal-700 border-teal-200' },
  { name: 'Jenius',     color: 'bg-sky-100 text-sky-700 border-sky-200' },
  { name: 'Allo Bank',  color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  { name: '50+ more',   color: 'bg-slate-100 text-slate-600 border-slate-200' },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "How QRIS Works – Complete Guide to Indonesia's QR Payment",
  description:
    "Complete guide to QRIS: Indonesia's national QR payment standard. NMID, merchant types, EMV format, cross-border payments and how to generate QRIS for free.",
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/qris/guide' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'QRIS', item: 'https://qrpayhub.com/en/qris' },
      { '@type': 'ListItem', position: 3, name: 'Guide', item: 'https://qrpayhub.com/en/qris/guide' },
    ],
  },
};

export default function QRISGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-qris-guide"
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
        { label: 'QRIS', href: '/qris' },
        { label: 'Guide' },
      ]} />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          How QRIS Works – Complete Guide
        </h1>
        <p className="text-lg text-slate-500">
          Everything about Indonesia&apos;s national QR payment standard: NMID, merchant types,
          EMV payload, cross-border payments and getting started.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/qris/generator"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Try the QRIS Generator →
          </Link>
        </div>
      </header>

      <div className="space-y-14 pt-4">

        {/* Section 1: What is QRIS */}
        <Section id="what-is-qris" title="What is QRIS?">
          <Prose>
            <p>
              <strong>QRIS</strong> — <strong>Quick Response Code Indonesian Standard</strong> — is
              Indonesia&apos;s national QR payment standard, developed by{' '}
              <strong>Bank Indonesia (BI)</strong> together with the{' '}
              <strong>Indonesian Payment System Association (ASPI)</strong>. Officially launched on{' '}
              <strong>August 17, 2019</strong> (Indonesia&apos;s Independence Day) and made mandatory
              for all payment providers on <strong>January 1, 2020</strong>, QRIS is built on the
              international <strong>EMV Merchant Presented Mode (MPM)</strong> specification — the
              same technical foundation used by PromptPay in Thailand and PayNow in Singapore.
            </p>
            <p>
              Before QRIS, Indonesian merchants had to display multiple QR code stickers at their
              counters — one for each payment app. A GoPay user couldn&apos;t scan an OVO QR code,
              and a Dana user couldn&apos;t pay at a LinkAja merchant. QRIS solved this fragmentation
              by creating a single, unified QR standard that all Indonesian payment apps must support.
            </p>
            <p>
              Today, Indonesia has over <strong>30 million QRIS merchants</strong> — from street food
              stalls (warung) and motorbike taxi drivers to government offices and shopping malls —
              making it one of the world&apos;s largest QR payment networks by merchant count. More
              than <strong>100 million Indonesians</strong> actively use QRIS-enabled payment apps.
            </p>
            <p>
              The QRIS Application Identifier (AID) is{' '}
              <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">ID.CO.QRIS.WWW</code>,
              embedded in EMV tag ID 26 of the QR payload. The transaction currency is always
              Indonesian Rupiah (IDR, code{' '}
              <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">360</code>).
              Every transaction is routed through <strong>BI-FAST</strong>, Bank Indonesia&apos;s
              national fast payment infrastructure, enabling real-time, 24/7 settlement.
            </p>
          </Prose>
        </Section>

        {/* Section 2: The QRIS Revolution */}
        <Section id="qris-revolution" title="The QRIS Revolution: One Code for All Apps">
          <Prose>
            <p>
              The transformation QRIS brought to Indonesian commerce cannot be overstated. Before
              January 2020, a street vendor accepting digital payments would need to maintain
              separate registrations with GoPay, OVO, Dana, LinkAja, and ShopeePay — and display
              five different QR stickers. QRIS replaced all of this with a single code.
            </p>
          </Prose>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-4">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">Aspect</th>
                  <th className="px-4 py-3 font-semibold text-red-700 border-b border-slate-200">Before QRIS</th>
                  <th className="px-4 py-3 font-semibold text-green-700 border-b border-slate-200">After QRIS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {BEFORE_AFTER.map(({ aspect, before, after }) => (
                  <tr key={aspect} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-700">{aspect}</td>
                    <td className="px-4 py-3 text-slate-500">{before}</td>
                    <td className="px-4 py-3 text-green-700 font-medium">{after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Prose className="mt-4">
            <p>
              The Bank Indonesia mandate was clear: from January 1, 2020, any payment provider
              operating in Indonesia must adopt QRIS. Non-compliant providers faced the risk of
              losing their operating licenses. The result was immediate and sweeping — within months,
              Indonesia&apos;s entire digital payment landscape unified under a single QR standard.
            </p>
          </Prose>
        </Section>

        {/* Section 3: Step by Step */}
        <Section id="how-it-works" title="How QRIS Works – Step by Step">
          <ol className="space-y-4">
            {[
              {
                step: 1,
                title: 'Merchant displays their QRIS code',
                body: 'Static QRIS codes are printed on stickers and displayed at the checkout counter. For e-commerce or specific invoices, dynamic codes with a preset amount are generated per transaction.',
              },
              {
                step: 2,
                title: 'Customer opens any QRIS-enabled app',
                body: 'GoPay, OVO, Dana, LinkAja, ShopeePay, BCA Mobile, Mandiri Livin\', BRI Mobile, or any of the 50+ participating apps work identically. All are fully interoperable.',
              },
              {
                step: 3,
                title: 'Customer scans the QRIS QR code',
                body: 'The app activates the camera scanner. The QRIS code can be scanned from a printed sticker, a phone screen, a PDF, or any other surface.',
              },
              {
                step: 4,
                title: 'Payment details appear automatically',
                body: 'The merchant name, NMID, and amount (if embedded) are parsed from the EMV payload. For static QR codes, the customer enters the payment amount manually.',
              },
              {
                step: 5,
                title: 'Customer enters PIN or uses biometrics',
                body: 'Authentication is required to authorize the payment. The PIN never leaves the device and is never transmitted to the merchant or stored in the QR code.',
              },
              {
                step: 6,
                title: 'Transaction processes via BI-FAST',
                body: 'Bank Indonesia\'s national switching infrastructure routes and settles the payment in real time — 24 hours a day, 365 days a year, including public holidays.',
              },
              {
                step: 7,
                title: 'Both parties receive confirmation',
                body: 'The payer receives a success notification with a transaction reference. The merchant receives an instant credit notification. Settlement to the merchant account is real-time.',
              },
            ].map(({ step, title, body }) => (
              <li key={step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
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

        {/* Section 4: Merchant Categories */}
        <Section id="merchant-categories" title="QRIS Merchant Categories">
          <Prose>
            <p>
              Bank Indonesia classifies all QRIS merchants into four tiers based on annual revenue.
              The category is encoded in the QRIS payload as the <strong>Merchant Criteria</strong>{' '}
              field and directly determines the MDR (Merchant Discount Rate) charged on each
              received payment. Government institutions and education facilities pay 0% MDR.
            </p>
          </Prose>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-4">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {['Category', 'English', 'Criteria Code', 'Annual Revenue', 'MDR', 'Examples'].map(h => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MERCHANT_CATEGORIES.map(({ type, english, criteria, revenue, mdr, examples, color }) => (
                  <tr key={type} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${color}`}>
                        {type}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-700">{english}</td>
                    <td className="px-4 py-3 font-mono text-slate-600">{criteria}</td>
                    <td className="px-4 py-3 text-slate-600">{revenue}</td>
                    <td className="px-4 py-3 font-bold text-slate-800">{mdr}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Section 5: EMV Payload */}
        <Section id="emv-payload" title="The QRIS EMV Payload Structure">
          <Prose>
            <p>
              A QRIS QR code encodes a sequence of <strong>TLV (Tag-Length-Value)</strong> fields
              as a plain ASCII string. Each field starts with a two-digit tag ID, followed by a
              two-digit length value, followed by the data content. The payload is defined by the
              EMV Merchant Presented Mode specification and extended with QRIS-specific fields by
              Bank Indonesia.
            </p>
            <p>
              Here is a minimal static QRIS payload example (static = no preset amount):
            </p>
          </Prose>

          <pre className="bg-slate-900 text-emerald-400 text-xs font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4 whitespace-pre-wrap break-all">
{`000201
010211
2660
  0016ID.CO.QRIS.WWW
  0117ID1234567890123
52040000
5303360
5802ID
5915Warung Pak Budi
6006Jakarta
63041A2B`}
          </pre>

          <Prose>
            <p>
              The spaces and line breaks above are for readability only — the actual payload is a
              single continuous string. The final tag <strong>63</strong> contains the CRC16-CCITT
              checksum of the entire payload (including the literal text &quot;6304&quot;), expressed
              as a 4-character uppercase hex string.
            </p>
          </Prose>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-4">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {['Tag ID', 'Field Name', 'Example Value', 'Required', 'Description'].map(h => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {EMV_TAGS.map(({ id, name, value, required, description }) => (
                  <tr key={id} className={id === '26' ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-slate-50'}>
                    <td className="px-4 py-3 font-mono font-bold text-red-600">{id}</td>
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
          <Prose className="mt-4">
            <p>
              <strong>Tag ID 26 is the heart of QRIS.</strong> It contains two sub-tags:
              the Application Identifier (AID){' '}
              <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">ID.CO.QRIS.WWW</code>{' '}
              (sub-tag 00) and the merchant&apos;s National Merchant ID / NMID (sub-tag 01). The AID
              is what tells any QRIS-enabled app that this is an Indonesian QRIS payment, not a
              Thai PromptPay or Malaysian DuitNow code — all of which use the same EMV MPM format
              but different AIDs in their respective tag 26 blocks.
            </p>
          </Prose>
        </Section>

        {/* Section 6: Cross-Border */}
        <Section id="cross-border" title="QRIS Cross-Border Payments">
          <Prose>
            <p>
              Bank Indonesia has been actively expanding QRIS beyond Indonesia&apos;s borders through
              bilateral QR payment linkages with ASEAN neighbors and beyond. Under these linkages,
              tourists from connected countries can pay at Indonesian QRIS merchants using their
              home country&apos;s payment apps — no cash or currency exchange required.
            </p>
            <p>
              Conversely, Indonesian tourists in connected countries can pay at PromptPay, DuitNow,
              or PayNow merchants using their QRIS-enabled Indonesian banking or e-wallet apps.
              The exchange rate conversion happens automatically at the time of transaction.
            </p>
          </Prose>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
            {CROSS_BORDER.map(({ country, network, flag, since }) => (
              <div key={country} className="bg-white border border-slate-100 rounded-xl p-3 flex items-start gap-2.5 shadow-sm">
                <span className="text-2xl flex-shrink-0">{flag}</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{country}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{network}</p>
                  <p className="text-xs text-slate-300 mt-0.5">Since {since}</p>
                </div>
              </div>
            ))}
          </div>
          <Prose className="mt-4">
            <p>
              The ASEAN cross-border QR payment initiative is part of a broader G20-aligned effort
              to interlink national fast payment systems globally. Indonesia&apos;s QRIS is one of
              the most connected systems in the region, reflecting Bank Indonesia&apos;s active
              participation in bilateral payment agreements.
            </p>
          </Prose>
        </Section>

        {/* Section 7: Supported Apps */}
        <Section id="apps" title="Supported Apps &amp; Banks">
          <Prose>
            <p>
              All QRIS-enabled apps are <strong>fully interoperable</strong>. A customer with
              GoPay can scan the same QRIS code as a customer with BCA Mobile — the routing
              and settlement happen transparently through Bank Indonesia&apos;s infrastructure.
              As of 2025, over 50 payment service providers participate in the QRIS ecosystem:
            </p>
          </Prose>
          <div className="flex flex-wrap gap-2.5 mt-3">
            {QRIS_APPS.map(({ name, color }) => (
              <span
                key={name}
                className={`px-3 py-1.5 rounded-xl border text-sm font-semibold ${color}`}
              >
                {name}
              </span>
            ))}
          </div>
          <Prose className="mt-4">
            <p>
              Beyond consumer e-wallets, every major Indonesian state bank (BCA, Mandiri, BRI, BNI)
              and private bank (CIMB Niaga, Permata, Danamon, Maybank Indonesia, OCBC Indonesia)
              has integrated QRIS into their mobile banking apps. Even newer digital banks like
              Jenius, Allo Bank, and Bank Jago support QRIS natively.
            </p>
          </Prose>
        </Section>

        {/* Section 8: Getting Started */}
        <Section id="getting-started" title="QRIS for Merchants – Getting Started">
          <Prose>
            <p>
              Registering as a QRIS merchant is straightforward. You do not register directly with
              Bank Indonesia — instead, you apply through any Bank Indonesia-licensed Payment
              Service Provider (PJSP). Common routes:
            </p>
          </Prose>
          <ul className="space-y-3 mt-2">
            {[
              {
                icon: '📱',
                title: 'Via your bank app',
                body: 'Most major Indonesian banks (BCA, Mandiri, BRI, BNI, CIMB) offer merchant QRIS registration directly through their business banking apps or branch offices.',
              },
              {
                icon: '💚',
                title: 'Via GoPay / Gojek',
                body: 'GoTo Financial (GoPay) offers a streamlined merchant registration for small businesses, with the QRIS sticker delivered to your address.',
              },
              {
                icon: '🟣',
                title: 'Via OVO',
                body: 'OVO Business registration gives you a QRIS merchant code compatible with all QRIS apps, not just OVO users.',
              },
              {
                icon: '🔵',
                title: 'Via Dana',
                body: 'Dana for Merchants (Merchant Dana) offers QRIS registration with a merchant dashboard for tracking transactions.',
              },
            ].map(({ icon, title, body }) => (
              <li key={title} className="flex gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                <span className="text-2xl flex-shrink-0">{icon}</span>
                <div>
                  <h3 className="font-semibold text-slate-800">{title}</h3>
                  <p className="text-sm text-slate-500 mt-0.5">{body}</p>
                </div>
              </li>
            ))}
          </ul>
          <Prose className="mt-4">
            <p>
              Upon successful registration, you receive a <strong>National Merchant ID (NMID)</strong>{' '}
              — a unique identifier assigned by Bank Indonesia — and a printed <strong>QRIS sticker</strong>{' '}
              with your QR code. The NMID is encoded in your QRIS payload and is required for
              Bank Indonesia compliance. Display your QRIS sticker prominently at the point of
              sale, alongside the mandatory QRIS logo.
            </p>
            <p>
              For developers and businesses who need to generate QRIS QR codes programmatically —
              for e-commerce checkouts, invoices, or POS integration — qrpayhub.com provides a
              free browser-based QRIS generator. A REST API for server-side generation is planned
              as part of the upcoming API plan.
            </p>
          </Prose>
        </Section>

        {/* CTA */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-red-900 text-lg">Ready to generate your QRIS QR Code?</p>
          <p className="text-red-700 text-sm">Free, instant, works with GoPay, OVO, Dana, LinkAja, ShopeePay and all QRIS apps.</p>
          <Link
            href="/qris/generator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-sm transition-colors"
          >
            Open QRIS Generator →
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
