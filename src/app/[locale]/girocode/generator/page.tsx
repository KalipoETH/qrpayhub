import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import GiroCodeGenerator from '@/components/generators/GiroCodeGenerator';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE = 'GiroCode Generator – Free SEPA QR Code | QRPayHub';
const DESCRIPTION =
  'Free GiroCode (EPC QR) generator for SEPA transfers. No registration, no data stored – all generated instantly in your browser. Compatible with all 36 SEPA countries.';

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'GiroCode Generator – QRPayHub',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Free GiroCode QR code generator. No registration required. Privacy-first – all data stays in your browser.',
  url: 'https://www.qrpayhub.com/en/girocode/generator',
  featureList: ['Real-time QR code generation', 'Download as PNG', 'Copy to clipboard', 'Input validation', 'Free to use'],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to generate a GiroCode QR code',
  description: 'Generate a GiroCode (EPC QR) payment code in 3 steps',
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
    keywords: ['girocode', 'epc qr code', 'sepa qr', 'girocode generator'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/girocode/generator'),
    openGraph: buildOpenGraph(locale, '/girocode/generator', TITLE, DESCRIPTION),
    twitter: buildTwitterCard(TITLE, DESCRIPTION),
  };
}

export default function GiroCodeGeneratorPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  return (
    <>
      <Script id="schema-software-girocode" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <Script id="schema-howto-girocode" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <PageContent />
    </>
  );
}

function PageContent() {
  const t = useTranslations('girocode');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'GiroCode', href: '/girocode' },
          { label: 'Generator' },
        ]}
      />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#003399' }}
        >
          <span className="fi fi-eu" style={{ width: '2.5rem', height: '1.875rem', display: 'inline-block', backgroundSize: 'cover', borderRadius: '3px' }} />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {t('title')}
          </h1>
          <p className="mt-1 text-slate-500">
            {t('description')}
          </p>
        </div>
      </div>

      {/* ── Generator ────────────────────────────────────────────────────── */}
      <GiroCodeGenerator />

      {/* ── Info Box ─────────────────────────────────────────────────────── */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">
          About GiroCode / EPC QR
        </h3>
        <p className="text-sm text-blue-700 leading-relaxed">
          The GiroCode (EPC QR Code) is the European standard for QR-based bank transfers,
          defined in the EPC069-12 specification. It is supported by all major European
          banks and payment apps across 20+ SEPA countries. When scanned, banking apps
          automatically pre-fill the recipient, IBAN, amount and reference — no manual
          entry required.
        </p>
      </div>

      {/* ── Invoice Banner ───────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 bg-sky-50 border border-sky-200 rounded-xl px-5 py-3.5">
        <svg
          className="w-5 h-5 text-sky-600 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-sm text-sky-800">
          Need a full invoice PDF with GiroCode?{' '}
          <a
            href="https://www.girocodegenerator.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2 hover:text-sky-950 transition-colors"
          >
            Try girocodegenerator.com →
          </a>
        </p>
      </div>
    </div>
  );
}
