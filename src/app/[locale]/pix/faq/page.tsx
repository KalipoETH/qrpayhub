import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Accordion from '@/components/ui/Accordion';
import type { AccordionItem } from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { pixFAQContent } from '@/content/pix/faq';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const content = pixFAQContent[locale as 'en' | 'de'] ?? pixFAQContent.en;
  return {
    title: `${content.title} – 25 Questions Answered | QRPayHub`,
    description: content.description,
    keywords: [
      'pix faq',
      'pix questions',
      'pix qr code help',
      'chave pix explained',
      'banco central brasil pix guide',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/pix/faq'),
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
    { '@type': 'ListItem', position: 1, name: 'Home',   item: 'https://qrpayhub.com/en' },
    { '@type': 'ListItem', position: 2, name: 'PIX QR', item: 'https://qrpayhub.com/en/pix' },
    { '@type': 'ListItem', position: 3, name: 'FAQ',    item: 'https://qrpayhub.com/en/pix/faq' },
  ],
};

export default function PIXFAQPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'de';
  const content = pixFAQContent[locale] ?? pixFAQContent.en;

  const accordionItems: AccordionItem[] = content.items.map((item, i) => ({
    id: `faq-${i}`,
    question: item.question,
    answer: item.answer,
  }));

  const jsonLdFaq = buildJsonLdFaq(accordionItems);

  return (
    <>
      <Script
        id="json-ld-pix-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <Script
        id="json-ld-pix-faq-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_BREADCRUMB) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home',   href: '/' },
            { label: 'PIX QR', href: '/pix' },
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
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-emerald-900">
              {locale === 'de' ? 'Noch Fragen?' : 'Still have questions?'}
            </p>
            <p className="text-sm text-emerald-700 mt-0.5">
              {locale === 'de'
                ? 'Oder bereit für Ihren ersten PIX QR-Code?'
                : 'Or ready to generate your first PIX QR Code?'}
            </p>
          </div>
          <Link
            href="/pix/generator"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors"
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
              icon="🇧🇷"
              name="PIX QR Generator"
              url="/pix/generator"
              description={
                locale === 'de'
                  ? 'PIX QR-Codes sofort erstellen – funktioniert mit allen brasilianischen Banking-Apps einschließlich Nubank, Itaú, Bradesco und 700+ weiteren. Kostenlos, ohne Registrierung.'
                  : 'Generate PIX QR codes instantly — works with all Brazilian banking apps including Nubank, Itaú, Bradesco and 700+ others. Free, no registration.'
              }
              badge="Free"
              visitLabel={locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
              external={false}
            />
            <RelatedToolCard
              icon="📖"
              name={locale === 'de' ? 'PIX Technischer Guide' : 'PIX Technical Guide'}
              url="/pix/guide"
              description={
                locale === 'de'
                  ? 'Tiefer Einblick in das PIX EMV-Payload-Format, CRC16-Prüfsumme, Schlüsseltypen, BCB-Regulierung und wie das Zahlungssystem unter der Haube funktioniert.'
                  : 'Deep dive into the PIX EMV payload format, CRC16 checksum, key types, BCB regulation and how the payment system works under the hood.'
              }
              badge="Guide"
              visitLabel={locale === 'de' ? 'Guide lesen →' : 'Read Guide →'}
              external={false}
            />
          </div>
        </section>
      </div>
    </>
  );
}
