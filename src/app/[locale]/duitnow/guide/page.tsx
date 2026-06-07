import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/seo';
import { duitnowGuideContent } from '@/content/duitnow/guide';
import type { GuideContent } from '@/content/types';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const content = duitnowGuideContent[locale as 'en' | 'de'] ?? duitnowGuideContent.en;
  return {
    title: `${content.title} | QRPayHub`,
    description: content.description,
    keywords: [
      'duitnow guide',
      'how duitnow works',
      'duitnow qr format',
      'duitnow id types',
      'malaysia qr payment guide',
      'paynet duitnow',
      'duitnow emv payload',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/duitnow/guide'),
  };
}

const DUITNOW_ID_TYPES = [
  {
    type: 'Mobile Number',
    tag: '01',
    format: '60123456789',
    example: '0123456789 → 60123456789',
    useCase: 'Personal P2P payments, most common for individuals',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    type: 'MyKad IC Number',
    tag: '02',
    format: 'YYMMDD-PB-###G',
    example: '900101-14-5678 → 900101145678',
    useCase: 'Malaysian citizens and permanent residents',
    color: 'bg-green-50 text-green-700 border-green-200',
  },
  {
    type: 'Passport Number',
    tag: '03',
    format: 'As on passport',
    example: 'A12345678',
    useCase: 'Foreign nationals with Malaysian bank accounts',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    type: 'Business Registration (ROC/ROB)',
    tag: '04',
    format: 'XXXXXXXXXX (ROC) / XXXXXXXX (ROB)',
    example: '202301234567 or 1234567-A',
    useCase: 'Incorporated companies and registered businesses',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
  },
  {
    type: 'Others',
    tag: '05',
    format: 'Varies',
    example: 'Special identifiers',
    useCase: 'Government agencies and special-purpose entities',
    color: 'bg-slate-100 text-slate-600 border-slate-200',
  },
];

const EMV_TAGS = [
  { id: '00', name: 'Payload Format Indicator',        value: '01',                   required: true,  description: 'Always "01" – EMV Merchant Presented Mode version' },
  { id: '01', name: 'Point of Initiation Method',      value: '11 or 12',             required: true,  description: '11 = static (payer enters amount), 12 = dynamic (amount in QR)' },
  { id: '26', name: 'Merchant Account – DuitNow',      value: 'AID + DuitNow ID',     required: true,  description: 'AID: A000000693010011, followed by proxy type tag and value' },
  { id: '52', name: 'Merchant Category Code',          value: '0000',                 required: true,  description: 'ISO 18245 MCC – business category (0000 = not assigned)' },
  { id: '53', name: 'Transaction Currency',            value: '458',                  required: true,  description: 'ISO 4217 numeric code for Malaysian Ringgit (MYR)' },
  { id: '54', name: 'Transaction Amount',              value: '10.50',                required: false, description: 'Present in dynamic QR only; omitted in static codes' },
  { id: '58', name: 'Country Code',                   value: 'MY',                   required: true,  description: 'ISO 3166-1 alpha-2 – Malaysia' },
  { id: '59', name: 'Merchant Name',                  value: 'Ahmad Grocery',        required: true,  description: 'Name shown to payer on confirmation screen, max 25 characters' },
  { id: '60', name: 'Merchant City',                  value: 'Kuala Lumpur',         required: true,  description: 'City of the merchant' },
  { id: '62', name: 'Additional Data Field',          value: 'bill / reference',     required: false, description: 'Optional bill number, terminal ID, or payment reference' },
  { id: '63', name: 'CRC',                            value: '4-digit hex',          required: true,  description: 'CRC16-CCITT checksum of the entire payload including "6304"' },
];

const CROSS_BORDER = [
  { country: 'Singapore',   network: 'PayNow',     flag: '🇸🇬', since: '2021', desc: 'Most active corridor; SGD↔MYR' },
  { country: 'Thailand',    network: 'PromptPay',  flag: '🇹🇭', since: '2022', desc: 'THB↔MYR real-time conversion' },
  { country: 'Indonesia',   network: 'QRIS',       flag: '🇮🇩', since: '2022', desc: 'IDR↔MYR for ASEAN travel' },
  { country: 'Philippines', network: 'QR Ph',      flag: '🇵🇭', since: '2023', desc: 'PHP↔MYR bilateral linkage' },
];

const BANKS_WALLETS = [
  { name: 'Maybank',         type: 'bank',   color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { name: 'CIMB',            type: 'bank',   color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'Public Bank',     type: 'bank',   color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { name: 'RHB',             type: 'bank',   color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { name: 'Hong Leong',      type: 'bank',   color: 'bg-green-100 text-green-700 border-green-200' },
  { name: 'AmBank',          type: 'bank',   color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { name: 'Affin Bank',      type: 'bank',   color: 'bg-slate-100 text-slate-600 border-slate-200' },
  { name: 'Alliance Bank',   type: 'bank',   color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  { name: 'Bank Islam',      type: 'bank',   color: 'bg-teal-100 text-teal-700 border-teal-200' },
  { name: 'Bank Muamalat',   type: 'bank',   color: 'bg-green-100 text-green-800 border-green-200' },
  { name: 'BSN',             type: 'bank',   color: 'bg-blue-100 text-blue-600 border-blue-200' },
  { name: "Touch 'n Go",     type: 'wallet', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { name: 'Boost',           type: 'wallet', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { name: 'GrabPay',         type: 'wallet', color: 'bg-green-100 text-green-700 border-green-200' },
  { name: 'ShopeePay MY',    type: 'wallet', color: 'bg-orange-100 text-orange-800 border-orange-200' },
];

const IBG_COMPARISON = [
  { feature: 'Processing',     ibg: 'Batch (next business day)',  duitnow: 'Real-time (seconds)' },
  { feature: 'Availability',   ibg: 'Business hours only',        duitnow: '24/7/365' },
  { feature: 'Cost (personal)', ibg: 'RM 0.10 – RM 2.00 per txn', duitnow: 'Free up to RM 5,000' },
  { feature: 'Limit',          ibg: 'Varies by bank',             duitnow: 'RM 50,000 standard' },
  { feature: 'Identifier',     ibg: 'Bank account + routing code', duitnow: 'Phone / IC / business reg.' },
  { feature: 'Merchant QR',    ibg: 'Not supported',              duitnow: 'Native DuitNow QR support' },
  { feature: 'Status',         ibg: 'Discontinued / legacy',      duitnow: 'Current standard' },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "How DuitNow Works – Complete Guide to Malaysian Payments",
  description:
    "Complete guide to DuitNow: Malaysia's instant payment system. DuitNow IDs, QR format, supported banks and ASEAN cross-border connections.",
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/duitnow/guide' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',       item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'DuitNow QR', item: 'https://qrpayhub.com/en/duitnow' },
      { '@type': 'ListItem', position: 3, name: 'Guide',      item: 'https://qrpayhub.com/en/duitnow/guide' },
    ],
  },
};

export default function DuitNowGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'de';
  const content = duitnowGuideContent[locale] ?? duitnowGuideContent.en;
  return (
    <>
      <Script
        id="json-ld-duitnow-guide"
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
        { label: 'Home',       href: '/' },
        { label: 'DuitNow QR', href: '/duitnow' },
        { label: 'Guide' },
      ]} />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {content.title}
        </h1>
        <p className="text-lg text-slate-500">{content.description}</p>
        <div className="flex items-center gap-3">
          <Link
            href="/duitnow/generator"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-white text-sm font-semibold rounded-xl transition-colors"
            style={{ backgroundColor: '#CC0001' }}
          >
            {locale === 'de' ? 'Zum Generator →' : 'Try the DuitNow Generator →'}
          </Link>
          <Link
            href="/duitnow/faq"
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold rounded-xl transition-colors"
          >
            {locale === 'de' ? 'DuitNow FAQ →' : 'DuitNow FAQ →'}
          </Link>
        </div>
      </header>

      <div className="space-y-14 pt-4">

        {/* Section 1: What is DuitNow */}
        {sectionMap['what-is-duitnow'] && (
          <Section id="what-is-duitnow" title={sectionMap['what-is-duitnow'].heading}>
            <Prose>
              <p>{sectionMap['what-is-duitnow'].content}</p>
            </Prose>
          </Section>
        )}

        {/* Section 2: Step by Step */}
        {sectionMap['how-it-works'] && (
          <Section id="how-it-works" title={sectionMap['how-it-works'].heading}>
            <ol className="space-y-4">
              {[
                {
                  step: 1,
                  title: locale === 'de' ? 'Händler zeigt DuitNow QR-Code an' : 'Merchant displays DuitNow QR code',
                  body: locale === 'de'
                    ? 'Statische Codes (offener Betrag) werden gedruckt und an der Kasse angezeigt. Dynamische Codes mit voreingestelltem Betrag werden pro Transaktion generiert.'
                    : 'Static codes (open amount) are printed and displayed at the counter. Dynamic codes with a preset amount are generated per transaction.',
                },
                {
                  step: 2,
                  title: locale === 'de' ? 'Kunde öffnet eine DuitNow-fähige App' : 'Customer opens any DuitNow-enabled app',
                  body: locale === 'de'
                    ? "Maybank2u, CIMB Clicks, RHB Now, Hong Leong Connect, Touch 'n Go eWallet, Boost, GrabPay Malaysia — alle vollständig interoperabel über PayNets Switching-Infrastruktur."
                    : "Maybank2u, CIMB Clicks, RHB Now, Hong Leong Connect, Touch 'n Go eWallet, Boost, GrabPay Malaysia — all fully interoperable through PayNet's infrastructure.",
                },
                {
                  step: 3,
                  title: locale === 'de' ? 'Kunde scannt den DuitNow QR-Code' : 'Customer scans the DuitNow QR code',
                  body: locale === 'de'
                    ? 'Der Code kann von einem gedruckten Aufkleber, einem Handybildschirm, einer PDF-Rechnung oder einer anderen Anzeigefläche gescannt werden.'
                    : 'The code can be scanned from a printed sticker, phone screen, PDF invoice or any display surface.',
                },
                {
                  step: 4,
                  title: locale === 'de' ? 'Zahlungsdetails werden automatisch ausgefüllt' : 'Payment details pre-fill automatically',
                  body: locale === 'de'
                    ? 'Händlername, DuitNow-Proxy-Typ und Betrag (falls eingebettet) werden aus dem EMV-Payload ausgelesen. Bei statischen QR-Codes gibt der Kunde den Betrag ein.'
                    : 'Merchant name, DuitNow proxy type, and amount (if embedded) are parsed from the EMV payload. For static QR, the customer enters the amount.',
                },
                {
                  step: 5,
                  title: locale === 'de' ? 'Kunde authentifiziert die Zahlung' : 'Customer authenticates the payment',
                  body: locale === 'de'
                    ? 'Authentifizierung über die Banking-App (PIN, Passwort oder Biometrie). Keine sensiblen Zugangsdaten im QR-Code gespeichert.'
                    : 'Authentication is done through the banking app (PIN, password, or biometrics). No sensitive credentials stored in the QR code.',
                },
                {
                  step: 6,
                  title: locale === 'de' ? 'PayNet leitet und wickelt in Echtzeit ab' : 'PayNet routes and settles in real time',
                  body: locale === 'de'
                    ? "PayNets nationale Switching-Infrastruktur verarbeitet und wickelt die Transaktion sofort ab — 24/7/365 einschließlich Wochenenden und Feiertagen."
                    : "PayNet's national switching infrastructure processes and settles the transaction instantly — 24/7, including weekends and public holidays.",
                },
                {
                  step: 7,
                  title: locale === 'de' ? 'Beide Parteien erhalten sofortige Bestätigung' : 'Both parties receive instant confirmation',
                  body: locale === 'de'
                    ? "Zahlender erhält Erfolgsmeldung mit Referenznummer. Händlerkonto wird sofort gutgeschrieben mit SMS- und App-Benachrichtigung."
                    : "Payer gets transaction success notification with reference number. Merchant's account is credited immediately with SMS and in-app notification.",
                },
              ].map(({ step, title, body }) => (
                <li key={step} className="flex gap-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: '#CC0001' }}
                  >
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

        {/* Section 3: ID Types */}
        {sectionMap['id-types'] && (
          <Section id="id-types" title={sectionMap['id-types'].heading}>
            <Prose>
              <p>{sectionMap['id-types'].content}</p>
            </Prose>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-4">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    {(locale === 'de'
                      ? ['Typ', 'Tag', 'Format', 'Beispiel', 'Anwendungsfall']
                      : ['Type', 'Tag', 'Format', 'Example', 'Use Case']
                    ).map(h => (
                      <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {DUITNOW_ID_TYPES.map(({ type, tag, format, example, useCase, color }) => (
                    <tr key={type} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${color}`}>{type}</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-600">{tag}</td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-500">{format}</td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-400">{example}</td>
                      <td className="px-4 py-3 text-slate-600 text-sm">{useCase}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* Section 4: EMV Payload */}
        {sectionMap['payload-emv'] && (
          <Section id="payload-emv" title={sectionMap['payload-emv'].heading}>
            <Prose>
              <p>{sectionMap['payload-emv'].content}</p>
            </Prose>
            <pre className="bg-slate-900 text-emerald-400 text-xs font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4 whitespace-pre-wrap break-all">
{`000201
010211
2966
  0016A000000693010011
  011560123456789
52040000
5303458
5802MY
5913Ahmad Grocery
6011Kuala Lumpur
630412AB`}
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
                      <td className="px-4 py-3 font-mono font-bold" style={{ color: '#CC0001' }}>{id}</td>
                      <td className="px-4 py-3 font-semibold text-slate-700">{name}</td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-500">{value}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${required ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'}`}>
                          {required ? (locale === 'de' ? 'Pflicht' : 'Required') : 'Optional'}
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

        {/* Section 5: Phone Normalization */}
        {sectionMap['phone-normalization'] && (
          <Section id="phone-normalization" title={sectionMap['phone-normalization'].heading}>
            <Prose>
              <p>{sectionMap['phone-normalization'].content}</p>
            </Prose>
            <div className="overflow-x-auto rounded-2xl border border-slate-100 mt-3 bg-slate-50 p-4">
              <div className="space-y-2 text-sm font-mono">
                {[
                  { input: '0123456789', output: '60123456789' },
                  { input: '+60123456789', output: '60123456789' },
                  { input: '60123456789', output: '60123456789' },
                ].map(({ input, output }) => (
                  <div key={input} className="flex items-center gap-3">
                    <span className="text-slate-400">{locale === 'de' ? 'Eingabe:' : 'Input:'}</span>
                    <code className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-slate-700">{input}</code>
                    <span className="text-slate-400">→</span>
                    <code className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-green-700">{output}</code>
                  </div>
                ))}
              </div>
            </div>
            <pre className="bg-slate-900 text-emerald-400 text-sm font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed mt-3">
{`function normalizeMalaysianMobile(input: string): string {
  const digits = input.replace(/\\D/g, '');
  if (digits.startsWith('60')) return digits;
  if (digits.startsWith('0'))  return '6' + digits;
  return '60' + digits;
}`}
            </pre>
          </Section>
        )}

        {/* Section 6: ASEAN Network */}
        {sectionMap['asean-network'] && (
          <Section id="asean-network" title={sectionMap['asean-network'].heading}>
            <Prose>
              <p>{sectionMap['asean-network'].content}</p>
            </Prose>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {CROSS_BORDER.map(({ country, network, flag, since, desc }) => (
                <div key={country} className="bg-white border border-slate-100 rounded-xl p-4 flex items-start gap-3 shadow-sm">
                  <span className="text-3xl flex-shrink-0">{flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-800">{country}</p>
                      <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                        {locale === 'de' ? `Seit ${since}` : `Since ${since}`}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-0.5">{network} · {desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Section 7: Banks & E-Wallets */}
        {sectionMap['supported-banks'] && (
          <Section id="supported-banks" title={sectionMap['supported-banks'].heading}>
            <Prose>
              <p>{sectionMap['supported-banks'].content}</p>
            </Prose>
            <div className="flex flex-wrap gap-2.5 mt-3">
              {BANKS_WALLETS.map(({ name, type, color }) => (
                <span key={name} className={`px-3 py-1.5 rounded-xl border text-sm font-semibold ${color}`}>
                  {name}
                  {type === 'wallet' && (
                    <span className="ml-1.5 text-xs opacity-60">wallet</span>
                  )}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Section 8: DuitNow vs IBG */}
        {sectionMap['duitnow-vs-ibg'] && (
          <Section id="duitnow-vs-ibg" title={sectionMap['duitnow-vs-ibg'].heading}>
            <Prose>
              <p>{sectionMap['duitnow-vs-ibg'].content}</p>
            </Prose>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-4">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">
                      {locale === 'de' ? 'Merkmal' : 'Feature'}
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-500 border-b border-slate-200">IBG (legacy)</th>
                    <th className="px-4 py-3 font-semibold border-b border-slate-200" style={{ color: '#CC0001' }}>DuitNow (current)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {IBG_COMPARISON.map(({ feature, ibg, duitnow }) => (
                    <tr key={feature} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-700">{feature}</td>
                      <td className="px-4 py-3 text-slate-400">{ibg}</td>
                      <td className="px-4 py-3 font-medium text-green-700">{duitnow}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* CTA */}
        <div className="rounded-2xl p-6 text-center space-y-3" style={{ backgroundColor: '#fff5f5', border: '1px solid #fecaca' }}>
          <p className="font-semibold text-lg" style={{ color: '#7f1d1d' }}>
            {locale === 'de' ? 'Bereit, Ihren DuitNow QR-Code zu erstellen?' : 'Ready to generate your DuitNow QR Code?'}
          </p>
          <p className="text-sm" style={{ color: '#991b1b' }}>
            {locale === 'de'
              ? "Kostenlos, sofort, funktioniert mit Maybank, CIMB, Touch 'n Go, Boost und allen DuitNow-Apps."
              : "Free, instant, works with Maybank, CIMB, Touch 'n Go, Boost and all DuitNow apps."}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/duitnow/generator"
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
              style={{ backgroundColor: '#CC0001' }}
            >
              {locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
            </Link>
            <Link
              href="/duitnow/faq"
              className="inline-flex items-center gap-2 px-6 py-3 border font-semibold rounded-xl transition-colors"
              style={{ borderColor: '#fecaca', color: '#7f1d1d' }}
            >
              {locale === 'de' ? 'DuitNow FAQ lesen →' : 'Read DuitNow FAQ →'}
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
