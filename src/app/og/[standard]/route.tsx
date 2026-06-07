import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const STANDARD_META: Record<string, { flag: string; name: string; color: string; country: string }> = {
  girocode:  { flag: '🇪🇺', name: 'GiroCode / EPC QR',   color: '#1E40AF', country: '36 SEPA Countries' },
  'swiss-qr':{ flag: '🇨🇭', name: 'Swiss QR Code',        color: '#DC2626', country: 'Switzerland' },
  upi:       { flag: '🇮🇳', name: 'UPI QR',               color: '#EA580C', country: 'India' },
  pix:       { flag: '🇧🇷', name: 'PIX QR',               color: '#059669', country: 'Brazil' },
  promptpay: { flag: '🇹🇭', name: 'PromptPay',            color: '#1D4ED8', country: 'Thailand' },
  qris:      { flag: '🇮🇩', name: 'QRIS',                 color: '#B91C1C', country: 'Indonesia' },
  duitnow:   { flag: '🇲🇾', name: 'DuitNow',              color: '#9F1239', country: 'Malaysia' },
  paynow:    { flag: '🇸🇬', name: 'PayNow',               color: '#DC2626', country: 'Singapore' },
  fps:       { flag: '🇭🇰', name: 'FPS',                  color: '#9B2335', country: 'Hong Kong' },
  vietqr:    { flag: '🇻🇳', name: 'VietQR',               color: '#B91C1C', country: 'Vietnam' },
  'qr-ph':   { flag: '🇵🇭', name: 'QR Ph',               color: '#1D4ED8', country: 'Philippines' },
  codi:      { flag: '🇲🇽', name: 'CoDi',                 color: '#15803D', country: 'Mexico' },
};

export async function GET(
  _request: Request,
  { params }: { params: { standard: string } }
) {
  const meta = STANDARD_META[params.standard] ?? {
    flag: '🌐',
    name: params.standard.toUpperCase(),
    color: '#1E40AF',
    country: '',
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: `linear-gradient(135deg, ${meta.color} 0%, ${meta.color}99 100%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial, sans-serif',
          color: 'white',
        }}
      >
        <div style={{ fontSize: 96, marginBottom: 16 }}>{meta.flag}</div>
        <div style={{ fontSize: 60, fontWeight: 'bold', marginBottom: 12 }}>
          {meta.name}
        </div>
        <div style={{ fontSize: 30, opacity: 0.85, marginBottom: 24 }}>
          {meta.country}
        </div>
        <div
          style={{
            fontSize: 22,
            opacity: 0.7,
            borderTop: '1px solid rgba(255,255,255,0.3)',
            paddingTop: 16,
            marginTop: 8,
          }}
        >
          Free QR Generator · qrpayhub.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
