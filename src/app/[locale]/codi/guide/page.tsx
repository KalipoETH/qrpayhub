import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/seo';
import { codiGuideContent } from '@/content/codi/guide';
import type { GuideContent } from '@/content/types';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const content = codiGuideContent[locale as 'en' | 'de'] ?? codiGuideContent.en;
  return {
    title: `${content.title} | QRPayHub`,
    description: content.description,
    keywords: [
      'codi guide',
      'how codi works',
      'cobro digital mexico',
      'clabe validation',
      'spei qr payment',
      'banxico codi',
      'bxc protocol',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/codi/guide'),
  };
}

const CLABE_BANKS = [
  { code: '002', bank: 'BBVA México',       note: 'Largest private bank' },
  { code: '012', bank: 'BBVA México (alt)', note: 'Legacy code' },
  { code: '014', bank: 'Santander MX',      note: '' },
  { code: '021', bank: 'HSBC México',       note: '' },
  { code: '072', bank: 'Banorte',           note: 'Largest Mexican-owned bank' },
  { code: '002', bank: 'Citibanamex',       note: 'Uses 002 prefix' },
  { code: '058', bank: 'Banregio',          note: '' },
  { code: '059', bank: 'Banorte (savings)', note: '' },
  { code: '006', bank: 'Bancomext',         note: 'Development bank' },
  { code: '646', bank: 'STP',              note: 'Fintech / SPEI direct' },
];

const CODI_VS_DIMO = [
  { feature: 'Launch year',        codi: '2019',                          dimo: '2023' },
  { feature: 'Identifier',         codi: 'CLABE or phone number',         dimo: 'Phone number (proxy)' },
  { feature: 'QR code',            codi: 'Yes (BXC:// format)',           dimo: 'No QR – phone-number based' },
  { feature: 'NFC support',        codi: 'Yes',                           dimo: 'No' },
  { feature: 'Amount',             codi: 'Required',                      dimo: 'Flexible' },
  { feature: 'Best for',           codi: 'Merchant QR payments',          dimo: 'P2P transfers' },
  { feature: 'Analogy',            codi: 'Similar to PromptPay / VietQR', dimo: 'Similar to PIX / UPI' },
  { feature: 'Settlement',         codi: 'SPEI',                          dimo: 'SPEI' },
];

const SUPPORTED_BANKS = [
  { name: 'BBVA México',   app: 'BBVA México App' },
  { name: 'Santander MX',  app: 'Santander México' },
  { name: 'Banorte',       app: 'Banorte Móvil' },
  { name: 'HSBC México',   app: 'HSBC México' },
  { name: 'Citibanamex',   app: 'Citibanamex Móvil' },
  { name: 'Scotiabank MX', app: 'Scotia en Línea' },
  { name: 'Inbursa',       app: 'Inbursa Móvil' },
  { name: 'BanBajío',      app: 'BanBajío Móvil' },
  { name: 'Mercado Pago',  app: 'Mercado Pago MX' },
  { name: 'Spin by OXXO',  app: 'Spin App' },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "How CoDi Works – Mexico's Digital Payment Guide",
  description:
    "Complete guide to CoDi: Mexico's QR payment system by Banxico. CLABE validation, SPEI, BXC protocol and DiMo.",
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/codi/guide' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'CoDi',  item: 'https://qrpayhub.com/en/codi' },
      { '@type': 'ListItem', position: 3, name: 'Guide', item: 'https://qrpayhub.com/en/codi/guide' },
    ],
  },
};

const MX_GREEN = '#006847';

export default function CoDiGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'de';
  const content = codiGuideContent[locale] ?? codiGuideContent.en;
  return (
    <>
      <Script
        id="json-ld-codi-guide"
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
        { label: 'CoDi', href: '/codi' },
        { label: 'Guide' },
      ]} />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {content.title}
        </h1>
        <p className="text-lg text-slate-500">{content.description}</p>
        <div className="flex items-center gap-3">
          <Link
            href="/codi/generator"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-white text-sm font-semibold rounded-xl transition-colors"
            style={{ backgroundColor: MX_GREEN }}
          >
            {locale === 'de' ? 'Zum Generator →' : 'Try the Generator →'}
          </Link>
          <Link
            href="/codi/faq"
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold rounded-xl transition-colors"
          >
            {locale === 'de' ? 'CoDi FAQ →' : 'CoDi FAQ →'}
          </Link>
        </div>
      </header>

      <div className="space-y-14 pt-4">

        {/* Section 1: What is CoDi */}
        {sectionMap['what-is-codi'] && (
          <Section id="what-is-codi" title={sectionMap['what-is-codi'].heading}>
            <Prose>
              <p>{sectionMap['what-is-codi'].content}</p>
            </Prose>
          </Section>
        )}

        {/* Section 2: Step by Step */}
        {sectionMap['how-it-works'] && (
          <Section id="how-it-works" title={sectionMap['how-it-works'].heading}>
            <ol className="space-y-4">
              {(locale === 'de' ? [
                { step: 1, title: 'Händler generiert CoDi QR-Code', body: 'CLABE (18-stelliges Bankkonto) oder registrierte Telefonnummer, den genauen Betrag (Pflicht), eine Konzeptbeschreibung und eine Referenznummer eingeben. Der QR kodiert einen BXC://SPEI-Payload.' },
                { step: 2, title: 'Händler zeigt den QR-Code an', body: 'Der QR kann auf einem Telefonbildschirm angezeigt, gedruckt oder in eine Rechnung oder Website eingebettet werden. CoDi unterstützt auch NFC für kontaktlose Zahlung.' },
                { step: 3, title: 'Kunde öffnet die Banking-App', body: 'Jede SPEI-Teilnehmer-Banking-App unterstützt CoDi. Der Kunde wählt die CoDi-Zahlungsoption (üblicherweise unter „Pagar/Cobrar").' },
                { step: 4, title: 'Kunde scannt den QR-Code', body: 'Die App liest den BXC://SPEI-Payload und extrahiert CLABE oder Telefon des Empfängers, Betrag, Konzept und Referenz. Diese werden zur Überprüfung angezeigt.' },
                { step: 5, title: 'Kunde authentifiziert', body: 'Kunde bestätigt die Zahlung per NIP oder Biometrie. Die Überweisung wird von seinem SPEI-verknüpften Konto initiiert.' },
                { step: 6, title: 'SPEI verarbeitet die Überweisung', body: 'Banxicos SPEI-Infrastruktur verarbeitet die Überweisung in unter 30 Sekunden. SPEI läuft 24/7/365.' },
                { step: 7, title: 'Händler erhält Bestätigung', body: 'Die Bank des Händlers sendet eine sofortige Gutschriftsbenachrichtigung. Referenznummer und Konzept im SPEI-Datensatz ermöglichen automatische Abstimmung.' },
              ] : [
                { step: 1, title: 'Merchant generates a CoDi QR code', body: 'Enter the CLABE (18-digit bank account) or registered phone number, the exact amount (required), a concept description, and a numeric reference. The QR encodes a BXC://SPEI payload.' },
                { step: 2, title: 'Merchant displays the QR code', body: 'The QR can be shown on a phone screen, printed, or embedded in an invoice or website. CoDi also supports NFC for contactless payment.' },
                { step: 3, title: 'Customer opens their bank app', body: 'Any SPEI-participant bank app supports CoDi. The customer selects the CoDi payment option (usually under "Pay" or "Cobrar/Pagar").' },
                { step: 4, title: 'Customer scans the QR code', body: "The app reads the BXC://SPEI payload, extracting the recipient's CLABE or phone, amount, concept, and reference. These are displayed for review." },
                { step: 5, title: 'Customer authenticates', body: "The customer confirms the payment using their bank's authentication (NIP, biometrics). The transfer is initiated from their SPEI-linked account." },
                { step: 6, title: 'SPEI processes the transfer', body: "Banxico's SPEI infrastructure processes the transfer in under 30 seconds. SPEI operates 24/7/365." },
                { step: 7, title: 'Merchant receives confirmation', body: "The merchant's bank sends an instant credit notification. The numeric reference and concept in the SPEI record enable automatic reconciliation." },
              ]).map(({ step, title, body }) => (
                <li key={step} className="flex gap-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: MX_GREEN }}
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

        {/* Section 3: CLABE */}
        {sectionMap['clabe'] && (
          <Section id="clabe" title={sectionMap['clabe'].heading}>
            <Prose>
              <p>{sectionMap['clabe'].content}</p>
            </Prose>
            <pre className="bg-slate-900 text-emerald-400 text-sm font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4">
{`CLABE: 0 7 2 1 8 0 0 0 1 1 8 3 5 9 4 4 0 1
       │ │ │ └─ City (180)
       │ │ └─── Bank: 072 = Banorte
       │ └───── 
       └─────── Check digit = 1

Weights: 3 7 1 3 7 1 3 7 1 3 7 1 3 7 1 3 7 (×17)
Sum all (digit × weight) → mod 10 → (10 - x) mod 10`}
            </pre>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    {[locale === 'de' ? 'Bankcode' : 'Bank Code', locale === 'de' ? 'Bankname' : 'Bank Name', locale === 'de' ? 'Hinweis' : 'Note'].map((h) => (
                      <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CLABE_BANKS.map(({ code, bank, note }) => (
                    <tr key={bank} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono font-bold" style={{ color: MX_GREEN }}>{code}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{bank}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* Section 4: Payload Format */}
        {sectionMap['payload-format'] && (
          <Section id="payload-format" title={sectionMap['payload-format'].heading}>
            <Prose>
              <p>{sectionMap['payload-format'].content}</p>
            </Prose>
            <pre className="bg-slate-900 text-emerald-400 text-sm font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4">
{`BXC://SPEI?data=SPEI|[version]|[type]|[clabe_or_phone]|[amount]|[concept]|[reference]|[name]

Example:
BXC://SPEI?data=SPEI|1|03|072180001183594401|150.00|Pago%20factura%20001|1234567|TIENDA%20LA%20PALMA`}
            </pre>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-4">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    {[locale === 'de' ? 'Feld' : 'Field', locale === 'de' ? 'Beispiel' : 'Example', locale === 'de' ? 'Pflicht' : 'Required', locale === 'de' ? 'Beschreibung' : 'Description'].map((h) => (
                      <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { field: 'Protocol',   example: 'BXC://SPEI',          req: true,  desc: locale === 'de' ? 'Banxico CoDi-Protokoll-Kennung' : 'Banxico CoDi protocol identifier' },
                    { field: 'version',    example: '1',                   req: true,  desc: locale === 'de' ? 'CoDi-Version (immer 1)' : 'CoDi version (always 1)' },
                    { field: 'type',       example: '03',                  req: true,  desc: '03=CLABE, 10=' + (locale === 'de' ? 'Telefonnummer' : 'phone number') },
                    { field: 'recipient',  example: '072180001183594401',  req: true,  desc: locale === 'de' ? 'CLABE (18 Stellen) oder 10-stellige Telefonnummer' : 'CLABE (18 digits) or 10-digit phone' },
                    { field: 'amount',     example: '150.00',              req: true,  desc: locale === 'de' ? 'Betrag in MXN (bei CoDi immer Pflicht)' : 'Amount in MXN (required for CoDi)' },
                    { field: 'concepto',   example: 'Pago factura 001',    req: true,  desc: locale === 'de' ? 'Zahlungskonzept (1–35 Zeichen, URL-kodiert)' : 'Payment concept (1–35 chars, URL-encoded)' },
                    { field: 'referencia', example: '1234567',             req: true,  desc: locale === 'de' ? 'Numerische Referenz (1–7 Stellen)' : 'Numeric reference (1–7 digits)' },
                    { field: 'name',       example: 'TIENDA LA PALMA',     req: false, desc: locale === 'de' ? 'Begünstigtenname (URL-kodiert)' : 'Beneficiary name (URL-encoded)' },
                  ].map(({ field, example, req, desc }) => (
                    <tr key={field} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono font-bold" style={{ color: MX_GREEN }}>{field}</td>
                      <td className="px-4 py-3 font-mono text-slate-600 text-xs">{example}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          req ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {req ? (locale === 'de' ? 'Pflicht' : 'Required') : 'Optional'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* Section 5: Required Fields */}
        {sectionMap['required-fields'] && (
          <Section id="required-fields" title={sectionMap['required-fields'].heading}>
            <Prose>
              <p>{sectionMap['required-fields'].content}</p>
            </Prose>
          </Section>
        )}

        {/* Section 6: CoDi vs DiMo */}
        {sectionMap['codi-vs-dimo'] && (
          <Section id="codi-vs-dimo" title={sectionMap['codi-vs-dimo'].heading}>
            <Prose>
              <p>{sectionMap['codi-vs-dimo'].content}</p>
            </Prose>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-3">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{locale === 'de' ? 'Merkmal' : 'Feature'}</th>
                    <th className="px-4 py-3 font-semibold border-b border-slate-200" style={{ color: MX_GREEN }}>CoDi</th>
                    <th className="px-4 py-3 font-semibold text-purple-700 border-b border-slate-200">DiMo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CODI_VS_DIMO.map(({ feature, codi, dimo }) => (
                    <tr key={feature} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-700">{feature}</td>
                      <td className="px-4 py-3 text-slate-600">{codi}</td>
                      <td className="px-4 py-3 text-slate-600">{dimo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* Section 7: Supported Banks */}
        {sectionMap['supported-banks'] && (
          <Section id="supported-banks" title={sectionMap['supported-banks'].heading}>
            <Prose>
              <p>{sectionMap['supported-banks'].content}</p>
            </Prose>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {SUPPORTED_BANKS.map(({ name, app }) => (
                <div
                  key={name}
                  className="bg-white border border-slate-100 rounded-xl p-3 flex items-center justify-between shadow-sm"
                >
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{name}</p>
                    <p className="text-xs text-slate-400">{app}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Section 8: Digital Payment Evolution */}
        {sectionMap['digital-payment-evolution'] && (
          <Section id="digital-payment-evolution" title={sectionMap['digital-payment-evolution'].heading}>
            <Prose>
              <p>{sectionMap['digital-payment-evolution'].content}</p>
            </Prose>
          </Section>
        )}

        {/* CTA */}
        <div
          className="rounded-2xl p-6 text-center space-y-3"
          style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}
        >
          <p className="font-semibold text-lg" style={{ color: '#14532d' }}>
            {locale === 'de' ? 'Bereit, Ihren CoDi QR-Code zu erstellen?' : 'Ready to generate your CoDi QR Code?'}
          </p>
          <p className="text-sm" style={{ color: '#166534' }}>
            {locale === 'de'
              ? 'Kostenlos, sofort, funktioniert mit allen mexikanischen Banken über SPEI.'
              : 'Free, instant, works with all Mexican banks via SPEI.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/codi/generator"
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
              style={{ backgroundColor: MX_GREEN }}
            >
              {locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
            </Link>
            <Link
              href="/codi/faq"
              className="inline-flex items-center gap-2 px-6 py-3 border font-semibold rounded-xl transition-colors"
              style={{ borderColor: '#bbf7d0', color: '#14532d' }}
            >
              {locale === 'de' ? 'CoDi FAQ lesen →' : 'Read CoDi FAQ →'}
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
              <Link href={item.href as `/${string}`} className="hover:text-slate-600 transition-colors">
                {item.label}
              </Link>
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
