import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: 'How GiroCode Works – Complete Technical Guide | QRPayHub',
  description:
    'Step-by-step guide: how GiroCode QR codes work, the EPC payload structure, supported banks and best practices.',
  keywords: ['girocode how it works', 'epc qr code guide', 'girocode payload', 'sepa qr tutorial'],
};

const PAYLOAD_ROWS = [
  { line: '1', content: 'BCD', description: 'Service Tag – always "BCD"' },
  { line: '2', content: '002', description: 'Version – 002 recommended (BIC optional)' },
  { line: '3', content: '1', description: 'Character encoding – 1 = UTF-8' },
  { line: '4', content: 'SCT', description: 'Identification code – SEPA Credit Transfer' },
  { line: '5', content: 'COBADEFFXXX', description: 'BIC of the beneficiary bank (optional in v002)' },
  { line: '6', content: 'Max Mustermann', description: 'Beneficiary name – max 70 characters' },
  { line: '7', content: 'DE89370400440532013000', description: 'IBAN – no spaces, uppercase' },
  { line: '8', content: 'EUR150.00', description: 'Amount – currency code + decimal with dot' },
  { line: '9', content: '(empty)', description: 'Purpose code – usually empty' },
  { line: '10', content: '(empty)', description: 'Structured remittance reference' },
  { line: '11', content: 'Invoice 2026-001', description: 'Unstructured remittance info – max 140 chars' },
];

const SUPPORTED_BANKS = [
  'Deutsche Bank', 'Commerzbank', 'Sparkasse', 'Volksbank / Raiffeisen',
  'ING Deutschland', 'DKB', 'N26', 'Comdirect', 'Postbank', 'HypoVereinsbank',
  'Santander', 'Targobank', 'Revolut', 'Wise', 'bunq',
];

const COMMON_MISTAKES = [
  {
    mistake: 'IBAN with spaces',
    example: 'DE89 3704 0044 …',
    fix: 'Remove all spaces before encoding – spaces are only for human readability',
  },
  {
    mistake: 'Amount with comma',
    example: 'EUR150,00',
    fix: 'Always use a decimal point, never a comma: EUR150.00',
  },
  {
    mistake: 'Recipient name too long',
    example: '"Max Mustermann GmbH & Co. KG International Trade"',
    fix: 'Truncate to 70 characters maximum',
  },
  {
    mistake: 'Using version 001',
    example: 'Line 2: 001',
    fix: 'Use version 002 — it makes BIC optional and is supported by all modern apps',
  },
  {
    mistake: 'Reference over 140 characters',
    example: '"Invoice 2026-001 for consulting services rendered in January…"',
    fix: 'Keep the reference concise; truncate at 140 characters',
  },
  {
    mistake: 'Wrong currency code',
    example: '"€150.00" or "150.00EUR"',
    fix: 'Format must be exactly: EUR followed immediately by the amount, e.g. EUR150.00',
  },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How GiroCode Works – Complete Technical Guide',
  description:
    'Step-by-step guide: how GiroCode QR codes work, the EPC payload structure, supported banks and best practices.',
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/girocode/guide' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'GiroCode', item: 'https://qrpayhub.com/en/girocode' },
      { '@type': 'ListItem', position: 3, name: 'Guide', item: 'https://qrpayhub.com/en/girocode/guide' },
    ],
  },
};

export default function GiroCodeGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-girocode-guide"
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
        { label: 'Home', href: '/' },
        { label: 'GiroCode', href: '/girocode' },
        { label: 'How it Works' },
      ]} />

      {/* ── Title ────────────────────────────────────────────────────────── */}
      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          How GiroCode Works
        </h1>
        <p className="text-lg text-slate-500">
          Complete technical guide to the EPC QR payload, supported banks and best practices.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/girocode/generator"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Try the Generator →
          </Link>
        </div>
      </header>

      <div className="space-y-14 pt-4">

        {/* ── Section 1: What is GiroCode ─────────────────────────────────── */}
        <Section id="what-is-girocode" title="What is GiroCode?">
          <Prose>
            <p>
              GiroCode is the informal name for the <strong>EPC QR Code</strong>, defined in
              specification <strong>EPC069-12</strong> by the European Payments Council. The
              first version was published in 2012; version 002 — the current recommended
              version — followed in 2016. German banks made GiroCode support mandatory in 2019,
              and today virtually every banking app in the SEPA zone supports it.
            </p>
            <p>
              The code is a standard <strong>QR code</strong> (ISO/IEC 18004) that contains a
              structured text payload. Unlike proprietary payment QR formats, the EPC standard
              is fully open and free. No licence fees, no API keys, no third-party dependencies.
              Any QR library can generate a valid GiroCode, and any SEPA-compliant banking app
              can scan it.
            </p>
            <p>
              The payload encodes all data needed for a SEPA Credit Transfer: the beneficiary's
              name, IBAN, an optional BIC, an optional amount, and an optional payment reference.
              When scanned, the banking app pre-fills the transfer form — the payer just reviews
              and confirms.
            </p>
          </Prose>
        </Section>

        {/* ── Section 2: Step by Step ─────────────────────────────────────── */}
        <Section id="how-it-works" title="How Does GiroCode Work? (Step-by-Step)">
          <ol className="space-y-4">
            {[
              {
                step: 1,
                title: 'Sender opens their banking app',
                body: 'Any SEPA-compliant banking app works — Deutsche Bank, Sparkasse, ING, N26, Revolut, or any of the 500+ other apps in the SEPA zone.',
              },
              {
                step: 2,
                title: 'Taps "Scan QR Code" or "Transfer via QR"',
                body: 'The exact menu label varies by bank, but all modern apps have this feature. It is usually found in the transfer or payment section.',
              },
              {
                step: 3,
                title: 'Camera scans the GiroCode',
                body: 'The app activates the device camera. The GiroCode can be printed on paper, displayed on a screen, or embedded in a PDF.',
              },
              {
                step: 4,
                title: 'All payment details are filled in automatically',
                body: 'Name, IBAN, amount, currency and reference are instantly extracted from the QR code. No manual input, no typos.',
              },
              {
                step: 5,
                title: 'Sender reviews and confirms',
                body: 'The payer verifies the pre-filled data and authorises the transfer with their PIN, biometrics or TAN. Done.',
              },
            ].map(({ step, title, body }) => (
              <li key={step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
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

        {/* ── Section 3: Payload Structure ───────────────────────────────── */}
        <Section id="payload-structure" title="The GiroCode Payload – Technical Structure">
          <Prose>
            <p>
              The payload is plain UTF-8 text, with each field on its own line. Here is a
              complete example:
            </p>
          </Prose>

          {/* Code block */}
          <pre className="bg-slate-900 text-emerald-400 text-sm font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4">
{`BCD
002
1
SCT
COBADEFFXXX
Max Mustermann
DE89370400440532013000
EUR150.00


Invoice 2026-001`}
          </pre>

          {/* Payload table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {['Line', 'Content', 'Description'].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PAYLOAD_ROWS.map(({ line, content, description }) => (
                  <tr key={line} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-slate-500 w-12">{line}</td>
                    <td className="px-4 py-3 font-mono text-slate-900 font-medium">{content}</td>
                    <td className="px-4 py-3 text-slate-600">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── Section 4: Supported Banks ─────────────────────────────────── */}
        <Section id="supported-banks" title="Which Banks Support GiroCode?">
          <Prose>
            <p>
              All SEPA-compliant banks are required to support GiroCode. In Germany, the
              following major banks have confirmed support:
            </p>
          </Prose>
          <div className="flex flex-wrap gap-2 mt-3">
            {SUPPORTED_BANKS.map((bank) => (
              <span
                key={bank}
                className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full font-medium"
              >
                {bank}
              </span>
            ))}
          </div>
          <Prose className="mt-4">
            <p>
              Beyond Germany, every bank in the 36 SEPA countries that supports SEPA Credit
              Transfers also supports GiroCode scanning. This includes Austria, France, Italy,
              Spain, the Netherlands, Switzerland and all other SEPA member states.
            </p>
          </Prose>
        </Section>

        {/* ── Section 5: Best Practices ──────────────────────────────────── */}
        <Section id="best-practices" title="GiroCode on Invoices – Best Practices">
          <ul className="space-y-3">
            {[
              { icon: '📐', text: 'Position: Bottom-right corner of the invoice — where payers naturally look for payment information.' },
              { icon: '📏', text: 'Minimum size: 2 cm × 2 cm. Smaller codes are harder to scan, especially with older devices.' },
              { icon: '⬜', text: 'White border: At least 2 mm of white space (quiet zone) on all four sides. Avoid placing text or graphics immediately adjacent.' },
              { icon: '🖨️', text: 'Print quality: Use at least 300 DPI for printed invoices. Blurry or pixelated codes may fail to scan.' },
              { icon: '🗜️', text: 'No compression: Do not use lossy image formats (JPEG) for the QR code. Use PNG or SVG to preserve sharpness.' },
              { icon: '✅', text: 'Always test: Scan your generated code with at least two different banking apps before distributing.' },
            ].map(({ icon, text }) => (
              <li key={text} className="flex gap-3 text-sm text-slate-600">
                <span className="text-lg flex-shrink-0">{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── Section 6: Common Mistakes ─────────────────────────────────── */}
        <Section id="common-mistakes" title="Common Mistakes">
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {['Mistake', 'Incorrect Example', 'Correct Approach'].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMMON_MISTAKES.map(({ mistake, example, fix }) => (
                  <tr key={mistake} className="hover:bg-slate-50 align-top">
                    <td className="px-4 py-3 font-semibold text-red-600 whitespace-nowrap">{mistake}</td>
                    <td className="px-4 py-3 font-mono text-slate-500 text-xs">{example}</td>
                    <td className="px-4 py-3 text-slate-600">{fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-blue-900 text-lg">Ready to generate your first GiroCode?</p>
          <p className="text-blue-700 text-sm">Free, instant, no registration required.</p>
          <Link
            href="/girocode/generator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-sm transition-colors"
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
