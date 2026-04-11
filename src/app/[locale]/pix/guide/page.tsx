import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: "How PIX Works – Complete Guide to Brazil's Payment System | QRPayHub",
  description:
    "Complete guide to PIX: Brazil's instant payment system. PIX keys, QR code format, CRC16 checksum, supported banks and how to generate PIX QR codes for free.",
  keywords: [
    'pix guide',
    'how pix works',
    'pix qr code format',
    'banco central brasil',
    'pix chave explained',
    'emv pix payload',
    'crc16 pix',
  ],
};

const PIX_KEYS = [
  {
    type: 'CPF',
    format: '11 digits',
    example: '123.456.789-09',
    useCase: 'Individuals (pessoas físicas)',
  },
  {
    type: 'CNPJ',
    format: '14 digits',
    example: '12.345.678/0001-90',
    useCase: 'Companies (pessoas jurídicas)',
  },
  {
    type: 'Phone',
    format: '+55 + number',
    example: '+5511987654321',
    useCase: 'Easy to share verbally',
  },
  {
    type: 'Email',
    format: 'Standard email',
    example: 'nome@email.com',
    useCase: 'Digital-savvy users',
  },
  {
    type: 'Random Key',
    format: 'UUID v4',
    example: '123e4567-e89b-12d3-…',
    useCase: 'Maximum privacy',
  },
];

const EMV_TAGS = [
  { tag: '00', value: '01',           description: 'Payload Format Indicator – always 01' },
  { tag: '01', value: '12',           description: 'Point of Initiation: 11 = static, 12 = dynamic' },
  { tag: '26', value: '…',            description: 'Merchant Account Information (PIX sub-fields)' },
  { tag: '52', value: '0000',         description: 'Merchant Category Code (0000 = uncategorized)' },
  { tag: '53', value: '986',          description: 'Transaction Currency – ISO 4217 code for BRL' },
  { tag: '54', value: '100.00',       description: 'Transaction Amount (omitted in static QR)' },
  { tag: '58', value: 'BR',           description: 'Country Code – ISO 3166-1 alpha-2' },
  { tag: '59', value: 'Max Mustermann', description: 'Merchant Name – max 25 chars, shown to payer' },
  { tag: '60', value: 'Sao Paulo',    description: 'Merchant City – city of the recipient' },
  { tag: '62', value: '…',            description: 'Additional Data Field Template (transaction ref)' },
  { tag: '63', value: 'ABCD',         description: 'CRC16 Checksum – 4 uppercase hex characters' },
];

const COMPARISON_ROWS = [
  {
    label: 'Speed',
    pix: 'Seconds',
    ted: 'Minutes (business hours)',
    doc: 'Next day',
    boleto: '1–3 days',
  },
  {
    label: '24/7 Available',
    pix: '✅',
    ted: '❌',
    doc: '❌',
    boleto: '❌',
  },
  {
    label: 'Free (individuals)',
    pix: '✅',
    ted: '❌',
    doc: '❌',
    boleto: '❌',
  },
  {
    label: 'Limit',
    pix: 'Bank-defined',
    ted: 'R$1M+',
    doc: 'R$5,000',
    boleto: 'Unlimited',
  },
  {
    label: 'QR Code',
    pix: '✅',
    ted: '❌',
    doc: '❌',
    boleto: 'Boleto code',
  },
];

const PIX_BANKS = [
  { name: 'Nubank',           color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { name: 'Itaú',             color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { name: 'Bradesco',         color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'Banco do Brasil',  color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { name: 'Caixa Econômica',  color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { name: 'Santander',        color: 'bg-red-100 text-red-800 border-red-200' },
  { name: 'BTG Pactual',      color: 'bg-slate-100 text-slate-700 border-slate-200' },
  { name: 'Inter',            color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { name: 'C6 Bank',          color: 'bg-zinc-100 text-zinc-700 border-zinc-200' },
  { name: 'PicPay',           color: 'bg-green-100 text-green-700 border-green-200' },
  { name: 'Mercado Pago',     color: 'bg-sky-100 text-sky-700 border-sky-200' },
  { name: 'Sicredi',          color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { name: 'Sicoob',           color: 'bg-teal-100 text-teal-700 border-teal-200' },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "How PIX Works – Complete Guide to Brazil's Payment System",
  description:
    "Complete guide to PIX: Brazil's instant payment system. PIX keys, QR code format, CRC16 checksum, supported banks and how to generate PIX QR codes for free.",
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/pix/guide' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',    item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'PIX QR',  item: 'https://qrpayhub.com/en/pix' },
      { '@type': 'ListItem', position: 3, name: 'Guide',   item: 'https://qrpayhub.com/en/pix/guide' },
    ],
  },
};

export default function PIXGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-pix-guide"
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
        { label: 'PIX QR', href: '/pix' },
        { label: 'Guide' },
      ]} />

      {/* ── Title ────────────────────────────────────────────────────────── */}
      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          How PIX Works – Complete Guide
        </h1>
        <p className="text-lg text-slate-500">
          Everything about Brazil&apos;s instant payment system: PIX keys, EMV QR payload,
          CRC16 checksum, supported banks and real-world usage.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/pix/generator"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Try the Generator →
          </Link>
          <Link
            href="/pix/faq"
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold rounded-xl transition-colors"
          >
            PIX FAQ →
          </Link>
        </div>
      </header>

      <div className="space-y-14 pt-4">

        {/* ── Section 1: What is PIX ───────────────────────────────────────── */}
        <Section id="what-is-pix" title="What is PIX?">
          <Prose>
            <p>
              <strong>PIX</strong> is Brazil&apos;s national instant payment system, created and
              regulated by the <strong>Banco Central do Brasil (BCB)</strong>. Launched on
              November 16, 2020, PIX achieved the fastest mass adoption of any payment system
              in history — reaching <strong>100 million users in just 5 months</strong> and
              surpassing credit cards in transaction volume within its first year.
            </p>
            <p>
              PIX operates <strong>24 hours a day, 7 days a week, 365 days a year</strong> —
              including weekends and public holidays. Transfers complete in under 10 seconds.
              For consumers, PIX is completely free. Over{' '}
              <strong>700 financial institutions</strong> — banks, fintechs, digital wallets and
              payment apps — are legally required by the BCB to participate.
            </p>
            <p>
              As of 2026, PIX processes more than{' '}
              <strong>3 billion transactions per month</strong>, making it one of the most
              active real-time payment networks on the planet. Brazil now accounts for a
              significant share of all global real-time payment volume, largely driven by PIX.
            </p>
            <p>
              Unlike traditional bank transfers (TED/DOC) that required account numbers,
              branch codes, and could take hours or days, PIX is built around simplicity.
              The key innovation is the <strong>Chave PIX (PIX key)</strong> — a simple
              identifier linked to a bank account that replaces the need to share branch and
              account numbers.
            </p>
          </Prose>
        </Section>

        {/* ── Section 2: Step by Step ──────────────────────────────────────── */}
        <Section id="how-pix-works" title="How PIX Works – Step by Step">
          <ol className="space-y-4">
            {[
              {
                step: 1,
                title: 'Recipient shares PIX key or QR code',
                body: 'The payee provides their PIX key (CPF, CNPJ, phone, email or random UUID) or displays a PIX QR code. Static QR codes work for any amount; dynamic QR codes include a pre-set amount.',
              },
              {
                step: 2,
                title: 'Payer opens any Brazilian banking app',
                body: 'All 700+ participating banks and fintechs are fully interoperable. A payment from Nubank arrives instantly in a Bradesco account — no lock-in to any specific institution.',
              },
              {
                step: 3,
                title: 'Payer enters PIX key or scans QR code',
                body: 'The app activates the camera. PIX QR codes can be scanned from a printed receipt, phone screen, PDF or any surface. Alternatively, the PIX key is typed directly.',
              },
              {
                step: 4,
                title: 'Amount and recipient confirmed on screen',
                body: "The payee's name and bank are displayed automatically. If a dynamic QR is used, the amount is pre-filled. Static QR requires the payer to enter the amount manually.",
              },
              {
                step: 5,
                title: 'Payer authenticates (biometric or PIN)',
                body: 'The authentication credential never leaves the banking app. The PIX QR code itself contains no sensitive data — only the recipient identification and optional amount.',
              },
              {
                step: 6,
                title: 'Transfer completes in seconds',
                body: 'The BCB infrastructure (via SPI – Sistema de Pagamentos Instantâneos) processes the transfer in real time. Funds move directly between bank accounts.',
              },
              {
                step: 7,
                title: 'Both parties receive confirmation',
                body: 'Sender and recipient both receive instant push notifications and SMS alerts. A transaction receipt (comprovante) is available in the banking app.',
              },
            ].map(({ step, title, body }) => (
              <li key={step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
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

        {/* ── Section 3: PIX Keys ──────────────────────────────────────────── */}
        <Section id="pix-keys" title="PIX Keys Explained">
          <Prose>
            <p>
              A <strong>Chave PIX</strong> (PIX key) is an alias registered in the BCB&apos;s
              DICT (Diretório de Identificadores de Contas Transacionais) that maps to a
              specific bank account. Instead of sharing branch and account numbers, you share
              your PIX key. Individuals can register up to{' '}
              <strong>5 keys per bank account</strong>; companies up to 20.
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
                {PIX_KEYS.map(({ type, format, example, useCase }) => (
                  <tr key={type} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-emerald-700">{type}</td>
                    <td className="px-4 py-3 text-slate-500">{format}</td>
                    <td className="px-4 py-3 font-mono text-slate-600 text-xs">{example}</td>
                    <td className="px-4 py-3 text-slate-600">{useCase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Prose className="mt-4">
            <p>
              The <strong>random key (chave aleatória)</strong> is the privacy-preserving
              option — a UUID generated by your bank that reveals nothing about your identity.
              It is ideal for sharing publicly, for example on social media or printed
              marketing materials, where you don&apos;t want to expose your CPF or phone number.
            </p>
          </Prose>
        </Section>

        {/* ── Section 4: EMV Payload ───────────────────────────────────────── */}
        <Section id="payload-format" title="The PIX QR Payload – EMV Format">
          <Prose>
            <p>
              PIX QR codes follow the{' '}
              <strong>EMV Merchant Presented QR Code (MPM)</strong> specification — the same
              international standard used by Thailand&apos;s PromptPay and India&apos;s BharatQR.
              The BCB adapted this standard for Brazil via the{' '}
              <strong>Manual de Padrões para Iniciação do Pix</strong>.
            </p>
            <p>
              The payload is a continuous string of{' '}
              <strong>TLV (Tag-Length-Value)</strong> fields. Each field begins with a 2-digit
              tag ID, followed by a 2-digit length, then the value. Fields are concatenated
              without separators. Here is a formatted example (line breaks added for
              readability):
            </p>
          </Prose>

          <pre className="bg-slate-900 text-emerald-400 text-sm font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4 whitespace-pre">
{`000201                              ← Tag 00: Payload Format Indicator
010212                              ← Tag 01: Dynamic QR (12)
2658                                ← Tag 26: Merchant Account (length 58)
  0014BR.GOV.BCB.PIX                  ← Sub-tag 00: PIX identifier
  0136123e4567-e89b-12d3-            ← Sub-tag 01: PIX key (UUID)
       a456-426614174000
52040000                            ← Tag 52: Merchant Category Code
5303986                             ← Tag 53: Currency (BRL = 986)
5406100.00                          ← Tag 54: Amount
5802BR                              ← Tag 58: Country Code
5913Max Mustermann                  ← Tag 59: Merchant Name (≤25 chars)
6009Sao Paulo                       ← Tag 60: Merchant City
62140510***                         ← Tag 62: Additional Data (Tx ref)
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
                    <td className="px-4 py-3 font-mono text-emerald-600 font-bold">{tag}</td>
                    <td className="px-4 py-3 font-mono text-slate-600 text-xs">{value}</td>
                    <td className="px-4 py-3 text-slate-600">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── Section 5: CRC16 ─────────────────────────────────────────────── */}
        <Section id="crc16" title="CRC16 – The Integrity Check">
          <Prose>
            <p>
              Every PIX QR payload ends with a{' '}
              <strong>CRC16-CCITT checksum</strong> — the last 4 characters of the string,
              always in uppercase hexadecimal (e.g. <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">6304ABCD</code>).
              The &quot;6304&quot; prefix is the tag (63) and length (04) of the checksum field;
              the 4 hex characters that follow are the computed CRC value.
            </p>
          </Prose>
          <ul className="space-y-3 mt-2">
            {[
              {
                icon: '⚙️',
                title: 'Algorithm',
                body: 'CRC16-CCITT with polynomial 0x1021 and initial value 0xFFFF. This is the same variant used in XMODEM and many industrial protocols.',
              },
              {
                icon: '📥',
                title: 'Input',
                body: 'The entire PIX payload string up to and including the "6304" field header — the 4-character checksum slot is excluded from the computation.',
              },
              {
                icon: '📤',
                title: 'Output',
                body: 'A 16-bit integer, formatted as 4 uppercase hexadecimal characters (e.g. A3F2). Padded with leading zeros if needed.',
              },
              {
                icon: '🔒',
                title: 'Why it matters',
                body: 'The CRC prevents tampered QR codes. Any modification to the merchant name, PIX key or amount changes the checksum and causes the banking app to reject the payment.',
              },
              {
                icon: '🌐',
                title: 'Client-side computation',
                body: 'QRPayHub computes the CRC16 checksum entirely in your browser using JavaScript. No payload data is ever sent to a server.',
              },
            ].map(({ icon, title, body }) => (
              <li key={title} className="flex gap-3 text-sm">
                <span className="text-xl flex-shrink-0">{icon}</span>
                <span className="text-slate-600">
                  <strong className="text-slate-800">{title}:</strong> {body}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── Section 6: Supported Banks ───────────────────────────────────── */}
        <Section id="supported-banks" title="Supported Banks &amp; Apps">
          <Prose>
            <p>
              The BCB mandates that every Brazilian financial institution with{' '}
              <strong>500,000 or more active accounts</strong> must offer PIX. As of 2026,
              this covers 700+ institutions. PIX is fully interoperable — a payment from
              any one of these apps lands instantly in any other.
            </p>
          </Prose>
          <div className="flex flex-wrap gap-3 mt-3">
            {PIX_BANKS.map(({ name, color }) => (
              <div
                key={name}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold ${color}`}
              >
                {name}
              </div>
            ))}
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold bg-slate-50 text-slate-400 border-slate-200">
              700+ more…
            </div>
          </div>
          <Prose className="mt-4">
            <p>
              Beyond the major names, every regional cooperative bank (Sicredi, Sicoob),
              state bank, digital bank and licensed fintech in Brazil is part of the PIX
              ecosystem. This universal coverage is one of the key reasons for PIX&apos;s
              extraordinary adoption — Brazilians know that every Brazilian can receive PIX,
              regardless of which bank they use.
            </p>
          </Prose>
        </Section>

        {/* ── Section 7: Comparison Table ──────────────────────────────────── */}
        <Section id="pix-vs-traditional" title="PIX vs Traditional Brazilian Transfers">
          <Prose>
            <p>
              Before PIX, Brazil had two primary electronic transfer methods: TED for
              same-day transfers during business hours, and DOC for next-day settlement.
              Both were fee-based and had operating-hours restrictions. PIX replaced both
              as the default everyday payment method.
            </p>
          </Prose>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-3">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">
                    Feature
                  </th>
                  <th className="px-4 py-3 font-semibold text-emerald-700 border-b border-slate-200">
                    PIX
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-600 border-b border-slate-200">
                    TED
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-600 border-b border-slate-200">
                    DOC
                  </th>
                  <th className="px-4 py-3 font-semibold text-slate-600 border-b border-slate-200">
                    Boleto
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPARISON_ROWS.map(({ label, pix, ted, doc, boleto }) => (
                  <tr key={label} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-700">{label}</td>
                    <td className="px-4 py-3 text-emerald-700 font-medium">{pix}</td>
                    <td className="px-4 py-3 text-slate-500">{ted}</td>
                    <td className="px-4 py-3 text-slate-500">{doc}</td>
                    <td className="px-4 py-3 text-slate-500">{boleto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Prose className="mt-4">
            <p>
              Boleto Bancário, while still used for scheduled billing and installment payments,
              is increasingly being replaced by <strong>Pix Cobrança</strong> (dynamic PIX QR
              with a due date and late fee), which offers instant settlement instead of the
              1–3 day clearing cycle of Boleto.
            </p>
          </Prose>
        </Section>

        {/* ── Section 8: Security & Regulation ────────────────────────────── */}
        <Section id="security" title="Security &amp; Regulation">
          <Prose>
            <p>
              PIX is regulated and operated by the <strong>Banco Central do Brasil</strong>,
              which sets technical standards, security requirements and participation rules.
              All PIX transactions flow through the BCB&apos;s <strong>SPI (Sistema de
              Pagamentos Instantâneos)</strong>, operating on dedicated infrastructure
              separate from the traditional banking system.
            </p>
          </Prose>
          <ul className="space-y-3 mt-2">
            {[
              {
                icon: '🔒',
                text: 'Same security infrastructure as Brazilian internet banking (SPB). All transactions require biometric or PIN authentication inside your banking app.',
              },
              {
                icon: '🌙',
                text: 'Night limit (20:00–06:00): banks enforce a lower PIX limit, typically R$1,000 per transaction, to reduce fraud risk during overnight hours. Users can request higher limits with a 24-hour waiting period.',
              },
              {
                icon: '🛡️',
                text: 'Safe to share QR codes publicly: a PIX QR contains only the recipient PIX key and name — no bank account details, no credentials, no sensitive personal data.',
              },
              {
                icon: '↩️',
                text: 'MED – Mecanismo Especial de Devolução: in cases of confirmed fraud, the BCB can trigger a special reversal mechanism that forces the receiving bank to return funds, even after settlement.',
              },
              {
                icon: '📋',
                text: 'DICT – Diretório de Identificadores de Contas Transacionais: the BCB maintains this central registry that maps every PIX key to a bank account. All key lookups go through DICT before a transfer is initiated.',
              },
              {
                icon: '⚖️',
                text: 'Mandatory participation: all financial institutions with 500,000+ active accounts must offer PIX under BCB Resolution 1. Smaller institutions may join voluntarily.',
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
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-emerald-900 text-lg">
            Ready to generate your PIX QR Code?
          </p>
          <p className="text-emerald-700 text-sm">
            Free, instant, works with all Brazilian banking apps. No sign-up required.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/pix/generator"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-sm transition-colors"
            >
              Open Generator →
            </Link>
            <Link
              href="/pix/faq"
              className="inline-flex items-center gap-2 px-6 py-3 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 font-semibold rounded-xl transition-colors"
            >
              Read PIX FAQ →
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
