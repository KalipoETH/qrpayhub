import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import PayNowGenerator from '@/components/generators/PayNowGenerator';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'PayNow QR Generator – Free Singapore | QRPayHub',
    description:
      'Generate PayNow QR codes for Singapore payments. Compatible with all Singapore banks and e-wallets including DBS PayLah!, OCBC Pay Anyone, UOB Mighty, GrabPay and Singtel Dash.',
    keywords: [
      'paynow qr generator',
      'paynow qr code',
      'singapore qr payment',
      'sgqr generator',
      'dbs paylah qr',
      'ocbc qr',
      'grabpay singapore qr',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/paynow/generator'),
  };
}

export default function PayNowGeneratorPage({
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
          { label: 'PayNow', href: '/paynow' },
          { label: 'Generator' },
        ]}
      />

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#EF4444' }}
        >
          <span
            className="fi fi-sg"
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
            🇸🇬 PayNow QR Code Generator
          </h1>
          <p className="mt-1 text-slate-500">
            Generate PayNow QR codes (EMV format) — compatible with DBS PayLah!, OCBC Pay Anyone,
            UOB Mighty, Standard Chartered, Citibank, GrabPay, Singtel Dash and all PayNow-enabled apps.
          </p>
        </div>
      </div>

      {/* ── Generator ────────────────────────────────────────────────────── */}
      <PayNowGenerator />

      {/* ── Info Box ─────────────────────────────────────────────────────── */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-red-900 mb-2">
          About PayNow QR Codes
        </h3>
        <p className="text-sm text-red-700 leading-relaxed">
          PayNow QR Codes follow the <strong>EMV Merchant Presented Mode</strong> specification
          as defined by <strong>MAS (Monetary Authority of Singapore)</strong> and the
          Association of Banks in Singapore (ABS). The payload uses AID{' '}
          <code className="font-mono text-xs bg-red-100 px-1 rounded">SG.PAYNOW</code>,
          currency code{' '}
          <code className="font-mono text-xs bg-red-100 px-1 rounded">702</code>{' '}
          (SGD), and a <strong>CRC16-CCITT</strong> checksum. Supports mobile numbers,
          UEN (business) and NRIC/FIN identifiers. The &ldquo;editable&rdquo; flag allows
          payers to modify the amount before confirming payment.
        </p>
      </div>
    </div>
  );
}
