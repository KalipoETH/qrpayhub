import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import RelatedToolCard from '@/components/ui/RelatedToolCard';

export const metadata: Metadata = {
  title: 'GiroCode / EPC QR Code – Complete Guide | QRPayHub',
  description:
    'Everything about GiroCode: what it is, how it works, which banks support it and how to generate one for free.',
  keywords: ['girocode', 'epc qr code', 'sepa qr code', 'girocode generator', 'european qr payment'],
};

const SEPA_COUNTRIES = [
  { code: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: 'AT', flag: '🇦🇹', name: 'Austria' },
  { code: 'FR', flag: '🇫🇷', name: 'France' },
  { code: 'IT', flag: '🇮🇹', name: 'Italy' },
  { code: 'ES', flag: '🇪🇸', name: 'Spain' },
  { code: 'NL', flag: '🇳🇱', name: 'Netherlands' },
  { code: 'BE', flag: '🇧🇪', name: 'Belgium' },
  { code: 'PL', flag: '🇵🇱', name: 'Poland' },
  { code: 'PT', flag: '🇵🇹', name: 'Portugal' },
  { code: 'FI', flag: '🇫🇮', name: 'Finland' },
  { code: 'IE', flag: '🇮🇪', name: 'Ireland' },
  { code: 'GR', flag: '🇬🇷', name: 'Greece' },
  { code: 'SK', flag: '🇸🇰', name: 'Slovakia' },
  { code: 'SI', flag: '🇸🇮', name: 'Slovenia' },
  { code: 'EE', flag: '🇪🇪', name: 'Estonia' },
  { code: 'LV', flag: '🇱🇻', name: 'Latvia' },
  { code: 'LT', flag: '🇱🇹', name: 'Lithuania' },
  { code: 'LU', flag: '🇱🇺', name: 'Luxembourg' },
  { code: 'MT', flag: '🇲🇹', name: 'Malta' },
  { code: 'CY', flag: '🇨🇾', name: 'Cyprus' },
  { code: 'HR', flag: '🇭🇷', name: 'Croatia' },
  { code: 'HU', flag: '🇭🇺', name: 'Hungary' },
  { code: 'RO', flag: '🇷🇴', name: 'Romania' },
  { code: 'BG', flag: '🇧🇬', name: 'Bulgaria' },
  { code: 'CZ', flag: '🇨🇿', name: 'Czech Rep.' },
  { code: 'DK', flag: '🇩🇰', name: 'Denmark' },
  { code: 'SE', flag: '🇸🇪', name: 'Sweden' },
  { code: 'NO', flag: '🇳🇴', name: 'Norway' },
  { code: 'IS', flag: '🇮🇸', name: 'Iceland' },
  { code: 'LI', flag: '🇱🇮', name: 'Liechtenstein' },
  { code: 'CH', flag: '🇨🇭', name: 'Switzerland' },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'MC', flag: '🇲🇨', name: 'Monaco' },
  { code: 'SM', flag: '🇸🇲', name: 'San Marino' },
  { code: 'VA', flag: '🇻🇦', name: 'Vatican City' },
  { code: 'AD', flag: '🇦🇩', name: 'Andorra' },
];

const QUICK_FACTS = [
  { icon: '🌍', value: '36', label: 'SEPA Countries' },
  { icon: '👥', value: '500M+', label: 'Users' },
  { icon: '🏦', value: 'All', label: 'European Banks' },
  { icon: '✅', value: 'ISO 20022', label: 'Standard' },
];

const SUB_PAGES = [
  {
    href: '/girocode/guide',
    icon: '📖',
    title: 'How it Works',
    desc: 'Step-by-step technical guide to the EPC QR payload',
    soon: false,
  },
  {
    href: '/girocode/fuer-unternehmen',
    icon: '🏢',
    title: 'For Businesses',
    desc: 'Invoice integration, batch generation, best practices',
    soon: true,
  },
  {
    href: '/girocode/faq',
    icon: '❓',
    title: 'FAQ',
    desc: 'All questions answered — banks, security, compatibility',
    soon: false,
  },
  {
    href: '/girocode/spezifikation',
    icon: '⚙️',
    title: 'Technical Spec',
    desc: 'Full EPC069-12 payload reference and validation rules',
    soon: true,
  },
];

const JSON_LD_WEBPAGE = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'GiroCode / EPC QR Code – Complete Guide',
  description:
    'Everything about GiroCode: what it is, how it works, which banks support it and how to generate one for free.',
  url: 'https://qrpayhub.com/en/girocode',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'GiroCode', item: 'https://qrpayhub.com/en/girocode' },
    ],
  },
};

export default function GiroCodeHubPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-girocode-hub"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_WEBPAGE) }}
      />
      <PageContent />
    </>
  );
}

function PageContent() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full border border-blue-200">
          🇪🇺 SEPA Payment Standard
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          GiroCode / EPC QR Code
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
          The European standard for QR payment codes — used by 500 million people
          across 36 SEPA countries.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/girocode/generator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-sm transition-colors"
          >
            Generate GiroCode →
          </Link>
          <a
            href="#what-is-girocode"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-xl transition-colors"
          >
            Learn more ↓
          </a>
        </div>
      </section>

      {/* ── Quick Facts ──────────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {QUICK_FACTS.map(({ icon, value, label }) => (
          <div
            key={label}
            className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm"
          >
            <div className="text-3xl mb-2">{icon}</div>
            <div className="text-2xl font-bold text-slate-900">{value}</div>
            <div className="text-sm text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </section>

      {/* ── What is GiroCode ─────────────────────────────────────────────── */}
      <section id="what-is-girocode" className="space-y-6 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          What is GiroCode?
        </h2>
        <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed">
          <p>
            GiroCode — officially known as the <strong>EPC QR Code</strong> — is a standardized
            two-dimensional barcode format for SEPA Credit Transfers. It was developed by the
            <strong> European Payments Council (EPC)</strong> and first published as specification
            EPC069-12 in 2012, with mandatory adoption in Germany from November 2019.
          </p>
          <p>
            At its core, GiroCode solves a simple but costly problem: manual bank transfer
            entry is error-prone. Studies show that up to 3% of manually entered IBANs contain
            typos. A single incorrect digit can mean a payment lands in the wrong account — or
            is rejected entirely, triggering expensive correction procedures. GiroCode eliminates
            this risk by encoding all payment details into a machine-readable QR code.
          </p>
          <p>
            When a payer opens their banking app and scans a GiroCode, all fields — recipient
            name, IBAN, amount, currency, and payment reference — are filled in automatically.
            The payer simply reviews the data and confirms with their PIN, fingerprint, or face
            ID. No typing required.
          </p>
          <p>
            <strong>Who uses GiroCode?</strong> Today, GiroCode is used across an enormous
            range of contexts:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Freelancers and small businesses</strong> print GiroCodes on invoices,
              allowing clients to pay instantly without typing a single character.
            </li>
            <li>
              <strong>Large corporations</strong> embed GiroCodes in PDF invoices, billing
              portals and payment reminder emails.
            </li>
            <li>
              <strong>Charities and non-profits</strong> place GiroCodes on donation posters,
              flyers and websites to maximize conversion.
            </li>
            <li>
              <strong>Event organizers</strong> use GiroCodes for ticket payments, registrations
              and membership fees.
            </li>
            <li>
              <strong>Banks and payment providers</strong> include GiroCode scanners directly
              in their mobile banking apps — Deutsche Bank, Commerzbank, Sparkasse, Volksbank,
              ING, DKB, N26, Comdirect and virtually every other SEPA-compliant bank supports it.
            </li>
          </ul>
          <p>
            The format is open, free to use, and requires no proprietary technology. Any
            developer can generate a valid GiroCode payload with a standard QR library —
            as demonstrated by this platform.
          </p>
          <p>
            GiroCode is based on the <strong>ISO 20022</strong> financial messaging standard,
            which ensures long-term compatibility and interoperability across the European
            banking system. The payload is plain text, encoded in UTF-8, and follows a strict
            11-line structure that any standards-compliant QR scanner can parse.
          </p>
          <p>
            With SEPA expanding to cover 36 countries — including all EU member states plus
            Switzerland, Norway, Iceland, Liechtenstein, the UK and several micro-states — 
            GiroCode has become the de-facto standard for QR-based bank transfers across
            the entire European continent.
          </p>
        </div>
      </section>

      {/* ── Supported Countries ──────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Supported Countries
        </h2>
        <p className="text-slate-500">
          GiroCode is supported in all 36 SEPA member countries.
        </p>
        <div className="flex flex-wrap gap-2">
          {SEPA_COUNTRIES.map(({ code, flag, name }) => (
            <div
              key={code}
              title={name}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm text-slate-700 shadow-sm hover:border-slate-300 transition-colors"
            >
              <span>{flag}</span>
              <span className="font-medium">{code}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sub-page Links ───────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          More About GiroCode
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SUB_PAGES.map(({ href, icon, title, desc, soon }) => (
            <div key={href} className="relative">
              {soon ? (
                <div className="block bg-white border border-slate-100 rounded-2xl p-5 shadow-sm opacity-60 select-none">
                  <SubPageCardInner icon={icon} title={title} desc={desc} />
                  <span className="absolute top-3 right-3 text-xs font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                    Coming Soon
                  </span>
                </div>
              ) : (
                <Link
                  href={href as `/${string}`}
                  className="block bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-100 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <SubPageCardInner icon={icon} title={title} desc={desc} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Also useful ──────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Also useful:
        </h2>
        <RelatedToolCard
          icon="🧾"
          name="GiroCode Generator"
          url="https://www.girocodegenerator.com"
          description="The specialized GiroCode tool for freelancers – generate invoices with embedded GiroCode QR codes in one click."
          badge="Recommended for invoices"
          visitLabel="Visit Tool →"
        />
      </section>

    </div>
  );
}

function SubPageCardInner({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-2xl flex-shrink-0">{icon}</span>
      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
