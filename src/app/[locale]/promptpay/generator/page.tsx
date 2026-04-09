import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import PromptPayGenerator from '@/components/generators/PromptPayGenerator';

export const metadata: Metadata = {
  title: 'PromptPay QR Code Generator – Free | QRPayHub',
  description:
    'Generate PromptPay QR codes for Thai payments. Compatible with all Thai banks and payment apps. Supports phone number and National ID.',
  keywords: ['promptpay qr', 'promptpay generator', 'thai payment qr', 'พร้อมเพย์', 'thailand qr code'],
};

export default function PromptPayGeneratorPage({
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
            <Link href="/promptpay" className="hover:text-slate-600 transition-colors">
              PromptPay QR
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
          style={{ backgroundColor: '#1A56DB' }}
        >
          🇹🇭
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            PromptPay QR Code Generator
          </h1>
          <p className="mt-1 text-slate-500">
            Generate PromptPay QR codes (EMV format) — compatible with all Thai banks and payment apps.
          </p>
        </div>
      </div>

      {/* ── Generator ────────────────────────────────────────────────────── */}
      <PromptPayGenerator />

      {/* ── Info Box ─────────────────────────────────────────────────────── */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">
          About PromptPay QR Codes
        </h3>
        <p className="text-sm text-blue-700 leading-relaxed">
          PromptPay QR Codes follow the <strong>EMV Merchant Presented Mode</strong>{' '}
          specification with the PromptPay AID{' '}
          <code className="font-mono text-xs bg-blue-100 px-1 rounded">A000000677010111</code>.
          Phone numbers are normalised to the{' '}
          <code className="font-mono text-xs bg-blue-100 px-1 rounded">0066XXXXXXXXX</code>{' '}
          format; National IDs and Tax IDs are passed through as 13 digits. The payload is
          validated with a CRC16-CCITT checksum (last 4 characters). Static QR codes have no
          fixed amount; adding an amount sets the Point of Initiation from{' '}
          <code className="font-mono text-xs bg-blue-100 px-1 rounded">11</code> to{' '}
          <code className="font-mono text-xs bg-blue-100 px-1 rounded">12</code>.
          Compatible with Bangkok Bank, Kasikorn (KBank), SCB, Krungthai, TMBThanachart (ttb),
          and all 30+ Thai PromptPay member institutions.
        </p>
      </div>

    </div>
  );
}
