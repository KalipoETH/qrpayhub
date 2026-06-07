import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Accordion from '@/components/ui/Accordion';
import type { AccordionItem } from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { promptpayFAQContent } from '@/content/promptpay/faq';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const content = promptpayFAQContent[locale as 'en' | 'de'] ?? promptpayFAQContent.en;
  return {
    title: `${content.title} – 25 Questions Answered | QRPayHub`,
    description: content.description,
    keywords: [
      'promptpay faq',
      'promptpay questions',
      'thai qr payment help',
      'promptpay key types',
      'bank of thailand promptpay guide',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/promptpay/faq'),
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
    { '@type': 'ListItem', position: 1, name: 'Home',         item: 'https://qrpayhub.com/en' },
    { '@type': 'ListItem', position: 2, name: 'PromptPay QR', item: 'https://qrpayhub.com/en/promptpay' },
    { '@type': 'ListItem', position: 3, name: 'FAQ',          item: 'https://qrpayhub.com/en/promptpay/faq' },
  ],
};

export default function PromptPayFAQPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'de';
  const content = promptpayFAQContent[locale] ?? promptpayFAQContent.en;

  const accordionItems: AccordionItem[] = content.items.map((item, i) => ({
    id: `faq-${i}`,
    question: item.question,
    answer: item.answer,
  }));

  const jsonLdFaq = buildJsonLdFaq(accordionItems);

  return (
    <>
      <Script
        id="json-ld-promptpay-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <Script
        id="json-ld-promptpay-faq-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_BREADCRUMB) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home',         href: '/' },
            { label: 'PromptPay QR', href: '/promptpay' },
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
                ? 'Oder bereit für Ihren ersten PromptPay QR-Code?'
                : 'Or ready to generate your first PromptPay QR Code?'}
            </p>
          </div>
          <Link
            href="/promptpay/generator"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors"
            style={{ backgroundColor: '#1A56DB' }}
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
              icon="🇹🇭"
              name="PromptPay QR Generator"
              url="/promptpay/generator"
              description={
                locale === 'de'
                  ? 'PromptPay QR-Codes sofort erstellen – funktioniert mit allen thailändischen Banking-Apps einschließlich KBank, SCB, Bangkok Bank und 30+ weiteren. Kostenlos, ohne Registrierung.'
                  : 'Generate PromptPay QR codes instantly — works with all Thai banking apps including KBank, SCB, Bangkok Bank and 30+ others. Free, no registration.'
              }
              badge="Free"
              visitLabel={locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
              external={false}
            />
            <RelatedToolCard
              icon="📖"
              name={locale === 'de' ? 'PromptPay Technischer Guide' : 'PromptPay Technical Guide'}
              url="/promptpay/guide"
              description={
                locale === 'de'
                  ? 'Tiefer Einblick in das PromptPay EMV-Payload-Format, Telefonnummer-Normalisierung, ASEAN-Grenzübertrittszahlungen und wie das Zahlungssystem funktioniert.'
                  : 'Deep dive into the PromptPay EMV payload format, phone number normalization, ASEAN cross-border connections and how the payment system works.'
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
