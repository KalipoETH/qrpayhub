import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Accordion from '@/components/ui/Accordion';
import type { AccordionItem } from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { codiFAQContent } from '@/content/codi/faq';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const content = codiFAQContent[locale as 'en' | 'de'] ?? codiFAQContent.en;
  return {
    title: `${content.title} – 25 Questions Answered | QRPayHub`,
    description: content.description,
    keywords: [
      'codi faq',
      'codi questions',
      'cobro digital help',
      'clabe payment faq',
      'spei qr faq',
      'banxico codi guide',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/codi/faq'),
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
    { '@type': 'ListItem', position: 2, name: 'CoDi', item: 'https://qrpayhub.com/en/codi' },
    { '@type': 'ListItem', position: 3, name: 'FAQ',  item: 'https://qrpayhub.com/en/codi/faq' },
  ],
};

export default function CoDiFAQPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'de';
  const content = codiFAQContent[locale] ?? codiFAQContent.en;

  const accordionItems: AccordionItem[] = content.items.map((item, i) => ({
    id: `faq-${i}`,
    question: item.question,
    answer: item.answer,
  }));

  const jsonLdFaq = buildJsonLdFaq(accordionItems);

  return (
    <>
      <Script
        id="json-ld-codi-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <Script
        id="json-ld-codi-faq-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_BREADCRUMB) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'CoDi', href: '/codi' },
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
          style={{ backgroundColor: '#f0fdf4', borderWidth: 1, borderStyle: 'solid', borderColor: '#bbf7d0' }}
        >
          <div>
            <p className="font-semibold" style={{ color: '#14532d' }}>
              {locale === 'de' ? 'Noch Fragen?' : 'Still have questions?'}
            </p>
            <p className="text-sm mt-0.5" style={{ color: '#166534' }}>
              {locale === 'de'
                ? 'Oder bereit für Ihren ersten CoDi QR-Code?'
                : 'Or ready to generate your first CoDi QR Code?'}
            </p>
          </div>
          <Link
            href="/codi/generator"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors"
            style={{ backgroundColor: '#006847' }}
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
              icon="🇲🇽"
              name="CoDi Generator"
              url="/codi/generator"
              description={
                locale === 'de'
                  ? 'CoDi QR-Codes sofort erstellen – funktioniert mit allen mexikanischen Banken über SPEI. CLABE-Validierung inklusive. Kostenlos, ohne Registrierung.'
                  : 'Generate CoDi QR codes instantly — works with all Mexican banks via SPEI. Includes CLABE validation. Free, no registration.'
              }
              badge="Free"
              visitLabel={locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
              external={false}
            />
            <RelatedToolCard
              icon="🇧🇷"
              name="PIX Generator"
              url="/pix/generator"
              description={
                locale === 'de'
                  ? 'PIX QR-Codes für brasilianische Zahlungen erstellen – Brasiliens Echtzeit-Zahlungssystem mit über 150 Millionen Nutzern.'
                  : "Generate PIX QR codes for Brazilian payments — Brazil's real-time payment system with over 150 million users."
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
