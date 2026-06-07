import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/seo';
import { qrPhGuideContent } from '@/content/qr-ph/guide';
import type { GuideContent } from '@/content/types';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const content = qrPhGuideContent[locale as 'en' | 'de'] ?? qrPhGuideContent.en;
  return {
    title: `${content.title} | QRPayHub`,
    description: content.description,
    keywords: [
      'qr ph guide',
      'how qr ph works',
      'instapay qr code',
      'philippines payment guide',
      'gcash qr ph',
      'bsp qr standard',
      'ph instapay me',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/qr-ph/guide'),
  };
}

const PROXY_TYPES = [
  {
    type: 'MSISDN (Mobile)',
    code: 'MSISDN',
    example: '09171234567',
    normalized: '+639171234567',
    usedBy: 'GCash, Maya, all mobile-linked accounts',
  },
  {
    type: 'ACCT (Account)',
    code: 'ACCT',
    example: '1234567890',
    normalized: '1234567890',
    usedBy: 'BDO, BPI, Metrobank, Landbank, UnionBank',
  },
  {
    type: 'EMAIL',
    code: 'EMAIL',
    example: 'juan@example.com',
    normalized: 'juan@example.com',
    usedBy: 'Banks supporting email-as-proxy registration',
  },
];

const EMV_TAGS = [
  { tag: '00',      value: '01',               required: true,  description: 'Payload Format Indicator (always "01")' },
  { tag: '01',      value: '11',               required: false, description: 'Point of Initiation (11=static, 12=dynamic)' },
  { tag: '26',      value: '...',              required: true,  description: 'Merchant Account Information (BSP/InstaPay)' },
  { tag: '26 › 00', value: 'PH.INSTAPAY.ME',  required: true,  description: 'QR Ph Application ID (AID)' },
  { tag: '26 › 01', value: 'MSISDN',          required: true,  description: 'Proxy type: MSISDN, ACCT, or EMAIL' },
  { tag: '26 › 02', value: '+639171234567',   required: true,  description: 'Proxy value (normalized phone, account, or email)' },
  { tag: '52',      value: '0000',            required: false, description: 'Merchant Category Code (MCC)' },
  { tag: '53',      value: '608',             required: true,  description: 'Transaction Currency (608 = PHP)' },
  { tag: '54',      value: '500.00',          required: false, description: 'Transaction Amount (with 2 decimals)' },
  { tag: '58',      value: 'PH',             required: true,  description: 'Country Code' },
  { tag: '59',      value: 'Juan dela Cruz', required: true,  description: 'Merchant / Payee Name (max 25 chars)' },
  { tag: '60',      value: 'Manila',         required: true,  description: 'Merchant City' },
  { tag: '62 › 05', value: 'Grocery payment', required: false, description: 'Purpose / Reference (max 35 chars)' },
  { tag: '63',      value: 'XXXX',           required: true,  description: 'CRC16-CCITT checksum (4 hex chars)' },
];

const INSTAPAY_VS_PESONET = [
  { feature: 'Transfer speed',     instapay: 'Real-time (seconds)',       pesonet: 'Same-day batch (1–3 hours)' },
  { feature: 'Max per transaction', instapay: '₱50,000',                  pesonet: 'Higher amounts (no fixed cap)' },
  { feature: 'Availability',       instapay: '24/7/365',                  pesonet: 'Business days (cutoff times)' },
  { feature: 'Use case',           instapay: 'QR Ph, small transfers',    pesonet: 'Payroll, large B2B' },
  { feature: 'Settlement',         instapay: 'Gross real-time',           pesonet: 'Net batch' },
  { feature: 'Network operator',   instapay: 'BancNet',                   pesonet: 'BancNet' },
];

const PH_BANKS = [
  { name: 'GCash',             type: 'E-Wallet',    users: '94M+' },
  { name: 'Maya (PayMaya)',    type: 'E-Wallet',    users: '50M+' },
  { name: 'BDO Unibank',      type: 'Bank',        users: '14M+' },
  { name: 'BPI Mobile',       type: 'Bank',        users: '8M+' },
  { name: 'UnionBank',        type: 'Bank',        users: '5M+' },
  { name: 'Metrobank',        type: 'Bank',        users: '4M+' },
  { name: 'Landbank',         type: 'Bank',        users: '3M+' },
  { name: 'RCBC DiskarTech', type: 'App/Bank',    users: '3M+' },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How QR Ph Works – Philippines Payment Guide',
  description:
    "Complete guide to QR Ph: the Philippines' national QR payment standard. Proxy types, InstaPay, GCash, Maya, and financial inclusion.",
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/qr-ph/guide' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'QR Ph', item: 'https://qrpayhub.com/en/qr-ph' },
      { '@type': 'ListItem', position: 3, name: 'Guide', item: 'https://qrpayhub.com/en/qr-ph/guide' },
    ],
  },
};

const PH_BLUE = '#0038A8';

export default function QRPhGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'de';
  const content = qrPhGuideContent[locale] ?? qrPhGuideContent.en;
  return (
    <>
      <Script
        id="json-ld-qrph-guide"
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
        { label: 'Home',  href: '/' },
        { label: 'QR Ph', href: '/qr-ph' },
        { label: 'Guide' },
      ]} />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {content.title}
        </h1>
        <p className="text-lg text-slate-500">{content.description}</p>
        <div className="flex items-center gap-3">
          <Link
            href="/qr-ph/generator"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-white text-sm font-semibold rounded-xl transition-colors"
            style={{ backgroundColor: PH_BLUE }}
          >
            {locale === 'de' ? 'Zum Generator →' : 'Try the Generator →'}
          </Link>
          <Link
            href="/qr-ph/faq"
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold rounded-xl transition-colors"
          >
            {locale === 'de' ? 'QR Ph FAQ →' : 'QR Ph FAQ →'}
          </Link>
        </div>
      </header>

      <div className="space-y-14 pt-4">

        {/* Section 1: What is QR Ph */}
        {sectionMap['what-is-qrph'] && (
          <Section id="what-is-qrph" title={sectionMap['what-is-qrph'].heading}>
            <Prose>
              <p>{sectionMap['what-is-qrph'].content}</p>
            </Prose>
          </Section>
        )}

        {/* Section 2: Step by Step */}
        {sectionMap['how-it-works'] && (
          <Section id="how-it-works" title={sectionMap['how-it-works'].heading}>
            <ol className="space-y-4">
              {(locale === 'de' ? [
                { step: 1, title: 'Empfänger generiert QR Ph-Code', body: 'Proxy-Typ (Mobil/Konto/E-Mail) wählen, Proxy-Wert, Empfängernamen und optional Betrag und Verwendungszweck eingeben. Der QR kodiert diese als EMV-Payload mit der PH.INSTAPAY.ME-AID.' },
                { step: 2, title: 'Zahler öffnet eine QR Ph-fähige App', body: 'GCash, Maya, BDO, BPI, Metrobank, Landbank, UnionBank oder jedes andere BSP-beaufsichtigte Institut – alle unterstützen QR Ph-Scanning mit voller Interoperabilität im InstaPay-Netzwerk.' },
                { step: 3, title: 'Zahler scannt den QR-Code', body: 'Die App liest den EMV-Payload, extrahiert Proxy-Typ und -Wert und sucht das Zielkonto im BSP-Register.' },
                { step: 4, title: 'Zahlungsdetails werden ausgefüllt', body: 'Empfängername, Betrag (falls eingebettet) und Verwendungszweck werden zur Überprüfung angezeigt. Der Zahler bestätigt die Details.' },
                { step: 5, title: 'Zahler authentifiziert', body: 'Zahler nutzt die Authentifizierungsmethode seiner App (PIN, Fingerabdruck oder Face ID). Keine Zugangsdaten werden an den Empfänger übertragen.' },
                { step: 6, title: 'Überweisung über InstaPay abgewickelt', body: 'Die Transaktion wird in Echtzeit über BancNets InstaPay-Netzwerk verarbeitet. Gelder kommen innerhalb von Sekunden an, 24/7/365, auch an Feiertagen.' },
                { step: 7, title: 'Bestätigung für beide Parteien', body: 'Zahler und Empfänger erhalten sofortige Transaktionsbenachrichtigungen. Das Limit von ₱50.000 pro Transaktion gilt; größere Beträge erfordern PESONet.' },
              ] : [
                { step: 1, title: 'Payee generates a QR Ph code', body: 'Select proxy type (mobile/account/email), enter the proxy value, payee name, and optionally an amount and purpose. The QR encodes these as an EMV payload with the PH.INSTAPAY.ME AID.' },
                { step: 2, title: 'Payer opens any QR Ph-enabled app', body: 'GCash, Maya, BDO, BPI, Metrobank, Landbank, UnionBank or any other BSP-supervised institution — all support QR Ph scanning. Full interoperability across the InstaPay network.' },
                { step: 3, title: 'Payer scans the QR code', body: "The app reads the EMV payload, extracts the proxy type and value, and looks up the destination account through the BSP registry." },
                { step: 4, title: 'Payment details are pre-filled', body: 'The payee name, amount (if embedded), and purpose are displayed for review. The payer confirms the details before proceeding.' },
                { step: 5, title: 'Payer authenticates', body: "The payer uses their app's authentication method (PIN, fingerprint, or face ID). No credentials are transmitted to the payee." },
                { step: 6, title: 'Transfer settles via InstaPay', body: "The transaction is processed through BancNet's InstaPay network in real time. Funds arrive within seconds, 24/7/365, including holidays." },
                { step: 7, title: 'Confirmation for both parties', body: 'Both payer and payee receive instant transaction notifications. The ₱50,000 per-transaction limit applies; larger amounts require PESONet.' },
              ]).map(({ step, title, body }) => (
                <li key={step} className="flex gap-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: PH_BLUE }}
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

        {/* Section 3: Proxy Types */}
        {sectionMap['proxy-types'] && (
          <Section id="proxy-types" title={sectionMap['proxy-types'].heading}>
            <Prose>
              <p>{sectionMap['proxy-types'].content}</p>
            </Prose>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-3">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    {(locale === 'de'
                      ? ['Proxy-Typ', 'Code', 'Eingabe', 'Normalisiert', 'Verwendet von']
                      : ['Proxy Type', 'Code', 'Example Input', 'Normalized', 'Used By']
                    ).map((h) => (
                      <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PROXY_TYPES.map(({ type, code, example, normalized, usedBy }) => (
                    <tr key={type} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-800">{type}</td>
                      <td className="px-4 py-3 font-mono font-bold" style={{ color: PH_BLUE }}>{code}</td>
                      <td className="px-4 py-3 font-mono text-slate-600 text-xs">{example}</td>
                      <td className="px-4 py-3 font-mono text-emerald-700 text-xs">{normalized}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{usedBy}</td>
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
            <pre className="bg-slate-900 text-emerald-400 text-sm font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4">
{`000201            ← Payload Format Indicator
010211            ← Point of Initiation: 11 (static)
2639              ← Merchant Account Information (ID 26)
  0015PH.INSTAPAY.ME  ← QR Ph Application ID
  0106MSISDN       ← Proxy type: MSISDN
  020[len]+63...   ← Normalized phone number
5204[mcc]         ← Merchant Category Code
5303608           ← Currency: PHP (608)
5406500.00        ← Amount: 500 PHP
5802PH            ← Country Code
5914Juan dela Cruz ← Payee Name
6006Manila        ← City
62[len]           ← Additional Data
  0514Grocery payment ← Purpose
6304XXXX          ← CRC16-CCITT checksum`}
            </pre>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    {['Tag', locale === 'de' ? 'Beispielwert' : 'Example Value', locale === 'de' ? 'Pflicht' : 'Required', locale === 'de' ? 'Beschreibung' : 'Description'].map((h) => (
                      <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {EMV_TAGS.map(({ tag, value, required, description }) => (
                    <tr key={tag} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono font-bold" style={{ color: PH_BLUE }}>{tag}</td>
                      <td className="px-4 py-3 font-mono text-slate-600 text-xs">{value}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          required ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {required ? (locale === 'de' ? 'Pflicht' : 'Required') : 'Optional'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* Section 5: GCash & Maya */}
        {sectionMap['gcash-maya'] && (
          <Section id="gcash-maya" title={sectionMap['gcash-maya'].heading}>
            <Prose>
              <p>{sectionMap['gcash-maya'].content}</p>
            </Prose>
          </Section>
        )}

        {/* Section 6: InstaPay vs PESONet */}
        {sectionMap['instapay-vs-pesonet'] && (
          <Section id="instapay-vs-pesonet" title={sectionMap['instapay-vs-pesonet'].heading}>
            <Prose>
              <p>{sectionMap['instapay-vs-pesonet'].content}</p>
            </Prose>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-3">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{locale === 'de' ? 'Merkmal' : 'Feature'}</th>
                    <th className="px-4 py-3 font-semibold border-b border-slate-200" style={{ color: PH_BLUE }}>InstaPay (QR Ph)</th>
                    <th className="px-4 py-3 font-semibold text-amber-700 border-b border-slate-200">PESONet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {INSTAPAY_VS_PESONET.map(({ feature, instapay, pesonet }) => (
                    <tr key={feature} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-700">{feature}</td>
                      <td className="px-4 py-3 text-slate-600">{instapay}</td>
                      <td className="px-4 py-3 text-slate-600">{pesonet}</td>
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
              {PH_BANKS.map(({ name, type, users }) => (
                <div
                  key={name}
                  className="bg-white border border-slate-100 rounded-xl p-3 flex items-center justify-between shadow-sm"
                >
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{name}</p>
                    <p className="text-xs text-slate-400">{type}</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                    {users}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Section 8: Financial Inclusion */}
        {sectionMap['financial-inclusion'] && (
          <Section id="financial-inclusion" title={sectionMap['financial-inclusion'].heading}>
            <Prose>
              <p>{sectionMap['financial-inclusion'].content}</p>
            </Prose>
          </Section>
        )}

        {/* CTA */}
        <div
          className="rounded-2xl p-6 text-center space-y-3"
          style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}
        >
          <p className="font-semibold text-lg" style={{ color: '#1e3a5f' }}>
            {locale === 'de' ? 'Bereit, Ihren QR Ph-Code zu erstellen?' : 'Ready to generate your QR Ph Code?'}
          </p>
          <p className="text-sm" style={{ color: '#1e40af' }}>
            {locale === 'de'
              ? 'Kostenlos, sofort, funktioniert mit GCash, Maya und allen InstaPay-Apps.'
              : 'Free, instant, works with GCash, Maya and all InstaPay apps.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/qr-ph/generator"
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
              style={{ backgroundColor: PH_BLUE }}
            >
              {locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
            </Link>
            <Link
              href="/qr-ph/faq"
              className="inline-flex items-center gap-2 px-6 py-3 border font-semibold rounded-xl transition-colors"
              style={{ borderColor: '#bfdbfe', color: '#1e3a5f' }}
            >
              {locale === 'de' ? 'QR Ph FAQ lesen →' : 'Read QR Ph FAQ →'}
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
