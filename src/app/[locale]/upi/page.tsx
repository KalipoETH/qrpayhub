import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: "UPI QR Code – India's Universal Payment Interface | QRPayHub",
  description:
    'Everything about UPI QR codes: what UPI is, how it works, which apps support it and how to generate a UPI QR code for free.',
  keywords: ['upi', 'unified payments interface', 'upi qr code', 'npci', 'bhim upi', 'india payments'],
};

const QUICK_FACTS = [
  { icon: '👥', value: '350M+', label: 'Monthly Users' },
  { icon: '🏦', value: '500+', label: 'Member Banks' },
  { icon: '⚡', value: 'Instant', label: '24/7 Transfer' },
  { icon: '✅', value: 'Free', label: 'Zero Charges' },
];

const SUB_PAGES = [
  {
    href: '/upi/generator',
    icon: '⚡',
    title: 'UPI QR Generator',
    desc: 'Create UPI QR codes instantly — works with all UPI apps',
    soon: false,
  },
  {
    href: '/upi/guide',
    icon: '📖',
    title: 'Integration Guide',
    desc: 'Technical deep-link spec, VPA validation, merchant flows',
    soon: true,
  },
];

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: "UPI QR Code – India's Universal Payment Interface",
  description:
    'Everything about UPI QR codes: what UPI is, how it works, and how to generate one for free.',
  url: 'https://qrpayhub.com/en/upi',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'UPI QR', item: 'https://qrpayhub.com/en/upi' },
    ],
  },
};

export default function UPIHubPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-upi-hub"
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
        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 text-sm font-medium px-4 py-1.5 rounded-full border border-orange-200">
          🇮🇳 India Payment Standard
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          UPI QR Code – India&apos;s Universal Payment Interface
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
          The world&apos;s largest real-time payment system — used by 350 million Indians
          across PhonePe, Google Pay, Paytm, BHIM and 500+ banks.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/upi/generator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-sm transition-colors"
          >
            Generate UPI QR Code →
          </Link>
          <a
            href="#what-is-upi"
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

      {/* ── What is UPI ──────────────────────────────────────────────────── */}
      <section id="what-is-upi" className="space-y-6 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          What is UPI?
        </h2>
        <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed">
          <p>
            <strong>UPI</strong> — the <strong>Unified Payments Interface</strong> — is
            India&apos;s flagship real-time payment system, developed and operated by the
            <strong> National Payments Corporation of India (NPCI)</strong>. Launched in
            April 2016 under the guidance of the Reserve Bank of India, UPI has grown into
            the world&apos;s largest instant payment network by transaction volume,
            processing over <strong>10 billion transactions per month</strong> as of 2024.
          </p>
          <p>
            At its core, UPI allows any two bank account holders in India to transfer money
            instantly, 24 hours a day, 7 days a week — including bank holidays — at zero cost
            to consumers. Unlike traditional NEFT or RTGS transfers that require account
            numbers and IFSC codes, UPI uses a simple address called a
            <strong> Virtual Payment Address (VPA)</strong>, also known as a UPI ID, in the
            format <code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">username@bankhandle</code>.
          </p>
          <p>
            A <strong>UPI QR code</strong> encodes a standardized deep link
            (<code className="font-mono text-sm bg-slate-100 px-1.5 py-0.5 rounded">upi://pay?pa=...&pn=...&am=...&cu=INR</code>)
            that any UPI-compatible app can scan to instantly pre-fill all payment details.
            When a customer scans the code, their banking app opens automatically with the
            recipient name, amount and payment note already filled in — requiring only
            authentication (PIN, fingerprint or face ID) to complete the payment.
          </p>
          <p>
            <strong>Who uses UPI QR codes?</strong> The technology has transformed payments
            across the entire Indian economy:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Street vendors and kirana stores</strong> display printed UPI QR codes
              for contactless payments — from tea stalls to vegetable markets.
            </li>
            <li>
              <strong>E-commerce platforms</strong> like Flipkart, Myntra and Meesho
              integrate UPI QR codes at checkout for frictionless payment.
            </li>
            <li>
              <strong>Freelancers and professionals</strong> share UPI QR codes on invoices,
              websites and business cards to receive payments instantly.
            </li>
            <li>
              <strong>Large enterprises</strong> use UPI with merchant codes (MCC) and
              transaction references for automated reconciliation.
            </li>
            <li>
              <strong>Government services</strong> use UPI for tax payments, utility bills
              and direct benefit transfers.
            </li>
          </ul>
          <p>
            The UPI ecosystem supports over <strong>500 member banks</strong> and dozens of
            consumer apps. The most popular include <strong>PhonePe</strong> (market leader
            with ~48% share), <strong>Google Pay</strong>, <strong>Paytm</strong>,
            <strong> BHIM</strong> (the government-backed reference app), <strong>Amazon
            Pay</strong>, <strong>Cred</strong> and banking apps from SBI, HDFC, ICICI and
            every major Indian bank.
          </p>
          <p>
            UPI has also begun expanding internationally. Indian travellers can now use UPI
            in Singapore, UAE, France, Mauritius, Nepal and several other countries — making
            it one of the most globally connected payment systems alongside the EU&apos;s
            SEPA and China&apos;s Alipay.
          </p>
          <p>
            Generating a UPI QR code with QRPayHub is free, instant and requires no
            registration. Simply enter a valid UPI ID, recipient name and optional amount —
            the QR code is generated client-side in your browser and can be downloaded as a
            PNG or shared as a UPI deep link.
          </p>
        </div>
      </section>

      {/* ── Sub-page Links ───────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          UPI Tools
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
                  className="block bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-orange-100 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <SubPageCardInner icon={icon} title={title} desc={desc} />
                </Link>
              )}
            </div>
          ))}
        </div>
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
