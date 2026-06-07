import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import UPIGenerator from '@/components/generators/UPIGenerator';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE = 'UPI QR Code Generator – Free India | QRPayHub';
const DESCRIPTION =
  'Free UPI QR code generator for Indian payments. Compatible with PhonePe, Google Pay, Paytm and BHIM. Privacy-first – all generated in your browser. No registration.';

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'UPI Generator – QRPayHub',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Free UPI QR code generator. No registration required. Privacy-first – all data stays in your browser.',
  url: 'https://www.qrpayhub.com/en/upi/generator',
  featureList: ['Real-time QR code generation', 'Download as PNG', 'Copy to clipboard', 'Input validation', 'Free to use'],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to generate a UPI QR code',
  description: 'Generate a UPI QR payment code in 3 steps',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter payment details', text: 'Fill in the required payment information such as IBAN/account number and recipient name' },
    { '@type': 'HowToStep', position: 2, name: 'Generate QR code', text: 'The QR code is generated instantly in your browser – no data is sent to any server' },
    { '@type': 'HowToStep', position: 3, name: 'Download or copy', text: 'Download the QR code as PNG or copy it to your clipboard for use in invoices or documents' },
  ],
  tool: { '@type': 'HowToTool', name: 'QRPayHub Generator' },
  totalTime: 'PT1M',
};

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: TITLE,
    description: DESCRIPTION,
    keywords: ['upi qr code', 'upi payment', 'bhim qr', 'google pay qr', 'phonepe qr', 'paytm qr'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/upi/generator'),
    openGraph: buildOpenGraph(locale, '/upi/generator', TITLE, DESCRIPTION),
    twitter: buildTwitterCard(TITLE, DESCRIPTION),
  };
}

export default function UPIGeneratorPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script id="schema-software-upi" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <Script id="schema-howto-upi" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
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
          { label: 'UPI QR', href: '/upi' },
          { label: 'Generator' },
        ]}
      />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#FF6B00' }}
        >
          <span className="fi fi-in" style={{ width: '2.5rem', height: '1.875rem', display: 'inline-block', backgroundSize: 'cover', borderRadius: '3px' }} />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            UPI QR Code Generator
          </h1>
          <p className="mt-1 text-slate-500">
            Generate UPI payment QR codes — works with PhonePe, Google Pay, Paytm, BHIM and all UPI apps.
          </p>
        </div>
      </div>

      {/* ── Generator ────────────────────────────────────────────────────── */}
      <UPIGenerator />

      {/* ── Info Box ─────────────────────────────────────────────────────── */}
      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-orange-900 mb-2">
          About UPI QR Codes
        </h3>
        <p className="text-sm text-orange-700 leading-relaxed">
          UPI (Unified Payments Interface) is India&apos;s real-time payment system developed by
          NPCI (National Payments Corporation of India). A UPI QR code encodes a standard
          deep link (<code className="font-mono text-xs bg-orange-100 px-1 rounded">upi://pay?...</code>)
          that any UPI-enabled app can scan to pre-fill payment details. Over 350 million
          Indians use UPI monthly across 500+ member banks.
        </p>
      </div>
    </div>
  );
}
