import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import QRISGenerator from '@/components/generators/QRISGenerator';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE = 'QRIS Generator – Free Indonesian QR Payment Code | QRPayHub';
const DESCRIPTION =
  'Free QRIS QR code generator for Indonesian payments. Compatible with GoPay, OVO, Dana, LinkAja, ShopeePay and all QRIS-enabled apps. No registration needed.';

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'QRIS Generator – QRPayHub',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Free QRIS QR code generator. No registration required. Privacy-first – all data stays in your browser.',
  url: 'https://www.qrpayhub.com/en/qris/generator',
  featureList: ['Real-time QR code generation', 'Download as PNG', 'Copy to clipboard', 'Input validation', 'Free to use'],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to generate a QRIS QR code',
  description: 'Generate a QRIS QR payment code in 3 steps',
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
    keywords: ['qris generator', 'qris qr code', 'indonesia qr payment', 'bank indonesia qris', 'gopay qr', 'ovo qr', 'dana qr'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/qris/generator'),
    openGraph: buildOpenGraph(locale, '/qris/generator', TITLE, DESCRIPTION),
    twitter: buildTwitterCard(TITLE, DESCRIPTION),
  };
}

export default function QRISGeneratorPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script id="schema-software-qris" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <Script id="schema-howto-qris" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
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
          { label: 'QRIS', href: '/qris' },
          { label: 'Generator' },
        ]}
      />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#E53E3E' }}
        >
          <span
            className="fi fi-id"
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
            🇮🇩 QRIS QR Code Generator
          </h1>
          <p className="mt-1 text-slate-500">
            Generate QRIS QR codes (EMV format) — compatible with GoPay, OVO, Dana, LinkAja,
            ShopeePay, BCA Mobile, Mandiri, BRI, BNI and all QRIS-enabled apps.
          </p>
        </div>
      </div>

      {/* ── Generator ────────────────────────────────────────────────────── */}
      <QRISGenerator />

      {/* ── Info Box ─────────────────────────────────────────────────────── */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-red-900 mb-2">
          About QRIS QR Codes
        </h3>
        <p className="text-sm text-red-700 leading-relaxed">
          QRIS QR Codes follow the <strong>EMV Merchant Presented Mode</strong> specification
          as adapted by <strong>Bank Indonesia (BI)</strong> for the national payment standard.
          The payload uses AID <code className="font-mono text-xs bg-red-100 px-1 rounded">ID.CO.QRIS.WWW</code>,
          currency code <code className="font-mono text-xs bg-red-100 px-1 rounded">360</code> (IDR),
          and a <strong>CRC16-CCITT</strong> checksum (last 4 characters). Static QR codes
          (no amount) use initiation method{' '}
          <code className="font-mono text-xs bg-red-100 px-1 rounded">11</code>; dynamic QR
          codes with a fixed amount use{' '}
          <code className="font-mono text-xs bg-red-100 px-1 rounded">12</code>.
          Compatible with all 50+ QRIS-member apps and 30+ million registered Indonesian merchants.
        </p>
      </div>
    </div>
  );
}
