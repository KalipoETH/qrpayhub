import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: "How PromptPay Works – Complete Guide to Thai Payments | QRPayHub",
    description:
      "Complete guide to PromptPay: Thailand's national instant payment system. PromptPay keys, QR format, supported banks, ASEAN connections and how to generate for free.",
    keywords: [
      'promptpay guide',
      'how promptpay works',
      'thai qr payment format',
      'bank of thailand promptpay',
      'promptpay emv format',
      'promptpay asean',
      'พร้อมเพย์',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/promptpay/guide'),
  };
}

const PROMPTPAY_KEYS = [
  {
    type: 'Phone Number',
    format: '06/08/09 + 7 digits',
    example: '0812345678',
    useCase: 'Individuals, easiest to share',
  },
  {
    type: 'National ID',
    format: '13 digits',
    example: '1234567890123',
    useCase: 'Formal registration, individuals',
  },
  {
    type: 'Tax ID',
    format: '13 digits (starts 0)',
    example: '0105543012345',
    useCase: 'Companies and juristic entities',
  },
  {
    type: 'E-Wallet ID',
    format: '00 + 13–15 digits',
    example: '0012345678901234',
    useCase: 'Digital wallet accounts',
  },
];

const EMV_TAGS = [
  { tag: '00',    value: '01',               description: 'Payload Format Indicator – always 01' },
  { tag: '01',    value: '11 / 12',           description: 'Point of Initiation: 11 = static, 12 = dynamic (with amount)' },
  { tag: '29',    value: '…',                 description: 'Merchant Account Information (PromptPay sub-fields)' },
  { tag: '29.00', value: 'A000000677010111',  description: 'PromptPay Application ID (AID)' },
  { tag: '29.01', value: '0066812345678',     description: 'Normalized recipient key (phone or national ID)' },
  { tag: '52',    value: '0000',              description: 'Merchant Category Code (0000 = uncategorized)' },
  { tag: '53',    value: '764',               description: 'Transaction Currency – ISO 4217 code for THB' },
  { tag: '54',    value: '100.00',            description: 'Transaction Amount (omitted in static QR)' },
  { tag: '58',    value: 'TH',               description: 'Country Code – ISO 3166-1 alpha-2' },
  { tag: '59',    value: 'N/A',              description: 'Merchant Name (optional in PromptPay)' },
  { tag: '60',    value: 'Bangkok',           description: 'Merchant City (optional)' },
  { tag: '62',    value: '…',                 description: 'Additional Data Field Template (transaction ref)' },
  { tag: '63',    value: 'ABCD',              description: 'CRC16-CCITT Checksum – 4 uppercase hex characters' },
];

const ASEAN_CONNECTIONS = [
  { country: 'Singapore', network: 'PayNow',   flag: '🇸🇬', since: '2021' },
  { country: 'Malaysia',  network: 'DuitNow',  flag: '🇲🇾', since: '2022' },
  { country: 'Indonesia', network: 'QRIS',     flag: '🇮🇩', since: '2023' },
  { country: 'Vietnam',   network: 'VietQR',   flag: '🇻🇳', since: '2023' },
  { country: 'Cambodia',  network: 'Bakong',   flag: '🇰🇭', since: '2020' },
  { country: 'Japan',     network: 'JCB QR',   flag: '🇯🇵', since: '2023' },
  { country: 'China',     network: 'WeChat / Alipay', flag: '🇨🇳', since: '2018' },
];

const THAI_BANKS = [
  { name: 'Bangkok Bank',   color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { name: 'KBank',          color: 'bg-green-100 text-green-700 border-green-200' },
  { name: 'SCB',            color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { name: 'Krungthai',      color: 'bg-sky-100 text-sky-700 border-sky-200' },
  { name: 'ttb',            color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { name: 'Krungsri',       color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { name: 'CIMB Thai',      color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'UOB Thailand',   color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  { name: 'GSB',            color: 'bg-pink-100 text-pink-700 border-pink-200' },
  { name: 'BAAC',           color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { name: 'LH Bank',        color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { name: 'KKP',            color: 'bg-slate-100 text-slate-700 border-slate-200' },
];

const IMPACT_STATS = [
  { icon: '👥', value: '55M+',    label: 'Registered users' },
  { icon: '🔄', value: '~1B',     label: 'Transactions / month' },
  { icon: '🏦', value: '30+',     label: 'Participating banks' },
  { icon: '🌏', value: '7',       label: 'ASEAN connections' },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "How PromptPay Works – Complete Guide to Thai Payments",
  description:
    "Complete guide to PromptPay: Thailand's national instant payment system. PromptPay keys, QR format, supported banks, ASEAN connections and how to generate for free.",
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/promptpay/guide' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',          item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'PromptPay QR',  item: 'https://qrpayhub.com/en/promptpay' },
      { '@type': 'ListItem', position: 3, name: 'Guide',         item: 'https://qrpayhub.com/en/promptpay/guide' },
    ],
  },
};

export default function PromptPayGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-promptpay-guide"
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
        { label: 'Home',          href: '/' },
        { label: 'PromptPay QR', href: '/promptpay' },
        { label: 'Guide' },
      ]} />

      {/* ── Title ────────────────────────────────────────────────────────── */}
      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          How PromptPay Works – Complete Guide
        </h1>
        <p className="text-lg text-slate-500">
          Everything about Thailand&apos;s instant payment system: PromptPay keys,
          EMV QR payload, phone normalization, ASEAN cross-border network and supported banks.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/promptpay/generator"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-white text-sm font-semibold rounded-xl transition-colors"
            style={{ backgroundColor: '#1A56DB' }}
          >
            Try the Generator →
          </Link>
          <Link
            href="/promptpay/faq"
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold rounded-xl transition-colors"
          >
            PromptPay FAQ →
          </Link>
        </div>
      </header>

      <div className="space-y-14 pt-4">

        {/* ── Section 1: What is PromptPay ─────────────────────────────────── */}
        <Section id="what-is-promptpay" title="What is PromptPay?">
          <Prose>
            <p>
              <strong>PromptPay</strong> (พร้อมเพย์) is Thailand&apos;s national instant payment
              system, jointly developed by the{' '}
              <strong>Bank of Thailand (BOT)</strong> and the{' '}
              <strong>Thai Bankers&apos; Association (TBA)</strong>. Launched in January 2017
              as part of the government&apos;s{' '}
              <strong>National e-Payment Master Plan</strong>, PromptPay fundamentally
              changed how Thais send and receive money — replacing slow inter-bank transfers
              with a system that settles in under five seconds, around the clock, every day
              of the year.
            </p>
            <p>
              The core innovation is the <strong>PromptPay ID</strong> — an alias linked to
              a bank account. Instead of sharing a bank account number and branch code, a
              recipient registers their Thai mobile phone number (starting with 06, 08 or 09)
              or their 13-digit National ID (บัตรประชาชน). Businesses register using a Tax ID
              (เลขนิติบุคคล). The sender only needs to know the PromptPay ID; the{' '}
              <strong>ITMX switching network</strong> routes the payment to the correct bank
              account automatically.
            </p>
            <p>
              All Thai banks with significant customer bases are required by the Bank of
              Thailand to participate. PromptPay is free for consumers — and since 2019 the
              BOT eliminated interbank transfer fees entirely for PromptPay transactions,
              making it the default way Thais move money domestically.
            </p>
            <p>
              A <strong>PromptPay QR Code</strong> encodes the payment using the same{' '}
              <strong>EMV Merchant Presented Mode (MPM)</strong> standard used by Brazil&apos;s
              PIX and Indonesia&apos;s QRIS. The payload is a TLV (Tag-Length-Value) encoded
              string with the PromptPay AID{' '}
              <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">
                A000000677010111
              </code>{' '}
              and a CRC16-CCITT checksum that banks verify before processing any payment.
            </p>
          </Prose>
        </Section>

        {/* ── Section 2: Step by Step ──────────────────────────────────────── */}
        <Section id="how-it-works" title="How PromptPay Works – Step by Step">
          <ol className="space-y-4">
            {[
              {
                step: 1,
                title: 'Recipient shares PromptPay QR or key',
                body: 'The payee provides a phone number, National ID or a PromptPay QR code. Static QR codes work for any amount; dynamic QR codes include a pre-set amount for invoices and e-commerce.',
              },
              {
                step: 2,
                title: 'Payer opens any Thai banking app',
                body: 'All 30+ participating banks are fully interoperable. A payment from KBank arrives instantly in an SCB account — there is no lock-in to any specific institution.',
              },
              {
                step: 3,
                title: 'Payer scans QR or enters phone/ID',
                body: 'The app activates the camera for QR scanning, or the payer types the PromptPay key manually. The recipient\'s name is shown for confirmation.',
              },
              {
                step: 4,
                title: 'Payment details confirmed on screen',
                body: "The recipient's name (as registered with ITMX) is displayed. If a dynamic QR is used, the amount is pre-filled. Static QR requires the payer to enter the amount.",
              },
              {
                step: 5,
                title: 'Payer authenticates (biometric or PIN)',
                body: 'Authentication happens entirely within the banking app. The PromptPay QR contains no passwords, PINs or sensitive banking credentials.',
              },
              {
                step: 6,
                title: 'Transfer completes instantly',
                body: 'The ITMX infrastructure routes the payment through the PromptPay network. Funds settle in real time between the two bank accounts — typically within 5 seconds.',
              },
              {
                step: 7,
                title: 'Both parties receive app notification',
                body: 'Sender and recipient both get instant push notifications. The payer\'s app shows a receipt with a transaction reference number for records.',
              },
            ].map(({ step, title, body }) => (
              <li key={step} className="flex gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm"
                  style={{ backgroundColor: '#1A56DB' }}
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

        {/* ── Section 3: Key Types ─────────────────────────────────────────── */}
        <Section id="promptpay-keys" title="PromptPay Keys – Phone vs National ID">
          <Prose>
            <p>
              A <strong>PromptPay key</strong> is an alias registered in the ITMX NPCI
              (National Payment Central Infrastructure) directory that maps to a specific
              bank account. Individuals typically use their phone number (easiest to share)
              or National ID (most stable). Companies use their Tax ID.
            </p>
          </Prose>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-3">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {['Key Type', 'Format', 'Example', 'Best For'].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PROMPTPAY_KEYS.map(({ type, format, example, useCase }) => (
                  <tr key={type} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-blue-700">{type}</td>
                    <td className="px-4 py-3 text-slate-500">{format}</td>
                    <td className="px-4 py-3 font-mono text-slate-600 text-xs">{example}</td>
                    <td className="px-4 py-3 text-slate-600">{useCase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── Section 4: EMV Payload ───────────────────────────────────────── */}
        <Section id="payload-format" title="The PromptPay QR Payload – EMV Format">
          <Prose>
            <p>
              PromptPay QR codes follow the{' '}
              <strong>EMV Merchant Presented QR Code (MPM)</strong> specification — the same
              international standard used by Brazil&apos;s PIX and India&apos;s BharatQR. Thailand&apos;s
              version uses merchant account tag <strong>29</strong> (vs. tag 26 for PIX) and
              the PromptPay AID{' '}
              <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">
                A000000677010111
              </code>
              .
            </p>
            <p>
              The payload is a continuous TLV string. Here is a formatted example (line
              breaks added for readability):
            </p>
          </Prose>

          <pre className="bg-slate-900 text-blue-300 text-sm font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4 whitespace-pre">
{`000201                              ← Tag 00: Payload Format Indicator
010211                              ← Tag 01: Static QR (11)
2937                                ← Tag 29: Merchant Account (length 37)
  0016A000000677010111                ← Sub-tag 00: PromptPay AID
  01130066812345678                   ← Sub-tag 01: Normalized phone key
52040000                            ← Tag 52: Merchant Category Code
5303764                             ← Tag 53: Currency (THB = 764)
5406100.00                          ← Tag 54: Amount
5802TH                              ← Tag 58: Country Code
5903N/A                             ← Tag 59: Merchant Name
6007Bangkok                         ← Tag 60: Merchant City
62070503***                         ← Tag 62: Additional Data
6304ABCD                            ← Tag 63: CRC16 Checksum`}
          </pre>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {['Tag', 'Example Value', 'Description'].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {EMV_TAGS.map(({ tag, value, description }) => (
                  <tr key={tag} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-blue-600 font-bold">{tag}</td>
                    <td className="px-4 py-3 font-mono text-slate-600 text-xs">{value}</td>
                    <td className="px-4 py-3 text-slate-600">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── Section 5: Phone Normalization ───────────────────────────────── */}
        <Section id="phone-normalization" title="Phone Number Normalization">
          <Prose>
            <p>
              PromptPay QR codes do not embed the raw Thai phone number — they use a
              normalized international format. The rule is straightforward:
            </p>
          </Prose>
          <ul className="space-y-3 mt-2">
            {[
              {
                icon: '1️⃣',
                text: 'Start with a local Thai number: 0812345678',
              },
              {
                icon: '2️⃣',
                text: 'Remove the leading 0: 812345678',
              },
              {
                icon: '3️⃣',
                text: 'Prepend the country code prefix 0066: 0066812345678',
              },
              {
                icon: '🔁',
                text: 'If the input starts with +66 (international format), replace the + with 00: +66812345678 → 0066812345678',
              },
            ].map(({ icon, text }) => (
              <li key={icon} className="flex gap-3 text-sm text-slate-600">
                <span className="flex-shrink-0">{icon}</span>
                <code className="font-mono bg-slate-50 border border-slate-200 rounded px-2 py-0.5 text-slate-700">
                  {text}
                </code>
              </li>
            ))}
          </ul>
          <Prose className="mt-4">
            <p>
              The resulting string (e.g. <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">0066812345678</code>)
              is embedded as sub-tag 01 inside the tag-29 merchant account field.
              National IDs and Tax IDs are used as-is (13 digits, no transformation).
              Here is the normalization logic in TypeScript:
            </p>
          </Prose>

          <pre className="bg-slate-900 text-blue-300 text-sm font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4">
{`function normalizePromptPayKey(key: string): string {
  const digits = key.replace(/\\D/g, '');

  // National ID or Tax ID (13 digits) — use as-is
  if (digits.length === 13) return digits;

  // Phone number normalization
  if (digits.startsWith('0') && digits.length === 10) {
    return '0066' + digits.slice(1);   // 0812345678 → 0066812345678
  }
  if (digits.startsWith('66') && digits.length === 11) {
    return '00' + digits;              // 66812345678 → 0066812345678
  }
  return digits;
}`}
          </pre>
        </Section>

        {/* ── Section 6: ASEAN Cross-Border ────────────────────────────────── */}
        <Section id="asean-network" title="PromptPay's ASEAN Cross-Border Network">
          <Prose>
            <p>
              PromptPay is no longer a purely domestic system. Thailand has established
              bilateral QR payment linkages with seven countries, allowing citizens to send
              and receive money across borders by scanning a QR code in their local banking
              app — with automatic currency conversion at interbank rates.
            </p>
            <p>
              These linkages use each country&apos;s existing instant payment infrastructure,
              avoiding international wire transfer fees and delays. The framework is
              championed by the Bank for International Settlements (BIS) and the ASEAN
              central banks as a model for regional payment interoperability.
            </p>
          </Prose>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {ASEAN_CONNECTIONS.map(({ country, network, flag, since }) => (
              <div
                key={country}
                className="bg-white border border-slate-100 rounded-xl p-4 flex items-center gap-3 shadow-sm"
              >
                <span className="text-3xl flex-shrink-0">{flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800">{country}</p>
                  <p className="text-sm text-slate-500">{network}</p>
                </div>
                <span className="text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full flex-shrink-0">
                  Since {since}
                </span>
              </div>
            ))}
          </div>
          <Prose className="mt-4">
            <p>
              The most active corridor is <strong>Thailand–Singapore</strong> via the
              PromptPay–PayNow linkage, which enables Thai visitors to Singapore (and vice
              versa) to pay at any merchant that accepts the local QR code. The transaction
              is debited in the sender&apos;s currency and credited in the recipient&apos;s currency,
              with no hidden fees beyond the interbank exchange rate.
            </p>
            <p>
              The <strong>China connection</strong> (WeChat Pay and Alipay, active since
              2018) is particularly significant for Thai tourism, as Chinese tourists
              represent one of Thailand&apos;s largest visitor groups. Thai merchants displaying
              a PromptPay QR code can automatically accept payments from Chinese visitors
              without installing any additional hardware.
            </p>
          </Prose>
        </Section>

        {/* ── Section 7: Supported Banks ───────────────────────────────────── */}
        <Section id="supported-banks" title="Supported Banks">
          <Prose>
            <p>
              All Thai banks authorized by the Bank of Thailand are required to offer
              PromptPay. This includes every commercial bank, savings bank and specialized
              financial institution with significant retail operations.
            </p>
          </Prose>
          <div className="flex flex-wrap gap-3 mt-3">
            {THAI_BANKS.map(({ name, color }) => (
              <div
                key={name}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold ${color}`}
              >
                {name}
              </div>
            ))}
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold bg-slate-50 text-slate-400 border-slate-200">
              30+ more…
            </div>
          </div>
          <Prose className="mt-4">
            <p>
              Full interoperability is guaranteed by the ITMX network — a payment sent from
              any participating bank app arrives in any other participating bank account
              within seconds. There is no need for both parties to use the same bank or app.
            </p>
          </Prose>
        </Section>

        {/* ── Section 8: PromptPay Impact ──────────────────────────────────── */}
        <Section id="impact" title="PromptPay's Impact on Thailand">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {IMPACT_STATS.map(({ icon, value, label }) => (
              <div
                key={label}
                className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-center"
              >
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-xl font-bold text-blue-900">{value}</div>
                <div className="text-xs text-blue-600 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
          <ul className="space-y-3">
            {[
              {
                icon: '💸',
                text: 'Interbank fees eliminated: The Bank of Thailand mandated free PromptPay transfers for amounts up to ฿5,000 in 2018, then extended this to all amounts in 2019 — effectively ending domestic transfer fees across all Thai banks.',
              },
              {
                icon: '📈',
                text: 'Digital payment acceleration: Thailand jumped from primarily cash-based to one of the most digitally-transacting populations in Southeast Asia in just a few years, driven almost entirely by PromptPay adoption.',
              },
              {
                icon: '🏛️',
                text: 'Government stimulus via PromptPay: During the COVID-19 pandemic, the Thai government distributed welfare and relief payments to millions of citizens directly via their National ID-linked PromptPay accounts — faster and cheaper than any alternative.',
              },
              {
                icon: '🛒',
                text: 'Commerce transformation: From street food vendors and market stalls to major e-commerce platforms like Lazada and Shopee Thailand, PromptPay QR became the default checkout option — eliminating the need for card readers.',
              },
              {
                icon: '🌏',
                text: 'Regional leadership: Thailand\'s PromptPay is cited by the Bank for International Settlements as one of the model systems for ASEAN payment interoperability, and has directly inspired similar linkages across the region.',
              },
            ].map(({ icon, text }) => (
              <li key={icon} className="flex gap-3 text-sm text-slate-600">
                <span className="text-lg flex-shrink-0">{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-blue-900 text-lg">
            Ready to generate your PromptPay QR Code?
          </p>
          <p className="text-blue-700 text-sm">
            Free, instant, works with all Thai banking apps. No sign-up required.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/promptpay/generator"
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
              style={{ backgroundColor: '#1A56DB' }}
            >
              Open Generator →
            </Link>
            <Link
              href="/promptpay/faq"
              className="inline-flex items-center gap-2 px-6 py-3 border border-blue-200 text-blue-800 hover:bg-blue-100 font-semibold rounded-xl transition-colors"
            >
              Read PromptPay FAQ →
            </Link>
          </div>
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
