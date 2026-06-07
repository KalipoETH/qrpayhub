import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import PayNowGenerator from '@/components/generators/PayNowGenerator';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE = 'PayNow QR Generator – Free Singapore | QRPayHub';
const DESCRIPTION =
  'Free PayNow QR code generator for Singapore payments. Compatible with DBS PayLah!, OCBC, UOB Mighty and GrabPay. Privacy-first – no data stored. No registration.';

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PayNow Generator – QRPayHub',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Free PayNow QR code generator. No registration required. Privacy-first – all data stays in your browser.',
  url: 'https://www.qrpayhub.com/en/paynow/generator',
  featureList: ['Real-time QR code generation', 'Download as PNG', 'Copy to clipboard', 'Input validation', 'Free to use'],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to generate a PayNow QR code',
  description: 'Generate a PayNow QR payment code in 3 steps',
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
    keywords: ['paynow qr generator', 'paynow qr code', 'singapore qr payment', 'sgqr generator', 'dbs paylah qr', 'ocbc qr', 'grabpay singapore qr'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/paynow/generator'),
    openGraph: buildOpenGraph(locale, '/paynow/generator', TITLE, DESCRIPTION),
    twitter: buildTwitterCard(TITLE, DESCRIPTION),
  };
}

export default function PayNowGeneratorPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script id="schema-software-paynow" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <Script id="schema-howto-paynow" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
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
          { label: 'PayNow', href: '/paynow' },
          { label: 'Generator' },
        ]}
      />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#EF4444' }}
        >
          <span
            className="fi fi-sg"
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
            🇸🇬 PayNow QR Code Generator
          </h1>
          <p className="mt-1 text-slate-500">
            Generate PayNow QR codes (EMV format) — compatible with DBS PayLah!, OCBC Pay Anyone,
            UOB Mighty, Standard Chartered, Citibank, GrabPay, Singtel Dash and all PayNow-enabled apps.
          </p>
        </div>
      </div>

      {/* ── Generator ────────────────────────────────────────────────────── */}
      <PayNowGenerator />

      {/* ── Info Box ─────────────────────────────────────────────────────── */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-red-900 mb-2">
          About PayNow QR Codes
        </h3>
        <p className="text-sm text-red-700 leading-relaxed">
          PayNow QR Codes follow the <strong>EMV Merchant Presented Mode</strong> specification
          as defined by <strong>MAS (Monetary Authority of Singapore)</strong> and the
          Association of Banks in Singapore (ABS). The payload uses AID{' '}
          <code className="font-mono text-xs bg-red-100 px-1 rounded">SG.PAYNOW</code>,
          currency code{' '}
          <code className="font-mono text-xs bg-red-100 px-1 rounded">702</code>{' '}
          (SGD), and a <strong>CRC16-CCITT</strong> checksum. Supports mobile numbers,
          UEN (business) and NRIC/FIN identifiers. The &ldquo;editable&rdquo; flag allows
          payers to modify the amount before confirming payment.
        </p>
      </div>
    </div>
  );
}
