import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'PIX QR Code Explained – How Brazilian QR Payments Work 2026';
const TITLE_DE = 'PIX QR-Code erklärt – Wie Brasiliens QR-Zahlung funktioniert 2026';
const DESC_EN =
  'PIX QR codes use the EMV standard with CRC16 checksum. Learn how static vs dynamic PIX QR codes work, the technical format and how to generate one free.';
const DESC_DE =
  'PIX-QR-Codes nutzen den EMV-Standard mit CRC16-Prüfsumme. Erfahre, wie statische und dynamische PIX-QR-Codes funktionieren, das technische Format und wie du einen kostenlos generierst.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['pix qr code', 'emv pix', 'static pix qr', 'dynamic pix qr', 'pix payload', 'crc16 pix', 'pix technical'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/brazil/pix-qr-code-explained'),
    openGraph: buildOpenGraph(locale, '/guides/brazil/pix-qr-code-explained', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const STATS = (locale: 'en' | 'de') => [
  { value: '3B+',              label: locale === 'de' ? 'Transaktionen/Monat' : 'Monthly transactions' },
  { value: '700+',             label: locale === 'de' ? 'Partnerbanken' : 'Participating banks' },
  { value: '150M+',            label: locale === 'de' ? 'Registrierte Nutzer' : 'Registered users' },
  { value: 'R$999,999.99',     label: locale === 'de' ? 'Max. pro Transaktion' : 'Max per transaction' },
  { value: '0%',               label: locale === 'de' ? 'Gebühren (Privatpersonen)' : 'Fee for individuals' },
  { value: 'CRC16',            label: locale === 'de' ? 'Sicherheitsprüfsumme' : 'Security checksum' },
];

const STATIC_VS_DYNAMIC = (locale: 'en' | 'de') => [
  { feature: locale === 'de' ? 'Betrag' : 'Amount',           staticVal: locale === 'de' ? 'Nicht voreingestellt' : 'Not preset',   dynamicVal: locale === 'de' ? 'Vorausgefüllt' : 'Pre-filled' },
  { feature: locale === 'de' ? 'Referenz' : 'Reference',      staticVal: locale === 'de' ? 'Nicht gesetzt' : 'Not set',             dynamicVal: locale === 'de' ? 'Enthalten' : 'Included' },
  { feature: locale === 'de' ? 'Ablauf' : 'Expiry',           staticVal: locale === 'de' ? 'Nein' : 'No',                          dynamicVal: locale === 'de' ? 'Optional' : 'Optional' },
  { feature: locale === 'de' ? 'Anwendungsfall' : 'Use case', staticVal: locale === 'de' ? 'Läden, P2P' : 'Shops, P2P',            dynamicVal: locale === 'de' ? 'Rechnungen, E-Commerce' : 'Invoices, e-commerce' },
  { feature: locale === 'de' ? 'Wiederverwendbar' : 'Reusable', staticVal: '✅',                                                     dynamicVal: locale === 'de' ? '❌ Einmalig' : '❌ One-time' },
  { feature: locale === 'de' ? 'API benötigt' : 'API required', staticVal: '❌',                                                     dynamicVal: '✅ Bank API' },
];

const EMV_TAGS = [
  { tag: '00',    content: '01',              desc: { en: 'Payload Format Indicator',   de: 'Payload-Format-Indikator' } },
  { tag: '01',    content: '11 / 12',         desc: { en: 'Static (11) or Dynamic (12)', de: 'Statisch (11) oder Dynamisch (12)' } },
  { tag: '26',    content: '…',               desc: { en: 'PIX Merchant Account Info',  de: 'PIX-Händlerkontoinformationen' } },
  { tag: '26.00', content: 'BR.GOV.BCB.PIX', desc: { en: 'PIX AID (Application ID)',   de: 'PIX-AID (Anwendungs-ID)' } },
  { tag: '26.01', content: 'key@email.com',   desc: { en: 'PIX Key',                    de: 'PIX-Schlüssel' } },
  { tag: '52',    content: '0000',            desc: { en: 'Merchant Category Code',     de: 'Händlerkategoriecode' } },
  { tag: '53',    content: '986',             desc: { en: 'Currency (BRL)',             de: 'Währung (BRL)' } },
  { tag: '54',    content: '150.00',          desc: { en: 'Amount (optional)',          de: 'Betrag (optional)' } },
  { tag: '58',    content: 'BR',              desc: { en: 'Country Code',              de: 'Ländercode' } },
  { tag: '59',    content: 'Merchant Name',   desc: { en: 'Merchant Name (max 25)',     de: 'Händlername (max. 25)' } },
  { tag: '60',    content: 'Sao Paulo',       desc: { en: 'Merchant City (max 15)',     de: 'Händlerstadt (max. 15)' } },
  { tag: '62.05', content: '***',             desc: { en: 'Reference Label',           de: 'Referenzbezeichnung' } },
  { tag: '63',    content: 'XXXX',            desc: { en: 'CRC16 Checksum',            de: 'CRC16-Prüfsumme' } },
];


const EXAMPLE_PAYLOAD = `000201
010212
26580014BR.GOV.BCB.PIX0136
  name@example.com
52040000
5303986
5406150.00
5802BR
5920Merchant Name GmbH
6009Sao Paulo
62140510***
6304A1B2`;

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE_EN,
  description: DESC_EN,
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/brazil/pix-qr-code-explained' },
};

export default function PixQrCodeExplainedPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-pix-qr-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }} />
      <PageContent locale={locale} />
    </>
  );
}

function PageContent({ locale }: { locale: 'en' | 'de' }) {
  const stats = STATS(locale);
  const svd   = STATIC_VS_DYNAMIC(locale);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: locale === 'de' ? 'Brasilien' : 'Brazil', href: '/guides/brazil' },
          { label: locale === 'de' ? 'PIX QR-Code erklärt' : 'PIX QR Code Explained' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'PIX QR-Code erklärt' : 'PIX QR Code Explained'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? 'Wie Brasiliens EMV-basiertes QR-Zahlungssystem funktioniert'
            : "How Brazil's EMV-based QR payment system works"}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* Stats */}
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm">
              <div className="text-2xl font-bold text-slate-900" style={{ color: '#00B894' }}>{value}</div>
              <div className="text-xs text-slate-500 mt-1">{label}</div>
            </div>
          ))}
        </section>

        {/* Static vs Dynamic */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Statischer vs. Dynamischer PIX QR' : 'Static vs Dynamic PIX QR'}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {(locale === 'de'
                    ? ['Merkmal', 'Statischer QR', 'Dynamischer QR']
                    : ['Feature',  'Static QR',    'Dynamic QR']
                  ).map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {svd.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-700">{row.feature}</td>
                    <td className="px-4 py-3 text-slate-600">{row.staticVal}</td>
                    <td className="px-4 py-3 text-slate-600">{row.dynamicVal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How PIX key appears in QR */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'PIX-Schlüssel im QR-Code' : 'PIX Key in the QR Code'}
          </h2>
          <div className="text-slate-600 leading-relaxed text-[15px] space-y-2">
            <p>
              {locale === 'de'
                ? 'Ein PIX-QR-Code enthält keinen direkten Bankkontonamen oder IBAN. Stattdessen kodiert er:'
                : 'A PIX QR code does not contain a direct bank account number or IBAN. Instead it encodes:'}
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>{locale === 'de' ? 'Den EMV-Payload mit dem PIX-Schlüssel (CPF, CNPJ, Telefon, E-Mail oder UUID)' : 'The EMV payload containing the PIX key (CPF, CNPJ, phone, email or UUID)'}</li>
              <li>{locale === 'de' ? 'Händlername und -stadt' : 'Merchant name and city'}</li>
              <li>{locale === 'de' ? 'Optionaler Betrag (bei dynamischen QR-Codes vorausgefüllt)' : 'Optional amount (pre-filled for dynamic QR codes)'}</li>
              <li>{locale === 'de' ? 'CRC16-Prüfsumme am Ende' : 'CRC16 checksum at the end'}</li>
            </ul>
            <p>
              {locale === 'de'
                ? 'Die Bank des Zahlers scannt den Payload, löst den PIX-Schlüssel über den BCB-Verzeichnisdienst DICT auf und leitet die Zahlung sofort an den richtigen Empfänger weiter.'
                : "The payer's bank reads the payload, resolves the PIX key via BCB's directory service (DICT) and routes the payment instantly to the correct recipient."}
            </p>
          </div>
        </section>

        {/* EMV Format */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Technisches Format: EMV MPM' : 'Technical Format: EMV MPM'}
          </h2>
          <div className="text-slate-600 leading-relaxed text-[15px] space-y-3">
            <p>
              {locale === 'de'
                ? 'PIX nutzt den EMV Merchant Presented Mode (MPM) — denselben Standard wie QRIS in Indonesien und PromptPay in Thailand. Der Payload besteht aus TLV-Datenpaketen (Tag-Length-Value).'
                : 'PIX uses EMV Merchant Presented Mode (MPM) — the same standard as QRIS in Indonesia and PromptPay in Thailand. The payload is made up of TLV (Tag-Length-Value) data objects.'}
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {['Tag', locale === 'de' ? 'Inhalt' : 'Content', locale === 'de' ? 'Beschreibung' : 'Description'].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {EMV_TAGS.map((row) => (
                  <tr key={row.tag} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-blue-700">{row.tag}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-700">{row.content}</td>
                    <td className="px-4 py-3 text-slate-600">{locale === 'de' ? row.desc.de : row.desc.en}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Example Payload */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Beispiel-Payload' : 'Example Payload'}
          </h2>
          <p className="text-slate-600 text-[15px]">
            {locale === 'de'
              ? 'So sieht ein typischer PIX-QR-Payload aus (formatiert zur besseren Lesbarkeit):'
              : 'This is what a typical PIX QR payload looks like (formatted for readability):'}
          </p>
          <pre className="bg-slate-900 text-emerald-400 rounded-2xl p-5 text-xs overflow-x-auto leading-relaxed font-mono">
            {EXAMPLE_PAYLOAD}
          </pre>
          <p className="text-xs text-slate-400">
            {locale === 'de'
              ? '* Die letzten 4 Zeichen (A1B2) sind die CRC16-Prüfsumme, die über den gesamten vorherigen Payload berechnet wird.'
              : '* The last 4 characters (A1B2) are the CRC16 checksum computed over the entire preceding payload.'}
          </p>
        </section>

        {/* CRC16 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'CRC16-Sicherheit' : 'CRC16 Security'}
          </h2>
          <div className="text-slate-600 leading-relaxed text-[15px] space-y-3">
            <p>
              {locale === 'de'
                ? 'Jeder PIX-QR-Code endet mit einer CRC16-CCITT-Prüfsumme. Sie verhindert, dass gefälschte oder beschädigte QR-Codes akzeptiert werden.'
                : 'Every PIX QR code ends with a CRC16-CCITT checksum. It prevents tampered or corrupted QR codes from being accepted.'}
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">{locale === 'de' ? 'Algorithmus' : 'Algorithm'}</span>
              <span className="font-mono font-semibold text-slate-800">CRC16-CCITT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{locale === 'de' ? 'Polynom' : 'Polynomial'}</span>
              <span className="font-mono font-semibold text-slate-800">0x1021</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{locale === 'de' ? 'Startwert' : 'Initial value'}</span>
              <span className="font-mono font-semibold text-slate-800">0xFFFF</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{locale === 'de' ? 'Eingabe' : 'Input'}</span>
              <span className="font-mono font-semibold text-slate-800">{locale === 'de' ? 'Gesamter Payload bis "6304"' : 'Entire payload up to "6304"'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{locale === 'de' ? 'Ausgabe' : 'Output'}</span>
              <span className="font-mono font-semibold text-slate-800">4 uppercase hex chars</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{locale === 'de' ? 'Beispiel' : 'Example'}</span>
              <span className="font-mono font-semibold" style={{ color: '#00B894' }}>6304A1B2</span>
            </div>
          </div>
        </section>

        {/* PIX vs other QR standards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'PIX vs. andere QR-Standards' : 'PIX vs Other QR Standards'}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200"></th>
                  {['PIX (BR)', 'QRIS (ID)', 'PromptPay (TH)', 'UPI (IN)'].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { label: locale === 'de' ? 'Format' : 'Format',           vals: ['EMV', 'EMV', 'EMV', 'URL'] },
                  { label: 'AID',                                            vals: ['BR.GOV.BCB.PIX', 'ID.CO.QRIS.WWW', 'A000000677010111', 'upi://pay'] },
                  { label: locale === 'de' ? 'Währung' : 'Currency',        vals: ['BRL (986)', 'IDR (360)', 'THB (764)', 'INR'] },
                  { label: 'CRC16',                                          vals: ['✅', '✅', '✅', '❌'] },
                  { label: locale === 'de' ? 'Grenzüberschreitend' : 'Cross-border', vals: [locale === 'de' ? 'Begrenzt' : 'Limited', '✅ ASEAN', '✅ ASEAN', locale === 'de' ? '✅ Wächst' : '✅ Growing'] },
                ].map((row) => (
                  <tr key={row.label} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-700">{row.label}</td>
                    {row.vals.map((v, i) => (
                      <td key={i} className="px-4 py-3 text-slate-600 text-xs font-mono">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl p-6 text-center space-y-3" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <p className="font-semibold text-lg" style={{ color: '#065f46' }}>
            {locale === 'de'
              ? 'Statische oder dynamische PIX-QR-Codes sofort generieren.'
              : 'Generate static or dynamic PIX QR codes instantly.'}
          </p>
          <p className="text-sm text-slate-600">
            {locale === 'de'
              ? 'Keine Registrierung. Alles wird in deinem Browser verarbeitet.'
              : 'No registration required. All processing in your browser.'}
          </p>
          <Link
            href="/pix/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#00B894' }}
          >
            {locale === 'de' ? 'PIX-QR-Code erstellen →' : 'Generate PIX QR Code →'}
          </Link>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">{locale === 'de' ? 'Mehr zu Brasilien' : 'Related in Brazil'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RelatedToolCard
              icon="📖"
              name={locale === 'de' ? 'Wie man PIX benutzt' : 'How to Use PIX'}
              url="/guides/brazil/how-to-use-pix"
              description={locale === 'de' ? 'Schritt-für-Schritt-Anleitung' : 'Step-by-step instructions'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="🌍"
              name={locale === 'de' ? 'PIX Touristen-Guide' : 'PIX Tourist Guide'}
              url="/guides/brazil/pix-tourist-guide"
              description={locale === 'de' ? 'Können Touristen PIX nutzen?' : 'Can tourists use PIX?'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
