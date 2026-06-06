import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import QRISGenerator from '@/components/generators/QRISGenerator';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'QRIS Generator – Free Indonesian QR Payment Code | QRPayHub',
    description:
      'Generate QRIS QR codes for Indonesian payments. Compatible with GoPay, OVO, Dana, LinkAja, ShopeePay and all QRIS-enabled banking apps.',
    keywords: [
      'qris generator',
      'qris qr code',
      'indonesia qr payment',
      'bank indonesia qris',
      'gopay qr',
      'ovo qr',
      'dana qr',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/qris/generator'),
  };
}

export default function QRISGeneratorPage({
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
          { label: 'QRIS', href: '/qris' },
          { label: 'Generator' },
        ]}
      />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#E53E3E' }}
        >
          <span
            className="fi fi-id"
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
            🇮🇩 QRIS QR Code Generator
          </h1>
          <p className="mt-1 text-slate-500">
            Generate QRIS QR codes (EMV format) — compatible with GoPay, OVO, Dana, LinkAja,
            ShopeePay, BCA Mobile, Mandiri, BRI, BNI and all QRIS-enabled apps.
          </p>
        </div>
      </div>

      {/* ── Generator ────────────────────────────────────────────────────── */}
      <QRISGenerator />

      {/* ── Info Box ─────────────────────────────────────────────────────── */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-red-900 mb-2">
          About QRIS QR Codes
        </h3>
        <p className="text-sm text-red-700 leading-relaxed">
          QRIS QR Codes follow the <strong>EMV Merchant Presented Mode</strong> specification
          as adapted by <strong>Bank Indonesia (BI)</strong> for the national payment standard.
          The payload uses AID <code className="font-mono text-xs bg-red-100 px-1 rounded">ID.CO.QRIS.WWW</code>,
          currency code <code className="font-mono text-xs bg-red-100 px-1 rounded">360</code> (IDR),
          and a <strong>CRC16-CCITT</strong> checksum (last 4 characters). Static QR codes
          (no amount) use initiation method{' '}
          <code className="font-mono text-xs bg-red-100 px-1 rounded">11</code>; dynamic QR
          codes with a fixed amount use{' '}
          <code className="font-mono text-xs bg-red-100 px-1 rounded">12</code>.
          Compatible with all 50+ QRIS-member apps and 30+ million registered Indonesian merchants.
        </p>
      </div>
    </div>
  );
}
