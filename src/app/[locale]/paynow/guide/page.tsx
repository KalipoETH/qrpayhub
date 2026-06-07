import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/seo';
import { paynowGuideContent } from '@/content/paynow/guide';
import type { GuideContent } from '@/content/types';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const content = paynowGuideContent[locale as 'en' | 'de'] ?? paynowGuideContent.en;
  return {
    title: `${content.title} | QRPayHub`,
    description: content.description,
    keywords: [
      'paynow guide',
      'how paynow works',
      'paynow qr format',
      'paynow proxy types',
      'singapore qr payment guide',
      'sgqr guide',
      'paynow emv payload',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/paynow/guide'),
  };
}

const PROXY_TYPES = [
  {
    type: 'Mobile Number',
    tag: '0',
    format: '+65XXXXXXXX',
    example: '91234567 → +6591234567',
    useCase: 'P2P transfers, most common for individuals',
    color: 'bg-red-50 text-red-700 border-red-200',
  },
  {
    type: 'NRIC / FIN',
    tag: '1',
    format: '[S/T/F/G]XXXXXXXZ',
    example: 'S1234567D',
    useCase: 'Citizens, PRs and long-term pass holders',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    type: 'UEN (Business)',
    tag: '2',
    format: '9–10 chars ending with letter',
    example: '201912345K',
    useCase: 'Companies, charities, government agencies',
    color: 'bg-green-50 text-green-700 border-green-200',
  },
];

const EMV_TAGS = [
  { id: '00', name: 'Payload Format Indicator',   value: '01',          required: true,  description: 'Always "01" – EMV Merchant Presented Mode' },
  { id: '01', name: 'Initiation Method',           value: '11 or 12',    required: true,  description: '11 = static (payer enters amount), 12 = dynamic (amount in QR)' },
  { id: '26', name: 'Merchant Account – PayNow',   value: 'SG.PAYNOW + proxy', required: true, description: 'AID: SG.PAYNOW; sub-tags 01 = proxy type, 02 = proxy value, 03 = editable, 04 = expiry' },
  { id: '52', name: 'Merchant Category Code',      value: '0000',        required: true,  description: 'ISO 18245 MCC (0000 = not assigned for P2P)' },
  { id: '53', name: 'Transaction Currency',        value: '702',         required: true,  description: 'ISO 4217 numeric code for Singapore Dollar (SGD)' },
  { id: '54', name: 'Transaction Amount',          value: '12.50',       required: false, description: 'Present in dynamic QR only; omitted in static codes' },
  { id: '58', name: 'Country Code',               value: 'SG',          required: true,  description: 'ISO 3166-1 alpha-2 – Singapore' },
  { id: '59', name: 'Merchant Name',              value: 'Ahmad Store',  required: true,  description: 'Displayed on payer confirmation screen, max 25 characters' },
  { id: '60', name: 'Merchant City',              value: 'Singapore',   required: true,  description: 'City of the merchant' },
  { id: '62', name: 'Additional Data Field',      value: 'reference',   required: false, description: 'Optional bill number or transaction reference' },
  { id: '63', name: 'CRC',                        value: '4-digit hex', required: true,  description: 'CRC16-CCITT checksum of entire payload including "6304"' },
];

const CROSS_BORDER = [
  { country: 'Malaysia',    network: 'DuitNow',    flag: '🇲🇾', since: '2021', desc: 'Most active ASEAN corridor; SGD↔MYR' },
  { country: 'Thailand',    network: 'PromptPay',  flag: '🇹🇭', since: '2021', desc: "World's first bilateral real-time linkage" },
  { country: 'India',       network: 'UPI',        flag: '🇮🇳', since: '2021', desc: 'SGD↔INR; Singapore-India remittance' },
  { country: 'Indonesia',   network: 'QRIS',       flag: '🇮🇩', since: '2023', desc: 'SGD↔IDR; ASEAN QR expansion' },
  { country: 'Philippines', network: 'QR Ph',      flag: '🇵🇭', since: '2023', desc: 'SGD↔PHP bilateral linkage' },
];

const BANKS_WALLETS = [
  { name: 'DBS / POSB',         note: 'PayLah!',        color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'OCBC',               note: 'Pay Anyone',     color: 'bg-red-100 text-red-800 border-red-200' },
  { name: 'UOB',                note: 'UOB Mighty',     color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { name: 'Standard Chartered', note: 'SC Mobile',      color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { name: 'Citibank SG',        note: 'Citi Mobile',    color: 'bg-sky-100 text-sky-700 border-sky-200' },
  { name: 'HSBC Singapore',     note: 'HSBC Mobile',    color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'Maybank SG',         note: 'Maybank2u',      color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { name: 'Bank of China SG',   note: 'BOC SG',         color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'ICBC Singapore',     note: 'ICBC Mobile',    color: 'bg-red-100 text-red-800 border-red-200' },
  { name: 'GrabPay',            note: 'wallet',         color: 'bg-green-100 text-green-700 border-green-200' },
  { name: 'Singtel Dash',       note: 'wallet',         color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'All MAS banks',      note: '',               color: 'bg-slate-100 text-slate-500 border-slate-200' },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "How PayNow Works – Complete Guide to Singapore Payments",
  description:
    "Complete guide to PayNow: Singapore's instant payment system. Proxy types, EMV QR format, editable amount, expiry date, SGQR and ASEAN cross-border network.",
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/paynow/guide' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',   item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'PayNow', item: 'https://qrpayhub.com/en/paynow' },
      { '@type': 'ListItem', position: 3, name: 'Guide',  item: 'https://qrpayhub.com/en/paynow/guide' },
    ],
  },
};

export default function PayNowGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'de';
  const content = paynowGuideContent[locale] ?? paynowGuideContent.en;
  return (
    <>
      <Script
        id="json-ld-paynow-guide"
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
        { label: 'Home',   href: '/' },
        { label: 'PayNow', href: '/paynow' },
        { label: 'Guide' },
      ]} />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {content.title}
        </h1>
        <p className="text-lg text-slate-500">{content.description}</p>
        <div className="flex items-center gap-3">
          <Link
            href="/paynow/generator"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            {locale === 'de' ? 'Zum Generator →' : 'Try the Generator →'}
          </Link>
          <Link
            href="/paynow/faq"
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold rounded-xl transition-colors"
          >
            {locale === 'de' ? 'PayNow FAQ →' : 'PayNow FAQ →'}
          </Link>
        </div>
      </header>

      <div className="space-y-14 pt-4">

        {/* Section 1: What is PayNow */}
        {sectionMap['what-is-paynow'] && (
          <Section id="what-is-paynow" title={sectionMap['what-is-paynow'].heading}>
            <Prose>
              <p>{sectionMap['what-is-paynow'].content}</p>
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
                  title: locale === 'de' ? 'Händler zeigt PayNow QR-Code an' : 'Merchant displays PayNow QR code',
                  body: locale === 'de'
                    ? 'Statische QR-Codes (offener Betrag) werden gedruckt oder an der Kasse angezeigt. Dynamische Codes mit voreingestellten Beträgen werden pro Transaktion generiert. Beide Typen können ein Ablaufdatum enthalten.'
                    : 'Static QR codes (open amount) are printed or shown at the counter. Dynamic codes with preset amounts are generated per transaction. Both types can include an expiry date.',
                },
                {
                  step: 2,
                  title: locale === 'de' ? 'Kunde öffnet eine PayNow-fähige App' : 'Customer opens any PayNow-enabled app',
                  body: locale === 'de'
                    ? 'DBS PayLah!, OCBC Pay Anyone, UOB Mighty, GrabPay, Singtel Dash oder eine beliebige singapurische Banking-App — alle vollständig interoperabel über das ABS/MAS PayNow-Netzwerk.'
                    : 'DBS PayLah!, OCBC Pay Anyone, UOB Mighty, GrabPay, Singtel Dash, or any Singapore bank app — all fully interoperable through the ABS/MAS PayNow network.',
                },
                {
                  step: 3,
                  title: locale === 'de' ? 'Kunde scannt den PayNow QR-Code' : 'Customer scans the PayNow QR code',
                  body: locale === 'de'
                    ? 'Der App-Scanner analysiert den EMV-Payload und extrahiert AID (SG.PAYNOW), Proxy-Typ, Proxy-Wert, Betrag und alle editierbaren oder Ablauf-Flags.'
                    : 'The app scanner parses the EMV payload and extracts the AID (SG.PAYNOW), proxy type, proxy value, amount, and any editable or expiry flags.',
                },
                {
                  step: 4,
                  title: locale === 'de' ? 'Betrag wird ausgefüllt (oder Kunde gibt ihn ein)' : 'Amount pre-fills (or customer enters it)',
                  body: locale === 'de'
                    ? 'Wenn ein dynamischer QR gescannt wurde, ist der Betrag vorausgefüllt. Wenn das editierbare Flag gesetzt ist, kann der Kunde ihn ändern. Bei statischen QR-Codes gibt der Kunde den Betrag ein.'
                    : 'If a dynamic QR was scanned, the amount is pre-filled. If the editable flag is set, the customer can modify it. For static QR codes, the customer enters the amount.',
                },
                {
                  step: 5,
                  title: locale === 'de' ? 'Kunde authentifiziert sich über Banking-App' : 'Customer authenticates via banking app',
                  body: locale === 'de'
                    ? "Authentifizierung (PIN, Biometrie oder Transaktionspasswort) erfolgt vollständig in der Banking-App des Kunden. Keine Zugangsdaten werden an den Händler übermittelt oder im QR-Code kodiert."
                    : "Authentication (PIN, biometrics, or transaction password) is completed within the customer's own banking app. No credentials are transmitted to the merchant or encoded in the QR.",
                },
                {
                  step: 6,
                  title: locale === 'de' ? 'FAST leitet und wickelt die Zahlung ab' : 'FAST routes and settles the payment',
                  body: locale === 'de'
                    ? "Singapurs FAST-Infrastruktur verarbeitet die Interbank-Überweisung in nahezu Echtzeit. Abwicklung ist endgültig und unwiderruflich — keine Rückbuchungen."
                    : "Singapore's FAST infrastructure processes the interbank transfer in near real-time. Settlement is final and irrevocable — no chargebacks.",
                },
                {
                  step: 7,
                  title: locale === 'de' ? 'Beide Parteien erhalten Bestätigung' : 'Both parties receive confirmation',
                  body: locale === 'de'
                    ? 'Zahlender erhält Erfolgsmeldung mit Referenznummer. Händler erhält sofortige Gutschriftsbenachrichtigung per SMS und In-App-Meldung.'
                    : 'Payer receives a transaction success notification with reference number. Merchant receives instant credit notification via SMS and in-app alert.',
                },
              ].map(({ step, title, body }) => (
                <li key={step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-sm">
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

        {/* Section 3: Proxy Types */}
        {sectionMap['proxy-types'] && (
          <Section id="proxy-types" title={sectionMap['proxy-types'].heading}>
            <Prose>
              <p>{sectionMap['proxy-types'].content}</p>
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
                  {PROXY_TYPES.map(({ type, tag, format, example, useCase, color }) => (
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
010212
2957
  0009SG.PAYNOW
  010210
  020201912345K
  030100
  041020261231
52040000
5303702
541212.50
5802SG
5910Ahmad Store
6009Singapore
6304A1B2`}
            </pre>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-4">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    {(locale === 'de'
                      ? ['Tag ID', 'Feldname', 'Beispiel', 'Pflicht', 'Beschreibung']
                      : ['Tag ID', 'Field Name', 'Example', 'Required', 'Description']
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

        {/* Section 5: Editable Amount & Expiry */}
        {sectionMap['editable-expiry'] && (
          <Section id="editable-expiry" title={sectionMap['editable-expiry'].heading}>
            <Prose>
              <p>{sectionMap['editable-expiry'].content}</p>
            </Prose>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✏️</span>
                  <h3 className="font-bold text-slate-800">
                    {locale === 'de' ? 'Editierbarer Betrag (Sub-Tag 03)' : 'Editable Amount (sub-tag 03)'}
                  </h3>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl">
                    <code className="font-mono font-bold text-red-600 flex-shrink-0">03 → &quot;0&quot;</code>
                    <span>
                      {locale === 'de'
                        ? 'Betrag ist fest. Zahlender kann den voreingestellten Wert nicht ändern. Für Rechnungen mit exakten Beträgen.'
                        : 'Amount is fixed. Payer cannot modify the preset value. Used for exact-amount invoices.'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-green-50 rounded-xl">
                    <code className="font-mono font-bold text-green-700 flex-shrink-0">03 → &quot;1&quot;</code>
                    <span>
                      {locale === 'de'
                        ? 'Betrag ist editierbar. Zahlender kann ihn vor der Bestätigung ändern. Nützlich für geteilte Rechnungen oder Trinkgelder.'
                        : 'Amount is editable. Payer can change it before confirming. Useful for shared bills or tips.'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📅</span>
                  <h3 className="font-bold text-slate-800">
                    {locale === 'de' ? 'Ablaufdatum (Sub-Tag 04)' : 'Expiry Date (sub-tag 04)'}
                  </h3>
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p>
                      <strong>{locale === 'de' ? 'Format:' : 'Format:'}</strong>{' '}
                      <code className="font-mono text-red-600">YYYYMMDD</code>
                    </p>
                    <p className="mt-1">
                      <strong>{locale === 'de' ? 'Beispiel:' : 'Example:'}</strong>{' '}
                      <code className="font-mono text-slate-500">20261231</code>{' '}
                      {locale === 'de' ? '= 31. Dez. 2026' : '= Dec 31 2026'}
                    </p>
                  </div>
                  <p>
                    {locale === 'de'
                      ? 'Nach dem Ablaufdatum ist der QR-Code nicht mehr gültig. Nützlich für Veranstaltungszahlungen, zeitlich begrenzte Angebote oder Rechnungen mit Fälligkeitsdaten.'
                      : "After the expiry date, the QR code is no longer valid. Useful for event payments, time-limited offers, or invoices with due dates."}
                  </p>
                </div>
              </div>
            </div>
          </Section>
        )}

        {/* Section 6: Cross-Border */}
        {sectionMap['cross-border'] && (
          <Section id="cross-border" title={sectionMap['cross-border'].heading}>
            <Prose>
              <p>{sectionMap['cross-border'].content}</p>
            </Prose>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {CROSS_BORDER.map(({ country, network, flag, since, desc }) => (
                <div key={country} className="bg-white border border-slate-100 rounded-xl p-4 flex items-start gap-3 shadow-sm">
                  <span className="text-3xl flex-shrink-0">{flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-800">{country}</p>
                      <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-100">
                        {locale === 'de' ? `Seit ${since}` : `Since ${since}`}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{network} · {desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Section 7: Supported Banks */}
        {sectionMap['supported-banks'] && (
          <Section id="supported-banks" title={sectionMap['supported-banks'].heading}>
            <Prose>
              <p>{sectionMap['supported-banks'].content}</p>
            </Prose>
            <div className="flex flex-wrap gap-2.5 mt-3">
              {BANKS_WALLETS.map(({ name, note, color }) => (
                <span key={name} className={`px-3 py-1.5 rounded-xl border text-sm font-semibold ${color}`}>
                  {name}
                  {note && <span className="ml-1.5 text-xs opacity-60">{note}</span>}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Section 8: SGQR */}
        {sectionMap['sgqr'] && (
          <Section id="sgqr" title={sectionMap['sgqr'].heading}>
            <Prose>
              <p>{sectionMap['sgqr'].content}</p>
            </Prose>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5 mt-4 flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">💡</span>
              <div className="text-sm text-red-900">
                <p className="font-semibold">
                  {locale === 'de' ? 'Wichtiger Unterschied' : 'Key distinction'}
                </p>
                <p className="mt-1 text-red-800">
                  {locale === 'de'
                    ? 'Ein PayNow QR-Code (generiert von qrpayhub.com) funktioniert mit allen PayNow-fähigen Apps. Ein SGQR-Label (ausgegeben von NETS/ABS) enthält zusätzlich Nets, NETS Flashpay und andere singapurspezifische Systeme im selben QR. Für die meisten Online- und informellen Anwendungsfälle reicht ein PayNow QR aus.'
                    : 'A PayNow QR code (generated by qrpayhub.com) works with all PayNow-enabled apps. An SGQR label (issued by NETS/ABS) additionally includes Nets, NETS Flashpay, and other Singapore-specific schemes in the same QR. For most online and informal use cases, a PayNow QR is all you need.'}
                </p>
              </div>
            </div>
          </Section>
        )}

        {/* CTA */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-red-900 text-lg">
            {locale === 'de' ? 'Bereit, Ihren PayNow QR-Code zu erstellen?' : 'Ready to generate your PayNow QR Code?'}
          </p>
          <p className="text-red-700 text-sm">
            {locale === 'de'
              ? 'Kostenlos, sofort, funktioniert mit DBS, OCBC, UOB, GrabPay und allen singapurischen Zahlungs-Apps.'
              : 'Free, instant, works with DBS, OCBC, UOB, GrabPay and all Singapore payment apps.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/paynow/generator"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-sm transition-colors"
            >
              {locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
            </Link>
            <Link
              href="/paynow/faq"
              className="inline-flex items-center gap-2 px-6 py-3 border border-red-200 text-red-800 hover:bg-red-100 font-semibold rounded-xl transition-colors"
            >
              {locale === 'de' ? 'PayNow FAQ lesen →' : 'Read PayNow FAQ →'}
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
