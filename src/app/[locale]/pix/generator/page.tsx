import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import PIXGenerator from '@/components/generators/PIXGenerator';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'PIX QR Code Generator – Free | QRPayHub',
  description:
    'Generate PIX QR codes for Brazilian payments. Compatible with all Brazilian banks and payment apps.',
  keywords: ['pix qr code', 'pix pagamento', 'gerador pix qr', 'qr code pix', 'banco central pix'],
};

export default function PIXGeneratorPage({
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
