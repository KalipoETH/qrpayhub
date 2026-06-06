import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: "How PayNow Works – Complete Guide to Singapore Payments | QRPayHub",
    description:
      "Complete guide to PayNow: Singapore's instant payment system. Proxy types, EMV QR format, editable amount, expiry date, SGQR and ASEAN cross-border network.",
    keywords: [
      'paynow guide',
      'how paynow works',
      'paynow qr format',
      'paynow proxy types',
      'singapore qr payment guide',
      'sgqr guide',
      'paynow emv payload',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/paynow/guide'),
  };
}

const PROXY_TYPES = [
  {
    type: 'Mobile Number',
    tag: '0',
    format: '+65XXXXXXXX',
    example: '91234567 → +6591234567',
    useCase: 'P2P transfers, most common for individuals',
    color: 'bg-red-50 text-red-700 border-red-200',
  },
  {
    type: 'NRIC / FIN',
    tag: '1',
    format: '[S/T/F/G]XXXXXXXZ',
    example: 'S1234567D',
    useCase: 'Citizens, PRs and long-term pass holders',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    type: 'UEN (Business)',
    tag: '2',
    format: '9–10 chars ending with letter',
    example: '201912345K',
    useCase: 'Companies, charities, government agencies',
    color: 'bg-green-50 text-green-700 border-green-200',
  },
];

const EMV_TAGS = [
  { id: '00', name: 'Payload Format Indicator',   value: '01',          required: true,  description: 'Always "01" – EMV Merchant Presented Mode' },
  { id: '01', name: 'Initiation Method',           value: '11 or 12',    required: true,  description: '11 = static (payer enters amount), 12 = dynamic (amount in QR)' },
  { id: '26', name: 'Merchant Account – PayNow',   value: 'SG.PAYNOW + proxy', required: true, description: 'AID: SG.PAYNOW; sub-tags 01 = proxy type, 02 = proxy value, 03 = editable, 04 = expiry' },
  { id: '52', name: 'Merchant Category Code',      value: '0000',        required: true,  description: 'ISO 18245 MCC (0000 = not assigned for P2P)' },
  { id: '53', name: 'Transaction Currency',        value: '702',         required: true,  description: 'ISO 4217 numeric code for Singapore Dollar (SGD)' },
  { id: '54', name: 'Transaction Amount',          value: '12.50',       required: false, description: 'Present in dynamic QR only; omitted in static codes' },
  { id: '58', name: 'Country Code',               value: 'SG',          required: true,  description: 'ISO 3166-1 alpha-2 – Singapore' },
  { id: '59', name: 'Merchant Name',              value: 'Ahmad Store',  required: true,  description: 'Displayed on payer confirmation screen, max 25 characters' },
  { id: '60', name: 'Merchant City',              value: 'Singapore',   required: true,  description: 'City of the merchant' },
  { id: '62', name: 'Additional Data Field',      value: 'reference',   required: false, description: 'Optional bill number or transaction reference' },
  { id: '63', name: 'CRC',                        value: '4-digit hex', required: true,  description: 'CRC16-CCITT checksum of entire payload including "6304"' },
];

const CROSS_BORDER = [
  { country: 'Malaysia',    network: 'DuitNow',    flag: '🇲🇾', since: '2021', desc: 'Most active ASEAN corridor; SGD↔MYR' },
  { country: 'Thailand',    network: 'PromptPay',  flag: '🇹🇭', since: '2021', desc: "World's first bilateral real-time linkage" },
  { country: 'India',       network: 'UPI',        flag: '🇮🇳', since: '2021', desc: 'SGD↔INR; Singapore-India remittance' },
  { country: 'Indonesia',   network: 'QRIS',       flag: '🇮🇩', since: '2023', desc: 'SGD↔IDR; ASEAN QR expansion' },
  { country: 'Philippines', network: 'QR Ph',      flag: '🇵🇭', since: '2023', desc: 'SGD↔PHP bilateral linkage' },
];

const BANKS_WALLETS = [
  { name: 'DBS / POSB',         note: 'PayLah!',        color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'OCBC',               note: 'Pay Anyone',     color: 'bg-red-100 text-red-800 border-red-200' },
  { name: 'UOB',                note: 'UOB Mighty',     color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { name: 'Standard Chartered', note: 'SC Mobile',      color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { name: 'Citibank SG',        note: 'Citi Mobile',    color: 'bg-sky-100 text-sky-700 border-sky-200' },
  { name: 'HSBC Singapore',     note: 'HSBC HK',        color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'Maybank SG',         note: 'Maybank2u',      color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { name: 'Bank of China SG',   note: 'BOC SG',         color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'ICBC Singapore',     note: 'ICBC Mobile',    color: 'bg-red-100 text-red-800 border-red-200' },
  { name: 'GrabPay',            note: 'wallet',         color: 'bg-green-100 text-green-700 border-green-200' },
  { name: 'Singtel Dash',       note: 'wallet',         color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'All MAS banks',      note: '',               color: 'bg-slate-100 text-slate-500 border-slate-200' },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "How PayNow Works – Complete Guide to Singapore Payments",
  description:
    "Complete guide to PayNow: Singapore's instant payment system. Proxy types, EMV QR format, editable amount, expiry date, SGQR and ASEAN cross-border network.",
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/paynow/guide' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',   item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'PayNow', item: 'https://qrpayhub.com/en/paynow' },
      { '@type': 'ListItem', position: 3, name: 'Guide',  item: 'https://qrpayhub.com/en/paynow/guide' },
    ],
  },
};

export default function PayNowGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-paynow-guide"
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
        { label: 'PayNow', href: '/paynow' },
        { label: 'Guide' },
      ]} />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          How PayNow Works – Complete Guide
        </h1>
        <p className="text-lg text-slate-500">
          Everything about Singapore&apos;s instant payment system: proxy types, EMV QR format,
          editable amounts, SGQR and the ASEAN cross-border network.
        </p>
        <Link
          href="/paynow/generator"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Try the PayNow Generator →
        </Link>
      </header>

      <div className="space-y-14 pt-4">

        {/* Section 1: What is PayNow */}
        <Section id="what-is-paynow" title="What is PayNow?">
          <Prose>
            <p>
              <strong>PayNow</strong> is Singapore&apos;s national instant payment system,
              launched in <strong>July 2017</strong> by the{' '}
              <strong>Association of Banks in Singapore (ABS)</strong> under oversight of the{' '}
              <strong>Monetary Authority of Singapore (MAS)</strong>. Built on top of
              Singapore&apos;s <strong>FAST (Fast And Secure Transfers)</strong> infrastructure,
              PayNow allows any two Singapore bank account holders to transfer money in seconds
              using a simple proxy identifier — no account numbers required.
            </p>
            <p>
              The central innovation of PayNow is its <strong>proxy registry</strong>: instead of
              requiring the recipient&apos;s bank account number and routing code, the sender simply
              enters a mobile number, NRIC/FIN, or UEN. The system looks up the linked bank account
              and routes the payment in real time. This abstraction makes payments as easy as
              sending a message — and equally instant.
            </p>
            <p>
              PayNow has achieved remarkable adoption. With approximately <strong>4 million
              registered users</strong> in a country of 5.9 million residents, penetration is
              among the highest of any instant payment system globally. Monthly transaction volumes
              exceed <strong>S$10 billion</strong>. The system operates <strong>24/7/365</strong>{' '}
              — including public holidays — with zero transaction fees for personal transfers.
            </p>
            <p>
              PayNow QR codes are encoded using the <strong>EMV Merchant Presented Mode (MPM)</strong>{' '}
              standard with Application Identifier (AID){' '}
              <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">SG.PAYNOW</code>{' '}
              in EMV tag ID 26. The currency is always Singapore Dollar (SGD, code{' '}
              <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">702</code>).
              Two unique features distinguish PayNow QR from other EMV-based systems: the{' '}
              <strong>editable amount flag</strong> and the <strong>expiry date field</strong>,
              both encoded as sub-tags within tag 26.
            </p>
          </Prose>
        </Section>

        {/* Section 2: Step by Step */}
        <Section id="how-it-works" title="How PayNow Works – Step by Step">
          <ol className="space-y-4">
            {[
              {
                step: 1,
                title: 'Merchant displays PayNow QR code',
                body: 'Static QR codes (open amount) are printed or shown at the counter. Dynamic codes with preset amounts are generated per transaction for e-commerce and invoices. Both types can include an expiry date.',
              },
              {
                step: 2,
                title: 'Customer opens any PayNow-enabled app',
                body: 'DBS PayLah!, OCBC Pay Anyone, UOB Mighty, GrabPay, Singtel Dash, or any Singapore bank app — all are fully interoperable through the ABS/MAS PayNow network.',
              },
              {
                step: 3,
                title: 'Customer scans the PayNow QR code',
                body: 'The app scanner parses the EMV payload and extracts the AID (SG.PAYNOW), proxy type, proxy value, amount, and any editable or expiry flags.',
              },
              {
                step: 4,
                title: 'Amount pre-fills (or customer enters it)',
                body: 'If a dynamic QR was scanned, the amount is pre-filled. If the editable flag is set, the customer can modify the amount. For static QR codes, the customer enters the payment amount.',
              },
              {
                step: 5,
                title: 'Customer authenticates via banking app',
                body: 'Authentication (PIN, biometrics, or transaction password) is completed within the customer\'s own banking app. No credentials are transmitted to the merchant or encoded in the QR code.',
              },
              {
                step: 6,
                title: 'FAST routes and settles the payment',
                body: "Singapore's FAST infrastructure processes the interbank transfer in near real-time. Settlement is final and irrevocable — no chargebacks.",
              },
              {
                step: 7,
                title: 'Both parties receive confirmation',
                body: 'Payer receives a transaction success notification with reference number. Merchant receives instant credit notification via SMS and in-app alert.',
              },
            ].map(({ step, title, body }) => (
              <li key={step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-sm">
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
        <Section id="proxy-types" title="PayNow Proxy Types Explained">
          <Prose>
            <p>
              PayNow identifies payment recipients through <strong>proxy identifiers</strong>
              — human-readable addresses that map to bank accounts in the ABS PayNow registry.
              The proxy type is encoded as sub-tag 01 within EMV tag 26 of the PayNow QR payload.
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

        {/* Section 4: EMV Payload */}
        <Section id="emv-payload" title="The PayNow QR Payload – EMV Format">
          <Prose>
            <p>
              A PayNow QR code encodes a sequence of <strong>TLV (Tag-Length-Value)</strong>{' '}
              fields as a single ASCII string following the EMV MPM specification. Here is a
              complete example of a dynamic PayNow QR code (UEN proxy, fixed amount of S$12.50):
            </p>
          </Prose>

          <pre className="bg-slate-900 text-emerald-400 text-xs font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4 whitespace-pre-wrap break-all">
{`000201
010212
2957
  0009SG.PAYNOW
  010210
  020201912345K
  030100
  041020261231
52040000
5303702
541212.50
5802SG
5910Ahmad Store
6009Singapore
6304A1B2`}
          </pre>

          <Prose>
            <p>
              Spaces and line breaks are for readability only. Notice tag 26 sub-tag{' '}
              <strong>03</strong> (editable = &ldquo;0&rdquo; means fixed amount) and sub-tag{' '}
              <strong>04</strong> (expiry = 20261231 = December 31, 2026). These are unique
              PayNow extensions to the EMV standard. Tag 63 holds the 4-char CRC16-CCITT hex.
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
        </Section>

        {/* Section 5: Editable Amount & Expiry */}
        <Section id="editable-expiry" title="Editable Amount &amp; Expiry Features">
          <Prose>
            <p>
              PayNow QR introduces two features not present in most other EMV QR standards:
              the <strong>editable amount flag</strong> and the <strong>expiry date</strong>.
              Both are encoded as sub-tags within EMV tag ID 26.
            </p>
          </Prose>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✏️</span>
                <h3 className="font-bold text-slate-800">Editable Amount (sub-tag 03)</h3>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl">
                  <code className="font-mono font-bold text-red-600 flex-shrink-0">03 → &quot;0&quot;</code>
                  <span>Amount is <strong>fixed</strong>. Payer cannot modify the preset value. Used for exact-amount invoices.</span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-green-50 rounded-xl">
                  <code className="font-mono font-bold text-green-700 flex-shrink-0">03 → &quot;1&quot;</code>
                  <span>Amount is <strong>editable</strong>. Payer can change it before confirming. Useful for shared bills or tips.</span>
                </div>
              </div>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📅</span>
                <h3 className="font-bold text-slate-800">Expiry Date (sub-tag 04)</h3>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p><strong>Format:</strong> <code className="font-mono text-red-600">YYYYMMDD</code></p>
                  <p className="mt-1"><strong>Example:</strong> <code className="font-mono text-slate-500">20261231</code> = Dec 31 2026</p>
                </div>
                <p>After the expiry date, the QR code is no longer valid. The payer&apos;s app will show an error if scanning an expired code. Useful for event payments, time-limited offers, or invoices with due dates.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 6: Cross-Border */}
        <Section id="cross-border" title="PayNow's Global Cross-Border Network">
          <Prose>
            <p>
              MAS has been at the forefront of ASEAN cross-border payment integration.
              Singapore&apos;s PayNow was the first payment system in the world to establish a
              bilateral real-time cross-border link (with Thailand&apos;s PromptPay in April 2021).
              The network has since expanded significantly.
            </p>
          </Prose>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {CROSS_BORDER.map(({ country, network, flag, since, desc }) => (
              <div key={country} className="bg-white border border-slate-100 rounded-xl p-4 flex items-start gap-3 shadow-sm">
                <span className="text-3xl flex-shrink-0">{flag}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-800">{country}</p>
                    <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-100">Since {since}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{network} · {desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Prose className="mt-4">
            <p>
              These linkages allow, for example, a Malaysian tourist in Singapore to scan a
              PayNow QR code with their Maybank or CIMB app — paying in MYR while the Singapore
              merchant receives SGD. Currency conversion happens automatically through the linked
              central banks&apos; FX infrastructure. No cash, no currency exchange, no fees beyond
              the prevailing exchange rate.
            </p>
          </Prose>
        </Section>

        {/* Section 7: Supported Banks */}
        <Section id="banks" title="Supported Banks &amp; Wallets">
          <Prose>
            <p>
              All MAS-licensed banks and major e-wallets participate in PayNow. Every app is fully
              interoperable — a payment from DBS PayLah! arrives instantly in a Singtel Dash wallet.
              The ABS manages the PayNow proxy registry that connects all participants.
            </p>
          </Prose>
          <div className="flex flex-wrap gap-2.5 mt-3">
            {BANKS_WALLETS.map(({ name, note, color }) => (
              <span key={name} className={`px-3 py-1.5 rounded-xl border text-sm font-semibold ${color}`}>
                {name}
                {note && <span className="ml-1.5 text-xs opacity-60">{note}</span>}
              </span>
            ))}
          </div>
        </Section>

        {/* Section 8: SGQR */}
        <Section id="sgqr" title="SGQR – Singapore's Unified QR Standard">
          <Prose>
            <p>
              <strong>SGQR (Singapore QR)</strong> was launched in September 2018 — just two months
              after PayNow QR — to solve a problem familiar to anyone who has visited a hawker centre
              or retail shop: multiple QR code stickers from different payment providers cluttering
              the counter. SGQR consolidates up to 27 different payment schemes into a single,
              standardised QR label.
            </p>
            <p>
              Under SGQR, a merchant displays one QR code that simultaneously encodes PayNow,
              Nets (debit), GrabPay, and other supported payment schemes. The customer&apos;s app
              reads the entire SGQR payload and automatically activates the appropriate payment
              scheme — if you open GrabPay, it pays via GrabPay; if you open DBS, it pays via
              PayNow. There is no need for separate stickers.
            </p>
            <p>
              SGQR is a <strong>superset</strong> of PayNow QR: a valid SGQR code always contains
              a PayNow payload, but a standalone PayNow QR code is not necessarily a full SGQR
              code. For basic merchant use, a pure PayNow QR code (as generated by qrpayhub.com)
              is sufficient and accepted by all PayNow-enabled apps.
            </p>
          </Prose>
          <div className="bg-red-50 border border-red-100 rounded-2xl p-5 mt-4 flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">💡</span>
            <div className="text-sm text-red-900">
              <p className="font-semibold">Key distinction</p>
              <p className="mt-1 text-red-800">
                A PayNow QR code (generated by qrpayhub.com) works with all PayNow-enabled apps.
                An SGQR label (issued by NETS/ABS) additionally includes Nets, NETS Flashpay, and
                other Singapore-specific schemes in the same QR. For most online and informal use
                cases, a PayNow QR is all you need.
              </p>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-red-900 text-lg">Ready to generate your PayNow QR Code?</p>
          <p className="text-red-700 text-sm">Free, instant, works with DBS, OCBC, UOB, GrabPay and all Singapore payment apps.</p>
          <Link
            href="/paynow/generator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-sm transition-colors"
          >
            Open PayNow Generator →
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
