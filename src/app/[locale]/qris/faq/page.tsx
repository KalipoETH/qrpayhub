import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Accordion from '@/components/ui/Accordion';
import type { AccordionItem } from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { qrisFAQContent } from '@/content/qris/faq';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const content = qrisFAQContent[locale as 'en' | 'de'] ?? qrisFAQContent.en;
  return {
    title: `${content.title} – 25 Questions Answered | QRPayHub`,
    description: content.description,
    keywords: ['qris faq', 'qris questions', 'bank indonesia qr faq', 'qris nmid', 'qris guide indonesia'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/qris/faq'),
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
    { '@type': 'ListItem', position: 2, name: 'QRIS', item: 'https://qrpayhub.com/en/qris' },
    { '@type': 'ListItem', position: 3, name: 'FAQ',  item: 'https://qrpayhub.com/en/qris/faq' },
  ],
};

export default function QRISFAQPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'de';
  const content = qrisFAQContent[locale] ?? qrisFAQContent.en;

  const accordionItems: AccordionItem[] = content.items.map((item, i) => ({
    id: `faq-${i}`,
    question: item.question,
    answer: item.answer,
  }));

  const jsonLdFaq = buildJsonLdFaq(accordionItems);

  return (
    <>
      <Script
        id="json-ld-qris-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <Script
        id="json-ld-qris-faq-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_BREADCRUMB) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'QRIS', href: '/qris' },
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

        <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-red-900">
              {locale === 'de' ? 'Noch Fragen?' : 'Still have questions?'}
            </p>
            <p className="text-sm text-red-700 mt-0.5">
              {locale === 'de'
                ? 'Oder bereit für Ihren ersten QRIS QR-Code?'
                : 'Or ready to generate your first QRIS QR Code?'}
            </p>
          </div>
          <Link
            href="/qris/generator"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors"
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
              name="QRIS Generator"
              url="/qris/generator"
              description={
                locale === 'de'
                  ? 'QRIS QR-Codes sofort erstellen – funktioniert mit GoPay, OVO, Dana, LinkAja, ShopeePay und allen QRIS-fähigen Apps. Kostenlos, ohne Registrierung.'
                  : 'Generate QRIS QR codes instantly — works with GoPay, OVO, Dana, LinkAja, ShopeePay and all QRIS-enabled apps. Free, no registration.'
              }
              badge="Free"
              visitLabel={locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
              external={false}
            />
            <RelatedToolCard
              icon="🇲🇾"
              name="DuitNow QR Generator"
              url="/duitnow/generator"
              description={
                locale === 'de'
                  ? "DuitNow QR-Codes für malaysische Zahlungen erstellen – funktioniert mit Maybank, CIMB, Touch 'n Go und allen DuitNow-Apps."
                  : "Generate DuitNow QR codes for Malaysian payments — works with Maybank, CIMB, Touch 'n Go and all DuitNow apps."
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
