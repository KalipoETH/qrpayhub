import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: "How CoDi Works – Mexico's Digital Payment Guide | QRPayHub",
    description:
      "Complete guide to CoDi (Cobro Digital): Mexico's QR payment system by Banxico. Learn about CLABE validation, SPEI infrastructure, BXC protocol and DiMo.",
    keywords: [
      'codi guide',
      'how codi works',
      'cobro digital mexico',
      'clabe validation',
      'spei qr payment',
      'banxico codi',
      'bxc protocol',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/codi/guide'),
  };
}

const CLABE_BANKS = [
  { code: '002', bank: 'BBVA México',       note: 'Largest private bank' },
  { code: '012', bank: 'BBVA México (alt)', note: 'Legacy code' },
  { code: '014', bank: 'Santander MX',      note: '' },
  { code: '021', bank: 'HSBC México',       note: '' },
  { code: '072', bank: 'Banorte',           note: 'Largest Mexican-owned bank' },
  { code: '002', bank: 'Citibanamex',       note: 'Uses 002 prefix' },
  { code: '058', bank: 'Banregio',          note: '' },
  { code: '059', bank: 'Banorte (savings)', note: '' },
  { code: '006', bank: 'Bancomext',         note: 'Development bank' },
  { code: '646', bank: 'STP',              note: 'Fintech / SPEI direct' },
];

const CODI_VS_DIMO = [
  { feature: 'Launch year',        codi: '2019',                          dimo: '2023' },
  { feature: 'Identifier',         codi: 'CLABE or phone number',         dimo: 'Phone number (proxy)' },
  { feature: 'QR code',            codi: 'Yes (BXC:// format)',           dimo: 'No QR – phone-number based' },
  { feature: 'NFC support',        codi: 'Yes',                           dimo: 'No' },
  { feature: 'Amount',             codi: 'Required',                      dimo: 'Flexible' },
  { feature: 'Best for',           codi: 'Merchant QR payments',          dimo: 'P2P transfers' },
  { feature: 'Analogy',            codi: 'Similar to PromptPay / VietQR', dimo: 'Similar to PIX / UPI' },
  { feature: 'Settlement',         codi: 'SPEI',                          dimo: 'SPEI' },
];

const SUPPORTED_BANKS = [
  { name: 'BBVA México',   app: 'BBVA México App' },
  { name: 'Santander MX',  app: 'Santander México' },
  { name: 'Banorte',       app: 'Banorte Móvil' },
  { name: 'HSBC México',   app: 'HSBC México' },
  { name: 'Citibanamex',   app: 'Citibanamex Móvil' },
  { name: 'Scotiabank MX', app: 'Scotia en Línea' },
  { name: 'Inbursa',       app: 'Inbursa Móvil' },
  { name: 'BanBajío',      app: 'BanBajío Móvil' },
  { name: 'Mercado Pago',  app: 'Mercado Pago MX' },
  { name: 'Spin by OXXO',  app: 'Spin App' },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "How CoDi Works – Mexico's Digital Payment Guide",
  description:
    "Complete guide to CoDi: Mexico's QR payment system by Banxico. CLABE validation, SPEI, BXC protocol and DiMo.",
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/codi/guide' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'CoDi',  item: 'https://qrpayhub.com/en/codi' },
      { '@type': 'ListItem', position: 3, name: 'Guide', item: 'https://qrpayhub.com/en/codi/guide' },
    ],
  },
};

export default function CoDiGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-codi-guide"
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
        { label: 'CoDi', href: '/codi' },
        { label: 'Guide' },
      ]} />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          How CoDi Works – Mexico&apos;s Digital Payment Guide
        </h1>
        <p className="text-lg text-slate-500">
          Everything about CoDi: CLABE accounts, the SPEI infrastructure, BXC:// QR protocol, required fields and DiMo.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/codi/generator"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-white text-sm font-semibold rounded-xl transition-colors"
            style={{ backgroundColor: '#006847' }}
          >
            Try the Generator →
          </Link>
        </div>
      </header>

      <div className="space-y-14 pt-4">

        {/* ── Section 1: What is CoDi ───────────────────────────────────────── */}
        <Section id="what-is-codi" title="What is CoDi?">
          <Prose>
            <p>
              <strong>CoDi</strong> (Cobro Digital — &ldquo;Digital Collection&rdquo;) is Mexico&apos;s
              national digital payment system, developed and operated by{' '}
              <strong>Banxico (Banco de México)</strong>, the country&apos;s central bank. Launched
              in <strong>September 2019</strong>, CoDi enables merchants and individuals to receive
              payments via QR code or NFC, settled instantly through the{' '}
              <strong>SPEI</strong> interbank network — free of charge, 24 hours a day.
            </p>
            <p>
              Unlike most QR payment standards that are voluntary, CoDi was <strong>mandated</strong>{' '}
              by Banxico: all banks participating in SPEI are required to offer CoDi functionality
              to their customers. This means CoDi coverage spans every regulated bank in Mexico —
              BBVA México, Santander, Banorte, HSBC, Citibanamex, and 40+ others.
            </p>
            <p>
              CoDi differs from other QR payment systems in one important way:{' '}
              <strong>an amount is always required</strong>. CoDi initiates a specific SPEI transfer
              for a fixed amount — it is a &ldquo;payment request&rdquo; rather than an open QR
              that the payer fills in. This makes CoDi particularly suitable for merchant checkouts
              and invoicing.
            </p>
          </Prose>
        </Section>

        {/* ── Section 2: Step by Step ───────────────────────────────────────── */}
        <Section id="how-it-works" title="How CoDi Works – Step by Step">
          <ol className="space-y-4">
            {[
              {
                step: 1,
                title: 'Merchant generates a CoDi QR code',
                body: 'Enter the CLABE (18-digit bank account) or registered phone number, the exact amount (required), a concept description, and a numeric reference. The QR encodes a BXC://SPEI payload.',
              },
              {
                step: 2,
                title: 'Merchant displays the QR code',
                body: 'The QR can be shown on a phone screen, printed, or embedded in an invoice or website. CoDi also supports NFC for contactless payment without a QR code.',
              },
              {
                step: 3,
                title: 'Customer opens their bank app',
                body: 'Any SPEI-participant bank app supports CoDi. The customer selects the CoDi payment option (usually under "Pay" or "Cobrar/Pagar").',
              },
              {
                step: 4,
                title: 'Customer scans the QR code',
                body: 'The app reads the BXC://SPEI payload, extracting the recipient\'s CLABE or phone, amount, concept, and reference. These are displayed for review.',
              },
              {
                step: 5,
                title: 'Customer authenticates',
                body: 'The customer confirms the payment using their bank\'s authentication (NIP, biometrics). The transfer is initiated from their SPEI-linked account.',
              },
              {
                step: 6,
                title: 'SPEI processes the transfer',
                body: 'Banxico\'s SPEI infrastructure processes the transfer in under 30 seconds. SPEI operates 24/7/365, so CoDi payments are available at any time.',
              },
              {
                step: 7,
                title: 'Merchant receives confirmation',
                body: 'The merchant\'s bank sends an instant credit notification. The numeric reference and concept in the SPEI record enable automatic reconciliation.',
              },
            ].map(({ step, title, body }) => (
              <li key={step} className="flex gap-4">
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm"
                  style={{ backgroundColor: '#006847' }}
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

        {/* ── Section 3: CLABE ─────────────────────────────────────────────── */}
        <Section id="clabe" title="CLABE – Mexico's Bank Account Standard">
          <Prose>
            <p>
              <strong>CLABE</strong> (Clave Bancaria Estandarizada) is Mexico&apos;s 18-digit
              standardised bank account number, mandatory for all SPEI transfers. Every Mexican
              bank account has a unique CLABE. The structure is:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Digits 1–3:</strong> Bank code (identifies the institution)</li>
              <li><strong>Digits 4–6:</strong> City/plaza code</li>
              <li><strong>Digits 7–17:</strong> Account number (11 digits)</li>
              <li><strong>Digit 18:</strong> Check digit (calculated via weighted algorithm)</li>
            </ul>
            <p>
              <strong>CLABE check digit algorithm:</strong> Multiply each of the first 17 digits by
              the repeating weight sequence <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">3, 7, 1</code>,
              sum all products, take the result modulo 10, subtract from 10, and take modulo 10 again.
              This gives the 18th check digit. qrpayhub.com validates CLABEs automatically using
              this algorithm and displays the detected bank name from the first 3 digits.
            </p>
          </Prose>

          <pre className="bg-slate-900 text-emerald-400 text-sm font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4">
{`CLABE: 0 7 2 1 8 0 0 0 1 1 8 3 5 9 4 4 0 1
       │ │ │ └─ City (180)
       │ │ └─── Bank: 072 = Banorte
       │ └───── 
       └─────── Check digit = 1

Weights: 3 7 1 3 7 1 3 7 1 3 7 1 3 7 1 3 7 (×17)
Sum all (digit × weight) → mod 10 → (10 - x) mod 10`}
          </pre>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {['Bank Code', 'Bank Name', 'Note'].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {CLABE_BANKS.map(({ code, bank, note }) => (
                  <tr key={bank} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono font-bold" style={{ color: '#006847' }}>{code}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{bank}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── Section 4: CoDi QR Payload ───────────────────────────────────── */}
        <Section id="payload-format" title="The CoDi QR Payload Format">
          <Prose>
            <p>
              CoDi QR codes use the <strong>BXC:// protocol</strong> (Banxico) — a proprietary
              URL scheme designed by Banxico specifically for CoDi. The payload structure encodes
              SPEI transfer parameters as a pipe-delimited string:
            </p>
          </Prose>

          <pre className="bg-slate-900 text-emerald-400 text-sm font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4">
{`BXC://SPEI?data=SPEI|[version]|[type]|[clabe_or_phone]|[amount]|[concept]|[reference]|[name]

Example:
BXC://SPEI?data=SPEI|1|03|072180001183594401|150.00|Pago%20factura%20001|1234567|TIENDA%20LA%20PALMA`}
          </pre>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-4">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {['Field', 'Example', 'Required', 'Description'].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { field: 'Protocol',   example: 'BXC://SPEI',          req: true,  desc: 'Banxico CoDi protocol identifier' },
                  { field: 'version',    example: '1',                   req: true,  desc: 'CoDi version (always 1)' },
                  { field: 'type',       example: '03',                  req: true,  desc: '03=CLABE, 10=phone number' },
                  { field: 'recipient',  example: '072180001183594401',  req: true,  desc: 'CLABE (18 digits) or 10-digit phone' },
                  { field: 'amount',     example: '150.00',              req: true,  desc: 'Amount in MXN (required for CoDi)' },
                  { field: 'concepto',   example: 'Pago factura 001',    req: true,  desc: 'Payment concept (1–35 chars, URL-encoded)' },
                  { field: 'referencia', example: '1234567',             req: true,  desc: 'Numeric reference (1–7 digits)' },
                  { field: 'name',       example: 'TIENDA LA PALMA',     req: false, desc: 'Beneficiary name (URL-encoded)' },
                ].map(({ field, example, req, desc }) => (
                  <tr key={field} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono font-bold" style={{ color: '#006847' }}>{field}</td>
                    <td className="px-4 py-3 font-mono text-slate-600 text-xs">{example}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        req ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {req ? 'Required' : 'Optional'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── Section 5: Required Fields ────────────────────────────────────── */}
        <Section id="required-fields" title="Required Fields – Why Amount is Mandatory">
          <Prose>
            <p>
              CoDi&apos;s requirement for a fixed amount is a deliberate design decision by Banxico.
              CoDi is a <strong>payment collection system</strong> (Cobro = Collection), not just
              a payment routing mechanism. The workflow assumes the merchant has calculated the exact
              amount and encoded it in the QR — the customer simply scans and confirms.
            </p>
            <p>
              This contrasts with standards like VietQR or PromptPay, which support &ldquo;open
              amount&rdquo; QR codes where the payer enters the amount. CoDi&apos;s mandatory amount
              reduces errors and disputes in retail transactions, since both parties see the same
              figure before the transfer is authorised.
            </p>
            <p>
              The <strong>Referencia Numérica</strong> (1–7 digits) is also required and appears
              in the SPEI transfer record for both sender and recipient. Businesses should use
              invoice numbers, order IDs, or folio numbers as the reference for automated
              reconciliation. Random or sequential numbers work for small merchants.
            </p>
            <p>
              The <strong>Concepto</strong> (1–35 characters) describes the payment purpose and
              also appears in the SPEI record. Common values: &ldquo;Pago factura 001&rdquo;,
              &ldquo;Servicio mensual marzo&rdquo;, &ldquo;Anticipo pedido 123&rdquo;.
            </p>
          </Prose>
        </Section>

        {/* ── Section 6: CoDi vs DiMo ──────────────────────────────────────── */}
        <Section id="codi-vs-dimo" title="CoDi vs DiMo – Mexico's Two Systems">
          <Prose>
            <p>
              In 2023, Banxico launched <strong>DiMo (Dinero Móvil)</strong> as a complementary
              instant payment system. DiMo uses phone numbers as proxies for bank account transfers
              — similar to how India&apos;s UPI uses UPI IDs or Brazil&apos;s PIX uses CPF/phone.
              CoDi and DiMo serve different use cases and coexist.
            </p>
          </Prose>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-3">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">Feature</th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-200" style={{ color: '#006847' }}>CoDi</th>
                  <th className="px-4 py-3 font-semibold text-purple-700 border-b border-slate-200">DiMo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {CODI_VS_DIMO.map(({ feature, codi, dimo }) => (
                  <tr key={feature} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-700">{feature}</td>
                    <td className="px-4 py-3 text-slate-600">{codi}</td>
                    <td className="px-4 py-3 text-slate-600">{dimo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ── Section 7: Supported Banks ────────────────────────────────────── */}
        <Section id="supported-banks" title="Supported Banks">
          <Prose>
            <p>
              All SPEI-participant banks in Mexico are obligated to support CoDi. As of 2025,
              this includes over 50 commercial banks, development banks, and fintech institutions
              licensed to operate in Mexico.
            </p>
          </Prose>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {SUPPORTED_BANKS.map(({ name, app }) => (
              <div
                key={name}
                className="bg-white border border-slate-100 rounded-xl p-3 flex items-center justify-between shadow-sm"
              >
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{name}</p>
                  <p className="text-xs text-slate-400">{app}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Section 8: Mexico's Digital Payment Evolution ─────────────────── */}
        <Section id="digital-evolution" title="Mexico's Digital Payment Evolution">
          <Prose>
            <p>
              Mexico&apos;s digital payment journey began with <strong>SPEI in 2004</strong> —
              one of Latin America&apos;s first real-time interbank systems. For over a decade,
              SPEI was a business and high-value payment tool. CoDi in 2019 brought SPEI to
              everyday retail by wrapping it in a QR code interface.
            </p>
            <p>
              CoDi adoption has been slower than comparable systems in Brazil (PIX) or India (UPI).
              Banxico mandated bank support, but adoption by consumers and merchants has been
              constrained by <strong>the requirement for a SPEI-enrolled bank account</strong>
              (excluding many of the unbanked) and competition from Mercado Pago&apos;s own QR
              payment system, which reached millions of users through marketplace integration.
            </p>
            <p>
              <strong>DiMo&apos;s launch in 2023</strong> addressed one key limitation by enabling
              phone-number-based transfers without needing to know the recipient&apos;s CLABE.
              DiMo has grown faster than CoDi, with major banks enrolling millions of users in
              the first year. Together, CoDi (QR merchant payments) and DiMo (P2P transfers)
              form a complete instant payment system comparable to Brazil&apos;s PIX.
            </p>
            <p>
              For businesses operating in Mexico, CoDi offers a <strong>zero-fee payment
              acceptance</strong> option with universal bank coverage — no card terminal, no
              payment gateway fees. Combined with SPEI&apos;s 24/7 availability and proven
              infrastructure, CoDi is an increasingly attractive option for Mexican merchants
              and B2B payment collections.
            </p>
          </Prose>
        </Section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-6 text-center space-y-3"
          style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}
        >
          <p className="font-semibold text-lg" style={{ color: '#14532d' }}>
            Ready to generate your CoDi QR Code?
          </p>
          <p className="text-sm" style={{ color: '#166534' }}>
            Free, instant, works with all Mexican banks via SPEI.
          </p>
          <Link
            href="/codi/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#006847' }}
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
