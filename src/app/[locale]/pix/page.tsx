import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SubPageGrid from '@/components/ui/SubPageGrid';
import type { SubPage } from '@/components/ui/SubPageGrid';

export const metadata: Metadata = {
  title: "PIX QR Code – Brazil's Instant Payment System | QRPayHub",
  description:
    'Everything about PIX QR codes: what PIX is, how it works, which apps support it and how to generate a PIX QR code for free.',
  keywords: ['pix', 'banco central brasil', 'pix qr code', 'pagamento instantaneo', 'bcb pix'],
};

const QUICK_FACTS = [
  { icon: '👥', value: '150M+', label: 'Active Users' },
  { icon: '🏦', value: '700+', label: 'Institutions' },
  { icon: '⚡', value: '24/7', label: 'Instant Transfer' },
  { icon: '📅', value: 'Since 2020', label: 'Established' },
];

const SUB_PAGES: SubPage[] = [
  {
    icon: '⚡',
    title: 'PIX QR Generator',
    description: 'Create PIX QR codes instantly — works with all Brazilian banking apps',
    href: '/pix/generator',
  },
  {
    icon: '📖',
    title: 'Technical Guide',
    description: 'EMV TLV payload spec, CRC16, key types, BCB integration docs',
    comingSoon: true,
  },
  {
    icon: '❓',
    title: 'FAQ',
    description: 'All questions about PIX QR codes answered',
    comingSoon: true,
  },
];

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: "PIX QR Code – Brazil's Instant Payment System",
  description:
    'Everything about PIX QR codes: what PIX is, how it works and how to generate one for free.',
  url: 'https://qrpayhub.com/en/pix',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'PIX QR', item: 'https://qrpayhub.com/en/pix' },
    ],
  },
};

export default function PIXHubPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-pix-hub"
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
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-medium px-4 py-1.5 rounded-full border border-emerald-200">
          🇧🇷 Brazilian Payment Standard
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          PIX QR Code – Brazil&apos;s Instant Payment System
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
          The fastest-growing payment system in history — 150 million Brazilians use PIX
          for instant transfers across 700+ banks, fintechs and payment apps.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/pix/generator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-sm transition-colors"
          >
            Generate PIX QR Code →
          </Link>
          <a
            href="#what-is-pix"
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

      {/* ── What is PIX ──────────────────────────────────────────────────── */}
      <section id="what-is-pix" className="space-y-6 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          What is PIX?
        </h2>
        <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed">
          <p>
            <strong>PIX</strong> is Brazil&apos;s national instant payment system, created
            and regulated by the <strong>Banco Central do Brasil (BCB)</strong>. Launched
            on November 16, 2020, PIX achieved the fastest mass adoption of any payment
            system in history — reaching 100 million users in just 5 months and surpassing
            credit cards in transaction volume within its first year.
          </p>
          <p>
            Unlike traditional bank transfers (TED/DOC) that required account numbers,
            branch codes and could take hours or days, PIX is designed for simplicity and
            speed. Transfers settle in under <strong>10 seconds</strong>, 24 hours a day,
            365 days a year — including weekends and bank holidays. For consumers, PIX is
            completely free. Businesses pay a small per-transaction fee, but it is
            significantly cheaper than card processing.
          </p>
          <p>
            The core of PIX is the <strong>PIX Key (Chave PIX)</strong> — a simple
            identifier that maps to a bank account. There are five key types:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>CPF</strong> — Brazilian individual taxpayer ID (11 digits), used
              by individuals.
            </li>
            <li>
              <strong>CNPJ</strong> — Brazilian corporate taxpayer ID (14 digits), used
              by businesses.
            </li>
            <li>
              <strong>Phone number</strong> — Brazilian mobile number starting with +55.
            </li>
            <li>
              <strong>E-mail address</strong> — Any valid email linked to a bank account.
            </li>
            <li>
              <strong>Random key (Chave Aleatória)</strong> — A system-generated UUID
              that reveals no personal information, ideal for public use.
            </li>
          </ul>
          <p>
            A <strong>PIX QR Code</strong> encodes a payment payload following the
            <strong> EMV Merchant Presented Mode (MPM)</strong> specification, adapted
            by BCB for the Brazilian market. The payload contains the PIX key, recipient
            name, city, and optionally an amount and description, all encoded in a
            TLV (Tag-Length-Value) structure with a <strong>CRC16-CCITT checksum</strong>
            at the end.
          </p>
          <p>
            <strong>Who uses PIX QR Codes?</strong> Virtually every Brazilian merchant
            and individual with a bank account:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Street markets and small businesses</strong> display static PIX QR
              codes on printed signs — customers scan and pay without cash or card.
            </li>
            <li>
              <strong>E-commerce platforms</strong> generate dynamic PIX QR codes at
              checkout with a pre-filled amount for frictionless one-scan payment.
            </li>
            <li>
              <strong>Freelancers and professionals</strong> share their PIX key or QR
              code on invoices and social media to receive payments instantly.
            </li>
            <li>
              <strong>Large retailers</strong> like iFood, Rappi, Shopee and Magazine
              Luiza offer PIX as a primary payment method — often with discounts.
            </li>
            <li>
              <strong>Government services</strong> accept PIX for tax payments (DARF),
              fines, utilities and social benefit withdrawals.
            </li>
          </ul>
          <p>
            Over <strong>3 billion PIX transactions</strong> are processed every month,
            making it one of the most active real-time payment networks on the planet.
            All 700+ participating institutions — including Itaú, Bradesco, Banco do Brasil,
            Caixa Econômica, Nubank, Inter, C6 Bank, PicPay and Mercado Pago — are
            required by BCB to support PIX in their apps.
          </p>
          <p>
            QRPayHub&apos;s PIX generator produces fully spec-compliant EMV payloads
            with CRC16 checksum computed in-browser — free, instant and without any
            server-side processing or data collection.
          </p>
        </div>
      </section>

      {/* ── Sub-page Links ───────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          PIX Tools
        </h2>
        <SubPageGrid pages={SUB_PAGES} />
      </section>

    </div>
  );
}
