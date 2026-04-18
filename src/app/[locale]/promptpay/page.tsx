import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SubPageGrid from '@/components/ui/SubPageGrid';
import type { SubPage } from '@/components/ui/SubPageGrid';

export const metadata: Metadata = {
  title: "PromptPay QR Code Generator – Free | QRPayHub",
  description:
    "Generate PromptPay QR codes for Thai payments. Compatible with all Thai banks. Supports phone and National ID.",
  keywords: ['promptpay qr', 'promptpay generator', 'thai payment qr', 'พร้อมเพย์', 'thailand qr code'],
};

const QUICK_FACTS = [
  { icon: '👥', value: '55M+',     label: 'Active Users' },
  { icon: '🏦', value: 'All Thai', label: 'Banks Supported' },
  { icon: '⚡', value: 'Instant',  label: 'Transfer Speed' },
  { icon: '📅', value: 'Since 2017', label: 'Established' },
];

const SUB_PAGES: SubPage[] = [
  {
    icon: '⚡',
    title: 'PromptPay QR Generator',
    description: 'Create PromptPay QR codes instantly — works with all Thai banking apps',
    href: '/promptpay/generator',
  },
  {
    icon: '📖',
    title: 'Technical Guide',
    description: 'EMV TLV payload spec, CRC16, key types, Bank of Thailand documentation',
    href: '/promptpay/guide',
  },
  {
    icon: '❓',
    title: 'FAQ',
    description: 'All questions about PromptPay QR codes answered',
    href: '/promptpay/faq',
  },
];

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: "PromptPay – Thailand's National Payment System",
  description:
    "Generate PromptPay QR codes for Thai payments. Compatible with all Thai banks.",
  url: 'https://qrpayhub.com/en/promptpay',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'PromptPay QR', item: 'https://qrpayhub.com/en/promptpay' },
    ],
  },
};

export default function PromptPayHubPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script
        id="json-ld-promptpay-hub"
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
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full border border-blue-200">
          <span className="fi fi-th" style={{ width: '1.2em', height: '0.9em', display: 'inline-block', backgroundSize: 'cover', borderRadius: '2px', verticalAlign: 'middle' }} /> Thai Payment Standard
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          PromptPay – Thailand&apos;s National Payment System
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
          55 million Thais use PromptPay for instant transfers — link your bank account to
          a phone number or National ID, and receive payments from any Thai bank app.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/promptpay/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#1A56DB' }}
          >
            Generate PromptPay QR →
          </Link>
          <a
            href="#what-is-promptpay"
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

      {/* ── What is PromptPay ────────────────────────────────────────────── */}
      <section id="what-is-promptpay" className="space-y-6 scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          What is PromptPay?
        </h2>
        <div className="prose prose-slate max-w-none space-y-4 text-slate-600 leading-relaxed">
          <p>
            <strong>PromptPay</strong> (พร้อมเพย์) is Thailand&apos;s national instant
            payment infrastructure, jointly developed by the{' '}
            <strong>Bank of Thailand (BOT)</strong> and the{' '}
            <strong>Thai Bankers&apos; Association (TBA)</strong>. Launched in January 2017
            as part of the government&apos;s National e-Payment Master Plan, PromptPay
            fundamentally changed how Thais send and receive money — replacing slow
            inter-bank transfers with a system that settles in under five seconds, around
            the clock, every day of the year.
          </p>
          <p>
            The core idea is deceptively simple: instead of sharing a bank account number
            and branch code, a recipient registers a <strong>PromptPay ID</strong> —
            either a Thai mobile phone number or a 13-digit National ID (บัตรประชาชน) —
            and links it to their bank account. Businesses can register a tax ID (เลขนิติบุคคล)
            instead. The sender only needs to know the PromptPay ID to push money directly
            to any linked account, regardless of which of the 30+ participating banks holds
            the account.
          </p>
          <p>
            A <strong>PromptPay QR Code</strong> encodes the payment information using the
            same <strong>EMV Merchant Presented Mode (MPM)</strong> standard used by
            systems like PIX (Brazil) and QRIS (Indonesia). The payload is a TLV
            (Tag-Length-Value) encoded string anchored to the PromptPay AID
            (<code className="font-mono text-xs bg-slate-100 px-1 rounded">A000000677010111</code>)
            and protected by a <strong>CRC16-CCITT checksum</strong>. Thai banking apps
            parse and verify this checksum before processing a payment.
          </p>
          <p>
            <strong>Who uses PromptPay?</strong> Virtually every person and business in
            Thailand:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Street vendors and market traders</strong> display a printed
              PromptPay QR code — customers scan and pay instantly without cash or card
              terminals.
            </li>
            <li>
              <strong>Hotels and tour operators</strong> accept PromptPay for deposits and
              full payments from both Thai and international visitors whose banks participate
              in SWIFT PromptPay linkages.
            </li>
            <li>
              <strong>Freelancers and sole traders</strong> share their PromptPay QR on
              invoices, Line messages and social media to collect payments in seconds.
            </li>
            <li>
              <strong>E-commerce platforms</strong> (Lazada, Shopee TH, LINE Shopping)
              offer PromptPay at checkout for frictionless one-scan payment.
            </li>
            <li>
              <strong>Government disbursements</strong> — welfare transfers, tax refunds,
              COVID-19 relief payments — were distributed via PromptPay to millions of
              recipients registered with their National ID.
            </li>
          </ul>
          <p>
            PromptPay is free for consumers. Businesses pay a very small per-transaction
            fee (typically ฿1–2 per transaction regardless of amount), making it far
            cheaper than card acceptance. There are no monthly fees, no hardware
            requirements and no merchant account needed — just a bank account linked to a
            PromptPay ID.
          </p>
          <p>
            QRPayHub&apos;s PromptPay generator produces fully spec-compliant EMV payloads
            with the CRC16 checksum computed client-side in your browser — free, instant
            and without any server-side processing or data collection.
          </p>
        </div>
      </section>

      {/* ── Sub-page Links ───────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          PromptPay Tools
        </h2>
        <SubPageGrid pages={SUB_PAGES} />
      </section>

    </div>
  );
}
