import { setRequestLocale } from 'next-intl/server';
import HomeContent from '@/components/HomeContent';

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);

  return <HomeContent />;
}
