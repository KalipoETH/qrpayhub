import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Accordion from '@/components/ui/Accordion';
import type { AccordionItem } from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { paynowFAQContent } from '@/content/paynow/faq';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const content = paynowFAQContent[locale as 'en' | 'de'] ?? paynowFAQContent.en;
  return {
    title: `${content.title} – 25 Questions Answered | QRPayHub`,
    description: content.description,
    keywords: ['paynow faq', 'paynow questions', 'singapore payment faq', 'sgqr faq', 'paynow guide'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/paynow/faq'),
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
    { '@type': 'ListItem', position: 2, name: 'PayNow', item: 'https://qrpayhub.com/en/paynow' },
    { '@type': 'ListItem', position: 3, name: 'FAQ',    item: 'https://qrpayhub.com/en/paynow/faq' },
  ],
};

export default function PayNowFAQPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'de';
  const content = paynowFAQContent[locale] ?? paynowFAQContent.en;

  const accordionItems: AccordionItem[] = content.items.map((item, i) => ({
    id: `faq-${i}`,
    question: item.question,
    answer: item.answer,
  }));

  const jsonLdFaq = buildJsonLdFaq(accordionItems);

  return (
    <>
      <Script
        id="json-ld-paynow-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <Script
        id="json-ld-paynow-faq-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_BREADCRUMB) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        <Breadcrumb
          items={[
            { label: 'Home',   href: '/' },
            { label: 'PayNow', href: '/paynow' },
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
                ? 'Oder bereit für Ihren ersten PayNow QR-Code?'
                : 'Or ready to generate your first PayNow QR Code?'}
            </p>
          </div>
          <Link
            href="/paynow/generator"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors"
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
              name="PayNow Generator"
              url="/paynow/generator"
              description={
                locale === 'de'
                  ? 'PayNow QR-Codes sofort erstellen – funktioniert mit DBS, OCBC, UOB, GrabPay, Singtel Dash und allen singapurischen Zahlungs-Apps. Kostenlos, ohne Registrierung.'
                  : 'Generate PayNow QR codes instantly — works with DBS, OCBC, UOB, GrabPay, Singtel Dash and all Singapore payment apps. Free, no registration.'
              }
              badge="Free"
              visitLabel={locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
              external={false}
            />
            <RelatedToolCard
              icon="🇲🇾"
              name="DuitNow Generator"
              url="/duitnow/generator"
              description={
                locale === 'de'
                  ? 'DuitNow QR-Codes für malaysische Zahlungen erstellen – über ASEAN-Grenzüberschreitung mit PayNow verbunden.'
                  : 'Generate DuitNow QR codes for Malaysian payments — connected to PayNow via ASEAN cross-border linkage.'
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
