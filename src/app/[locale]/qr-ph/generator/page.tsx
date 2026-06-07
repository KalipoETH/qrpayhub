import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import QRPhGenerator from '@/components/generators/QRPhGenerator';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE = 'QR Ph Generator – Free Philippines | QRPayHub';
const DESCRIPTION =
  'Free QR Ph code generator for Philippine payments. Compatible with GCash, Maya, BDO, BPI and all InstaPay-enabled apps. Privacy-first – no data stored.';

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'QR Ph Generator – QRPayHub',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Free QR Ph code generator. No registration required. Privacy-first – all data stays in your browser.',
  url: 'https://www.qrpayhub.com/en/qr-ph/generator',
  featureList: ['Real-time QR code generation', 'Download as PNG', 'Copy to clipboard', 'Input validation', 'Free to use'],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to generate a QR Ph code',
  description: 'Generate a QR Ph payment code in 3 steps',
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
    keywords: ['qr ph generator', 'philippines qr code', 'instapay qr', 'gcash qr generator', 'bsp qr'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/qr-ph/generator'),
    openGraph: buildOpenGraph(locale, '/qr-ph/generator', TITLE, DESCRIPTION),
    twitter: buildTwitterCard(TITLE, DESCRIPTION),
  };
}

export default function QRPhGeneratorPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script id="schema-software-qr-ph" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <Script id="schema-howto-qr-ph" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
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
          { label: 'QR Ph', href: '/qr-ph' },
          { label: 'Generator' },
        ]}
      />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#0038A8' }}
        >
          <span className="fi fi-ph" style={{ width: '2.5rem', height: '1.875rem', display: 'inline-block', backgroundSize: 'cover', borderRadius: '3px' }} />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            QR Ph Generator
          </h1>
          <p className="mt-1 text-slate-500">
            Generate QR Ph codes (EMV format) — compatible with GCash, Maya, BDO, BPI and all InstaPay-enabled apps.
          </p>
        </div>
      </div>

      {/* ── Generator ────────────────────────────────────────────────────── */}
      <QRPhGenerator />

      {/* ── Info Box ─────────────────────────────────────────────────────── */}
      <div className="rounded-2xl p-5" style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
        <h3 className="text-sm font-semibold mb-2" style={{ color: '#1E3A5F' }}>
          About QR Ph Codes
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#1D4ED8' }}>
          QR Ph codes follow the <strong>EMV Merchant Presented Mode</strong> specification with the
          BSP Application ID{' '}
          <code className="font-mono text-xs bg-blue-100 px-1 rounded">PH.INSTAPAY.ME</code>.
          Mobile numbers are normalised to{' '}
          <code className="font-mono text-xs bg-blue-100 px-1 rounded">+63XXXXXXXXXX</code> format.
          The payload is validated with a <strong>CRC16-CCITT checksum</strong> (last 4 characters).
          Static codes have no fixed amount; adding an amount sets the Point of Initiation from{' '}
          <code className="font-mono text-xs bg-blue-100 px-1 rounded">11</code> to{' '}
          <code className="font-mono text-xs bg-blue-100 px-1 rounded">12</code>.
          Compatible with GCash, Maya (PayMaya), BDO, BPI, UnionBank, Metrobank, Landbank
          and any other InstaPay-enabled app.
        </p>
      </div>

    </div>
  );
}
