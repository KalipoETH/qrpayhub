import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial, sans-serif',
          color: 'white',
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 'bold', marginBottom: 20 }}>
          🌐 QRPayHub
        </div>
        <div style={{ fontSize: 36, opacity: 0.9, textAlign: 'center' }}>
          The Global QR Payment Code Hub
        </div>
        <div style={{ fontSize: 24, opacity: 0.7, marginTop: 20 }}>
          12 Payment Standards · 50+ Countries · Free Generator
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
