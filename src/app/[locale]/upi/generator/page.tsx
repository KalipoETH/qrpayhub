import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import UPIGenerator from '@/components/generators/UPIGenerator';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'UPI QR Code Generator – Free | QRPayHub',
  description:
    'Generate UPI QR codes for Indian payments. Compatible with PhonePe, Google Pay, Paytm, BHIM and all UPI apps.',
  keywords: ['upi qr code', 'upi payment', 'bhim qr', 'google pay qr', 'phonepe qr', 'paytm qr'],
};

export default function UPIGeneratorPage({
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
          { label: 'UPI QR', href: '/upi' },
          { label: 'Generator' },
        ]}
      />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#FF6B00' }}
        >
          <span className="fi fi-in" style={{ width: '2.5rem', height: '1.875rem', display: 'inline-block', backgroundSize: 'cover', borderRadius: '3px' }} />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            UPI QR Code Generator
          </h1>
          <p className="mt-1 text-slate-500">
            Generate UPI payment QR codes — works with PhonePe, Google Pay, Paytm, BHIM and all UPI apps.
          </p>
        </div>
      </div>

      {/* ── Generator ────────────────────────────────────────────────────── */}
      <UPIGenerator />

      {/* ── Info Box ─────────────────────────────────────────────────────── */}
      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-orange-900 mb-2">
          About UPI QR Codes
        </h3>
        <p className="text-sm text-orange-700 leading-relaxed">
          UPI (Unified Payments Interface) is India&apos;s real-time payment system developed by
          NPCI (National Payments Corporation of India). A UPI QR code encodes a standard
          deep link (<code className="font-mono text-xs bg-orange-100 px-1 rounded">upi://pay?...</code>)
          that any UPI-enabled app can scan to pre-fill payment details. Over 350 million
          Indians use UPI monthly across 500+ member banks.
        </p>
      </div>
    </div>
  );
}
