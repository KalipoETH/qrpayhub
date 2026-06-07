import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/seo';
import { pixGuideContent } from '@/content/pix/guide';
import type { GuideContent } from '@/content/types';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const content = pixGuideContent[locale as 'en' | 'de'] ?? pixGuideContent.en;
  return {
    title: `${content.title} | QRPayHub`,
    description: content.description,
    keywords: [
      'pix guide',
      'how pix works',
      'pix qr code format',
      'banco central brasil',
      'pix chave explained',
      'emv pix payload',
      'crc16 pix',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/pix/guide'),
  };
}

const PIX_KEYS = [
  {
    type: 'CPF',
    format: '11 digits',
    example: '123.456.789-09',
    useCase: 'Individuals (pessoas físicas)',
  },
  {
    type: 'CNPJ',
    format: '14 digits',
    example: '12.345.678/0001-90',
    useCase: 'Companies (pessoas jurídicas)',
  },
  {
    type: 'Phone',
    format: '+55 + number',
    example: '+5511987654321',
    useCase: 'Easy to share verbally',
  },
  {
    type: 'Email',
    format: 'Standard email',
    example: 'nome@email.com',
    useCase: 'Digital-savvy users',
  },
  {
    type: 'Random Key',
    format: 'UUID v4',
    example: '123e4567-e89b-12d3-…',
    useCase: 'Maximum privacy',
  },
];

const EMV_TAGS = [
  { tag: '00', value: '01',             description: 'Payload Format Indicator – always 01' },
  { tag: '01', value: '12',             description: 'Point of Initiation: 11 = static, 12 = dynamic' },
  { tag: '26', value: '…',              description: 'Merchant Account Information (PIX sub-fields)' },
  { tag: '52', value: '0000',           description: 'Merchant Category Code (0000 = uncategorized)' },
  { tag: '53', value: '986',            description: 'Transaction Currency – ISO 4217 code for BRL' },
  { tag: '54', value: '100.00',         description: 'Transaction Amount (omitted in static QR)' },
  { tag: '58', value: 'BR',             description: 'Country Code – ISO 3166-1 alpha-2' },
  { tag: '59', value: 'Max Mustermann', description: 'Merchant Name – max 25 chars, shown to payer' },
  { tag: '60', value: 'Sao Paulo',      description: 'Merchant City – city of the recipient' },
  { tag: '62', value: '…',              description: 'Additional Data Field Template (transaction ref)' },
  { tag: '63', value: 'ABCD',           description: 'CRC16 Checksum – 4 uppercase hex characters' },
];

const COMPARISON_ROWS = [
  { label: 'Speed',            pix: 'Seconds',      ted: 'Minutes (business hours)', doc: 'Next day',  boleto: '1–3 days' },
  { label: '24/7 Available',   pix: '✅',            ted: '❌',                        doc: '❌',         boleto: '❌' },
  { label: 'Free (individuals)',pix: '✅',            ted: '❌',                        doc: '❌',         boleto: '❌' },
  { label: 'Limit',            pix: 'Bank-defined', ted: 'R$1M+',                    doc: 'R$5,000',    boleto: 'Unlimited' },
  { label: 'QR Code',          pix: '✅',            ted: '❌',                        doc: '❌',         boleto: 'Boleto code' },
];

const PIX_BANKS = [
  { name: 'Nubank',           color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { name: 'Itaú',             color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { name: 'Bradesco',         color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'Banco do Brasil',  color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { name: 'Caixa Econômica',  color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { name: 'Santander',        color: 'bg-red-100 text-red-800 border-red-200' },
  { name: 'BTG Pactual',      color: 'bg-slate-100 text-slate-700 border-slate-200' },
  { name: 'Inter',            color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { name: 'C6 Bank',          color: 'bg-zinc-100 text-zinc-700 border-zinc-200' },
  { name: 'PicPay',           color: 'bg-green-100 text-green-700 border-green-200' },
  { name: 'Mercado Pago',     color: 'bg-sky-100 text-sky-700 border-sky-200' },
  { name: 'Sicredi',          color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { name: 'Sicoob',           color: 'bg-teal-100 text-teal-700 border-teal-200' },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "How PIX Works – Complete Guide to Brazil's Payment System",
  description:
    "Complete guide to PIX: Brazil's instant payment system. PIX keys, QR code format, CRC16 checksum, supported banks and how to generate PIX QR codes for free.",
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/pix/guide' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',   item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'PIX QR', item: 'https://qrpayhub.com/en/pix' },
      { '@type': 'ListItem', position: 3, name: 'Guide',  item: 'https://qrpayhub.com/en/pix/guide' },
    ],
  },
};

export default function PIXGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'de';
  const content = pixGuideContent[locale] ?? pixGuideContent.en;
  return (
    <>
      <Script
        id="json-ld-pix-guide"
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

      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <Breadcrumb items={[
        { label: 'Home',   href: '/' },
        { label: 'PIX QR', href: '/pix' },
        { label: 'Guide' },
      ]} />

      {/* ── Title ────────────────────────────────────────────────────────── */}
      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {content.title}
        </h1>
        <p className="text-lg text-slate-500">
          {content.description}
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/pix/generator"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            {locale === 'de' ? 'Zum Generator →' : 'Try the Generator →'}
          </Link>
          <Link
            href="/pix/faq"
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold rounded-xl transition-colors"
          >
            {locale === 'de' ? 'PIX FAQ →' : 'PIX FAQ →'}
          </Link>
        </div>
      </header>

      <div className="space-y-14 pt-4">

        {/* ── Section 1: What is PIX ───────────────────────────────────────── */}
        {sectionMap['what-is-pix'] && (
          <Section id="what-is-pix" title={sectionMap['what-is-pix'].heading}>
            <Prose>
              <p>{sectionMap['what-is-pix'].content}</p>
            </Prose>
          </Section>
        )}

        {/* ── Section 2: Step by Step ──────────────────────────────────────── */}
        {sectionMap['how-it-works'] && (
          <Section id="how-it-works" title={sectionMap['how-it-works'].heading}>
            <ol className="space-y-4">
              {[
                {
                  step: 1,
                  title: locale === 'de' ? 'Empfänger teilt PIX-Schlüssel oder QR-Code' : 'Recipient shares PIX key or QR code',
                  body: locale === 'de'
                    ? 'Der Zahlungsempfänger gibt seinen PIX-Schlüssel (CPF, CNPJ, Telefon, E-Mail oder Zufalls-UUID) an oder zeigt einen PIX QR-Code. Statische QR-Codes funktionieren für beliebige Beträge; dynamische QR-Codes enthalten einen voreingestellten Betrag.'
                    : 'The payee provides their PIX key (CPF, CNPJ, phone, email or random UUID) or displays a PIX QR code. Static QR codes work for any amount; dynamic QR codes include a pre-set amount.',
                },
                {
                  step: 2,
                  title: locale === 'de' ? 'Zahlender öffnet eine brasilianische Banking-App' : 'Payer opens any Brazilian banking app',
                  body: locale === 'de'
                    ? 'Alle 700+ teilnehmenden Banken und Fintechs sind vollständig interoperabel. Eine Zahlung von Nubank kommt sofort auf einem Bradesco-Konto an – keine Bindung an ein bestimmtes Institut.'
                    : 'All 700+ participating banks and fintechs are fully interoperable. A payment from Nubank arrives instantly in a Bradesco account — no lock-in to any specific institution.',
                },
                {
                  step: 3,
                  title: locale === 'de' ? 'PIX-Schlüssel eingeben oder QR-Code scannen' : 'Payer enters PIX key or scans QR code',
                  body: locale === 'de'
                    ? 'Die App aktiviert die Kamera. PIX QR-Codes können von einem gedruckten Beleg, Telefonbildschirm, PDF oder jeder Oberfläche gescannt werden. Alternativ wird der PIX-Schlüssel direkt eingegeben.'
                    : 'The app activates the camera. PIX QR codes can be scanned from a printed receipt, phone screen, PDF or any surface. Alternatively, the PIX key is typed directly.',
                },
                {
                  step: 4,
                  title: locale === 'de' ? 'Betrag und Empfänger auf dem Bildschirm bestätigen' : 'Amount and recipient confirmed on screen',
                  body: locale === 'de'
                    ? 'Name und Bank des Empfängers werden automatisch angezeigt. Bei einem dynamischen QR ist der Betrag vorausgefüllt. Beim statischen QR muss der Zahlende den Betrag manuell eingeben.'
                    : "The payee's name and bank are displayed automatically. If a dynamic QR is used, the amount is pre-filled. Static QR requires the payer to enter the amount manually.",
                },
                {
                  step: 5,
                  title: locale === 'de' ? 'Zahlender authentifiziert sich (Biometrie oder PIN)' : 'Payer authenticates (biometric or PIN)',
                  body: locale === 'de'
                    ? 'Die Authentifizierungsdaten verlassen die Banking-App nicht. Der PIX QR-Code selbst enthält keine sensiblen Daten – nur die Empfängerkennung und optionalen Betrag.'
                    : 'The authentication credential never leaves the banking app. The PIX QR code itself contains no sensitive data — only the recipient identification and optional amount.',
                },
                {
                  step: 6,
                  title: locale === 'de' ? 'Überweisung in Sekunden abgeschlossen' : 'Transfer completes in seconds',
                  body: locale === 'de'
                    ? 'Die BCB-Infrastruktur (über SPI – Sistema de Pagamentos Instantâneos) verarbeitet die Überweisung in Echtzeit. Gelder werden direkt zwischen Bankkonten übertragen.'
                    : 'The BCB infrastructure (via SPI – Sistema de Pagamentos Instantâneos) processes the transfer in real time. Funds move directly between bank accounts.',
                },
                {
                  step: 7,
                  title: locale === 'de' ? 'Beide Parteien erhalten Bestätigung' : 'Both parties receive confirmation',
                  body: locale === 'de'
                    ? 'Absender und Empfänger erhalten sofortige Push-Benachrichtigungen und SMS-Alerts. Ein Transaktionsbeleg (Comprovante) ist in der Banking-App verfügbar.'
                    : 'Sender and recipient both receive instant push notifications and SMS alerts. A transaction receipt (comprovante) is available in the banking app.',
                },
              ].map(({ step, title, body }) => (
                <li key={step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
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

        {/* ── Section 3: PIX Keys ──────────────────────────────────────────── */}
        {sectionMap['pix-keys'] && (
          <Section id="pix-keys" title={sectionMap['pix-keys'].heading}>
            <Prose>
              <p>{sectionMap['pix-keys'].content}</p>
            </Prose>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-3">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    {(locale === 'de'
                      ? ['Schlüsseltyp', 'Format', 'Beispiel', 'Ideal für']
                      : ['Key Type', 'Format', 'Example', 'Best For']
                    ).map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PIX_KEYS.map(({ type, format, example, useCase }) => (
                    <tr key={type} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-emerald-700">{type}</td>
                      <td className="px-4 py-3 text-slate-500">{format}</td>
                      <td className="px-4 py-3 font-mono text-slate-600 text-xs">{example}</td>
                      <td className="px-4 py-3 text-slate-600">{useCase}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* ── Section 4: EMV Payload ───────────────────────────────────────── */}
        {sectionMap['payload-emv'] && (
          <Section id="payload-emv" title={sectionMap['payload-emv'].heading}>
            <Prose>
              <p>{sectionMap['payload-emv'].content}</p>
            </Prose>

            <pre className="bg-slate-900 text-emerald-400 text-sm font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4 whitespace-pre">
{`000201                              ← Tag 00: Payload Format Indicator
010212                              ← Tag 01: Dynamic QR (12)
2658                                ← Tag 26: Merchant Account (length 58)
  0014BR.GOV.BCB.PIX                  ← Sub-tag 00: PIX identifier
  0136123e4567-e89b-12d3-            ← Sub-tag 01: PIX key (UUID)
       a456-426614174000
52040000                            ← Tag 52: Merchant Category Code
5303986                             ← Tag 53: Currency (BRL = 986)
5406100.00                          ← Tag 54: Amount
5802BR                              ← Tag 58: Country Code
5913Max Mustermann                  ← Tag 59: Merchant Name (≤25 chars)
6009Sao Paulo                       ← Tag 60: Merchant City
62140510***                         ← Tag 62: Additional Data (Tx ref)
6304ABCD                            ← Tag 63: CRC16 Checksum`}
            </pre>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    {['Tag', locale === 'de' ? 'Beispielwert' : 'Example Value', locale === 'de' ? 'Beschreibung' : 'Description'].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {EMV_TAGS.map(({ tag, value, description }) => (
                    <tr key={tag} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono text-emerald-600 font-bold">{tag}</td>
                      <td className="px-4 py-3 font-mono text-slate-600 text-xs">{value}</td>
                      <td className="px-4 py-3 text-slate-600">{description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* ── Section 5: CRC16 ─────────────────────────────────────────────── */}
        {sectionMap['crc16'] && (
          <Section id="crc16" title={sectionMap['crc16'].heading}>
            <Prose>
              <p>{sectionMap['crc16'].content}</p>
            </Prose>
            <ul className="space-y-3 mt-2">
              {[
                {
                  icon: '⚙️',
                  title: locale === 'de' ? 'Algorithmus' : 'Algorithm',
                  body: locale === 'de'
                    ? 'CRC16-CCITT mit Polynom 0x1021 und Startwert 0xFFFF. Dies ist dieselbe Variante, die in XMODEM und vielen Industrieprotokollen verwendet wird.'
                    : 'CRC16-CCITT with polynomial 0x1021 and initial value 0xFFFF. This is the same variant used in XMODEM and many industrial protocols.',
                },
                {
                  icon: '📥',
                  title: locale === 'de' ? 'Eingabe' : 'Input',
                  body: locale === 'de'
                    ? 'Die gesamte PIX-Payload-Zeichenkette bis einschließlich des „6304"-Feld-Headers – der 4-stellige Prüfsummen-Slot wird bei der Berechnung ausgeschlossen.'
                    : 'The entire PIX payload string up to and including the "6304" field header — the 4-character checksum slot is excluded from the computation.',
                },
                {
                  icon: '📤',
                  title: locale === 'de' ? 'Ausgabe' : 'Output',
                  body: locale === 'de'
                    ? 'Ein 16-Bit-Integer, formatiert als 4 Großbuchstaben-Hexadezimalzeichen (z. B. A3F2). Bei Bedarf mit führenden Nullen aufgefüllt.'
                    : 'A 16-bit integer, formatted as 4 uppercase hexadecimal characters (e.g. A3F2). Padded with leading zeros if needed.',
                },
                {
                  icon: '🔒',
                  title: locale === 'de' ? 'Warum es wichtig ist' : 'Why it matters',
                  body: locale === 'de'
                    ? 'Die CRC verhindert manipulierte QR-Codes. Jede Änderung am Händlernamen, PIX-Schlüssel oder Betrag ändert die Prüfsumme und veranlasst die Banking-App, die Zahlung abzulehnen.'
                    : 'The CRC prevents tampered QR codes. Any modification to the merchant name, PIX key or amount changes the checksum and causes the banking app to reject the payment.',
                },
                {
                  icon: '🌐',
                  title: locale === 'de' ? 'Clientseitige Berechnung' : 'Client-side computation',
                  body: locale === 'de'
                    ? 'QRPayHub berechnet die CRC16-Prüfsumme vollständig in Ihrem Browser mit JavaScript. Es werden keine Payload-Daten an einen Server gesendet.'
                    : 'QRPayHub computes the CRC16 checksum entirely in your browser using JavaScript. No payload data is ever sent to a server.',
                },
              ].map(({ icon, title, body }) => (
                <li key={title} className="flex gap-3 text-sm">
                  <span className="text-xl flex-shrink-0">{icon}</span>
                  <span className="text-slate-600">
                    <strong className="text-slate-800">{title}:</strong> {body}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ── Section 6: Supported Banks ───────────────────────────────────── */}
        {sectionMap['supported-banks'] && (
          <Section id="supported-banks" title={sectionMap['supported-banks'].heading}>
            <Prose>
              <p>{sectionMap['supported-banks'].content}</p>
            </Prose>
            <div className="flex flex-wrap gap-3 mt-3">
              {PIX_BANKS.map(({ name, color }) => (
                <div
                  key={name}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold ${color}`}
                >
                  {name}
                </div>
              ))}
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold bg-slate-50 text-slate-400 border-slate-200">
                {locale === 'de' ? '700+ weitere…' : '700+ more…'}
              </div>
            </div>
          </Section>
        )}

        {/* ── Section 7: Comparison Table ──────────────────────────────────── */}
        {sectionMap['pix-vs-traditional'] && (
          <Section id="pix-vs-traditional" title={sectionMap['pix-vs-traditional'].heading}>
            <Prose>
              <p>{sectionMap['pix-vs-traditional'].content}</p>
            </Prose>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-3">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">
                      {locale === 'de' ? 'Merkmal' : 'Feature'}
                    </th>
                    <th className="px-4 py-3 font-semibold text-emerald-700 border-b border-slate-200">PIX</th>
                    <th className="px-4 py-3 font-semibold text-slate-600 border-b border-slate-200">TED</th>
                    <th className="px-4 py-3 font-semibold text-slate-600 border-b border-slate-200">DOC</th>
                    <th className="px-4 py-3 font-semibold text-slate-600 border-b border-slate-200">Boleto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {COMPARISON_ROWS.map(({ label, pix, ted, doc, boleto }) => (
                    <tr key={label} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-700">{label}</td>
                      <td className="px-4 py-3 text-emerald-700 font-medium">{pix}</td>
                      <td className="px-4 py-3 text-slate-500">{ted}</td>
                      <td className="px-4 py-3 text-slate-500">{doc}</td>
                      <td className="px-4 py-3 text-slate-500">{boleto}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* ── Section 8: Security & Regulation ────────────────────────────── */}
        {sectionMap['security'] && (
          <Section id="security" title={sectionMap['security'].heading}>
            <Prose>
              <p>{sectionMap['security'].content}</p>
            </Prose>
            <ul className="space-y-3 mt-2">
              {[
                {
                  icon: '🔒',
                  text: locale === 'de'
                    ? 'Dieselbe Sicherheitsinfrastruktur wie das brasilianische Internet-Banking (SPB). Alle Transaktionen erfordern biometrische oder PIN-Authentifizierung in Ihrer Banking-App.'
                    : 'Same security infrastructure as Brazilian internet banking (SPB). All transactions require biometric or PIN authentication inside your banking app.',
                },
                {
                  icon: '🌙',
                  text: locale === 'de'
                    ? 'Nachtlimit (20:00–06:00): Banken setzen ein niedrigeres PIX-Limit durch, typischerweise R$1.000 pro Transaktion, um das Betrugsrisiko in den Nachtstunden zu reduzieren.'
                    : 'Night limit (20:00–06:00): banks enforce a lower PIX limit, typically R$1,000 per transaction, to reduce fraud risk during overnight hours.',
                },
                {
                  icon: '🛡️',
                  text: locale === 'de'
                    ? 'QR-Codes öffentlich teilen ist sicher: Ein PIX QR enthält nur den PIX-Schlüssel des Empfängers und den Namen – keine Bankkontodetails, keine Zugangsdaten, keine sensiblen persönlichen Daten.'
                    : 'Safe to share QR codes publicly: a PIX QR contains only the recipient PIX key and name — no bank account details, no credentials, no sensitive personal data.',
                },
                {
                  icon: '↩️',
                  text: locale === 'de'
                    ? 'MED – Mecanismo Especial de Devolução: Bei bestätigtem Betrug kann der BCB einen speziellen Rückbuchungsmechanismus auslösen, der die empfangende Bank zur Rückgabe der Gelder zwingt.'
                    : 'MED – Mecanismo Especial de Devolução: in cases of confirmed fraud, the BCB can trigger a special reversal mechanism that forces the receiving bank to return funds.',
                },
                {
                  icon: '📋',
                  text: locale === 'de'
                    ? 'DICT – Diretório de Identificadores de Contas Transacionais: Der BCB führt dieses zentrale Register, das jeden PIX-Schlüssel auf ein Bankkonto abbildet. Alle Schlüsselabfragen laufen vor einer Überweisung über DICT.'
                    : 'DICT – Diretório de Identificadores de Contas Transacionais: the BCB maintains this central registry that maps every PIX key to a bank account. All key lookups go through DICT before a transfer is initiated.',
                },
                {
                  icon: '⚖️',
                  text: locale === 'de'
                    ? 'Pflichtbeteiligung: Alle Finanzinstitute mit 500.000+ aktiven Konten müssen PIX nach BCB-Beschluss 1 anbieten. Kleinere Institute können freiwillig beitreten.'
                    : 'Mandatory participation: all financial institutions with 500,000+ active accounts must offer PIX under BCB Resolution 1. Smaller institutions may join voluntarily.',
                },
              ].map(({ icon, text }) => (
                <li key={icon} className="flex gap-3 text-sm text-slate-600">
                  <span className="text-lg flex-shrink-0">{icon}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-emerald-900 text-lg">
            {locale === 'de'
              ? 'Bereit, Ihren PIX QR-Code zu erstellen?'
              : 'Ready to generate your PIX QR Code?'}
          </p>
          <p className="text-emerald-700 text-sm">
            {locale === 'de'
              ? 'Kostenlos, sofort, funktioniert mit allen brasilianischen Banking-Apps. Keine Registrierung erforderlich.'
              : 'Free, instant, works with all Brazilian banking apps. No sign-up required.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/pix/generator"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-sm transition-colors"
            >
              {locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
            </Link>
            <Link
              href="/pix/faq"
              className="inline-flex items-center gap-2 px-6 py-3 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 font-semibold rounded-xl transition-colors"
            >
              {locale === 'de' ? 'PIX FAQ lesen →' : 'Read PIX FAQ →'}
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

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
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
