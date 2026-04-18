import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import SwissQRGenerator from '@/components/generators/SwissQRGenerator';
import Breadcrumb from '@/components/ui/Breadcrumb';

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
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Swiss QR Code', href: '/swiss-qr' },
          { label: 'Generator' },
        ]}
      />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#FF0000' }}
        >
          <span className="fi fi-ch" style={{ width: '2.5rem', height: '1.875rem', display: 'inline-block', backgroundSize: 'cover', borderRadius: '3px' }} />
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
