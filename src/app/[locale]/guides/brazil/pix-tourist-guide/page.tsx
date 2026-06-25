import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Accordion from '@/components/ui/Accordion';
import type { AccordionItem } from '@/components/ui/Accordion';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'PIX for Tourists in Brazil 2026 – Can Foreigners Use PIX?';
const TITLE_DE = 'PIX für Touristen in Brasilien 2026 – Können Ausländer PIX nutzen?';
const DESC_EN =
  'Can tourists use PIX in Brazil? Yes, via Mercado Pago with a foreign account. Here\'s exactly how international visitors can pay with PIX in Brazil.';
const DESC_DE =
  'Können Touristen PIX in Brasilien nutzen? Ja, über Mercado Pago mit einem ausländischen Konto. Hier erfährst du genau, wie internationale Besucher in Brasilien mit PIX bezahlen können.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['pix tourist', 'can foreigners use pix', 'mercado pago tourist', 'pix without cpf', 'pix international'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/brazil/pix-tourist-guide'),
    openGraph: buildOpenGraph(locale, '/guides/brazil/pix-tourist-guide', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const MERCADO_PAGO_STEPS_EN = [
  'Download the Mercado Pago app (iOS or Android)',
  'Select "Brazil" as your country',
  'Register with your passport',
  'Add your international credit or debit card (Visa/Mastercard)',
  'Complete identity verification',
  'Start paying at PIX/Mercado Pago merchants!',
];
const MERCADO_PAGO_STEPS_DE = [
  'Lade die Mercado-Pago-App herunter (iOS oder Android)',
  'Wähle "Brasilien" als Land',
  'Registriere dich mit deinem Reisepass',
  'Füge deine internationale Kredit- oder Debitkarte hinzu (Visa/Mastercard)',
  'Schließe die Identitätsprüfung ab',
  'Beginne bei PIX/Mercado-Pago-Händlern zu bezahlen!',
];

const CPF_STEPS_EN = [
  'Go to a Receita Federal office',
  'Bring your passport and entry stamp',
  'Fill out the registration form (also available online)',
  'Get your CPF within 1–10 days',
  'Open a Brazilian bank account (Nubank, Inter or C6 are easiest)',
  'Register your PIX keys in the banking app',
  'Full PIX access unlocked!',
];
const CPF_STEPS_DE = [
  'Gehe zu einem Receita-Federal-Büro',
  'Bringe Reisepass und Einreisestempel mit',
  'Fülle das Antragsformular aus (auch online möglich)',
  'Erhalte deine CPF innerhalb von 1–10 Tagen',
  'Eröffne ein brasilianisches Bankkonto (Nubank, Inter oder C6 sind am einfachsten)',
  'Registriere deine PIX-Schlüssel in der Banking-App',
  'Voller PIX-Zugang freigeschaltet!',
];

const MP_FEATURES = [
  { en: 'Pay at QR code merchants',        de: 'Bei QR-Code-Händlern bezahlen',   ok: true },
  { en: 'Transfer money within platform',   de: 'Geld innerhalb der Plattform senden', ok: true },
  { en: 'Pay bills (boletos)',              de: 'Rechnungen bezahlen (Boletos)',    ok: true },
  { en: 'Online shopping',                  de: 'Online-Shopping',                 ok: true },
  { en: 'PIX transfers (requires CPF)',     de: 'PIX-Überweisungen (CPF nötig)',    ok: false },
];

const CITY_TIPS = [
  {
    nameEn: 'Rio de Janeiro', nameDe: 'Rio de Janeiro',
    en: ['Copacabana/Ipanema: Very cashless', 'Carnaval areas: Mix of QR and cash', 'Favela tours: Cash preferred', 'Metro: Transit card required'],
    de: ['Copacabana/Ipanema: Sehr bargeldlos', 'Karneval-Bereiche: Mischung aus QR und Bargeld', 'Favela-Touren: Bargeld bevorzugt', 'Metro: Transit-Karte erforderlich'],
  },
  {
    nameEn: 'São Paulo', nameDe: 'São Paulo',
    en: ['Most cashless city in Brazil', 'Paulista Ave restaurants: All methods accepted', 'MASP/museums: Cards and PIX', 'Street markets (feiras): Mix'],
    de: ['Bargeldloseste Stadt Brasiliens', 'Restaurants Avenida Paulista: Alle Methoden', 'MASP/Museen: Karten und PIX', 'Straßenmärkte (Feiras): Mix'],
  },
  {
    nameEn: 'Florianópolis', nameDe: 'Florianópolis',
    en: ['Beach areas: PIX growing rapidly', 'Restaurants: PIX very common', 'Nightlife: Mix of methods'],
    de: ['Strandbereiche: PIX wächst schnell', 'Restaurants: PIX sehr verbreitet', 'Nachtleben: Mix aus Methoden'],
  },
];

const FAQ_EN: AccordionItem[] = [
  {
    id: 'faq-1',
    question: 'Can I use my home banking app for PIX in Brazil?',
    answer: 'Only if your bank offers PIX access, which very few foreign banks do. The best option for tourists is Mercado Pago, which accepts international cards and works at millions of Brazilian merchants.',
  },
  {
    id: 'faq-2',
    question: 'Is Mercado Pago safe for tourists?',
    answer: 'Yes, Mercado Pago is regulated by the Banco Central do Brasil and has over 50 million users in Brazil. It is part of MercadoLibre, Latin America\'s largest e-commerce and fintech company.',
  },
  {
    id: 'faq-3',
    question: 'Can I get a CPF as a tourist?',
    answer: 'Yes! Tourists can obtain a CPF at any Receita Federal office with a valid passport. The process is free and takes 1–10 days. It is very useful for stays longer than 2 months.',
  },
  {
    id: 'faq-4',
    question: 'What is the PIX QR code limit?',
    answer: 'For individuals: up to R$999,999.99 per transaction during the day. Night limit (8pm–6am): R$1,000 per transaction. Banks allow you to increase the night limit in their apps after a 24h waiting period.',
  },
  {
    id: 'faq-5',
    question: 'Does PIX work on weekends and holidays?',
    answer: 'Yes! PIX works 24/7/365, including weekends and public holidays. This is one of its biggest advantages over the old TED and DOC bank transfer systems.',
  },
];

const FAQ_DE: AccordionItem[] = [
  {
    id: 'faq-1',
    question: 'Kann ich meine heimische Banking-App für PIX in Brasilien nutzen?',
    answer: 'Nur wenn deine Bank PIX-Zugang anbietet, was bei sehr wenigen ausländischen Banken der Fall ist. Die beste Option für Touristen ist Mercado Pago, das internationale Karten akzeptiert und bei Millionen brasilianischer Händler funktioniert.',
  },
  {
    id: 'faq-2',
    question: 'Ist Mercado Pago sicher für Touristen?',
    answer: 'Ja, Mercado Pago wird vom Banco Central do Brasil reguliert und hat über 50 Millionen Nutzer in Brasilien. Es ist Teil von MercadoLibre, Lateinamerikas größtem E-Commerce- und Fintech-Unternehmen.',
  },
  {
    id: 'faq-3',
    question: 'Kann ich als Tourist eine CPF bekommen?',
    answer: 'Ja! Touristen können eine CPF bei jedem Receita-Federal-Büro mit einem gültigen Reisepass beantragen. Der Prozess ist kostenlos und dauert 1–10 Tage. Sehr nützlich für Aufenthalte länger als 2 Monate.',
  },
  {
    id: 'faq-4',
    question: 'Welches Limit gilt für PIX-QR-Codes?',
    answer: 'Für Privatpersonen: bis zu R$999.999,99 pro Transaktion tagsüber. Nachtlimit (20–6 Uhr): R$1.000 pro Transaktion. Banken erlauben es, das Nachtlimit in der App nach einer 24-Stunden-Wartezeit zu erhöhen.',
  },
  {
    id: 'faq-5',
    question: 'Funktioniert PIX an Wochenenden und Feiertagen?',
    answer: 'Ja! PIX funktioniert 24/7/365, auch an Wochenenden und Feiertagen. Das ist einer der größten Vorteile gegenüber den alten TED- und DOC-Bankübertragungssystemen.',
  },
];

function buildJsonLdFaq(items: AccordionItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE_EN,
  description: DESC_EN,
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/brazil/pix-tourist-guide' },
};

export default function PixTouristGuidePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  const jsonLdFaq = buildJsonLdFaq(locale === 'de' ? FAQ_DE : FAQ_EN);

  return (
    <>
      <Script id="json-ld-pix-tourist-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }} />
      <Script id="json-ld-pix-tourist-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <PageContent locale={locale} />
    </>
  );
}

function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((text, i) => (
        <li key={i} className="flex gap-4">
          <div
            className="flex-shrink-0 w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm"
            style={{ backgroundColor: '#00B894' }}
          >
            {i + 1}
          </div>
          <p className="text-sm text-slate-700 pt-1">{text}</p>
        </li>
      ))}
    </ol>
  );
}

function PageContent({ locale }: { locale: 'en' | 'de' }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: locale === 'de' ? 'Brasilien' : 'Brazil', href: '/guides/brazil' },
          { label: locale === 'de' ? 'Touristen-Guide' : 'Tourist Guide' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'PIX Touristen-Guide' : 'PIX Tourist Guide'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? 'Der ehrliche Guide für internationale Brasilien-Besucher'
            : 'The honest guide for international visitors to Brazil'}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* Quick Answer Box */}
        <section className="bg-green-50 border border-green-200 rounded-2xl p-6 space-y-2">
          <p className="font-bold text-green-800 text-lg">
            {locale === 'de' ? 'Kurzantwort' : 'Quick Answer'}
          </p>
          <ul className="text-sm space-y-1.5">
            <li className="text-green-700">✅ {locale === 'de' ? 'JA über: Mercado Pago mit internationaler Karte' : 'YES via: Mercado Pago with international card'}</li>
            <li className="text-amber-700">⚙️ {locale === 'de' ? 'EINRICHTUNG nötig: Mercado-Pago-Konto erstellen' : 'SETUP needed: Create Mercado Pago account'}</li>
            <li className="text-red-700">❌ {locale === 'de' ? 'Nicht direkt: Ohne CPF oder Mercado Pago' : 'Not directly: Without CPF or Mercado Pago'}</li>
          </ul>
        </section>

        {/* Mercado Pago */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Mercado Pago – Die Lösung für Touristen' : 'Mercado Pago – The Tourist Solution'}
          </h2>
          <div className="text-slate-600 leading-relaxed text-[15px] space-y-3">
            {locale === 'de' ? (
              <>
                <p>
                  <strong>Mercado Pago</strong> ist Lateinamerikas größtes Fintech und Teil von
                  MercadoLibre — dem Amazon Lateinamerikas. Die App ist in Brasilien, Argentinien,
                  Mexiko und Kolumbien verfügbar.
                </p>
                <p>
                  Ausländische Nutzer können sich mit Reisepass, ausländischer E-Mail-Adresse und
                  ausländischer Telefonnummer registrieren. Mit einer internationalen Visa- oder
                  Mastercard aufgeladen, funktioniert Mercado Pago bei Millionen brasilianischer
                  Händler — und die App ist auch auf Englisch verfügbar.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>Mercado Pago</strong> is Latin America&apos;s largest fintech and part of
                  MercadoLibre — the Amazon of Latin America. The app is available in Brazil,
                  Argentina, Mexico and Colombia.
                </p>
                <p>
                  Foreign users can register with a passport, international email and foreign phone
                  number. Topped up with an international Visa or Mastercard, Mercado Pago works at
                  millions of Brazilian merchants — and the app is available in English.
                </p>
              </>
            )}
          </div>

          <h3 className="text-lg font-semibold text-slate-800 pt-2">
            {locale === 'de' ? 'Schritt-für-Schritt-Registrierung' : 'Step-by-step registration'}
          </h3>
          <StepList steps={locale === 'de' ? MERCADO_PAGO_STEPS_DE : MERCADO_PAGO_STEPS_EN} />
        </section>

        {/* What Mercado Pago can do */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Was Mercado Pago in Brasilien kann' : 'What Mercado Pago Can Do in Brazil'}
          </h2>
          <div className="space-y-2">
            {MP_FEATURES.map(({ en, de, ok }) => (
              <div key={en} className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                <span className="text-lg">{ok ? '✅' : '⚠️'}</span>
                <span className="text-sm text-slate-700">{locale === 'de' ? de : en}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CPF */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'CPF – Die brasilianische Steuernummer' : 'CPF – The Brazilian Tax Number'}
          </h2>
          <div className="text-slate-600 leading-relaxed text-[15px] space-y-3">
            {locale === 'de' ? (
              <>
                <p>
                  Die <strong>CPF (Cadastro de Pessoas Físicas)</strong> ist Brasiliens individuelle
                  Steuernummer. Sie ist für den vollen PIX-Zugang erforderlich. Touristen
                  <em> können</em> eine CPF beantragen.
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Erforderliche Dokumente: Reisepass + Einreisestempel</li>
                  <li>Bearbeitungszeit: 1–10 Tage</li>
                  <li>Kostenlos bei der Receita Federal</li>
                  <li>Lohnt sich für Aufenthalte ab 2 Monaten</li>
                </ul>
              </>
            ) : (
              <>
                <p>
                  The <strong>CPF (Cadastro de Pessoas Físicas)</strong> is Brazil&apos;s individual
                  taxpayer number. It is required for full PIX access. Tourists <em>can</em> obtain
                  a CPF.
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Required documents: passport + entry stamp</li>
                  <li>Processing time: 1–10 days</li>
                  <li>Free at the Receita Federal</li>
                  <li>Worth it for stays of 2+ months</li>
                </ul>
              </>
            )}
          </div>
        </section>

        {/* Getting CPF */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Für Langzeitbesucher: CPF beantragen' : 'For Long-Term Visitors: Getting CPF'}
          </h2>
          <StepList steps={locale === 'de' ? CPF_STEPS_DE : CPF_STEPS_EN} />
        </section>

        {/* City Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Städtetipps für Touristen' : 'City Tips for Tourists'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CITY_TIPS.map((c) => (
              <div key={c.nameEn} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-2">{locale === 'de' ? c.nameDe : c.nameEn}</h3>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  {(locale === 'de' ? c.de : c.en).map((line) => <li key={line}>• {line}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
          <Accordion items={locale === 'de' ? FAQ_DE : FAQ_EN} />
        </section>

        {/* CTA */}
        <div className="rounded-2xl p-6 text-center space-y-3" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <p className="font-semibold text-lg" style={{ color: '#065f46' }}>
            {locale === 'de' ? 'Bist du Händler in Brasilien?' : 'Are you a merchant in Brazil?'}
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <RelatedToolCard
              icon="📖"
              name={locale === 'de' ? 'Wie man PIX benutzt' : 'How to Use PIX'}
              url="/guides/brazil/how-to-use-pix"
              description={locale === 'de' ? 'Schritt-für-Schritt-Anleitung' : 'Step-by-step instructions'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="📷"
              name={locale === 'de' ? 'PIX-QR scannen' : 'Scan PIX QR Code'}
              url="/guides/brazil/scan-pix-qr-code"
              description={locale === 'de' ? 'Mit Nubank, Mercado Pago oder Itaú' : 'With Nubank, Mercado Pago or Itaú'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="🇧🇷"
              name={locale === 'de' ? 'Brasilien Hub' : 'Brazil Hub'}
              url="/guides/brazil"
              description={locale === 'de' ? 'Alles über Bezahlen in Brasilien' : 'Everything about paying in Brazil'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
