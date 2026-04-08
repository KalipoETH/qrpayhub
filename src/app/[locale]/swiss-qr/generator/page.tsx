import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import SwissQRGenerator from '@/components/generators/SwissQRGenerator';

export const metadata: Metadata = {
  title: 'Swiss QR Code Generator – Free | QRPayHub',
  description:
    'Generate Swiss QR Codes (QR-Rechnung) for free. Compatible with all Swiss banks. Supports CHF and EUR.',
  keywords: ['swiss qr code', 'qr rechnung', 'swiss qr generator', 'qr-bill', 'swiss payment'],
};

export default function SwissQRGeneratorPage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  return <PageContent />;
}

function PageContent() {
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
            <Link href="/swiss-qr" className="hover:text-slate-600 transition-colors">
              Swiss QR Code
            </Link>
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
          style={{ backgroundColor: '#FF0000' }}
        >
          🇨🇭
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
