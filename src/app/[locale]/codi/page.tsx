import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SubPageGrid from '@/components/ui/SubPageGrid';
import type { SubPage } from '@/components/ui/SubPageGrid';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: "CoDi – Mexico's Digital Payment System | QRPayHub",
    description:
      'Everything about CoDi QR codes: what CoDi is, how SPEI works, which Mexican banks support it and how to generate a CoDi QR code for free.',
    keywords: ['codi qr', 'codi mexico', 'spei qr code', 'cobro digital', 'banxico qr', 'mexican payment qr', 'clabe qr'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/codi'),
  };
}

const QUICK_FACTS = [
  { icon: '👥', value: '40M+',     label: 'Active Users' },
  { icon: '🏦', value: 'All MX',   label: 'Banks' },
  { icon: '⚡', value: 'MXN Instant', label: 'via SPEI' },
  { icon: '📅', value: 'Since 2019', label: 'Established' },
];

const SUB_PAGES: SubPage[] = [
  {
    icon: '⚡',
    title: 'CoDi QR Generator',
    description: 'Create CoDi QR codes instantly — works with all major Mexican banks and Mercado Pago',
    href: '/codi/generator',
  },
];

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: "CoDi – Mexico's Digital Payment System",
  description: 'Generate CoDi QR codes for Mexican SPEI payments. Compatible with all major Mexican banks.',
  url: 'https://qrpayhub.com/en/codi',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'CoDi',  item: 'https://qrpayhub.com/en/codi' },
    ],
  },
};

export default function CoDiHubPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-codi-hub"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
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
        <div
          className="inline-flex items-center gap-2 text-white text-sm font-medium px-4 py-1.5 rounded-full"
          style={{ backgroundColor: '#006847' }}
        >
          <span className="fi fi-mx" style={{ width: '1.2em', height: '0.9em', display: 'inline-block', backgroundSize: 'cover', borderRadius: '2px', verticalAlign: 'middle' }} />
          Mexican Payment Standard
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          CoDi – Mexico&apos;s Digital Payment System
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
          40 million Mexicans use CoDi for instant SPEI transfers — every major bank from BBVA
          to Banorte supports it, 24/7, free of charge for consumers.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/codi/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#006847' }}
          >
            Generate CoDi QR →
          </Link>
          <a
            href="#what-is-codi"
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

      {/* ── What is CoDi ─────────────────────────────────────────────────── */}
      <section id="what-is-codi" className="space-y-6 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          What is CoDi?
        </h2>
        <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed">
          <p>
            <strong>CoDi</strong> (Cobro Digital — &ldquo;Digital Collection&rdquo;) is Mexico&apos;s
            national instant payment system, developed by{' '}
            <strong>Banxico (Banco de México)</strong>, the country&apos;s central bank. Launched in
            September 2019, CoDi was designed to extend the reach of{' '}
            <strong>SPEI</strong> (Sistema de Pagos Electrónicos Interbancarios) — Mexico&apos;s
            established interbank electronic payment infrastructure — to everyday QR-code
            transactions at the point of sale and online.
          </p>
          <p>
            SPEI has been Mexico&apos;s backbone for electronic bank transfers since 2004. It
            processes transfers between all Mexican banks in under 30 seconds around the clock,
            every day of the year. CoDi takes this proven settlement layer and wraps it in a
            simple QR code workflow: a merchant generates a CoDi QR code with the amount, concept
            and their CLABE or phone number; the payer scans the code in their bank&apos;s mobile
            app; and the funds arrive in the merchant&apos;s account almost instantly, settled
            directly through SPEI.
          </p>
          <p>
            <strong>CLABE</strong> (Clave Bancaria Estandarizada) is the 18-digit standardised
            bank account number used throughout Mexico. Every Mexican bank account has a unique
            CLABE, which encodes the bank code (first 3 digits), city code (next 3 digits),
            account number (11 digits) and a check digit (final digit) validated by a weighted
            modulo-10 algorithm. CoDi QR codes can identify the recipient either by CLABE or by
            registered mobile phone number.
          </p>
          <p>
            <strong>Who uses CoDi?</strong>
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Retail merchants and restaurants</strong> accept CoDi as a no-terminal
              alternative to card payments — zero per-transaction fee for consumer payments,
              no card reader hardware required.
            </li>
            <li>
              <strong>Small businesses and freelancers</strong> share CoDi QR codes on invoices
              and WhatsApp to collect payments instantly from clients at any Mexican bank.
            </li>
            <li>
              <strong>Online marketplaces</strong> integrate CoDi as a payment option for
              customers who prefer bank transfers over cards.
            </li>
            <li>
              <strong>Fintech apps</strong> such as Mercado Pago MX, Spin by OXXO and Cuenca
              support CoDi alongside their own payment rails, bringing it to millions of users
              who may not have traditional bank accounts.
            </li>
          </ul>
          <p>
            CoDi is <strong>free for consumers</strong> — Banxico mandated zero-fee retail
            payments to drive adoption. Businesses may incur a small fee depending on their
            bank agreement, but typically far less than card-processing rates. Because CoDi
            settles through SPEI, all 47+ regulated banks in Mexico — including BBVA México,
            Santander, Banorte, HSBC and Citibanamex — are obligated to support it.
          </p>
          <p>
            QRPayHub&apos;s CoDi generator produces a{' '}
            <code className="font-mono text-xs bg-slate-100 px-1 rounded">BXC://SPEI</code>{' '}
            format payload encoding the CLABE or phone, amount, concept and numeric reference —
            generated entirely in your browser, free and without server-side data collection.
          </p>
        </div>
      </section>

      {/* ── Sub-page Links ───────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          CoDi Tools
        </h2>
        <SubPageGrid pages={SUB_PAGES} />
      </section>

    </div>
  );
}
