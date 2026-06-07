import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import PIXGenerator from '@/components/generators/PIXGenerator';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE = 'PIX QR Code Generator – Free Brazil | QRPayHub';
const DESCRIPTION =
  'Free PIX QR code generator for Brazilian payments. Compatible with Nubank, Itaú, Bradesco and all 700+ PIX institutions. Privacy-first – no data stored.';

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PIX Generator – QRPayHub',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Free PIX QR code generator. No registration required. Privacy-first – all data stays in your browser.',
  url: 'https://www.qrpayhub.com/en/pix/generator',
  featureList: ['Real-time QR code generation', 'Download as PNG', 'Copy to clipboard', 'Input validation', 'Free to use'],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to generate a PIX QR code',
  description: 'Generate a PIX QR payment code in 3 steps',
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
    keywords: ['pix qr code', 'pix pagamento', 'gerador pix qr', 'qr code pix', 'banco central pix'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/pix/generator'),
    openGraph: buildOpenGraph(locale, '/pix/generator', TITLE, DESCRIPTION),
    twitter: buildTwitterCard(TITLE, DESCRIPTION),
  };
}

export default function PIXGeneratorPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script id="schema-software-pix" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <Script id="schema-howto-pix" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
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
          { label: 'PIX QR', href: '/pix' },
          { label: 'Generator' },
        ]}
      />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#00B894' }}
        >
          <span className="fi fi-br" style={{ width: '2.5rem', height: '1.875rem', display: 'inline-block', backgroundSize: 'cover', borderRadius: '3px' }} />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            PIX QR Code Generator
          </h1>
          <p className="mt-1 text-slate-500">
            Generate PIX QR codes (EMV format) — compatible with all Brazilian banks and payment apps.
          </p>
        </div>
      </div>

      {/* ── Generator ────────────────────────────────────────────────────── */}
      <PIXGenerator />

      {/* ── Info Box ─────────────────────────────────────────────────────── */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-emerald-900 mb-2">
          About PIX QR Codes
        </h3>
        <p className="text-sm text-emerald-700 leading-relaxed">
          PIX QR Codes follow the <strong>EMV Merchant Presented Mode</strong> specification
          as defined by the Banco Central do Brasil (BCB). The payload is a TLV-encoded
          string with a CRC16-CCITT checksum (last 4 characters). Static QR codes have no
          fixed amount; dynamic QR codes include the amount and change Point of Initiation
          from <code className="font-mono text-xs bg-emerald-100 px-1 rounded">11</code> to{' '}
          <code className="font-mono text-xs bg-emerald-100 px-1 rounded">12</code>.
          Compatible with Nubank, Itaú, Bradesco, Banco do Brasil, Caixa, PicPay,
          Mercado Pago, and all 700+ PIX member institutions.
        </p>
      </div>
    </div>
  );
}
