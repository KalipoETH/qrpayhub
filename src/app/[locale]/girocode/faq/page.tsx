import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Accordion from '@/components/ui/Accordion';
import type { AccordionItem } from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { girocodeFAQContent } from '@/content/girocode/faq';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const content = girocodeFAQContent[locale as 'en' | 'de'] ?? girocodeFAQContent.en;
  return {
    title: `${content.title} – All Questions Answered | QRPayHub`,
    description: content.description,
    keywords: ['girocode faq', 'epc qr code questions', 'girocode help', 'sepa qr faq'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/girocode/faq'),
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
    { '@type': 'ListItem', position: 2, name: 'GiroCode', item: 'https://qrpayhub.com/en/girocode' },
    { '@type': 'ListItem', position: 3, name: 'FAQ', item: 'https://qrpayhub.com/en/girocode/faq' },
  ],
};

export default function GiroCodeFAQPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'de';
  const content = girocodeFAQContent[locale] ?? girocodeFAQContent.en;

  const accordionItems: AccordionItem[] = content.items.map((item, i) => ({
    id: `faq-${i}`,
    question: item.question,
    answer: item.answer,
  }));

  const jsonLdFaq = buildJsonLdFaq(accordionItems);

  return (
    <>
      <Script
        id="json-ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <Script
        id="json-ld-faq-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_BREADCRUMB) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'GiroCode', href: '/girocode' },
            { label: 'FAQ' },
          ]}
        />

        {/* Header */}
        <header className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            {content.title}
          </h1>
          <p className="text-lg text-slate-500">
            {content.description}
          </p>
        </header>

        {/* Accordion */}
        <Accordion items={accordionItems} />

        {/* CTA */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-blue-900">
              {locale === 'de' ? 'Noch Fragen?' : 'Still have questions?'}
            </p>
            <p className="text-sm text-blue-700 mt-0.5">
              {locale === 'de'
                ? 'Oder bereit für Ihren ersten GiroCode?'
                : 'Or ready to generate your first GiroCode?'}
            </p>
          </div>
          <Link
            href="/girocode/generator"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            {locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
          </Link>
        </div>

        {/* Related Tools */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            {locale === 'de' ? 'Verwandte Tools' : 'Related Tools'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RelatedToolCard
              icon="🧾"
              name="GiroCode Generator"
              url="https://www.girocodegenerator.com"
              description={
                locale === 'de'
                  ? 'Spezialisiertes GiroCode-Tool für Freiberufler und Kleinunternehmen. Professionelle Rechnungs-PDFs mit eingebettetem GiroCode – kostenlos, ohne Registrierung.'
                  : 'Specialized GiroCode tool for freelancers and small businesses. Generate professional invoice PDFs with embedded GiroCode QR codes – free, no registration required.'
              }
              badge="Free"
              visitLabel={locale === 'de' ? 'Tool öffnen →' : 'Visit Tool →'}
            />
            <RelatedToolCard
              icon="⚡"
              name="QRPayHub Generator"
              url="/girocode/generator"
              description={
                locale === 'de'
                  ? 'Schnelle GiroCode-Generierung ohne Rechnungs-PDF. Unterstützt auch 15+ weitere Zahlungsstandards weltweit.'
                  : 'Quick GiroCode generation without invoice PDF. Also supports 15+ other payment standards worldwide.'
              }
              badge="Free"
              visitLabel={locale === 'de' ? 'Tool öffnen →' : 'Visit Tool →'}
              external={false}
            />
          </div>
        </section>
      </div>
    </>
  );
}
