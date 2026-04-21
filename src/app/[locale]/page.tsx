import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import HomeContent from '@/components/HomeContent';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'QRPayHub – The Global QR Payment Code Hub',
    description: 'Generate QR payment codes for any country in seconds. GiroCode, Swiss QR, UPI, PIX, PromptPay and more.',
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, ''),
  };
}

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);

  return <HomeContent />;
}
