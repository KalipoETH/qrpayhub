import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Accordion from '@/components/ui/Accordion';
import type { AccordionItem } from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { duitnowFAQContent } from '@/content/duitnow/faq';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const content = duitnowFAQContent[locale as 'en' | 'de'] ?? duitnowFAQContent.en;
  return {
    title: `${content.title} – 25 Questions Answered | QRPayHub`,
    description: content.description,
    keywords: ['duitnow faq', 'duitnow questions', 'paynet duitnow faq', 'duitnow qr guide', 'malaysia instant payment faq'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/duitnow/faq'),
  };
}

function buildJsonLdFaq(items: AccordionItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

const JSON_LD_BREADCRUMB = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',       item: 'https://qrpayhub.com/en' },
    { '@type': 'ListItem', position: 2, name: 'DuitNow QR', item: 'https://qrpayhub.com/en/duitnow' },
    { '@type': 'ListItem', position: 3, name: 'FAQ',        item: 'https://qrpayhub.com/en/duitnow/faq' },
  ],
};

export default function DuitNowFAQPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'de';
  const content = duitnowFAQContent[locale] ?? duitnowFAQContent.en;

  const accordionItems: AccordionItem[] = content.items.map((item, i) => ({
    id: `faq-${i}`,
    question: item.question,
    answer: item.answer,
  }));

  const jsonLdFaq = buildJsonLdFaq(accordionItems);

  return (
    <>
      <Script
        id="json-ld-duitnow-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <Script
        id="json-ld-duitnow-faq-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_BREADCRUMB) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        <Breadcrumb
          items={[
            { label: 'Home',       href: '/' },
            { label: 'DuitNow QR', href: '/duitnow' },
            { label: 'FAQ' },
          ]}
        />

        <header className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            {content.title}
          </h1>
          <p className="text-lg text-slate-500">
            {content.description}
          </p>
        </header>

        <Accordion items={accordionItems} />

        <div className="rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ backgroundColor: '#fff5f5', border: '1px solid #fecaca' }}>
          <div>
            <p className="font-semibold" style={{ color: '#7f1d1d' }}>
              {locale === 'de' ? 'Noch Fragen?' : 'Still have questions?'}
            </p>
            <p className="text-sm mt-0.5" style={{ color: '#991b1b' }}>
              {locale === 'de'
                ? 'Oder bereit für Ihren ersten DuitNow QR-Code?'
                : 'Or ready to generate your first DuitNow QR Code?'}
            </p>
          </div>
          <Link
            href="/duitnow/generator"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors"
            style={{ backgroundColor: '#CC0001' }}
          >
            {locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
          </Link>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            {locale === 'de' ? 'Verwandte Tools' : 'Related Tools'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RelatedToolCard
              icon="⚡"
              name="DuitNow Generator"
              url="/duitnow/generator"
              description={
                locale === 'de'
                  ? "DuitNow QR-Codes sofort erstellen – funktioniert mit Maybank, CIMB, Touch 'n Go, Boost und allen DuitNow-Apps. Kostenlos, ohne Registrierung."
                  : "Generate DuitNow QR codes instantly — works with Maybank, CIMB, Touch 'n Go, Boost and all DuitNow-enabled apps. Free, no registration."
              }
              badge="Free"
              visitLabel={locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
              external={false}
            />
            <RelatedToolCard
              icon="🇮🇩"
              name="QRIS Generator"
              url="/qris/generator"
              description={
                locale === 'de'
                  ? 'QRIS QR-Codes für indonesische Zahlungen erstellen – funktioniert mit GoPay, OVO, Dana, LinkAja, ShopeePay und allen QRIS-Apps.'
                  : 'Generate QRIS QR codes for Indonesian payments — works with GoPay, OVO, Dana, LinkAja, ShopeePay and all QRIS apps.'
              }
              badge="Free"
              visitLabel={locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
              external={false}
            />
          </div>
        </section>
      </div>
    </>
  );
}
