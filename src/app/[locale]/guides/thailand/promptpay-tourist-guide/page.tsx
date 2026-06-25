import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Accordion from '@/components/ui/Accordion';
import type { AccordionItem } from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'PromptPay Tourist Guide 2026 – Can Foreigners Use PromptPay?';
const TITLE_DE = 'PromptPay Touristen-Guide 2026 – Können Ausländer PromptPay nutzen?';
const DESC_EN =
  "Can tourists use PromptPay in Thailand? Yes – if you're from Singapore, Malaysia, India or Indonesia. Here's exactly how cross-border QR payments work.";
const DESC_DE =
  'Können Touristen PromptPay in Thailand nutzen? Ja – wenn du aus Singapur, Malaysia, Indien oder Indonesien kommst. So funktionieren grenzüberschreitende QR-Zahlungen genau.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['promptpay tourist', 'can foreigners use promptpay', 'promptpay cross border', 'paynow thailand', 'duitnow thailand', 'upi thailand'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/thailand/promptpay-tourist-guide'),
    openGraph: buildOpenGraph(locale, '/guides/thailand/promptpay-tourist-guide', title, description),
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
    flag: 'sg',
    nameEn: 'Singapore PayNow Users',
    nameDe: 'Singapur PayNow-Nutzer',
    appEn: 'Any Singapore banking app (DBS, OCBC, UOB, GrabPay)',
    appDe: 'Jede Singapur-Banking-App (DBS, OCBC, UOB, GrabPay)',
    scanEn: 'Scan Thai PromptPay QR codes directly',
    scanDe: 'Scannt thailändische PromptPay-QR-Codes direkt',
    currencyEn: 'SGD automatically converted to THB',
    currencyDe: 'SGD wird automatisch in THB umgerechnet',
    sinceEn: 'Works since: 2021',
    sinceDe: 'Funktioniert seit: 2021',
    ease: 5,
  },
  {
    flag: 'my',
    nameEn: 'Malaysia DuitNow Users',
    nameDe: 'Malaysia DuitNow-Nutzer',
    appEn: 'Maybank, CIMB, Touch n Go eWallet',
    appDe: 'Maybank, CIMB, Touch n Go eWallet',
    scanEn: 'Scan Thai PromptPay QR codes',
    scanDe: 'Scannt thailändische PromptPay-QR-Codes',
    currencyEn: 'MYR → THB',
    currencyDe: 'MYR → THB',
    sinceEn: '',
    sinceDe: '',
    ease: 5,
  },
  {
    flag: 'in',
    nameEn: 'India UPI Users',
    nameDe: 'Indien UPI-Nutzer',
    appEn: 'PhonePe, Google Pay, Paytm',
    appDe: 'PhonePe, Google Pay, Paytm',
    scanEn: 'Scan Thai PromptPay QR codes',
    scanDe: 'Scannt thailändische PromptPay-QR-Codes',
    currencyEn: 'INR → THB',
    currencyDe: 'INR → THB',
    sinceEn: 'Works: In select Thai merchants',
    sinceDe: 'Funktioniert: bei ausgewählten thailändischen Händlern',
    ease: 4,
  },
  {
    flag: 'id',
    nameEn: 'Indonesia QRIS Users',
    nameDe: 'Indonesien QRIS-Nutzer',
    appEn: 'GoPay, OVO, Dana, LinkAja',
    appDe: 'GoPay, OVO, Dana, LinkAja',
    scanEn: 'Scan Thai PromptPay QR codes',
    scanDe: 'Scannt thailändische PromptPay-QR-Codes',
    currencyEn: 'IDR → THB',
    currencyDe: 'IDR → THB',
    sinceEn: '',
    sinceDe: '',
    ease: 4,
  },
];

const WESTERN_OPTIONS = [
  { icon: '💳', en: 'Wise card (best exchange rates, widely accepted)', de: 'Wise-Karte (beste Wechselkurse, weit verbreitet)' },
  { icon: '💳', en: 'Revolut card (no foreign transaction fees)', de: 'Revolut-Karte (keine Auslandsgebühren)' },
  { icon: '📱', en: 'WeChat Pay International (if you have WeChat)', de: 'WeChat Pay International (falls du WeChat hast)' },
  { icon: '🏧', en: 'ATM withdrawal (widely available, ~220 THB fee)', de: 'Geldautomat (weit verbreitet, ~220 THB Gebühr)' },
  { icon: '💵', en: 'Cash exchange (Superrich, etc.)', de: 'Bargeldwechsel (Superrich u.a.)' },
];

const TIPS_EN = [
  'Always have some cash as backup (฿1,000–2,000)',
  '7-Eleven accepts QR everywhere',
  'Grab app is most reliable for transport',
  'Download your home country banking app BEFORE traveling',
  "Check your bank's foreign transaction fees",
];
const TIPS_DE = [
  'Habe immer etwas Bargeld als Backup (฿1.000–2.000)',
  '7-Eleven akzeptiert QR überall',
  'Die Grab-App ist am zuverlässigsten für Transport',
  'Lade deine heimische Banking-App VOR der Reise herunter',
  'Prüfe die Auslandsgebühren deiner Bank',
];

const FAQ_EN: AccordionItem[] = [
  { id: 'faq-1', question: 'Can I register PromptPay as a tourist?', answer: 'No, PromptPay requires a Thai bank account and Thai phone number.' },
  { id: 'faq-2', question: 'Which Thai QR app works best for foreigners?', answer: "If you're from SG/MY/IN/ID, your home banking app works directly." },
  { id: 'faq-3', question: 'Is QR payment safe in Thailand?', answer: 'Yes, all transactions require PIN/biometric authentication.' },
  { id: 'faq-4', question: 'Can I pay at 7-Eleven with QR in Thailand?', answer: 'Yes! 7-Eleven Thailand accepts PromptPay QR nationwide.' },
  { id: 'faq-5', question: "What if a Thai merchant doesn't have QR?", answer: 'Carry cash (Thai Baht) as backup. Many smaller vendors still prefer cash.' },
];
const FAQ_DE: AccordionItem[] = [
  { id: 'faq-1', question: 'Kann ich mich als Tourist bei PromptPay registrieren?', answer: 'Nein, PromptPay erfordert ein thailändisches Bankkonto und eine thailändische Telefonnummer.' },
  { id: 'faq-2', question: 'Welche Thai-QR-App funktioniert am besten für Ausländer?', answer: 'Wenn du aus SG/MY/IN/ID kommst, funktioniert deine heimische Banking-App direkt.' },
  { id: 'faq-3', question: 'Ist QR-Zahlung in Thailand sicher?', answer: 'Ja, alle Transaktionen erfordern PIN- oder biometrische Authentifizierung.' },
  { id: 'faq-4', question: 'Kann ich bei 7-Eleven in Thailand mit QR bezahlen?', answer: 'Ja! 7-Eleven Thailand akzeptiert PromptPay-QR landesweit.' },
  { id: 'faq-5', question: 'Was, wenn ein thailändischer Händler kein QR hat?', answer: 'Habe Bargeld (Thai Baht) als Backup dabei. Viele kleinere Händler bevorzugen weiterhin Bargeld.' },
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
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/thailand/promptpay-tourist-guide' },
};

function Stars({ count }: { count: number }) {
  return <span className="text-amber-500">{'⭐'.repeat(count)}</span>;
}

export default function PromptPayTouristGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  const jsonLdFaq = buildJsonLdFaq(locale === 'de' ? FAQ_DE : FAQ_EN);

  return (
    <>
      <Script id="json-ld-tourist-guide-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }} />
      <Script id="json-ld-tourist-guide-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
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
          { label: 'Thailand', href: '/guides/thailand' },
          { label: locale === 'de' ? 'Touristen-Guide' : 'Tourist Guide' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'PromptPay Touristen-Guide' : 'PromptPay Tourist Guide'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? 'Können Ausländer PromptPay nutzen? Hier ist die ehrliche Antwort.'
            : "Can foreigners use PromptPay? Here's the honest answer."}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* Short Answer */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 space-y-2">
            <p className="font-bold text-green-800">✅ {locale === 'de' ? 'JA, wenn du herkommst aus:' : 'YES if you’re from:'}</p>
            <p className="text-green-700 text-sm">Singapore, Malaysia, India, Indonesia, Japan, China</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-2">
            <p className="font-bold text-amber-800">❌ {locale === 'de' ? 'Benötigt Vorbereitung, wenn du herkommst aus:' : 'Requires setup if you’re from:'}</p>
            <p className="text-amber-700 text-sm">USA, UK, EU, Australia, {locale === 'de' ? 'andere Länder' : 'other countries'}</p>
          </div>
        </section>

        {/* Country cards */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Grenzüberschreitende Zahlungsländer – im Detail' : 'Cross-Border Payment Countries – Detailed'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COUNTRY_CARDS.map((c) => (
              <div key={c.flag} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-2">
                <div className="flex items-center gap-2">
                  <Flag code={c.flag} className="text-2xl" />
                  <h3 className="font-semibold text-slate-900">{locale === 'de' ? c.nameDe : c.nameEn}</h3>
                </div>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li><strong>{locale === 'de' ? 'App' : 'App'}:</strong> {locale === 'de' ? c.appDe : c.appEn}</li>
                  <li><strong>{locale === 'de' ? 'Scannen' : 'Scan'}:</strong> {locale === 'de' ? c.scanDe : c.scanEn}</li>
                  <li><strong>{locale === 'de' ? 'Währung' : 'Currency'}:</strong> {locale === 'de' ? c.currencyDe : c.currencyEn}</li>
                  {(locale === 'de' ? c.sinceDe : c.sinceEn) && <li>{locale === 'de' ? c.sinceDe : c.sinceEn}</li>}
                  <li><strong>{locale === 'de' ? 'Einfachheit' : 'Ease'}:</strong> <Stars count={c.ease} /></li>
                </ul>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-2">
                <Flag code="jp" className="text-2xl" />
                <h3 className="font-semibold text-slate-900">{locale === 'de' ? 'Japan' : 'Japan'}</h3>
              </div>
              <p className="text-sm text-slate-600">
                {locale === 'de' ? 'Über JCB-QR-Zahlung möglich' : 'Via JCB QR Payment'} —{' '}
                {locale === 'de' ? 'funktioniert bei ausgewählten Händlern' : 'works at select merchants'}
              </p>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-2">
                <Flag code="cn" className="text-2xl" />
                <h3 className="font-semibold text-slate-900">{locale === 'de' ? 'China' : 'China'}</h3>
              </div>
              <p className="text-sm text-slate-600">
                {locale === 'de'
                  ? 'Alipay und WeChat Pay werden in Touristengebieten weit akzeptiert, besonders in Bangkok, Phuket und Chiang Mai.'
                  : 'Alipay and WeChat Pay are accepted widely in tourist areas, especially in Bangkok, Phuket and Chiang Mai.'}
              </p>
            </div>
          </div>
        </section>

        {/* Western tourists */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Für westliche Touristen (USA, UK, EU, AU)' : 'For Western Tourists (US, UK, EU, AU)'}
          </h2>
          <h3 className="text-lg font-semibold text-slate-800">
            {locale === 'de' ? 'Was du stattdessen nutzen kannst' : 'What to Use Instead'}
          </h3>
          <ol className="space-y-2">
            {WESTERN_OPTIONS.map(({ icon, en, de }, i) => (
              <li key={en} className="flex items-center gap-3 text-sm text-slate-700">
                <span className="font-bold text-slate-400 w-5">{i + 1}.</span>
                <span>{icon}</span>
                <span>{locale === 'de' ? de : en}</span>
              </li>
            ))}
          </ol>
          <p className="text-slate-600 leading-relaxed text-[15px] bg-slate-50 border border-slate-200 rounded-xl p-4">
            {locale === 'de'
              ? 'PromptPay selbst erfordert ein thailändisches Bankkonto – du musst in Thailand leben oder eine thailändische nationale ID besitzen, um dich zu registrieren.'
              : "PromptPay itself requires a Thai bank account – you need to live in Thailand or have a Thai national ID to register."}
          </p>
        </section>

        {/* Practical tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Praktische Tipps für Thailand' : 'Practical Tips for Thailand'}
          </h2>
          <ul className="space-y-2">
            {(locale === 'de' ? TIPS_DE : TIPS_EN).map((tip) => (
              <li key={tip} className="flex gap-3 text-sm text-slate-700">
                <span className="text-blue-600">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
          <Accordion items={locale === 'de' ? FAQ_DE : FAQ_EN} />
        </section>

        {/* CTA */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-blue-900 text-lg">
            {locale === 'de' ? 'Bist du Händler in Thailand?' : 'Are you a merchant in Thailand?'}
          </p>
          <Link
            href="/promptpay/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#1A56DB' }}
          >
            {locale === 'de' ? 'PromptPay QR-Code erstellen →' : 'Generate PromptPay QR Code →'}
          </Link>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">{locale === 'de' ? 'Mehr zu Thailand' : 'Related in Thailand'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RelatedToolCard
              icon="✈️"
              name={locale === 'de' ? 'Bargeldlos reisen' : 'Cashless Travel Guide'}
              url="/guides/thailand/cashless-travel-thailand"
              description={locale === 'de' ? 'Dein kompletter Guide für bargeldloses Reisen in Thailand' : 'Your complete guide to going cash-free in Thailand'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="📖"
              name={locale === 'de' ? 'Wie man PromptPay benutzt' : 'How to Use PromptPay'}
              url="/guides/thailand/how-to-use-promptpay"
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
