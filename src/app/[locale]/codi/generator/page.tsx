import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import CoDiGenerator from '@/components/generators/CoDiGenerator';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE = 'CoDi QR Generator – Free Mexico | QRPayHub';
const DESCRIPTION =
  'Free CoDi QR code generator for Mexican SPEI payments. Compatible with BBVA México, Santander, Banorte and all CoDi-enabled banking apps. No registration.';

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CoDi Generator – QRPayHub',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Free CoDi QR code generator. No registration required. Privacy-first – all data stays in your browser.',
  url: 'https://www.qrpayhub.com/en/codi/generator',
  featureList: ['Real-time QR code generation', 'Download as PNG', 'Copy to clipboard', 'Input validation', 'Free to use'],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to generate a CoDi QR code',
  description: 'Generate a CoDi QR payment code in 3 steps',
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
    keywords: ['codi qr generator', 'mexico qr code', 'spei qr', 'clabe qr generator', 'cobro digital'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/codi/generator'),
    openGraph: buildOpenGraph(locale, '/codi/generator', TITLE, DESCRIPTION),
    twitter: buildTwitterCard(TITLE, DESCRIPTION),
  };
}

export default function CoDiGeneratorPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script id="schema-software-codi" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <Script id="schema-howto-codi" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
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
          { label: 'CoDi', href: '/codi' },
          { label: 'Generator' },
        ]}
      />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#006847' }}
        >
          <span className="fi fi-mx" style={{ width: '2.5rem', height: '1.875rem', display: 'inline-block', backgroundSize: 'cover', borderRadius: '3px' }} />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            CoDi QR Generator
          </h1>
          <p className="mt-1 text-slate-500">
            Generate CoDi QR codes (BXC/SPEI format) — compatible with BBVA México, Santander, Banorte and all CoDi-enabled apps.
          </p>
        </div>
      </div>

      {/* ── Generator ────────────────────────────────────────────────────── */}
      <CoDiGenerator />

      {/* ── Info Box ─────────────────────────────────────────────────────── */}
      <div className="rounded-2xl p-5" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
        <h3 className="text-sm font-semibold mb-2" style={{ color: '#14532D' }}>
          About CoDi QR Codes
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#166534' }}>
          CoDi QR codes use the{' '}
          <code className="font-mono text-xs bg-green-100 px-1 rounded">BXC://SPEI</code> URI format
          defined by Banxico. The payload encodes the recipient CLABE or mobile phone,
          the payment amount (always required for CoDi), a concept and a numeric reference — all
          URL-encoded as a SPEI transfer instruction. Settlement happens through{' '}
          <strong>SPEI</strong>, Mexico&apos;s 24/7 real-time interbank network.
          CLABE numbers are validated using the official Banxico weighted checksum algorithm.
          Compatible with BBVA México, Santander MX, Banorte, HSBC México, Citibanamex, Mercado Pago MX
          and any other CoDi-enabled banking app.
        </p>
      </div>

    </div>
  );
}
