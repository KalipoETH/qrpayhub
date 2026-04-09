import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import GiroCodeGenerator from '@/components/generators/GiroCodeGenerator';

export const metadata: Metadata = {
  title: 'GiroCode Generator – Free SEPA QR Code | QRPayHub',
  description:
    'Generate GiroCode (EPC QR) payment codes for free. Compatible with all European SEPA banks.',
  keywords: ['girocode', 'epc qr code', 'sepa qr', 'girocode generator'],
};

export default function GiroCodeGeneratorPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);

  return <PageContent />;
}

function PageContent() {
  const t = useTranslations('girocode');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 text-sm text-slate-400">
          <li>
            <Link href="/" className="hover:text-slate-600 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </li>
          <li>
            <span className="text-slate-600 font-medium">GiroCode</span>
          </li>
          <li>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </li>
          <li>
            <span className="text-slate-900 font-semibold">Generator</span>
          </li>
        </ol>
      </nav>

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm"
          style={{ backgroundColor: '#003399' }}
        >
          🇪🇺
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
