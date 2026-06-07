import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import SwissQRGenerator from '@/components/generators/SwissQRGenerator';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE = 'Swiss QR Code Generator – Free QR-Rechnung | QRPayHub';
const DESCRIPTION =
  'Free Swiss QR Code (QR-Rechnung) generator. Create Swiss payment QR codes for CHF and EUR instantly. Compatible with all Swiss banks. No registration needed.';

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Swiss QR Generator – QRPayHub',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Free Swiss QR Code generator. No registration required. Privacy-first – all data stays in your browser.',
  url: 'https://www.qrpayhub.com/en/swiss-qr/generator',
  featureList: ['Real-time QR code generation', 'Download as PNG', 'Copy to clipboard', 'Input validation', 'Free to use'],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to generate a Swiss QR Code',
  description: 'Generate a Swiss QR Code (QR-Rechnung) in 3 steps',
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
    keywords: ['swiss qr code', 'qr rechnung', 'swiss qr generator', 'qr-bill', 'swiss payment'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/swiss-qr/generator'),
    openGraph: buildOpenGraph(locale, '/swiss-qr/generator', TITLE, DESCRIPTION),
    twitter: buildTwitterCard(TITLE, DESCRIPTION),
  };
}

export default function SwissQRGeneratorPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script id="schema-software-swiss-qr" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <Script id="schema-howto-swiss-qr" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
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
          { label: 'Swiss QR Code', href: '/swiss-qr' },
          { label: 'Generator' },
        ]}
      />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#FF0000' }}
        >
          <span className="fi fi-ch" style={{ width: '2.5rem', height: '1.875rem', display: 'inline-block', backgroundSize: 'cover', borderRadius: '3px' }} />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Swiss QR Code Generator
          </h1>
          <p className="mt-1 text-slate-500">
            Generate Swiss QR Codes (QR-Rechnung) for invoices and payments — free, no registration.
          </p>
        </div>
      </div>

      {/* ── Generator ────────────────────────────────────────────────────── */}
      <SwissQRGenerator />

      {/* ── Info Box ─────────────────────────────────────────────────────── */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-red-900 mb-2">
          About Swiss QR Code (QR-Rechnung)
        </h3>
        <p className="text-sm text-red-700 leading-relaxed">
          The Swiss QR Code is the official Swiss payment standard, replacing the orange and
          red payment slips since 2020. It was developed by SIX Group and is mandatory for
          all Swiss invoices since October 2022. The QR code encodes all payment details
          (IBAN, amount, reference) and is read by all Swiss banking apps. For official
          invoices, the QR code must be placed on a standardized A4 payment slip (Zahlteil).
        </p>
      </div>
    </div>
  );
}
