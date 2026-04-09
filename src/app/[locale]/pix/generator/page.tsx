import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import PIXGenerator from '@/components/generators/PIXGenerator';

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
            <Link href="/pix" className="hover:text-slate-600 transition-colors">
              PIX QR
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
          style={{ backgroundColor: '#00B894' }}
        >
          🇧🇷
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
