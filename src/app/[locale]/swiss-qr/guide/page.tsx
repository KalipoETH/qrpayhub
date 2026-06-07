import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/seo';
import { swissQrGuideContent } from '@/content/swiss-qr/guide';
import type { GuideContent } from '@/content/types';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const content = swissQrGuideContent[locale as 'en' | 'de'] ?? swissQrGuideContent.en;
  return {
    title: `${content.title} | QRPayHub`,
    description: content.description,
    keywords: [
      'swiss qr code guide',
      'qr rechnung erklärt',
      'zahlteil anleitung',
      'swiss qr payload',
      'qrr scor non',
    ],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/swiss-qr/guide'),
  };
}

const PAYLOAD_ROWS = [
  { line: '1',      content: 'SPC',                   description: 'Header – always "SPC" (Swiss Payments Code)' },
  { line: '2',      content: '0200',                  description: 'Version – always "0200"' },
  { line: '3',      content: '1',                     description: 'Coding type – 1 = UTF-8' },
  { line: '4',      content: 'CH5604835012345678009', description: 'Creditor IBAN – CH or LI, 21 characters' },
  { line: '5',      content: 'K',                     description: 'Creditor address type – K = combined address' },
  { line: '6',      content: 'Max Mustermann GmbH',   description: 'Creditor name – max 70 characters' },
  { line: '7',      content: 'Musterstrasse 1',       description: 'Creditor address line 1' },
  { line: '8',      content: '8001 Zürich',           description: 'Creditor address line 2 (postcode + city)' },
  { line: '9',      content: '(empty)',               description: 'Creditor address line 3 (unused for type K)' },
  { line: '10',     content: '(empty)',               description: 'Creditor address line 4 (unused for type K)' },
  { line: '11',     content: 'CH',                    description: 'Creditor country – ISO 3166-1 alpha-2' },
  { line: '12–18',  content: '(7 empty lines)',       description: 'Ultimate creditor – reserved, always empty' },
  { line: '19',     content: '100.00',                description: 'Amount – decimal with dot, or empty' },
  { line: '20',     content: 'CHF',                   description: 'Currency – CHF or EUR' },
  { line: '21',     content: 'K',                     description: 'Debtor address type (or empty)' },
  { line: '22–27',  content: '(6 empty lines)',       description: 'Debtor fields – name, address, country (or empty)' },
  { line: '28',     content: 'NON',                   description: 'Reference type – QRR, SCOR or NON' },
  { line: '29',     content: '(empty)',               description: 'Reference – 27 digits for QRR, RF… for SCOR' },
  { line: '30',     content: '(empty)',               description: 'Additional information (Mitteilung) – max 140 chars' },
  { line: '31',     content: 'EPD',                   description: 'Trailer – always "EPD" (End Payment Data)' },
  { line: '32',     content: '(empty)',               description: 'Alternative procedure – optional, rarely used' },
];

const REFERENCE_TYPES = [
  { type: 'QR-Referenz',    code: 'QRR',  format: '27 digits (Modulo-10 check)', usage: 'Mass payments, invoices, memberships' },
  { type: 'Creditor Reference', code: 'SCOR', format: 'RF + 2 check digits + up to 21 chars', usage: 'International transfers, ISO 11649' },
  { type: 'Ohne Referenz',  code: 'NON',  format: '(empty)', usage: 'Simple bank transfers' },
];

const SUPPORTED_BANKS = [
  'UBS', 'PostFinance', 'Raiffeisen', 'Credit Suisse (now UBS)',
  'ZKB (Zürcher Kantonalbank)', 'Berner Kantonalbank', 'St. Galler Kantonalbank',
  'Luzerner Kantonalbank', 'Migros Bank', 'Cler', 'Valiant',
  'Hypothekarbank Lenzburg', 'Cornèr Banca', 'Neon', 'Yuh (SwissQuote)',
  'All 24 Cantonal Banks', 'Revolut (CH)', 'Wise (CH)',
];

const COMPARISON_ROWS = [
  { feature: 'Region',          swissQr: 'CH + LI only',          giroCode: '36 SEPA countries' },
  { feature: 'Currency',        swissQr: 'CHF, EUR',               giroCode: 'EUR (mainly)' },
  { feature: 'Zahlteil',        swissQr: 'Mandatory for invoices', giroCode: 'Not required' },
  { feature: 'Reference types', swissQr: 'QRR, SCOR, NON',         giroCode: 'Structured / Unstructured' },
  { feature: 'Swiss Cross',     swissQr: 'Yes – mandatory',        giroCode: 'No' },
  { feature: 'Standard org',    swissQr: 'SIX Group',              giroCode: 'European Payments Council (EPC)' },
  { feature: 'Since',           swissQr: '2020',                   giroCode: '2016' },
  { feature: 'IBAN',            swissQr: 'CH / LI only',           giroCode: 'All SEPA countries' },
  { feature: 'BIC required',    swissQr: 'No',                     giroCode: 'No (since v002)' },
  { feature: 'Amount optional', swissQr: 'Yes',                    giroCode: 'Yes' },
];

const BEST_PRACTICES = [
  { icon: '📐', text: 'Minimum QR code size: 46 mm × 46 mm on printed documents.' },
  { icon: '⬜', text: 'Quiet zone: at least 5 mm of white space on all four sides.' },
  { icon: '🇨🇭', text: 'Swiss Cross: mandatory in the center, only black and white – never replace with a logo.' },
  { icon: '🔤', text: 'Font: Liberation Sans or metrically equivalent, minimum 8 pt body text, 11 pt headings.' },
  { icon: '🖨️', text: 'Print quality: minimum 300 DPI; avoid JPEG – use PNG or SVG to prevent compression artefacts.' },
  { icon: '✅', text: 'Always test: scan with at least two Swiss banking apps before mass distribution.' },
  { icon: '📄', text: 'Digital invoices: the Zahlteil can be included in PDF; QR codes are scannable from screens.' },
  { icon: '🔒', text: 'Privacy: generation happens client-side – no payment data leaves the device.' },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How Swiss QR Code Works – Complete Guide',
  description:
    'Complete guide to Swiss QR Code (QR-Rechnung): history, Zahlteil, reference types, payload structure, supported banks and best practices.',
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/swiss-qr/guide' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',          item: 'https://qrpayhub.com/en' },
      { '@type': 'ListItem', position: 2, name: 'Swiss QR Code', item: 'https://qrpayhub.com/en/swiss-qr' },
      { '@type': 'ListItem', position: 3, name: 'Guide',         item: 'https://qrpayhub.com/en/swiss-qr/guide' },
    ],
  },
};

export default function SwissQRGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale as 'en' | 'de';
  const content = swissQrGuideContent[locale] ?? swissQrGuideContent.en;
  return (
    <>
      <Script
        id="json-ld-swiss-qr-guide"
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
        { label: 'Home',          href: '/' },
        { label: 'Swiss QR Code', href: '/swiss-qr' },
        { label: locale === 'de' ? 'Guide' : 'Guide' },
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
            href="/swiss-qr/generator"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            {locale === 'de' ? 'Zum Generator →' : 'Try the Generator →'}
          </Link>
        </div>
      </header>

      <div className="space-y-14 pt-4">

        {/* ── Section 1: What is Swiss QR Code ──────────────────────────── */}
        {sectionMap['what-is-swiss-qr'] && (
          <Section id="what-is-swiss-qr" title={sectionMap['what-is-swiss-qr'].heading}>
            <Prose>
              <p>{sectionMap['what-is-swiss-qr'].content}</p>
            </Prose>
          </Section>
        )}

        {/* ── Section 2: History ────────────────────────────────────────── */}
        {sectionMap['history'] && (
          <Section id="history" title={sectionMap['history'].heading}>
            <Prose>
              <p>{sectionMap['history'].content}</p>
            </Prose>
            <ol className="space-y-4 mt-2">
              {[
                {
                  step: 1, year: 'Until 2020',
                  title: 'Orange ESR + Red ES',
                  body: 'Switzerland used two types of payment slips for decades: the orange ESR (Einzahlungsschein mit Referenz), which supported a 27-digit reference number for automated processing, and the red ES (Einzahlungsschein) for simple transfers without reference.',
                },
                {
                  step: 2, year: '2018',
                  title: 'SIX Group announces Swiss QR Code',
                  body: 'SIX Group announced the Swiss QR Code (QR-Rechnung) as the official replacement for both payment slip formats. The specification was developed in collaboration with Swiss banks and financial institutions.',
                },
                {
                  step: 3, year: '30 June 2020',
                  title: 'Old payment slips discontinued',
                  body: 'Both the orange ESR and the red ES were officially discontinued. Swiss QR Code became the only permitted standard for new QR-based invoices.',
                },
                {
                  step: 4, year: '2020 – 2022',
                  title: 'Transition phase',
                  body: 'During the transition period, banks gradually rolled out Swiss QR Code support. Many businesses updated their invoicing software and processes to comply with the new standard.',
                },
                {
                  step: 5, year: '30 September 2022',
                  title: 'Swiss QR Code mandatory for all banks',
                  body: 'Swiss QR Code became legally mandatory for all Swiss banks. Every bank in Switzerland must accept and process Swiss QR Code payments.',
                },
              ].map(({ step, year, title, body }) => (
                <li key={step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                    {step}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-red-600 uppercase tracking-wide">{year}</p>
                    <h3 className="font-semibold text-slate-800">{title}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {/* ── Section 3: Reference Types ────────────────────────────────── */}
        {sectionMap['reference-types'] && (
          <Section id="reference-types" title={sectionMap['reference-types'].heading}>
            <Prose>
              <p>{sectionMap['reference-types'].content}</p>
            </Prose>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-3">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    {['Type', 'Code', 'Format', 'Usage'].map((h) => (
                      <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {REFERENCE_TYPES.map(({ type, code, format, usage }) => (
                    <tr key={code} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-800">{type}</td>
                      <td className="px-4 py-3 font-mono text-red-600 font-bold">{code}</td>
                      <td className="px-4 py-3 font-mono text-slate-600 text-xs">{format}</td>
                      <td className="px-4 py-3 text-slate-600">{usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* ── Section 4: Payload Structure ──────────────────────────────── */}
        {sectionMap['payload-structure'] && (
          <Section id="payload-structure" title={sectionMap['payload-structure'].heading}>
            <Prose>
              <p>{sectionMap['payload-structure'].content}</p>
            </Prose>
            <pre className="bg-slate-900 text-emerald-400 text-sm font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4 whitespace-pre">
{`SPC
0200
1
CH5604835012345678009
K
Max Mustermann GmbH
Musterstrasse 1
8001 Zürich


CH
(7 empty lines – Ultimate Creditor reserved)



100.00
CHF
K
(6 empty lines – Debtor optional)
NON

EPD
`}
            </pre>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    {['Line', 'Content', 'Description'].map((h) => (
                      <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PAYLOAD_ROWS.map(({ line, content, description }) => (
                    <tr key={line} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono text-slate-400 w-16 text-xs">{line}</td>
                      <td className="px-4 py-3 font-mono text-slate-900 font-medium text-xs">{content}</td>
                      <td className="px-4 py-3 text-slate-600">{description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* ── Section 5: Zahlteil ───────────────────────────────────────── */}
        {sectionMap['zahlteil'] && (
          <Section id="zahlteil" title={sectionMap['zahlteil'].heading}>
            <Prose>
              <p>{sectionMap['zahlteil'].content}</p>
            </Prose>
            <ul className="space-y-3 mt-3">
              {[
                {
                  icon: '🧾',
                  title: 'Empfangsschein (left section)',
                  body: 'The Empfangsschein is the smaller receipt section (~62 mm wide). It contains the payment information in human-readable form and is detached and kept by the payer as confirmation after payment.',
                },
                {
                  icon: '📱',
                  title: 'Zahlteil with QR Code (right section)',
                  body: 'The main Zahlteil section (~148 mm wide) contains the Swiss QR Code (minimum 46 mm × 46 mm) on the right side and the payment details in text form on the left.',
                },
                {
                  icon: '✂️',
                  title: 'Separation line',
                  body: 'A dashed line with a scissors symbol runs vertically between the Empfangsschein and the Zahlteil. The Zahlteil is separated from the invoice body by a horizontal dashed line at the top.',
                },
              ].map(({ icon, title, body }) => (
                <li key={title} className="flex gap-3">
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

        {/* ── Section 6: Supported Banks ────────────────────────────────── */}
        {sectionMap['supported-banks'] && (
          <Section id="supported-banks" title={sectionMap['supported-banks'].heading}>
            <Prose>
              <p>{sectionMap['supported-banks'].content}</p>
            </Prose>
            <div className="flex flex-wrap gap-2 mt-3">
              {SUPPORTED_BANKS.map((bank) => (
                <span
                  key={bank}
                  className="px-3 py-1 bg-red-50 text-red-700 border border-red-100 text-sm rounded-full font-medium"
                >
                  {bank}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* ── Section 7: Swiss QR vs GiroCode ───────────────────────────── */}
        {sectionMap['swiss-qr-vs-girocode'] && (
          <Section id="swiss-qr-vs-girocode" title={sectionMap['swiss-qr-vs-girocode'].heading}>
            <Prose>
              <p>{sectionMap['swiss-qr-vs-girocode'].content}</p>
            </Prose>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 mt-3">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">Feature</th>
                    <th className="px-4 py-3 font-semibold text-red-700 border-b border-slate-200">🇨🇭 Swiss QR</th>
                    <th className="px-4 py-3 font-semibold text-blue-700 border-b border-slate-200">🇪🇺 GiroCode</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {COMPARISON_ROWS.map(({ feature, swissQr, giroCode }) => (
                    <tr key={feature} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-700">{feature}</td>
                      <td className="px-4 py-3 text-slate-600">{swissQr}</td>
                      <td className="px-4 py-3 text-slate-600">{giroCode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* ── Section 8: Best Practices ─────────────────────────────────── */}
        {sectionMap['best-practices'] && (
          <Section id="best-practices" title={sectionMap['best-practices'].heading}>
            <Prose>
              <p>{sectionMap['best-practices'].content}</p>
            </Prose>
            <ul className="space-y-3 mt-4">
              {BEST_PRACTICES.map(({ icon, text }) => (
                <li key={text} className="flex gap-3 text-sm text-slate-600">
                  <span className="text-lg flex-shrink-0">{icon}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-red-900 text-lg">
            {locale === 'de'
              ? 'Bereit, Ihren ersten Swiss QR Code zu erstellen?'
              : 'Ready to generate your first Swiss QR Code?'}
          </p>
          <p className="text-red-700 text-sm">
            {locale === 'de'
              ? 'Kostenlos, sofort, keine Registrierung erforderlich.'
              : 'Free, instant, no registration required.'}
          </p>
          <Link
            href="/swiss-qr/generator"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-sm transition-colors"
          >
            {locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
          </Link>
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
