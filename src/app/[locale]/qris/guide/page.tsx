import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/seo';
import { qrisGuideContent } from '@/content/qris/guide';
import type { GuideContent } from '@/content/types';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const content = qrisGuideContent[locale as 'en' | 'de'] ?? qrisGuideContent.en;
  return {
    title: `${content.title} | QRPayHub`,
    description: content.description,
    keywords: [
      'qris guide',
      'how qris works',
      'qris emv payload',
      'qris nmid',
      'indonesia qr payment guide',
      'bank indonesia qris',
      'qris merchant types',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/qris/guide'),
  };
}

const MERCHANT_CATEGORIES = [
  {
    type: 'Usaha Mikro',
    english: 'Micro',
    criteria: 'A',
    revenue: '< Rp 300 million / year',
    mdr: '0.3%',
    examples: 'Street vendors, warungs, food stalls',
    color: 'bg-green-50 text-green-700 border-green-200',
  },
  {
    type: 'Usaha Kecil',
    english: 'Small',
    criteria: 'A',
    revenue: 'Rp 300M – 2.5B / year',
    mdr: '0.7%',
    examples: 'Local shops, small restaurants, service providers',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    type: 'Usaha Menengah',
    english: 'Medium',
    criteria: 'B',
    revenue: 'Rp 2.5B – 50B / year',
    mdr: '0.7%',
    examples: 'Regional chains, mid-sized businesses',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
  },
  {
    type: 'Usaha Besar',
    english: 'Large',
    criteria: 'C',
    revenue: '> Rp 50 billion / year',
    mdr: '0.7%',
    examples: 'Shopping malls, major retailers, corporations',
    color: 'bg-red-50 text-red-700 border-red-200',
  },
];

const EMV_TAGS = [
  { id: '00', name: 'Payload Format Indicator',     value: '01',                    required: true,  description: 'Always "01" – EMV Merchant Presented Mode' },
  { id: '01', name: 'Point of Initiation Method',   value: '11 or 12',              required: true,  description: '11 = static (no preset amount), 12 = dynamic (amount embedded)' },
  { id: '26', name: 'Merchant Account – QRIS',      value: 'ID.CO.QRIS.WWW + NMID', required: true,  description: 'Application Identifier + National Merchant ID' },
  { id: '52', name: 'Merchant Category Code',       value: '0000',                  required: true,  description: 'ISO 18245 MCC – business category of merchant' },
  { id: '53', name: 'Transaction Currency',         value: '360',                   required: true,  description: 'ISO 4217 numeric code for Indonesian Rupiah (IDR)' },
  { id: '54', name: 'Transaction Amount',           value: '50000',                 required: false, description: 'Present only in dynamic QR codes; absent in static codes' },
  { id: '58', name: 'Country Code',                 value: 'ID',                    required: true,  description: 'ISO 3166-1 alpha-2 – Indonesia' },
  { id: '59', name: 'Merchant Name',                value: 'Warung Pak Budi',       required: true,  description: 'Name displayed on payer\'s screen, max 25 characters' },
  { id: '60', name: 'Merchant City',                value: 'Jakarta',               required: true,  description: 'City of merchant location' },
  { id: '62', name: 'Additional Data Field',        value: 'terminal / reference',  required: false, description: 'Optional terminal ID, reference ID, or customer label' },
  { id: '63', name: 'CRC',                          value: '4-digit hex',           required: true,  description: 'CRC16-CCITT checksum of the entire payload including "6304"' },
];

const CROSS_BORDER = [
  { country: 'Thailand',     network: 'PromptPay',   flag: '🇹🇭', since: '2021' },
  { country: 'Malaysia',     network: 'DuitNow',     flag: '🇲🇾', since: '2022' },
  { country: 'Singapore',    network: 'PayNow',      flag: '🇸🇬', since: '2022' },
  { country: 'Philippines',  network: 'QR Ph',       flag: '🇵🇭', since: '2023' },
  { country: 'Vietnam',      network: 'VietQR',      flag: '🇻🇳', since: '2023' },
  { country: 'India',        network: 'UPI',         flag: '🇮🇳', since: '2023' },
  { country: 'Japan',        network: 'JCB / local', flag: '🇯🇵', since: '2024' },
];

const BEFORE_AFTER = [
  { aspect: 'QR codes needed',    before: '5+ (GoPay, OVO, Dana, LinkAja…)', after: '1 (QRIS)' },
  { aspect: 'Counter space',      before: 'Multiple stickers cluttering desk', after: 'One clean QRIS sticker' },
  { aspect: 'App compatibility',  before: 'Each code only for one app',        after: 'Any QRIS-enabled app' },
  { aspect: 'Merchant setup',     before: 'Register with each wallet separately', after: 'One Bank Indonesia registration' },
  { aspect: 'Settlement',         before: 'Fragmented across app wallets',     after: 'Unified via BI-FAST' },
];

const QRIS_APPS = [
  { name: 'GoPay',      color: 'bg-green-100 text-green-700 border-green-200' },
  { name: 'OVO',        color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { name: 'Dana',       color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { name: 'LinkAja',    color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'ShopeePay',  color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { name: 'BCA Mobile', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  { name: 'Mandiri',    color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { name: 'BRI',        color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { name: 'BNI',        color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { name: 'CIMB Niaga', color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'Permata',    color: 'bg-teal-100 text-teal-700 border-teal-200' },
  { name: 'Jenius',     color: 'bg-sky-100 text-sky-700 border-sky-200' },
  { name: 'Allo Bank',  color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "How QRIS Works – Complete Guide to Indonesia's QR Payment",
  description:
    "Complete guide to QRIS: Indonesia's national QR payment standard. NMID, merchant types, EMV format, cross-border payments and how to generate for free.",
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/qris/guide' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'QRIS', item: 'https://qrpayhub.com/en/qris' },
      { '@type': 'ListItem', position: 3, name: 'Guide', item: 'https://qrpayhub.com/en/qris/guide' },
    ],
  },
};

export default function QRISGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'de';
  const content = qrisGuideContent[locale] ?? qrisGuideContent.en;
  return (
    <>
      <Script
        id="json-ld-qris-guide"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }}
      />
      <PageContent content={content} locale={locale} />
    </>
  );
}

function PageContent({ content, locale }: { content: GuideContent; locale: 'en' | 'de' }) {
  const sectionMap = Object.fromEntries(content.sections.map((s) => [s.id, s]));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">

      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'QRIS', href: '/qris' },
        { label: 'Guide' },
      ]} />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {content.title}
        </h1>
        <p className="text-lg text-slate-500">{content.description}</p>
        <div className="flex items-center gap-3">
          <Link
            href="/qris/generator"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            {locale === 'de' ? 'Zum Generator →' : 'Try the Generator →'}
          </Link>
          <Link
            href="/qris/faq"
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold rounded-xl transition-colors"
          >
            {locale === 'de' ? 'QRIS FAQ →' : 'QRIS FAQ →'}
          </Link>
        </div>
      </header>

      <div className="space-y-14 pt-4">

        {/* Section 1: What is QRIS */}
        {sectionMap['what-is-qris'] && (
          <Section id="what-is-qris" title={sectionMap['what-is-qris'].heading}>
            <Prose>
              <p>{sectionMap['what-is-qris'].content}</p>
            </Prose>
          </Section>
        )}

        {/* Section 2: Revolution */}
        {sectionMap['revolution'] && (
          <Section id="revolution" title={sectionMap['revolution'].heading}>
            <Prose>
              <p>{sectionMap['revolution'].content}</p>
            </Prose>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-4">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">
                      {locale === 'de' ? 'Aspekt' : 'Aspect'}
                    </th>
                    <th className="px-4 py-3 font-semibold text-red-700 border-b border-slate-200">
                      {locale === 'de' ? 'Vor QRIS' : 'Before QRIS'}
                    </th>
                    <th className="px-4 py-3 font-semibold text-green-700 border-b border-slate-200">
                      {locale === 'de' ? 'Nach QRIS' : 'After QRIS'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {BEFORE_AFTER.map(({ aspect, before, after }) => (
                    <tr key={aspect} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-700">{aspect}</td>
                      <td className="px-4 py-3 text-slate-500">{before}</td>
                      <td className="px-4 py-3 text-green-700 font-medium">{after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* Section 3: Step by Step */}
        {sectionMap['how-it-works'] && (
          <Section id="how-it-works" title={sectionMap['how-it-works'].heading}>
            <ol className="space-y-4">
              {[
                {
                  step: 1,
                  title: locale === 'de' ? 'Händler zeigt QRIS-Code an' : 'Merchant displays their QRIS code',
                  body: locale === 'de'
                    ? 'Statische Codes werden auf Aufklebern gedruckt. Dynamische Codes mit voreingestelltem Betrag werden pro Transaktion für E-Commerce oder Rechnungen generiert.'
                    : 'Static codes are printed on stickers. Dynamic codes with a preset amount are generated per transaction for e-commerce or invoices.',
                },
                {
                  step: 2,
                  title: locale === 'de' ? 'Kunde öffnet eine QRIS-fähige App' : 'Customer opens any QRIS-enabled app',
                  body: locale === 'de'
                    ? 'GoPay, OVO, Dana, LinkAja, ShopeePay, BCA Mobile, Mandiri Livin\' oder eine der 50+ teilnehmenden Apps — alle vollständig interoperabel.'
                    : "GoPay, OVO, Dana, LinkAja, ShopeePay, BCA Mobile, Mandiri Livin' or any of the 50+ participating apps — all fully interoperable.",
                },
                {
                  step: 3,
                  title: locale === 'de' ? 'Kunde scannt den QRIS QR-Code' : 'Customer scans the QRIS QR code',
                  body: locale === 'de'
                    ? 'Der Code kann von einem gedruckten Aufkleber, einem Handybildschirm, einer PDF-Datei oder einer anderen Oberfläche gescannt werden.'
                    : 'The code can be scanned from a printed sticker, a phone screen, a PDF, or any other surface.',
                },
                {
                  step: 4,
                  title: locale === 'de' ? 'Zahlungsdetails erscheinen automatisch' : 'Payment details appear automatically',
                  body: locale === 'de'
                    ? 'Händlername, NMID und Betrag (falls eingebettet) werden aus dem EMV-Payload ausgelesen. Bei statischen QR-Codes gibt der Kunde den Betrag manuell ein.'
                    : 'Merchant name, NMID, and amount (if embedded) are parsed from the EMV payload. For static codes, the customer enters the amount manually.',
                },
                {
                  step: 5,
                  title: locale === 'de' ? 'Kunde gibt PIN ein oder nutzt Biometrie' : 'Customer enters PIN or uses biometrics',
                  body: locale === 'de'
                    ? 'Authentifizierung erfolgt in der App. Der PIN wird nie übertragen und nicht im QR-Code gespeichert.'
                    : 'Authentication happens in the app. The PIN is never transmitted and never stored in the QR code.',
                },
                {
                  step: 6,
                  title: locale === 'de' ? 'Transaktion über BI-FAST verarbeitet' : 'Transaction processes via BI-FAST',
                  body: locale === 'de'
                    ? 'Bank Indonesias nationale Switching-Infrastruktur wickelt die Zahlung in Echtzeit ab — 24/7/365 einschließlich Feiertagen.'
                    : "Bank Indonesia's national switching infrastructure settles the payment in real time — 24/7/365 including holidays.",
                },
                {
                  step: 7,
                  title: locale === 'de' ? 'Beide Parteien erhalten Bestätigung' : 'Both parties receive confirmation',
                  body: locale === 'de'
                    ? 'Zahlender erhält Erfolgsmeldung mit Transaktionsreferenz. Händler erhält sofortige Gutschriftsbenachrichtigung.'
                    : 'Payer receives a success notification with transaction reference. Merchant receives instant credit notification.',
                },
              ].map(({ step, title, body }) => (
                <li key={step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                    {step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{title}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {/* Section 4: Merchant Categories */}
        {sectionMap['merchant-categories'] && (
          <Section id="merchant-categories" title={sectionMap['merchant-categories'].heading}>
            <Prose>
              <p>{sectionMap['merchant-categories'].content}</p>
            </Prose>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-4">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    {(locale === 'de'
                      ? ['Kategorie', 'Englisch', 'Kriterien-Code', 'Jahresumsatz', 'MDR', 'Beispiele']
                      : ['Category', 'English', 'Criteria Code', 'Annual Revenue', 'MDR', 'Examples']
                    ).map(h => (
                      <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MERCHANT_CATEGORIES.map(({ type, english, criteria, revenue, mdr, examples, color }) => (
                    <tr key={type} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${color}`}>{type}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-700">{english}</td>
                      <td className="px-4 py-3 font-mono text-slate-600">{criteria}</td>
                      <td className="px-4 py-3 text-slate-600">{revenue}</td>
                      <td className="px-4 py-3 font-bold text-slate-800">{mdr}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{examples}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* Section 5: EMV Payload */}
        {sectionMap['payload-emv'] && (
          <Section id="payload-emv" title={sectionMap['payload-emv'].heading}>
            <Prose>
              <p>{sectionMap['payload-emv'].content}</p>
            </Prose>
            <pre className="bg-slate-900 text-emerald-400 text-xs font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4 whitespace-pre-wrap break-all">
{`000201
010211
2660
  0016ID.CO.QRIS.WWW
  0117ID1234567890123
52040000
5303360
5802ID
5915Warung Pak Budi
6006Jakarta
63041A2B`}
            </pre>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-4">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    {(locale === 'de'
                      ? ['Tag ID', 'Feldname', 'Beispielwert', 'Pflicht', 'Beschreibung']
                      : ['Tag ID', 'Field Name', 'Example Value', 'Required', 'Description']
                    ).map(h => (
                      <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {EMV_TAGS.map(({ id, name, value, required, description }) => (
                    <tr key={id} className={id === '26' ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-slate-50'}>
                      <td className="px-4 py-3 font-mono font-bold text-red-600">{id}</td>
                      <td className="px-4 py-3 font-semibold text-slate-700">{name}</td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-500">{value}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${required ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'}`}>
                          {required ? (locale === 'de' ? 'Pflicht' : 'Required') : (locale === 'de' ? 'Optional' : 'Optional')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600 text-sm">{description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* Section 6: Cross-Border */}
        {sectionMap['cross-border'] && (
          <Section id="cross-border" title={sectionMap['cross-border'].heading}>
            <Prose>
              <p>{sectionMap['cross-border'].content}</p>
            </Prose>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
              {CROSS_BORDER.map(({ country, network, flag, since }) => (
                <div key={country} className="bg-white border border-slate-100 rounded-xl p-3 flex items-start gap-2.5 shadow-sm">
                  <span className="text-2xl flex-shrink-0">{flag}</span>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{country}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{network}</p>
                    <p className="text-xs text-slate-300 mt-0.5">{locale === 'de' ? `Seit ${since}` : `Since ${since}`}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Section 7: Supported Apps */}
        {sectionMap['supported-apps'] && (
          <Section id="supported-apps" title={sectionMap['supported-apps'].heading}>
            <Prose>
              <p>{sectionMap['supported-apps'].content}</p>
            </Prose>
            <div className="flex flex-wrap gap-2.5 mt-3">
              {QRIS_APPS.map(({ name, color }) => (
                <span key={name} className={`px-3 py-1.5 rounded-xl border text-sm font-semibold ${color}`}>{name}</span>
              ))}
              <span className="px-3 py-1.5 rounded-xl border text-sm font-semibold bg-slate-100 text-slate-600 border-slate-200">
                {locale === 'de' ? '50+ weitere…' : '50+ more…'}
              </span>
            </div>
          </Section>
        )}

        {/* Section 8: For Merchants */}
        {sectionMap['for-merchants'] && (
          <Section id="for-merchants" title={sectionMap['for-merchants'].heading}>
            <Prose>
              <p>{sectionMap['for-merchants'].content}</p>
            </Prose>
            <ul className="space-y-3 mt-2">
              {[
                {
                  icon: '📱',
                  title: locale === 'de' ? 'Über Ihre Banking-App' : 'Via your bank app',
                  body: locale === 'de'
                    ? 'Die meisten großen indonesischen Banken (BCA, Mandiri, BRI, BNI, CIMB) bieten Händler-QRIS-Registrierung direkt über ihre Business-Banking-Apps oder Filialen an.'
                    : 'Most major Indonesian banks (BCA, Mandiri, BRI, BNI, CIMB) offer merchant QRIS registration directly through their business banking apps or branch offices.',
                },
                {
                  icon: '💚',
                  title: locale === 'de' ? 'Über GoPay / Gojek' : 'Via GoPay / Gojek',
                  body: locale === 'de'
                    ? 'GoTo Financial (GoPay) bietet eine optimierte Händlerregistrierung für Kleinunternehmen an, mit QRIS-Aufkleber-Lieferung an Ihre Adresse.'
                    : 'GoTo Financial (GoPay) offers a streamlined merchant registration for small businesses, with the QRIS sticker delivered to your address.',
                },
                {
                  icon: '🟣',
                  title: locale === 'de' ? 'Über OVO' : 'Via OVO',
                  body: locale === 'de'
                    ? 'OVO Business-Registrierung ergibt einen QRIS-Händlercode, der mit allen QRIS-Apps kompatibel ist — nicht nur OVO-Nutzern.'
                    : 'OVO Business registration gives you a QRIS merchant code compatible with all QRIS apps, not just OVO users.',
                },
                {
                  icon: '🔵',
                  title: locale === 'de' ? 'Über Dana' : 'Via Dana',
                  body: locale === 'de'
                    ? 'Dana for Merchants (Merchant Dana) bietet QRIS-Registrierung mit einem Händler-Dashboard zur Transaktionsverfolgung.'
                    : 'Dana for Merchants (Merchant Dana) offers QRIS registration with a merchant dashboard for tracking transactions.',
                },
              ].map(({ icon, title, body }) => (
                <li key={title} className="flex gap-3 p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                  <span className="text-2xl flex-shrink-0">{icon}</span>
                  <div>
                    <h3 className="font-semibold text-slate-800">{title}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* CTA */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-red-900 text-lg">
            {locale === 'de' ? 'Bereit, Ihren QRIS QR-Code zu erstellen?' : 'Ready to generate your QRIS QR Code?'}
          </p>
          <p className="text-red-700 text-sm">
            {locale === 'de'
              ? 'Kostenlos, sofort, funktioniert mit GoPay, OVO, Dana, LinkAja, ShopeePay und allen QRIS-Apps.'
              : 'Free, instant, works with GoPay, OVO, Dana, LinkAja, ShopeePay and all QRIS apps.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/qris/generator"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-sm transition-colors"
            >
              {locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
            </Link>
            <Link
              href="/qris/faq"
              className="inline-flex items-center gap-2 px-6 py-3 border border-red-200 text-red-800 hover:bg-red-100 font-semibold rounded-xl transition-colors"
            >
              {locale === 'de' ? 'QRIS FAQ lesen →' : 'Read QRIS FAQ →'}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Shared UI helpers ──────────────────────────────────────────────────────────

function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1 text-sm text-slate-400">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {item.href ? (
              <Link href={item.href as `/${string}`} className="hover:text-slate-600 transition-colors">{item.label}</Link>
            ) : (
              <span className="text-slate-900 font-semibold">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-4 scroll-mt-20">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      {children}
    </section>
  );
}

function Prose({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`space-y-3 text-slate-600 leading-relaxed text-[15px] ${className}`}>
      {children}
    </div>
  );
}
