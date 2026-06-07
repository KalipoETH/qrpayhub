import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Accordion from '@/components/ui/Accordion';
import type { AccordionItem } from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { vietqrFAQContent } from '@/content/vietqr/faq';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const content = vietqrFAQContent[locale as 'en' | 'de'] ?? vietqrFAQContent.en;
  return {
    title: `${content.title} – 25 Questions Answered | QRPayHub`,
    description: content.description,
    keywords: [
      'vietqr faq',
      'vietqr questions',
      'vietnam qr payment help',
      'napas bank bin',
      'vietqr guide',
      'vietnamese banking qr',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/vietqr/faq'),
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
    { '@type': 'ListItem', position: 2, name: 'VietQR', item: 'https://qrpayhub.com/en/vietqr' },
    { '@type': 'ListItem', position: 3, name: 'FAQ',    item: 'https://qrpayhub.com/en/vietqr/faq' },
  ],
};

export default function VietQRFAQPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'de';
  const content = vietqrFAQContent[locale] ?? vietqrFAQContent.en;

  const accordionItems: AccordionItem[] = content.items.map((item, i) => ({
    id: `faq-${i}`,
    question: item.question,
    answer: item.answer,
  }));

  const jsonLdFaq = buildJsonLdFaq(accordionItems);

  return (
    <>
      <Script
        id="json-ld-vietqr-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <Script
        id="json-ld-vietqr-faq-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_BREADCRUMB) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        <Breadcrumb
          items={[
            { label: 'Home',   href: '/' },
            { label: 'VietQR', href: '/vietqr' },
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
          style={{ backgroundColor: '#fff5f5', borderWidth: 1, borderStyle: 'solid', borderColor: '#fca5a5' }}
        >
          <div>
            <p className="font-semibold" style={{ color: '#9b1c1c' }}>
              {locale === 'de' ? 'Noch Fragen?' : 'Still have questions?'}
            </p>
            <p className="text-sm mt-0.5" style={{ color: '#b91c1c' }}>
              {locale === 'de'
                ? 'Oder bereit für Ihren ersten VietQR-Code?'
                : 'Or ready to generate your first VietQR Code?'}
            </p>
          </div>
          <Link
            href="/vietqr/generator"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors"
            style={{ backgroundColor: '#DA251D' }}
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
              icon="🇻🇳"
              name="VietQR Generator"
              url="/vietqr/generator"
              description={
                locale === 'de'
                  ? 'VietQR QR-Codes sofort erstellen – funktioniert mit allen vietnamesischen Banking-Apps und MoMo, ZaloPay, VNPay. Kostenlos, ohne Registrierung.'
                  : 'Generate VietQR codes instantly — works with all Vietnamese banking apps and MoMo, ZaloPay, VNPay. Free, no registration.'
              }
              badge="Free"
              visitLabel={locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
              external={false}
            />
            <RelatedToolCard
              icon="🇹🇭"
              name="PromptPay Generator"
              url="/promptpay/generator"
              description={
                locale === 'de'
                  ? 'PromptPay QR-Codes für Thai-Zahlungen erstellen – funktioniert mit allen Thai-Banking-Apps.'
                  : 'Generate PromptPay QR codes for Thailand payments — works with all Thai banking apps.'
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
