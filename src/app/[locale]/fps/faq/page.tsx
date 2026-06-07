import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Accordion from '@/components/ui/Accordion';
import type { AccordionItem } from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { fpsFAQContent } from '@/content/fps/faq';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const content = fpsFAQContent[locale as 'en' | 'de'] ?? fpsFAQContent.en;
  return {
    title: `${content.title} – 25 Questions Answered | QRPayHub`,
    description: content.description,
    keywords: ['fps faq', 'hong kong fps faq', 'hkma fps questions', 'fps qr guide', 'fps hkd cny'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/fps/faq'),
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
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://qrpayhub.com/en' },
    { '@type': 'ListItem', position: 2, name: 'FPS',  item: 'https://qrpayhub.com/en/fps' },
    { '@type': 'ListItem', position: 3, name: 'FAQ',  item: 'https://qrpayhub.com/en/fps/faq' },
  ],
};

const HK_RED = '#BA0C2F';

export default function FPSFAQPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'de';
  const content = fpsFAQContent[locale] ?? fpsFAQContent.en;

  const accordionItems: AccordionItem[] = content.items.map((item, i) => ({
    id: `faq-${i}`,
    question: item.question,
    answer: item.answer,
  }));

  const jsonLdFaq = buildJsonLdFaq(accordionItems);

  return (
    <>
      <Script
        id="json-ld-fps-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <Script
        id="json-ld-fps-faq-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_BREADCRUMB) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'FPS',  href: '/fps' },
            { label: 'FAQ' },
          ]}
        />

        <header className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            {content.title}
          </h1>
          <p className="text-lg text-slate-500">{content.description}</p>
        </header>

        <Accordion items={accordionItems} />

        <div
          className="rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ backgroundColor: '#fdf2f4', borderWidth: 1, borderStyle: 'solid', borderColor: '#fca5a5' }}
        >
          <div>
            <p className="font-semibold" style={{ color: '#7f1d1d' }}>
              {locale === 'de' ? 'Noch Fragen?' : 'Still have questions?'}
            </p>
            <p className="text-sm mt-0.5" style={{ color: '#991b1b' }}>
              {locale === 'de'
                ? 'Oder bereit für Ihren ersten FPS QR-Code?'
                : 'Or ready to generate your first FPS QR Code?'}
            </p>
          </div>
          <Link
            href="/fps/generator"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors"
            style={{ backgroundColor: HK_RED }}
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
              name="FPS Generator"
              url="/fps/generator"
              description={
                locale === 'de'
                  ? 'FPS QR-Codes sofort erstellen – HKD oder CNY – funktioniert mit HSBC HK, Hang Seng, PayMe, AlipayHK und allen FPS-Apps. Kostenlos, ohne Registrierung.'
                  : 'Generate FPS QR codes instantly — HKD or CNY — works with HSBC HK, Hang Seng, PayMe, AlipayHK and all FPS apps. Free, no registration.'
              }
              badge="Free"
              visitLabel={locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
              external={false}
            />
            <RelatedToolCard
              icon="🇸🇬"
              name="PayNow Generator"
              url="/paynow/generator"
              description={
                locale === 'de'
                  ? 'PayNow QR-Codes für Singapur-Zahlungen erstellen – funktioniert mit DBS, OCBC, UOB, GrabPay und allen PayNow-Apps.'
                  : 'Generate PayNow QR codes for Singapore payments — works with DBS, OCBC, UOB, GrabPay and all PayNow apps.'
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
