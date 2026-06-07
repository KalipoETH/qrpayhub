import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/seo';
import { vietqrGuideContent } from '@/content/vietqr/guide';
import type { GuideContent } from '@/content/types';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const content = vietqrGuideContent[locale as 'en' | 'de'] ?? vietqrGuideContent.en;
  return {
    title: `${content.title} | QRPayHub`,
    description: content.description,
    keywords: [
      'vietqr guide',
      'how vietqr works',
      'vietqr emv payload',
      'napas bank bin',
      'vietnam qr payment guide',
      'vietqr account name rules',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/vietqr/guide'),
  };
}

const BANK_BINS = [
  { bin: '970436', name: 'Vietcombank',  short: 'VCB' },
  { bin: '970418', name: 'BIDV',         short: 'BIDV' },
  { bin: '970405', name: 'Agribank',     short: 'AGB' },
  { bin: '970415', name: 'Vietinbank',   short: 'CTG' },
  { bin: '970407', name: 'Techcombank',  short: 'TCB' },
  { bin: '970422', name: 'MB Bank',      short: 'MB' },
  { bin: '970432', name: 'VPBank',       short: 'VPB' },
  { bin: '970423', name: 'TPBank',       short: 'TPB' },
  { bin: '970403', name: 'Sacombank',    short: 'STB' },
  { bin: '970416', name: 'ACB',          short: 'ACB' },
  { bin: '970437', name: 'HDBank',       short: 'HDB' },
];

const EMV_TAGS = [
  { tag: '00',       value: '01',           required: true,  description: 'Payload Format Indicator (always "01")' },
  { tag: '01',       value: '11',           required: false, description: 'Point of Initiation Method (11=static, 12=dynamic)' },
  { tag: '38',       value: '...',          required: true,  description: 'NAPAS Merchant Account – contains BIN + account number' },
  { tag: '38 › 00',  value: 'A000000727',   required: true,  description: 'NAPAS Application ID (AID)' },
  { tag: '38 › 01',  value: '970436',       required: true,  description: 'Bank BIN (6 digits)' },
  { tag: '38 › 02',  value: '1234567890',   required: true,  description: 'Account number' },
  { tag: '52',       value: '4814',         required: false, description: 'Merchant Category Code (MCC)' },
  { tag: '53',       value: '704',          required: true,  description: 'Transaction Currency (704 = VND)' },
  { tag: '54',       value: '150000',       required: false, description: 'Transaction Amount (whole VND, no decimals)' },
  { tag: '58',       value: 'VN',           required: true,  description: 'Country Code' },
  { tag: '59',       value: 'NGUYEN VAN A', required: true,  description: 'Merchant Name (UPPERCASE ASCII, no diacritics)' },
  { tag: '60',       value: 'HA NOI',       required: true,  description: 'Merchant City (ASCII)' },
  { tag: '62 › 08',  value: 'Chuyen tien', required: false, description: 'Bill number / payment description' },
  { tag: '63',       value: 'XXXX',         required: true,  description: 'CRC16-CCITT checksum (4 hex chars)' },
];

const NAME_EXAMPLES = [
  { correct: 'NGUYEN VAN AN',  incorrect: 'Nguyễn Văn An',    note: 'Common Vietnamese name' },
  { correct: 'TRAN THI BICH',  incorrect: 'Trần Thị Bích',   note: 'Female name with tone marks' },
  { correct: 'LE HOANG LONG',  incorrect: 'Lê Hoàng Long',   note: 'Name with circumflex vowels' },
  { correct: 'PHAM DUC THANG', incorrect: 'Phạm Đức Thắng',  note: 'Name with đ character' },
];

const VIETQR_APPS = [
  { app: 'Vietcombank VCB-Mobile', type: 'Banking App', flag: '🏦' },
  { app: 'BIDV Smart Banking',     type: 'Banking App', flag: '🏦' },
  { app: 'Agribank E-Mobile',      type: 'Banking App', flag: '🏦' },
  { app: 'Techcombank Mobile',     type: 'Banking App', flag: '🏦' },
  { app: 'MB Bank',                type: 'Banking App', flag: '🏦' },
  { app: 'VPBank NEO',             type: 'Banking App', flag: '🏦' },
  { app: 'MoMo',                   type: 'E-Wallet',    flag: '👛' },
  { app: 'ZaloPay',                type: 'E-Wallet',    flag: '👛' },
  { app: 'VNPay',                  type: 'Payment App', flag: '💳' },
  { app: 'ShopeePay VN',           type: 'E-Wallet',    flag: '👛' },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How VietQR Works – Complete Guide',
  description:
    "Complete guide to VietQR: Vietnam's national bank transfer QR standard by NAPAS. Bank BINs, EMV payload, account name rules and supported apps.",
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/vietqr/guide' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',   item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'VietQR', item: 'https://qrpayhub.com/en/vietqr' },
      { '@type': 'ListItem', position: 3, name: 'Guide',  item: 'https://qrpayhub.com/en/vietqr/guide' },
    ],
  },
};

const VN_RED = '#DA251D';

export default function VietQRGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'de';
  const content = vietqrGuideContent[locale] ?? vietqrGuideContent.en;
  return (
    <>
      <Script
        id="json-ld-vietqr-guide"
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
        { label: 'VietQR', href: '/vietqr' },
        { label: 'Guide' },
      ]} />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {content.title}
        </h1>
        <p className="text-lg text-slate-500">{content.description}</p>
        <div className="flex items-center gap-3">
          <Link
            href="/vietqr/generator"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-white text-sm font-semibold rounded-xl transition-colors"
            style={{ backgroundColor: VN_RED }}
          >
            {locale === 'de' ? 'Zum Generator →' : 'Try the Generator →'}
          </Link>
          <Link
            href="/vietqr/faq"
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold rounded-xl transition-colors"
          >
            {locale === 'de' ? 'VietQR FAQ →' : 'VietQR FAQ →'}
          </Link>
        </div>
      </header>

      <div className="space-y-14 pt-4">

        {/* Section 1: What is VietQR */}
        {sectionMap['what-is-vietqr'] && (
          <Section id="what-is-vietqr" title={sectionMap['what-is-vietqr'].heading}>
            <Prose>
              <p>{sectionMap['what-is-vietqr'].content}</p>
            </Prose>
          </Section>
        )}

        {/* Section 2: Step by Step */}
        {sectionMap['how-it-works'] && (
          <Section id="how-it-works" title={sectionMap['how-it-works'].heading}>
            <ol className="space-y-4">
              {(locale === 'de' ? [
                { step: 1, title: 'Empfänger generiert VietQR-Code', body: 'Bank-BIN eingeben (oder Bank auswählen), Kontonummer, Kontoname in GROSSBUCHSTABEN und optional einen vorausgefüllten Betrag und eine Beschreibung. Der QR kodiert alles als EMV-Payload.' },
                { step: 2, title: 'Sender öffnet eine unterstützte Banking-App', body: 'Alle vietnamesischen Banking-Apps und großen E-Wallets (MoMo, ZaloPay, VNPay) unterstützen VietQR-Scanning. Das System ist vollständig interoperabel bei allen NAPAS-Mitgliedsbanken.' },
                { step: 3, title: 'Sender scannt den QR-Code', body: 'Die App liest den EMV-Payload, extrahiert den Bank-BIN (identifiziert die Empfängerbank), die Kontonummer und den Betrag. Keine manuelle Eingabe erforderlich.' },
                { step: 4, title: 'Überweisungsformular wird automatisch ausgefüllt', body: "Die App des Senders identifiziert automatisch die Bank des Empfängers aus dem BIN und füllt Kontonummer, Kontoname und Betrag vor. Sender überprüft und bestätigt." },
                { step: 5, title: 'Sender authentifiziert', body: 'Sender bestätigt die Überweisung mit der Bank-Authentifizierung (PIN, Fingerabdruck oder Face ID). Das Zugangsdaten verlassen das Gerät nie.' },
                { step: 6, title: 'Überweisung über NAPAS abgeschlossen', body: 'NAPAS leitet die Interbanken-Überweisung in Echtzeit. Gelder kommen innerhalb von Sekunden auf dem Konto des Empfängers an, 24/7, auch an Wochenenden und Feiertagen.' },
                { step: 7, title: 'Beide Parteien erhalten Bestätigung', body: 'Sender erhält Erfolgsbenachrichtigung. Empfänger erhält eine sofortige Gutschriftsbenachrichtigung per SMS und In-App-Meldung von seiner Bank.' },
              ] : [
                { step: 1, title: 'Recipient generates a VietQR code', body: 'Enter your bank BIN (or select your bank), account number, account name in UPPERCASE, and optionally a pre-filled amount and description. The QR encodes all this as an EMV payload.' },
                { step: 2, title: 'Sender opens any supported banking app', body: 'All Vietnamese banking apps and major e-wallets (MoMo, ZaloPay, VNPay) support VietQR scanning. The system is fully interoperable across all NAPAS-member banks.' },
                { step: 3, title: 'Sender scans the QR code', body: 'The app reads the EMV payload, extracts the bank BIN (identifying the receiving bank), account number, and amount. No manual entry needed.' },
                { step: 4, title: 'Transfer form is pre-filled', body: "The sender's app automatically identifies the recipient's bank from the BIN and pre-fills the account number, account name, and amount (if embedded). The sender reviews and confirms." },
                { step: 5, title: 'Sender authenticates', body: "The sender confirms the transfer using their bank's authentication (PIN, fingerprint or face ID). The credential never leaves their device." },
                { step: 6, title: 'Transfer completes via NAPAS', body: "NAPAS routes the interbank transfer in real time. Funds arrive in the recipient's account within seconds, 24/7, including weekends and public holidays." },
                { step: 7, title: 'Both parties receive confirmation', body: 'The sender gets a transaction success notification. The recipient receives an instant credit alert via SMS and in-app notification from their bank.' },
              ]).map(({ step, title, body }) => (
                <li key={step} className="flex gap-4">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: VN_RED }}
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

        {/* Section 3: Bank BIN System */}
        {sectionMap['bank-bin-system'] && (
          <Section id="bank-bin-system" title={sectionMap['bank-bin-system'].heading}>
            <Prose>
              <p>{sectionMap['bank-bin-system'].content}</p>
            </Prose>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-3">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    {['BIN', locale === 'de' ? 'Bankname' : 'Bank Name', locale === 'de' ? 'Kürzel' : 'Short Code'].map((h) => (
                      <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {BANK_BINS.map(({ bin, name, short }) => (
                    <tr key={bin} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono font-bold" style={{ color: VN_RED }}>{bin}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{name}</td>
                      <td className="px-4 py-3 text-slate-500 font-mono">{short}</td>
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
{`000201          ← Payload Format Indicator
010211          ← Point of Initiation: 11 (static)
38[len]         ← NAPAS Merchant Account (ID 38, not 26!)
  0010A000000727  ← NAPAS AID
  01[len]970436   ← Bank BIN (Vietcombank)
  02[len]1234567890 ← Account Number
5204[mcc]       ← Merchant Category Code
5303704         ← Currency: VND (704)
5406150000      ← Amount: 150,000 VND
5802VN          ← Country Code
5913NGUYEN VAN A ← Merchant Name (UPPERCASE ASCII)
6010HA NOI      ← Merchant City
6233            ← Additional Data
  08[len]NOTE   ← Bill number / description
6304XXXX        ← CRC16-CCITT checksum`}
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
                      <td className="px-4 py-3 font-mono font-bold" style={{ color: VN_RED }}>{tag}</td>
                      <td className="px-4 py-3 font-mono text-slate-600 text-xs">{value}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          required ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'
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

        {/* Section 5: Account Name Rules */}
        {sectionMap['account-name-rules'] && (
          <Section id="account-name-rules" title={sectionMap['account-name-rules'].heading}>
            <Prose>
              <p>{sectionMap['account-name-rules'].content}</p>
            </Prose>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-4">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-emerald-700 border-b border-slate-200">✅ {locale === 'de' ? 'Korrekt (ASCII)' : 'Correct (ASCII)'}</th>
                    <th className="px-4 py-3 font-semibold text-red-700 border-b border-slate-200">❌ {locale === 'de' ? 'Falsch (Vietnamesisch)' : 'Incorrect (Vietnamese)'}</th>
                    <th className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{locale === 'de' ? 'Hinweis' : 'Note'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {NAME_EXAMPLES.map(({ correct, incorrect, note }) => (
                    <tr key={correct} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono font-bold text-emerald-700">{correct}</td>
                      <td className="px-4 py-3 font-mono text-red-600">{incorrect}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* Section 6: Supported Apps */}
        {sectionMap['supported-apps'] && (
          <Section id="supported-apps" title={sectionMap['supported-apps'].heading}>
            <Prose>
              <p>{sectionMap['supported-apps'].content}</p>
            </Prose>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {VIETQR_APPS.map(({ app, type, flag }) => (
                <div
                  key={app}
                  className="bg-white border border-slate-100 rounded-xl p-3 flex items-center gap-3 shadow-sm"
                >
                  <span className="text-2xl">{flag}</span>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{app}</p>
                    <p className="text-xs text-slate-400">{type}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Section 7: For Merchants */}
        {sectionMap['for-merchants'] && (
          <Section id="for-merchants" title={sectionMap['for-merchants'].heading}>
            <Prose>
              <p>{sectionMap['for-merchants'].content}</p>
            </Prose>
          </Section>
        )}

        {/* Section 8: Cashless Vision */}
        {sectionMap['cashless-vision'] && (
          <Section id="cashless-vision" title={sectionMap['cashless-vision'].heading}>
            <Prose>
              <p>{sectionMap['cashless-vision'].content}</p>
            </Prose>
          </Section>
        )}

        {/* CTA */}
        <div
          className="rounded-2xl p-6 text-center space-y-3"
          style={{ backgroundColor: '#fff5f5', border: '1px solid #fca5a5' }}
        >
          <p className="font-semibold text-lg" style={{ color: '#9b1c1c' }}>
            {locale === 'de' ? 'Bereit, Ihren VietQR-Code zu erstellen?' : 'Ready to generate your VietQR Code?'}
          </p>
          <p className="text-sm" style={{ color: '#b91c1c' }}>
            {locale === 'de'
              ? 'Kostenlos, sofort, funktioniert mit allen vietnamesischen Banking-Apps.'
              : 'Free, instant, works with all Vietnamese banking apps.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/vietqr/generator"
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
              style={{ backgroundColor: VN_RED }}
            >
              {locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
            </Link>
            <Link
              href="/vietqr/faq"
              className="inline-flex items-center gap-2 px-6 py-3 border font-semibold rounded-xl transition-colors"
              style={{ borderColor: '#fca5a5', color: '#9b1c1c' }}
            >
              {locale === 'de' ? 'VietQR FAQ lesen →' : 'Read VietQR FAQ →'}
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
