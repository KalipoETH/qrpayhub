import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import PromptPayGenerator from '@/components/generators/PromptPayGenerator';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE = 'PromptPay QR Code Generator – Free Thailand | QRPayHub';
const DESCRIPTION =
  'Free PromptPay QR code generator for Thai payments. Supports phone number and National ID. Compatible with all Thai banks and e-wallets. No registration needed.';

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PromptPay Generator – QRPayHub',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Free PromptPay QR code generator. No registration required. Privacy-first – all data stays in your browser.',
  url: 'https://www.qrpayhub.com/en/promptpay/generator',
  featureList: ['Real-time QR code generation', 'Download as PNG', 'Copy to clipboard', 'Input validation', 'Free to use'],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to generate a PromptPay QR code',
  description: 'Generate a PromptPay QR payment code in 3 steps',
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
    keywords: ['promptpay qr', 'promptpay generator', 'thai payment qr', 'พร้อมเพย์', 'thailand qr code'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/promptpay/generator'),
    openGraph: buildOpenGraph(locale, '/promptpay/generator', TITLE, DESCRIPTION),
    twitter: buildTwitterCard(TITLE, DESCRIPTION),
  };
}

export default function PromptPayGeneratorPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script id="schema-software-promptpay" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <Script id="schema-howto-promptpay" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
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
          { label: 'PromptPay QR', href: '/promptpay' },
          { label: 'Generator' },
        ]}
      />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#1A56DB' }}
        >
          <span className="fi fi-th" style={{ width: '2.5rem', height: '1.875rem', display: 'inline-block', backgroundSize: 'cover', borderRadius: '3px' }} />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            PromptPay QR Code Generator
          </h1>
          <p className="mt-1 text-slate-500">
            Generate PromptPay QR codes (EMV format) — compatible with all Thai banks and payment apps.
          </p>
        </div>
      </div>

      {/* ── Generator ────────────────────────────────────────────────────── */}
      <PromptPayGenerator />

      {/* ── Info Box ─────────────────────────────────────────────────────── */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">
          About PromptPay QR Codes
        </h3>
        <p className="text-sm text-blue-700 leading-relaxed">
          PromptPay QR Codes follow the <strong>EMV Merchant Presented Mode</strong>{' '}
          specification with the PromptPay AID{' '}
          <code className="font-mono text-xs bg-blue-100 px-1 rounded">A000000677010111</code>.
          Phone numbers are normalised to the{' '}
          <code className="font-mono text-xs bg-blue-100 px-1 rounded">0066XXXXXXXXX</code>{' '}
          format; National IDs and Tax IDs are passed through as 13 digits. The payload is
          validated with a CRC16-CCITT checksum (last 4 characters). Static QR codes have no
          fixed amount; adding an amount sets the Point of Initiation from{' '}
          <code className="font-mono text-xs bg-blue-100 px-1 rounded">11</code> to{' '}
          <code className="font-mono text-xs bg-blue-100 px-1 rounded">12</code>.
          Compatible with Bangkok Bank, Kasikorn (KBank), SCB, Krungthai, TMBThanachart (ttb),
          and all 30+ Thai PromptPay member institutions.
        </p>
      </div>

    </div>
  );
}
