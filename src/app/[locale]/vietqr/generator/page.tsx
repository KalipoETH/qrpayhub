import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import VietQRGenerator from '@/components/generators/VietQRGenerator';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'VietQR Generator – Free Vietnam | QRPayHub',
    description:
      'Generate VietQR codes for Vietnamese bank transfers. Compatible with all Vietnamese banks including Vietcombank, BIDV, Agribank, Techcombank, MB Bank, VNPay and MoMo.',
    keywords: [
      'vietqr generator',
      'vietqr code',
      'vietnam qr payment',
      'napas qr',
      'vietcombank qr',
      'bidv qr',
      'momo qr vietnam',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/vietqr/generator'),
  };
}

export default function VietQRGeneratorPage({
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

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'VietQR', href: '/vietqr' },
          { label: 'Generator' },
        ]}
      />

      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#DA251D' }}
        >
          <span
            className="fi fi-vn"
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
            🇻🇳 VietQR Code Generator
          </h1>
          <p className="mt-1 text-slate-500">
            Generate VietQR codes (EMV format) — compatible with Vietcombank, BIDV,
            Agribank, Techcombank, MB Bank, VNPay, MoMo and all VietQR-enabled apps.
          </p>
        </div>
      </div>

      <VietQRGenerator />

      <div className="rounded-2xl p-5 border" style={{ backgroundColor: '#fff5f5', borderColor: '#fca5a5' }}>
        <h3 className="text-sm font-semibold mb-2" style={{ color: '#7f1d1d' }}>
          About VietQR Codes
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#991b1b' }}>
          VietQR codes follow the <strong>EMV Merchant Presented Mode</strong> specification
          as defined by <strong>NAPAS (National Payment Corporation of Vietnam)</strong>.
          The payload uses AID{' '}
          <code className="font-mono text-xs px-1 rounded" style={{ backgroundColor: '#fee2e2' }}>
            A000000727
          </code>
          , currency code{' '}
          <code className="font-mono text-xs px-1 rounded" style={{ backgroundColor: '#fee2e2' }}>
            704
          </code>{' '}
          (VND — Vietnamese Đồng), and a <strong>CRC16-CCITT</strong> checksum.
          VND has no decimal subdivision — all amounts are whole đồng only.
          Account names should be entered in <strong>UPPERCASE without Vietnamese diacritics</strong>.
        </p>
      </div>
    </div>
  );
}
