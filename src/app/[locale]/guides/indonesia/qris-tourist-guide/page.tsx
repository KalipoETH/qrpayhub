import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Accordion from '@/components/ui/Accordion';
import type { AccordionItem } from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'QRIS Tourist Guide 2026 – Can Foreigners Use QRIS in Indonesia?';
const TITLE_DE = 'QRIS Touristen-Guide 2026 – Können Ausländer QRIS in Indonesien nutzen?';
const DESC_EN =
  "Can tourists use QRIS in Indonesia? Yes – visitors from Singapore, Malaysia, Thailand and India can pay at QRIS merchants with their home apps. Here's how.";
const DESC_DE =
  'Können Touristen QRIS in Indonesien nutzen? Ja – Besucher aus Singapur, Malaysia, Thailand und Indien können bei QRIS-Händlern mit ihrer heimischen App bezahlen. So funktioniert es.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['qris tourist', 'can foreigners use qris', 'gopay for tourists', 'ovo for tourists', 'qris cross border'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/indonesia/qris-tourist-guide'),
    openGraph: buildOpenGraph(locale, '/guides/indonesia/qris-tourist-guide', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

function Flag({ code, className = '' }: { code: string; className?: string }) {
  return (
    <span
      className={`fi fi-${code} ${className}`}
      style={{ width: '1.2em', height: '0.9em', display: 'inline-block', backgroundSize: 'cover', borderRadius: '2px', verticalAlign: 'middle' }}
    />
  );
}

const COUNTRY_CARDS = [
  {
    flag: 'sg', nameEn: 'Singapore PayNow', nameDe: 'Singapur PayNow',
    worksEn: 'Directly', worksDe: 'Direkt',
    appEn: 'DBS, OCBC, UOB, GrabPay', appDe: 'DBS, OCBC, UOB, GrabPay',
    sinceEn: 'Since: 2023', sinceDe: 'Seit: 2023',
    rateEn: 'Automatic SGD → IDR', rateDe: 'Automatisch SGD → IDR',
    ease: 5,
  },
  {
    flag: 'my', nameEn: 'Malaysia DuitNow', nameDe: 'Malaysia DuitNow',
    worksEn: 'Directly', worksDe: 'Direkt',
    appEn: 'Maybank, CIMB, Touch n Go', appDe: 'Maybank, CIMB, Touch n Go',
    sinceEn: 'Since: 2022', sinceDe: 'Seit: 2022',
    rateEn: 'Automatic MYR → IDR', rateDe: 'Automatisch MYR → IDR',
    ease: 5,
  },
  {
    flag: 'th', nameEn: 'Thailand PromptPay', nameDe: 'Thailand PromptPay',
    worksEn: 'Most merchants', worksDe: 'Bei den meisten Händlern',
    appEn: 'Bangkok Bank, KBank, SCB', appDe: 'Bangkok Bank, KBank, SCB',
    sinceEn: 'Since: 2023', sinceDe: 'Seit: 2023',
    rateEn: 'THB → IDR', rateDe: 'THB → IDR',
    ease: 4,
  },
  {
    flag: 'in', nameEn: 'India UPI', nameDe: 'Indien UPI',
    worksEn: 'Growing network', worksDe: 'Wachsendes Netzwerk',
    appEn: 'PhonePe, Google Pay, Paytm', appDe: 'PhonePe, Google Pay, Paytm',
    sinceEn: 'Since: 2023', sinceDe: 'Seit: 2023',
    rateEn: 'INR → IDR', rateDe: 'INR → IDR',
    ease: 4,
  },
];

const FAQ_EN: AccordionItem[] = [
  { id: 'faq-1', question: 'Is GoPay safe for tourists?', answer: 'Yes, GoPay is regulated by Bank Indonesia and used by 190M+ users.' },
  { id: 'faq-2', question: 'Can I use a Wise card in Indonesia?', answer: 'Yes, Wise card works at most ATMs and card terminals.' },
  { id: 'faq-3', question: "What's the minimum for QRIS?", answer: 'There is no minimum. Even Rp 1,000 transactions work.' },
  { id: 'faq-4', question: 'Do Bali beach clubs accept QRIS?', answer: 'Most popular beach clubs (Finns, Potato Head, Ku De Ta) accept QR and cards.' },
  { id: 'faq-5', question: 'Is IDR available at the airport?', answer: 'Yes, exchange at the airport or withdraw from an ATM. Best rates are found in the city.' },
];
const FAQ_DE: AccordionItem[] = [
  { id: 'faq-1', question: 'Ist GoPay sicher für Touristen?', answer: 'Ja, GoPay wird von Bank Indonesia reguliert und von über 190 Millionen Nutzern verwendet.' },
  { id: 'faq-2', question: 'Kann ich eine Wise-Karte in Indonesien nutzen?', answer: 'Ja, die Wise-Karte funktioniert an den meisten Geldautomaten und Kartenterminals.' },
  { id: 'faq-3', question: 'Was ist der Mindestbetrag für QRIS?', answer: 'Es gibt keinen Mindestbetrag. Sogar Rp 1.000-Transaktionen funktionieren.' },
  { id: 'faq-4', question: 'Akzeptieren Beach Clubs auf Bali QRIS?', answer: 'Die meisten beliebten Beach Clubs (Finns, Potato Head, Ku De Ta) akzeptieren QR und Karten.' },
  { id: 'faq-5', question: 'Ist IDR am Flughafen erhältlich?', answer: 'Ja, wechseln am Flughafen oder am Geldautomaten abheben. Die besten Kurse findest du in der Stadt.' },
];

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

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE_EN,
  description: DESC_EN,
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/indonesia/qris-tourist-guide' },
};

function Stars({ count }: { count: number }) {
  return <span className="text-amber-500">{'⭐'.repeat(count)}</span>;
}

export default function QrisTouristGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  const jsonLdFaq = buildJsonLdFaq(locale === 'de' ? FAQ_DE : FAQ_EN);

  return (
    <>
      <Script id="json-ld-qris-tourist-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }} />
      <Script id="json-ld-qris-tourist-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <PageContent locale={locale} />
    </>
  );
}

function PageContent({ locale }: { locale: 'en' | 'de' }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Indonesia', href: '/guides/indonesia' },
          { label: locale === 'de' ? 'Touristen-Guide' : 'Tourist Guide' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'QRIS Touristen-Guide' : 'QRIS Tourist Guide'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? 'Der ehrliche Guide für internationale Besucher Indonesiens'
            : 'The honest guide for international visitors to Indonesia'}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* Quick answer */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 space-y-2">
            <p className="font-bold text-green-800">✅ {locale === 'de' ? 'JA, direkt, wenn aus:' : 'YES – if from:'}</p>
            <p className="text-green-700 text-sm">Singapore, Malaysia, Thailand, India, Japan, China</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-2">
            <p className="font-bold text-amber-800">⚙️ {locale === 'de' ? 'Vorbereitung nötig:' : 'SETUP needed:'}</p>
            <p className="text-amber-700 text-sm">{locale === 'de' ? 'GoPay/OVO mit internationaler Karte' : 'GoPay/OVO with international card'}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <p className="font-bold text-slate-700">❌ {locale === 'de' ? 'Nicht direkt:' : 'Not direct:'}</p>
            <p className="text-slate-600 text-sm">
              USA, UK, EU, Australia {locale === 'de' ? '(Karte nutzen oder GoPay einrichten)' : '(use card or set up GoPay)'}
            </p>
          </div>
        </section>

        {/* Country cards */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Grenzüberschreitende Länder – im Detail' : 'Cross-Border Countries – Detailed'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COUNTRY_CARDS.map((c) => (
              <div key={c.flag} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-2">
                <div className="flex items-center gap-2">
                  <Flag code={c.flag} className="text-2xl" />
                  <h3 className="font-semibold text-slate-900">{locale === 'de' ? c.nameDe : c.nameEn}</h3>
                </div>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li><strong>{locale === 'de' ? 'Funktioniert' : 'Works'}:</strong> ✅ {locale === 'de' ? c.worksDe : c.worksEn}</li>
                  <li><strong>{locale === 'de' ? 'Apps' : 'Apps'}:</strong> {locale === 'de' ? c.appDe : c.appEn}</li>
                  <li>{locale === 'de' ? c.sinceDe : c.sinceEn}</li>
                  <li><strong>{locale === 'de' ? 'Kurs' : 'Rate'}:</strong> {locale === 'de' ? c.rateDe : c.rateEn}</li>
                  <li><strong>{locale === 'de' ? 'Einfachheit' : 'Ease'}:</strong> <Stars count={c.ease} /></li>
                </ul>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-2">
                <Flag code="jp" className="text-2xl" />
                <h3 className="font-semibold text-slate-900">Japan</h3>
              </div>
              <p className="text-sm text-slate-600">
                {locale === 'de' ? 'Über das JCB-QR-Netzwerk — ausgewählte Händler' : 'Via JCB QR network — select merchants'}
              </p>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-2">
                <Flag code="cn" className="text-2xl" />
                <h3 className="font-semibold text-slate-900">China</h3>
              </div>
              <p className="text-sm text-slate-600">
                {locale === 'de'
                  ? 'Alipay und WeChat Pay — sehr weit akzeptiert, besonders an touristischen Orten'
                  : 'Alipay and WeChat Pay — very widely accepted, especially in tourist spots'}
              </p>
            </div>
          </div>
        </section>

        {/* Non-ASEAN */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Für Touristen außerhalb ASEANs' : 'For Non-ASEAN Tourists'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-2">{locale === 'de' ? 'GoPay für Touristen' : 'GoPay for Tourists'}</h3>
              <ul className="text-sm text-slate-600 space-y-1.5">
                <li>• {locale === 'de' ? 'GoPay akzeptiert internationale Visa/Mastercard' : 'GoPay accepts international Visa/Mastercard'}</li>
                <li>• {locale === 'de' ? 'GoPay-App herunterladen (international verfügbar)' : 'Download GoPay app (available internationally)'}</li>
                <li>• {locale === 'de' ? 'Mit ausländischer Telefonnummer registrieren' : 'Register with foreign phone number'}</li>
                <li>• {locale === 'de' ? 'Mit Kreditkarte aufladen' : 'Top up with credit card'}</li>
                <li>• {locale === 'de' ? 'Funktioniert bei allen 30M+ QRIS-Händlern' : 'Works at all 30M+ QRIS merchants'}</li>
              </ul>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-2">{locale === 'de' ? 'OVO für Touristen' : 'OVO for Tourists'}</h3>
              <ul className="text-sm text-slate-600 space-y-1.5">
                <li>• {locale === 'de' ? 'Ähnlich wie GoPay' : 'Similar to GoPay'}</li>
                <li>• {locale === 'de' ? 'OVO akzeptiert einige ausländische Karten' : 'OVO accepts some foreign cards'}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Bali tips */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Bali-spezifische Tipps' : 'Bali Specific Tips'}
          </h2>
          <div className="text-slate-600 leading-relaxed text-[15px] space-y-2">
            {locale === 'de' ? (
              <>
                <p>Bali ist Indonesiens bargeldlos-freundlichste Region.</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Die meisten Beach Clubs: QRIS + Karten</li>
                  <li>Kuta, Seminyak, Canggu: Sehr QR-freundlich</li>
                  <li>Ubud: Mix aus QR und Bargeld</li>
                  <li>Entfernte Gebiete (Tempel, Reisfelder): Bargeld bevorzugt</li>
                  <li>Habe immer Rp 100.000–200.000 Bargeld als Backup dabei</li>
                </ul>
              </>
            ) : (
              <>
                <p>Bali is Indonesia&apos;s most cashless-friendly area.</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Most beach clubs: QRIS + cards</li>
                  <li>Kuta, Seminyak, Canggu: Very QR-friendly</li>
                  <li>Ubud: Mix of QR and cash</li>
                  <li>Remote areas (temples, rice fields): Cash preferred</li>
                  <li>Always carry Rp 100,000–200,000 cash as backup</li>
                </ul>
              </>
            )}
          </div>
          <p className="text-sm">
            <Link href="/guides/indonesia/cashless-travel-bali" className="text-blue-700 font-medium hover:underline">
              {locale === 'de' ? 'Vollständigen Bali-Guide lesen →' : 'Read the full Bali guide →'}
            </Link>
          </p>
        </section>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
          <Accordion items={locale === 'de' ? FAQ_DE : FAQ_EN} />
        </section>

        {/* CTA */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-blue-900 text-lg">
            {locale === 'de' ? 'Bist du Händler in Indonesien?' : 'Are you a merchant in Indonesia?'}
          </p>
          <Link
            href="/qris/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#1A56DB' }}
          >
            {locale === 'de' ? 'QRIS-Code erstellen →' : 'Generate QRIS Code →'}
          </Link>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">{locale === 'de' ? 'Mehr zu Indonesien' : 'Related in Indonesia'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RelatedToolCard
              icon="🏖️"
              name={locale === 'de' ? 'Bargeldlos auf Bali' : 'Cashless Bali Guide'}
              url="/guides/indonesia/cashless-travel-bali"
              description={locale === 'de' ? 'Beach Clubs, Warungs und Villen' : 'Beach clubs, warungs and villas'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="📖"
              name={locale === 'de' ? 'Wie man QRIS benutzt' : 'How to Use QRIS'}
              url="/guides/indonesia/how-to-use-qris"
              description={locale === 'de' ? 'Schritt-für-Schritt-Anleitung' : 'Step-by-step instructions'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
