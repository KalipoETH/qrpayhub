import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Accordion from '@/components/ui/Accordion';
import type { AccordionItem } from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { qrPhFAQContent } from '@/content/qr-ph/faq';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const content = qrPhFAQContent[locale as 'en' | 'de'] ?? qrPhFAQContent.en;
  return {
    title: `${content.title} – 25 Questions Answered | QRPayHub`,
    description: content.description,
    keywords: [
      'qr ph faq',
      'qr ph questions',
      'instapay qr help',
      'gcash qr ph',
      'philippine payment faq',
      'bsp qr code guide',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/qr-ph/faq'),
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
    { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://qrpayhub.com/en' },
    { '@type': 'ListItem', position: 2, name: 'QR Ph', item: 'https://qrpayhub.com/en/qr-ph' },
    { '@type': 'ListItem', position: 3, name: 'FAQ',   item: 'https://qrpayhub.com/en/qr-ph/faq' },
  ],
};

export default function QRPhFAQPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'de';
  const content = qrPhFAQContent[locale] ?? qrPhFAQContent.en;

  const accordionItems: AccordionItem[] = content.items.map((item, i) => ({
    id: `faq-${i}`,
    question: item.question,
    answer: item.answer,
  }));

  const jsonLdFaq = buildJsonLdFaq(accordionItems);

  return (
    <>
      <Script
        id="json-ld-qrph-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <Script
        id="json-ld-qrph-faq-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_BREADCRUMB) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        <Breadcrumb
          items={[
            { label: 'Home',  href: '/' },
            { label: 'QR Ph', href: '/qr-ph' },
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
          style={{ backgroundColor: '#eff6ff', borderWidth: 1, borderStyle: 'solid', borderColor: '#bfdbfe' }}
        >
          <div>
            <p className="font-semibold" style={{ color: '#1e3a5f' }}>
              {locale === 'de' ? 'Noch Fragen?' : 'Still have questions?'}
            </p>
            <p className="text-sm mt-0.5" style={{ color: '#1e40af' }}>
              {locale === 'de'
                ? 'Oder bereit für Ihren ersten QR Ph-Code?'
                : 'Or ready to generate your first QR Ph Code?'}
            </p>
          </div>
          <Link
            href="/qr-ph/generator"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors"
            style={{ backgroundColor: '#0038A8' }}
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
              icon="🇵🇭"
              name="QR Ph Generator"
              url="/qr-ph/generator"
              description={
                locale === 'de'
                  ? 'QR Ph-Codes sofort erstellen – funktioniert mit GCash, Maya, BDO, BPI und allen InstaPay-Apps. Kostenlos, ohne Registrierung.'
                  : 'Generate QR Ph codes instantly — works with GCash, Maya, BDO, BPI and all InstaPay apps. Free, no registration.'
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
