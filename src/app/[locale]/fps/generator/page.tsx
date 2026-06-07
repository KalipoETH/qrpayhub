import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import FPSGenerator from '@/components/generators/FPSGenerator';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE = 'FPS QR Generator – Free Hong Kong | QRPayHub';
const DESCRIPTION =
  'Free FPS QR code generator for Hong Kong payments. Supports HKD and CNY. Compatible with HSBC HK, Hang Seng, PayMe and AlipayHK. No registration needed.';

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'FPS Generator – QRPayHub',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Free FPS QR code generator. No registration required. Privacy-first – all data stays in your browser.',
  url: 'https://www.qrpayhub.com/en/fps/generator',
  featureList: ['Real-time QR code generation', 'Download as PNG', 'Copy to clipboard', 'Input validation', 'Free to use'],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to generate an FPS QR code',
  description: 'Generate an FPS QR payment code in 3 steps',
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
    keywords: ['fps qr generator', 'fps qr code', 'hong kong qr payment', 'hkma fps', 'payme qr', 'hsbc hk qr', 'alipayhk qr'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/fps/generator'),
    openGraph: buildOpenGraph(locale, '/fps/generator', TITLE, DESCRIPTION),
    twitter: buildTwitterCard(TITLE, DESCRIPTION),
  };
}

export default function FPSGeneratorPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script id="schema-software-fps" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <Script id="schema-howto-fps" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <PageContent />
    </>
  );
}

function PageContent() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'FPS', href: '/fps' },
          { label: 'Generator' },
        ]}
      />

      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#BA0C2F' }}
        >
          <span
            className="fi fi-hk"
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
            🇭🇰 FPS QR Code Generator
          </h1>
          <p className="mt-1 text-slate-500">
            Generate FPS QR codes (EMV format) — compatible with HSBC HK, Hang Seng,
            Bank of China HK, Standard Chartered HK, DBS HK, PayMe, AlipayHK,
            WeChat Pay HK and all FPS-enabled apps.
          </p>
        </div>
      </div>

      <FPSGenerator />

      <div className="rounded-2xl p-5 border" style={{ backgroundColor: '#fdf2f4', borderColor: '#fca5a5' }}>
        <h3 className="text-sm font-semibold mb-2" style={{ color: '#7f1d1d' }}>
          About FPS QR Codes
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#991b1b' }}>
          FPS QR Codes follow the <strong>EMV Merchant Presented Mode</strong> specification
          as defined by <strong>HKMA (Hong Kong Monetary Authority)</strong>. The payload uses
          AID{' '}
          <code className="font-mono text-xs px-1 rounded" style={{ backgroundColor: '#fee2e2' }}>
            hk.edu.hkma.fps
          </code>
          {' '}and supports both{' '}
          <strong>HKD</strong> (currency code{' '}
          <code className="font-mono text-xs px-1 rounded" style={{ backgroundColor: '#fee2e2' }}>344</code>)
          {' '}and{' '}
          <strong>CNY</strong> (currency code{' '}
          <code className="font-mono text-xs px-1 rounded" style={{ backgroundColor: '#fee2e2' }}>156</code>).
          Supports mobile numbers (+852), email addresses and numeric FPS IDs.
        </p>
      </div>
    </div>
  );
}
