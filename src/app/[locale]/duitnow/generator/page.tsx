import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import DuitNowGenerator from '@/components/generators/DuitNowGenerator';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE = 'DuitNow QR Generator – Free Malaysia | QRPayHub';
const DESCRIPTION =
  'Free DuitNow QR code generator for Malaysian payments. Compatible with Maybank2u, CIMB, Touch\'n Go, Boost and all DuitNow-enabled apps. No registration needed.';

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'DuitNow Generator – QRPayHub',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Free DuitNow QR code generator. No registration required. Privacy-first – all data stays in your browser.',
  url: 'https://www.qrpayhub.com/en/duitnow/generator',
  featureList: ['Real-time QR code generation', 'Download as PNG', 'Copy to clipboard', 'Input validation', 'Free to use'],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to generate a DuitNow QR code',
  description: 'Generate a DuitNow QR payment code in 3 steps',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter payment details', text: 'Fill in the required payment information such as IBAN/account number and recipient name' },
    { '@type': 'HowToStep', position: 2, name: 'Generate QR code', text: 'The QR code is generated instantly in your browser – no data is sent to any server' },
    { '@type': 'HowToStep', position: 3, name: 'Download or copy', text: 'Download the QR code as PNG or copy it to your clipboard for use in invoices or documents' },
  ],
  tool: { '@type': 'HowToTool', name: 'QRPayHub Generator' },
  totalTime: 'PT1M',
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  return {
    title: TITLE,
    description: DESCRIPTION,
    keywords: ['duitnow qr generator', 'duitnow qr code', 'malaysia qr payment', 'paynet malaysia', 'maybank qr', 'touch n go qr', 'boost qr'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/duitnow/generator'),
    openGraph: buildOpenGraph(locale, '/duitnow/generator', TITLE, DESCRIPTION),
    twitter: buildTwitterCard(TITLE, DESCRIPTION),
  };
}

export default function DuitNowGeneratorPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script id="schema-software-duitnow" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <Script id="schema-howto-duitnow" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <PageContent />
    </>
  );
}

function PageContent() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'DuitNow', href: '/duitnow' },
          { label: 'Generator' },
        ]}
      />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#CC0001' }}
        >
          <span
            className="fi fi-my"
            style={{
              width: '2.5rem',
              height: '1.875rem',
              display: 'inline-block',
              backgroundSize: 'cover',
              borderRadius: '3px',
            }}
          />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            🇲🇾 DuitNow QR Code Generator
          </h1>
          <p className="mt-1 text-slate-500">
            Generate DuitNow QR codes (EMV format) — compatible with Maybank2u, CIMB Clicks,
            Public Bank, RHB, Hong Leong, Touch&apos;n Go, Boost, GrabPay and all DuitNow-enabled apps.
          </p>
        </div>
      </div>

      {/* ── Generator ────────────────────────────────────────────────────── */}
      <DuitNowGenerator />

      {/* ── Info Box ─────────────────────────────────────────────────────── */}
      <div className="rounded-2xl p-5 border" style={{ backgroundColor: '#fff5f5', borderColor: '#fecaca' }}>
        <h3 className="text-sm font-semibold mb-2" style={{ color: '#7f1d1d' }}>
          About DuitNow QR Codes
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#991b1b' }}>
          DuitNow QR Codes follow the <strong>EMV Merchant Presented Mode</strong> specification
          as defined by <strong>Payments Network Malaysia (PayNet)</strong>. The payload uses
          AID{' '}
          <code className="font-mono text-xs px-1 rounded" style={{ backgroundColor: '#fee2e2' }}>
            A000000693010011
          </code>
          , currency code{' '}
          <code className="font-mono text-xs px-1 rounded" style={{ backgroundColor: '#fee2e2' }}>
            458
          </code>{' '}
          (MYR), and a <strong>CRC16-CCITT</strong> checksum. Supported proxy types: mobile
          number, MyKad IC, passport, ROC/ROB business number, and others.
        </p>
      </div>
    </div>
  );
}
