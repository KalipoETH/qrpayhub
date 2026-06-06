import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SubPageGrid from '@/components/ui/SubPageGrid';
import type { SubPage } from '@/components/ui/SubPageGrid';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  return {
    title: "PayNow – Singapore's Instant Payment System | QRPayHub",
    description:
      "Everything about PayNow: Singapore's instant payment system by MAS and ABS. Compatible with all Singapore banks and e-wallets. Connected with PromptPay Thailand and UPI India.",
    keywords: [
      'paynow',
      'paynow qr',
      'singapore qr payment',
      'sgqr',
      'paynow generator',
      'dbs paylah',
      'ocbc pay anyone',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/paynow'),
  };
}

const QUICK_FACTS = [
  { icon: '👥', value: '4M+',           label: 'Users' },
  { icon: '🏦', value: 'All SG Banks',  label: 'Connected' },
  { icon: '⚡', value: 'Instant 24/7',  label: 'Settlement' },
  { icon: '📅', value: 'Since 2017',    label: 'Established' },
];

const SUB_PAGES: SubPage[] = [
  {
    icon: '⚡',
    title: 'PayNow Generator',
    description: 'Create PayNow QR codes instantly — works with all Singapore payment apps',
    href: '/paynow/generator',
  },
];

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: "PayNow – Singapore's Instant Payment System",
  description:
    "Everything about PayNow: Singapore's instant payment system by MAS and ABS.",
  url: 'https://www.qrpayhub.com/en/paynow',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',   item: 'https://www.qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'PayNow', item: 'https://www.qrpayhub.com/en/paynow' },
    ],
  },
};

export default function PayNowHubPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-paynow-hub"
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
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-sm font-medium px-4 py-1.5 rounded-full border border-red-200">
          <span
            className="fi fi-sg"
            style={{
              width: '1.2em',
              height: '0.9em',
              display: 'inline-block',
              backgroundSize: 'cover',
              borderRadius: '2px',
              verticalAlign: 'middle',
            }}
          />{' '}
          Singapore Payment Standard
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          🇸🇬 PayNow – Singapore&apos;s Instant Payment System
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
          Instant transfers 24/7 using just a mobile number, NRIC or UEN — across every
          Singapore bank and major e-wallet. Launched by MAS and ABS in 2017.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/paynow/generator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-sm transition-colors"
          >
            Generate PayNow QR Code →
          </Link>
          <a
            href="#what-is-paynow"
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

      {/* ── What is PayNow ───────────────────────────────────────────────── */}
      <section id="what-is-paynow" className="space-y-6 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          What is PayNow?
        </h2>
        <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed">
          <p>
            <strong>PayNow</strong> is Singapore&apos;s national real-time payment system,
            developed jointly by the <strong>Monetary Authority of Singapore (MAS)</strong> and
            the <strong>Association of Banks in Singapore (ABS)</strong>. Launched in
            <strong> July 2017</strong> for individuals and extended to corporates in 2018,
            PayNow allows Singapore residents and businesses to send and receive funds instantly
            using a mobile number, NRIC/FIN, or Unique Entity Number (UEN) — without needing
            to know the recipient&apos;s bank account number.
          </p>
          <p>
            PayNow is built on top of Singapore&apos;s <strong>FAST (Fast And Secure Transfers)</strong>{' '}
            infrastructure, which processes transactions in near real-time, around the clock.
            Unlike many legacy payment systems, PayNow has no transaction cutoff times: transfers
            initiated at 3 AM on a public holiday settle just as quickly as those made on a
            weekday morning. The system is free for personal peer-to-peer transfers below
            S$1,000 per day at most participating banks.
          </p>
          <p>
            PayNow QR codes are encoded using the <strong>EMV Merchant Presented Mode (MPM)</strong>{' '}
            specification, with the application identifier{' '}
            <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">SG.PAYNOW</code>.
            The standard supports three proxy types for identifying payment recipients:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Mobile Number</strong> — Singapore mobile numbers starting with 8 or 9,
              formatted as <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">+65XXXXXXXX</code>{' '}
              in the payload. Commonly used for peer-to-peer payments between individuals.
            </li>
            <li>
              <strong>NRIC/FIN</strong> — Singapore National Registration Identity Card (NRIC)
              for citizens and permanent residents, or Foreign Identification Number (FIN)
              for long-term pass holders. Format: S/T/F/G + 7 digits + check letter.
            </li>
            <li>
              <strong>UEN (Unique Entity Number)</strong> — Singapore&apos;s business
              registration number assigned by the Accounting and Corporate Regulatory Authority
              (ACRA). 9–10 characters, ending with a letter. Used by businesses, charities,
              government agencies and other legal entities to receive PayNow payments.
            </li>
          </ul>
          <p>
            A distinctive feature of PayNow QR codes is the <strong>&ldquo;editable amount&rdquo;</strong>{' '}
            flag (field ID 03 in the payload). When set to <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">1</code>,
            the payer&apos;s banking app will allow them to modify the pre-filled amount before
            confirming the transfer — useful for situations like shared bills where the exact
            contribution varies per person. PayNow QR codes also support optional expiry dates,
            after which the QR code becomes invalid.
          </p>
          <p>
            PayNow&apos;s reach extends well beyond Singapore&apos;s borders. MAS has established
            cross-border payment linkages with:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>PromptPay (Thailand)</strong> — The world&apos;s first bilateral real-time
              cross-border payment link, launched in April 2021. Singapore users can transfer
              SGD to Thai PromptPay recipients, with Bank of Thailand handling the FX conversion.
            </li>
            <li>
              <strong>UPI (India)</strong> — Launched in February 2023, enabling PayNow users
              to send funds directly to Indian UPI addresses and vice versa, supporting the
              large Singapore-India remittance corridor.
            </li>
            <li>
              <strong>DuitNow (Malaysia)</strong> — Cross-border QR linkage enabling payments
              between Singapore and Malaysia, facilitating the high-volume Johor–Singapore
              economic corridor.
            </li>
          </ul>
          <p>
            The PayNow ecosystem is supported by all major Singapore banks and financial
            institutions, including DBS (PayLah!), OCBC (Pay Anyone), UOB (Mighty), Standard
            Chartered, Citibank, HSBC Singapore, Maybank Singapore, Bank of China Singapore,
            and CIMB Singapore, as well as e-wallets such as GrabPay and Singtel Dash.
          </p>
          <p>
            QRPayHub&apos;s PayNow generator creates fully compliant EMV payloads with currency
            code <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">702</code>{' '}
            (SGD) and a CRC16-CCITT checksum — computed entirely in your browser, with no
            server-side processing or data collection.
          </p>
        </div>
      </section>

      {/* ── Sub-page Links ───────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          PayNow Tools
        </h2>
        <SubPageGrid pages={SUB_PAGES} />
      </section>

    </div>
  );
}
