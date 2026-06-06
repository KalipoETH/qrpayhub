import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import CoDiGenerator from '@/components/generators/CoDiGenerator';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'CoDi QR Generator – Free Mexico | QRPayHub',
    description:
      'Generate CoDi QR codes for Mexican SPEI payments. Compatible with all major Mexican banks.',
    keywords: ['codi qr generator', 'mexico qr code', 'spei qr', 'clabe qr generator', 'cobro digital'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/codi/generator'),
  };
}

export default function CoDiGeneratorPage({
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
          { label: 'CoDi', href: '/codi' },
          { label: 'Generator' },
        ]}
      />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#006847' }}
        >
          <span className="fi fi-mx" style={{ width: '2.5rem', height: '1.875rem', display: 'inline-block', backgroundSize: 'cover', borderRadius: '3px' }} />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            CoDi QR Generator
          </h1>
          <p className="mt-1 text-slate-500">
            Generate CoDi QR codes (BXC/SPEI format) — compatible with BBVA México, Santander, Banorte and all CoDi-enabled apps.
          </p>
        </div>
      </div>

      {/* ── Generator ────────────────────────────────────────────────────── */}
      <CoDiGenerator />

      {/* ── Info Box ─────────────────────────────────────────────────────── */}
      <div className="rounded-2xl p-5" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
        <h3 className="text-sm font-semibold mb-2" style={{ color: '#14532D' }}>
          About CoDi QR Codes
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#166534' }}>
          CoDi QR codes use the{' '}
          <code className="font-mono text-xs bg-green-100 px-1 rounded">BXC://SPEI</code> URI format
          defined by Banxico. The payload encodes the recipient CLABE or mobile phone,
          the payment amount (always required for CoDi), a concept and a numeric reference — all
          URL-encoded as a SPEI transfer instruction. Settlement happens through{' '}
          <strong>SPEI</strong>, Mexico&apos;s 24/7 real-time interbank network.
          CLABE numbers are validated using the official Banxico weighted checksum algorithm.
          Compatible with BBVA México, Santander MX, Banorte, HSBC México, Citibanamex, Mercado Pago MX
          and any other CoDi-enabled banking app.
        </p>
      </div>

    </div>
  );
}
