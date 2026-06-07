import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import VietQRGenerator from '@/components/generators/VietQRGenerator';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE = 'VietQR Generator – Free Vietnam Bank Transfer | QRPayHub';
const DESCRIPTION =
  'Free VietQR code generator for Vietnamese bank transfers. Compatible with Vietcombank, BIDV, Techcombank, MB Bank and all VietQR-enabled banks. No registration needed.';

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'VietQR Generator – QRPayHub',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Free VietQR code generator. No registration required. Privacy-first – all data stays in your browser.',
  url: 'https://www.qrpayhub.com/en/vietqr/generator',
  featureList: ['Real-time QR code generation', 'Download as PNG', 'Copy to clipboard', 'Input validation', 'Free to use'],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to generate a VietQR code',
  description: 'Generate a VietQR payment code in 3 steps',
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
    keywords: ['vietqr generator', 'vietqr code', 'vietnam qr payment', 'napas qr', 'vietcombank qr', 'bidv qr', 'momo qr vietnam'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/vietqr/generator'),
    openGraph: buildOpenGraph(locale, '/vietqr/generator', TITLE, DESCRIPTION),
    twitter: buildTwitterCard(TITLE, DESCRIPTION),
  };
}

export default function VietQRGeneratorPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script id="schema-software-vietqr" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <Script id="schema-howto-vietqr" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
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
          { label: 'VietQR', href: '/vietqr' },
          { label: 'Generator' },
        ]}
      />

      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#DA251D' }}
        >
          <span
            className="fi fi-vn"
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
            🇻🇳 VietQR Code Generator
          </h1>
          <p className="mt-1 text-slate-500">
            Generate VietQR codes (EMV format) — compatible with Vietcombank, BIDV,
            Agribank, Techcombank, MB Bank, VNPay, MoMo and all VietQR-enabled apps.
          </p>
        </div>
      </div>

      <VietQRGenerator />

      <div className="rounded-2xl p-5 border" style={{ backgroundColor: '#fff5f5', borderColor: '#fca5a5' }}>
        <h3 className="text-sm font-semibold mb-2" style={{ color: '#7f1d1d' }}>
          About VietQR Codes
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#991b1b' }}>
          VietQR codes follow the <strong>EMV Merchant Presented Mode</strong> specification
          as defined by <strong>NAPAS (National Payment Corporation of Vietnam)</strong>.
          The payload uses AID{' '}
          <code className="font-mono text-xs px-1 rounded" style={{ backgroundColor: '#fee2e2' }}>
            A000000727
          </code>
          , currency code{' '}
          <code className="font-mono text-xs px-1 rounded" style={{ backgroundColor: '#fee2e2' }}>
            704
          </code>{' '}
          (VND — Vietnamese Đồng), and a <strong>CRC16-CCITT</strong> checksum.
          VND has no decimal subdivision — all amounts are whole đồng only.
          Account names should be entered in <strong>UPPERCASE without Vietnamese diacritics</strong>.
        </p>
      </div>
    </div>
  );
}
