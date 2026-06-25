import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'Indonesia QR Code Payment 2026 – How QRIS Works Explained';
const TITLE_DE = 'Indonesien QR-Code-Zahlung 2026 – Wie QRIS funktioniert';
const DESC_EN =
  "Indonesia's QRIS is the world's most comprehensive QR payment standard. One code works with 50+ apps. Learn how it works technically and for daily use.";
const DESC_DE =
  'Indonesiens QRIS ist einer der umfassendsten QR-Zahlungsstandards der Welt. Ein Code funktioniert mit über 50 Apps. Lerne, wie er technisch und im Alltag funktioniert.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['qris explained', 'indonesia qr standard', 'emv qr indonesia', 'qris technical', 'nmid qris', 'qris fees'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/indonesia/indonesia-qr-code-payment'),
    openGraph: buildOpenGraph(locale, '/guides/indonesia/indonesia-qr-code-payment', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const STATS = [
  { icon: '🏪', value: '30M+', en: 'Registered merchants', de: 'Registrierte Händler' },
  { icon: '👥', value: '100M+', en: 'QRIS users', de: 'QRIS-Nutzer' },
  { icon: '📱', value: '50+', en: 'Supported apps & banks', de: 'Unterstützte Apps & Banken' },
  { icon: '💰', value: 'Rp 10,000,000', en: 'Max per transaction', de: 'Maximal pro Transaktion' },
  { icon: '📉', value: '0.3%', en: 'MDR for micro merchants', de: 'MDR für Kleinsthändler' },
  { icon: '🏛️', value: '0%', en: 'Government/social transactions', de: 'Staatliche/soziale Transaktionen' },
];

const MERCHANT_TIERS = [
  { en: 'Micro', de: 'Mikro', bahasa: 'Usaha Mikro', revenueEn: '< Rp 300M/year', revenueDe: '< Rp 300 Mio./Jahr', mdr: '0.3%' },
  { en: 'Small', de: 'Klein', bahasa: 'Usaha Kecil', revenueEn: 'Rp 300M–2.5B', revenueDe: 'Rp 300 Mio.–2,5 Mrd.', mdr: '0.7%' },
  { en: 'Medium', de: 'Mittel', bahasa: 'Usaha Menengah', revenueEn: 'Rp 2.5B–50B', revenueDe: 'Rp 2,5–50 Mrd.', mdr: '0.7%' },
  { en: 'Large', de: 'Groß', bahasa: 'Usaha Besar', revenueEn: '> Rp 50B', revenueDe: '> Rp 50 Mrd.', mdr: '0.7%' },
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE_EN,
  description: DESC_EN,
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/indonesia/indonesia-qr-code-payment' },
};

export default function IndonesiaQrCodePaymentPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-indonesia-qr-payment" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }} />
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
          { label: 'Indonesia', href: '/guides/indonesia' },
          { label: locale === 'de' ? 'QR-Zahlung' : 'QR Code Payment' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'Indonesien QR-Code-Zahlung' : 'Indonesia QR Code Payment'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? 'QRIS: Das QR-System, das Indonesiens Zahlungen vereinheitlichte'
            : "QRIS: The QR system that unified Indonesia's payments"}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* QRIS revolution */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Die QRIS-Revolution' : 'The QRIS Revolution'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <p className="font-semibold text-amber-800 mb-2">{locale === 'de' ? 'Vor 2020' : 'Before 2020'}</p>
              <p className="text-sm text-amber-700">
                {locale === 'de'
                  ? 'GoPay hatte einen eigenen QR, OVO einen eigenen QR, Dana einen eigenen QR → Händler brauchten 5+ verschiedene QR-Aufkleber'
                  : 'GoPay had its own QR, OVO had its own QR, Dana had its own QR → merchants needed 5+ different QR stickers'}
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <p className="font-semibold text-green-800 mb-2">{locale === 'de' ? 'Nach QRIS (2020)' : 'After QRIS (2020)'}</p>
              <p className="text-sm text-green-700">
                {locale === 'de'
                  ? 'EIN universeller QR-Code → Jede der über 50 Apps kann jeden Händler-QR scannen'
                  : 'ONE universal QR code → any of 50+ apps can scan any merchant QR'}
              </p>
            </div>
          </div>
          <p className="text-slate-600 leading-relaxed text-[15px]">
            {locale === 'de'
              ? 'Bank Indonesia machte QRIS für alle Zahlungsanbieter verpflichtend, um Fragmentierung zu beenden und Interoperabilität sicherzustellen.'
              : 'Bank Indonesia mandated QRIS for all payment providers to end fragmentation and guarantee interoperability.'}
          </p>
        </section>

        {/* Stats */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Indonesiens QR-Zahlungszahlen' : "Indonesia's QR Payment Numbers"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {STATS.map(({ icon, value, en, de }) => (
              <div key={en} className="bg-white border border-slate-100 rounded-2xl p-4 text-center shadow-sm">
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-lg font-bold text-slate-900">{value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{locale === 'de' ? de : en}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Ecosystem */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Das QRIS-Ökosystem' : 'The QRIS Ecosystem'}
          </h2>
          <div className="space-y-2 text-sm text-slate-600">
            <p><strong>{locale === 'de' ? 'E-Wallets' : 'E-wallets'}:</strong> GoPay, OVO, Dana, LinkAja, ShopeePay</p>
            <p><strong>{locale === 'de' ? 'Banken' : 'Banks'}:</strong> BCA, Mandiri, BRI, BNI, CIMB, Permata, {locale === 'de' ? '40+ weitere' : '40+ more'}</p>
            <p><strong>{locale === 'de' ? 'International' : 'International'}:</strong> PayNow (SG), DuitNow (MY), PromptPay (TH), UPI (IN)</p>
          </div>
        </section>

        {/* Technical */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Technisch: Wie QRIS funktioniert' : 'Technical: How QRIS Works'}
          </h2>
          <ul className="list-disc pl-6 space-y-1 text-slate-600 text-sm">
            <li><strong>{locale === 'de' ? 'Basiert auf' : 'Based on'}:</strong> EMV Merchant Presented QR ({locale === 'de' ? 'wie PIX, PromptPay' : 'same as PIX, PromptPay'})</li>
            <li><strong>AID:</strong> <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-xs">ID.CO.QRIS.WWW</code></li>
            <li><strong>{locale === 'de' ? 'Währung' : 'Currency'}:</strong> 360 (IDR)</li>
            <li><strong>{locale === 'de' ? 'Ländercode' : 'Country code'}:</strong> ID</li>
            <li><strong>{locale === 'de' ? 'Händler-ID' : 'Merchant ID'}:</strong> NMID ({locale === 'de' ? 'National Merchant ID' : 'National Merchant ID'})</li>
          </ul>
          <pre className="bg-slate-900 text-blue-300 text-sm font-mono rounded-2xl p-5 overflow-x-auto leading-relaxed my-4 whitespace-pre">
{`000201
0211ID.CO.QRIS.WWW
5204XXXX
5303360
5802ID
5910NMID12345
6304XXXX`}
          </pre>
        </section>

        {/* Merchant tiers */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Händlerkategorien & Gebühren' : 'Merchant Categories & Fees'}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {(locale === 'de'
                    ? ['Kategorie', 'Bahasa', 'Umsatz', 'MDR']
                    : ['Category', 'Bahasa', 'Revenue', 'MDR']
                  ).map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MERCHANT_TIERS.map((row) => (
                  <tr key={row.bahasa} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-blue-700">{locale === 'de' ? row.de : row.en}</td>
                    <td className="px-4 py-3 text-slate-600 italic">{row.bahasa}</td>
                    <td className="px-4 py-3 text-slate-600">{locale === 'de' ? row.revenueDe : row.revenueEn}</td>
                    <td className="px-4 py-3 text-slate-600">{row.mdr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center space-y-3">
          <p className="font-semibold text-blue-900 text-lg">
            {locale === 'de' ? 'Erstelle einen QRIS-Code' : 'Generate a QRIS Code'}
          </p>
          <Link
            href="/qris/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#1A56DB' }}
          >
            {locale === 'de' ? 'Generator öffnen →' : 'Open Generator →'}
          </Link>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">{locale === 'de' ? 'Verwandte Guides' : 'Related'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RelatedToolCard
              icon="📖"
              name={locale === 'de' ? 'Wie man QRIS benutzt' : 'How to Use QRIS'}
              url="/guides/indonesia/how-to-use-qris"
              description={locale === 'de' ? 'Schritt-für-Schritt-Anleitung' : 'Step-by-step instructions'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="📷"
              name={locale === 'de' ? 'QRIS scannen' : 'Scan QRIS QR Code Guide'}
              url="/guides/indonesia/scan-qris-qr-code"
              description={locale === 'de' ? 'QR-Codes mit deiner Banking-App scannen' : 'Scan QR codes with your banking app'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
