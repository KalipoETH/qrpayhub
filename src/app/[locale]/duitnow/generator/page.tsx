import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import DuitNowGenerator from '@/components/generators/DuitNowGenerator';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'DuitNow QR Generator – Free | QRPayHub',
    description:
      'Generate DuitNow QR codes for Malaysian payments. Compatible with Maybank2u, CIMB Clicks, Public Bank, RHB, Touch\'n Go, Boost, GrabPay and all DuitNow-enabled apps.',
    keywords: [
      'duitnow qr generator',
      'duitnow qr code',
      'malaysia qr payment',
      'paynet malaysia',
      'maybank qr',
      'touch n go qr',
      'boost qr',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/duitnow/generator'),
  };
}

export default function DuitNowGeneratorPage({
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
          { label: 'DuitNow', href: '/duitnow' },
          { label: 'Generator' },
        ]}
      />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#CC0001' }}
        >
          <span
            className="fi fi-my"
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
            🇲🇾 DuitNow QR Code Generator
          </h1>
          <p className="mt-1 text-slate-500">
            Generate DuitNow QR codes (EMV format) — compatible with Maybank2u, CIMB Clicks,
            Public Bank, RHB, Hong Leong, Touch&apos;n Go, Boost, GrabPay and all DuitNow-enabled apps.
          </p>
        </div>
      </div>

      {/* ── Generator ────────────────────────────────────────────────────── */}
      <DuitNowGenerator />

      {/* ── Info Box ─────────────────────────────────────────────────────── */}
      <div className="rounded-2xl p-5 border" style={{ backgroundColor: '#fff5f5', borderColor: '#fecaca' }}>
        <h3 className="text-sm font-semibold mb-2" style={{ color: '#7f1d1d' }}>
          About DuitNow QR Codes
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#991b1b' }}>
          DuitNow QR Codes follow the <strong>EMV Merchant Presented Mode</strong> specification
          as defined by <strong>Payments Network Malaysia (PayNet)</strong>. The payload uses
          AID{' '}
          <code className="font-mono text-xs px-1 rounded" style={{ backgroundColor: '#fee2e2' }}>
            A000000693010011
          </code>
          , currency code{' '}
          <code className="font-mono text-xs px-1 rounded" style={{ backgroundColor: '#fee2e2' }}>
            458
          </code>{' '}
          (MYR), and a <strong>CRC16-CCITT</strong> checksum. Supported proxy types: mobile
          number, MyKad IC, passport, ROC/ROB business number, and others.
        </p>
      </div>
    </div>
  );
}
