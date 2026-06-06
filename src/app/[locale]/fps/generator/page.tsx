import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import FPSGenerator from '@/components/generators/FPSGenerator';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'FPS QR Generator – Free Hong Kong | QRPayHub',
    description:
      'Generate FPS QR codes for Hong Kong payments. Supports HKD and CNY. Compatible with all HK banks including HSBC, Hang Seng, Bank of China HK, PayMe and AlipayHK.',
    keywords: [
      'fps qr generator',
      'fps qr code',
      'hong kong qr payment',
      'hkma fps',
      'payme qr',
      'hsbc hk qr',
      'alipayhk qr',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/fps/generator'),
  };
}

export default function FPSGeneratorPage({
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
          { label: 'FPS', href: '/fps' },
          { label: 'Generator' },
        ]}
      />

      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
          style={{ backgroundColor: '#BA0C2F' }}
        >
          <span
            className="fi fi-hk"
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
            🇭🇰 FPS QR Code Generator
          </h1>
          <p className="mt-1 text-slate-500">
            Generate FPS QR codes (EMV format) — compatible with HSBC HK, Hang Seng,
            Bank of China HK, Standard Chartered HK, DBS HK, PayMe, AlipayHK,
            WeChat Pay HK and all FPS-enabled apps.
          </p>
        </div>
      </div>

      <FPSGenerator />

      <div className="rounded-2xl p-5 border" style={{ backgroundColor: '#fdf2f4', borderColor: '#fca5a5' }}>
        <h3 className="text-sm font-semibold mb-2" style={{ color: '#7f1d1d' }}>
          About FPS QR Codes
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#991b1b' }}>
          FPS QR Codes follow the <strong>EMV Merchant Presented Mode</strong> specification
          as defined by <strong>HKMA (Hong Kong Monetary Authority)</strong>. The payload uses
          AID{' '}
          <code className="font-mono text-xs px-1 rounded" style={{ backgroundColor: '#fee2e2' }}>
            hk.edu.hkma.fps
          </code>
          {' '}and supports both{' '}
          <strong>HKD</strong> (currency code{' '}
          <code className="font-mono text-xs px-1 rounded" style={{ backgroundColor: '#fee2e2' }}>344</code>)
          {' '}and{' '}
          <strong>CNY</strong> (currency code{' '}
          <code className="font-mono text-xs px-1 rounded" style={{ backgroundColor: '#fee2e2' }}>156</code>).
          Supports mobile numbers (+852), email addresses and numeric FPS IDs.
        </p>
      </div>
    </div>
  );
}
