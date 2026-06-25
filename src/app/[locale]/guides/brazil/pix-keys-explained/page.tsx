import type { Metadata } from 'next';
import Script from 'next/script';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Breadcrumb from '@/components/ui/Breadcrumb';
import RelatedToolCard from '@/components/ui/RelatedToolCard';
import { buildAlternates, buildOpenGraph, buildTwitterCard } from '@/lib/seo';

const TITLE_EN = 'PIX Keys Explained – CPF, CNPJ, Phone, Email, Random Key 2026';
const TITLE_DE = 'PIX-Schlüssel erklärt – CPF, CNPJ, Telefon, E-Mail, Zufallsschlüssel 2026';
const DESC_EN =
  'PIX keys are how Brazil identifies payment recipients. Learn all 5 types: CPF, CNPJ, phone number, email and random key – and how to choose the right one.';
const DESC_DE =
  'PIX-Schlüssel sind die Art, wie Brasilien Zahlungsempfänger identifiziert. Lerne alle 5 Typen: CPF, CNPJ, Telefonnummer, E-Mail und Zufallsschlüssel – und wie du den richtigen wählst.';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const title = locale === 'de' ? TITLE_DE : TITLE_EN;
  const description = locale === 'de' ? DESC_DE : DESC_EN;
  return {
    title: `${title} | QRPayHub`,
    description,
    keywords: ['pix key', 'chave pix', 'pix cpf key', 'pix random key', 'pix email key', 'pix cnpj', 'pix phone key'],
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/guides/brazil/pix-keys-explained'),
    openGraph: buildOpenGraph(locale, '/guides/brazil/pix-keys-explained', title, description),
    twitter: buildTwitterCard(title, description),
  };
}

const KEY_TYPES = (locale: 'en' | 'de') => [
  {
    icon: '🪪',
    name: 'CPF',
    subtitle: locale === 'de' ? 'Individuelle Steuernummer' : 'Individual Tax Number',
    format: 'XXX.XXX.XXX-XX (11 digits)',
    who: locale === 'de' ? 'Brasilianische Einzelpersonen' : 'Individual Brazilian residents',
    pros: [locale === 'de' ? 'Permanent, immer dabei' : 'Permanent, always with you'],
    cons: [locale === 'de' ? 'Teilt deine Steuernummer öffentlich' : 'Shares your tax number publicly'],
    bestFor: locale === 'de' ? 'Vertrauenswürdige Kontakte, Unternehmen' : 'Trusted contacts, businesses',
  },
  {
    icon: '🏢',
    name: 'CNPJ',
    subtitle: locale === 'de' ? 'Unternehmens-Steuernummer' : 'Business Tax Number',
    format: 'XX.XXX.XXX/XXXX-XX (14 digits)',
    who: locale === 'de' ? 'Juristische Personen / Unternehmen' : 'Legal entities / companies',
    pros: [locale === 'de' ? 'Offizieller Unternehmensidentifikator' : 'Official business identifier'],
    cons: [locale === 'de' ? 'Öffentliche Information' : 'Public information'],
    bestFor: locale === 'de' ? 'Geschäftliche Zahlungen' : 'Business payments',
  },
  {
    icon: '📱',
    name: locale === 'de' ? 'Telefonnummer' : 'Phone Number',
    subtitle: locale === 'de' ? 'Brasilianische Mobilnummer' : 'Brazilian mobile number',
    format: '+55 11 98765-4321',
    who: locale === 'de' ? 'Jeder mit brasilianischer Mobilnummer' : 'Anyone with a Brazilian mobile',
    pros: [locale === 'de' ? 'Leicht mündlich mitzuteilen' : 'Easy to share verbally'],
    cons: [locale === 'de' ? 'Ändert sich bei Nummerwechsel' : 'Changes if you change number'],
    bestFor: locale === 'de' ? 'Schnelle P2P-Überweisungen' : 'Quick P2P transfers',
  },
  {
    icon: '📧',
    name: locale === 'de' ? 'E-Mail-Adresse' : 'Email Address',
    subtitle: locale === 'de' ? 'Standard-E-Mail' : 'Standard email',
    format: 'name@email.com',
    who: locale === 'de' ? 'Jeder' : 'Anyone',
    pros: [locale === 'de' ? 'Leicht zu merken' : 'Easy to remember'],
    cons: [locale === 'de' ? 'Exakte E-Mail-Adresse erforderlich' : 'Must use exact email'],
    bestFor: locale === 'de' ? 'Digitale Nutzer, Freelancer' : 'Digital users, freelancers',
  },
  {
    icon: '🔑',
    name: locale === 'de' ? 'Zufallsschlüssel' : 'Random Key',
    subtitle: locale === 'de' ? 'Chave Aleatória (UUID)' : 'Chave Aleatória (UUID)',
    format: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    who: locale === 'de' ? 'Jeder, der Datenschutz möchte' : 'Anyone wanting privacy',
    pros: [locale === 'de' ? 'Enthüllt keine persönlichen Daten' : "Doesn't reveal personal info"],
    cons: [locale === 'de' ? 'Schwer zu merken' : 'Hard to memorize'],
    bestFor: locale === 'de' ? 'Öffentliche Anzeige, Marktplätze' : 'Public display, marketplaces',
  },
];

const REGISTER_STEPS = (locale: 'en' | 'de') => [
  locale === 'de' ? 'Banking-App öffnen' : 'Open your banking app',
  locale === 'de' ? 'Zu "PIX" → "Minhas Chaves" gehen' : 'Go to "PIX" → "Minhas Chaves"',
  locale === 'de' ? '"Cadastrar Chave" antippen' : 'Tap "Cadastrar Chave"',
  locale === 'de' ? 'Schlüsseltyp wählen' : 'Choose key type',
  locale === 'de' ? 'Per SMS/E-Mail bestätigen' : 'Confirm via SMS/email code',
  locale === 'de' ? 'Schlüssel innerhalb von Minuten aktiv!' : 'Key active within minutes!',
];

const DECISION_TABLE = (locale: 'en' | 'de') => [
  { situation: locale === 'de' ? 'Zahlung von Fremden empfangen' : 'Receiving from strangers',       key: locale === 'de' ? 'Zufallsschlüssel' : 'Random Key' },
  { situation: locale === 'de' ? 'Geschäftsrechnung' : 'Business invoice',                           key: 'CNPJ' },
  { situation: locale === 'de' ? 'Schnelle Überweisung an Freund' : 'Quick transfer to friend',       key: locale === 'de' ? 'Telefon' : 'Phone' },
  { situation: locale === 'de' ? 'Online-Freelancing' : 'Online freelancing',                         key: 'Email' },
  { situation: locale === 'de' ? 'Regelmäßige Überweisungen' : 'Long-term regular transfers',         key: 'CPF' },
  { situation: locale === 'de' ? 'Öffentliche Anzeige (QR-Aufkleber)' : 'Public display (QR sticker)', key: locale === 'de' ? 'Zufallsschlüssel' : 'Random Key' },
];

const SECURITY_TIPS = (locale: 'en' | 'de') => [
  locale === 'de' ? 'Zufallsschlüssel für öffentliche QR-Codes verwenden' : 'Use Random Key for public QR codes',
  locale === 'de' ? 'Schlüssel nie über verdächtige Links teilen' : 'Never share key via suspicious links',
  locale === 'de' ? 'Empfängernamen vor der Zahlung prüfen' : 'Verify recipient name before paying',
  locale === 'de' ? 'Falsche Schlüssel der Bank melden' : 'Report wrong keys to your bank',
  locale === 'de' ? 'Schlüssel können gelöscht und neu registriert werden' : 'You can delete and re-register keys',
];

const JSON_LD_ARTICLE = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE_EN,
  description: DESC_EN,
  author: { '@type': 'Organization', name: 'QRPayHub' },
  publisher: { '@type': 'Organization', name: 'QRPayHub', url: 'https://qrpayhub.com' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://qrpayhub.com/en/guides/brazil/pix-keys-explained' },
};

export default function PixKeysExplainedPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const locale = params.locale === 'de' ? 'de' : 'en';
  return (
    <>
      <Script id="json-ld-pix-keys" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_ARTICLE) }} />
      <PageContent locale={locale} />
    </>
  );
}

function PageContent({ locale }: { locale: 'en' | 'de' }) {
  const keyTypes    = KEY_TYPES(locale);
  const steps       = REGISTER_STEPS(locale);
  const decisions   = DECISION_TABLE(locale);
  const secTips     = SECURITY_TIPS(locale);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">

      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: locale === 'de' ? 'Brasilien' : 'Brazil', href: '/guides/brazil' },
          { label: locale === 'de' ? 'PIX-Schlüssel erklärt' : 'PIX Keys Explained' },
        ]}
      />

      <header className="space-y-3 pt-4 pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          {locale === 'de' ? 'PIX-Schlüssel erklärt' : 'PIX Keys Explained'}
        </h1>
        <p className="text-lg text-slate-500">
          {locale === 'de'
            ? 'Alles, was du über Chaves PIX wissen musst'
            : 'Everything you need to know about Chaves PIX'}
        </p>
      </header>

      <div className="space-y-14 pt-4">

        {/* What is a PIX key */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Was ist ein PIX-Schlüssel?' : 'What is a PIX Key?'}
          </h2>
          <div className="text-slate-600 leading-relaxed text-[15px] space-y-3">
            {locale === 'de' ? (
              <>
                <p>
                  Ein PIX-Schlüssel (Chave PIX) ist ein Alias, der mit deinem Bankkonto verknüpft ist.
                  Statt deine vollständigen Bankdaten (Bankleitzahl, Kontonummer, Bankcode) zu teilen,
                  teilst du nur einen einfachen Identifikator. Das PIX-System (DICT) ordnet diesen
                  Schlüssel sicher deinem tatsächlichen Konto zu.
                </p>
                <p>Vorteile:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Keine sensiblen Bankdaten teilen</li>
                  <li>Leicht zu merken und weiterzugeben</li>
                  <li>Sofortige Weiterleitung an die richtige Bank</li>
                  <li>Bis zu 5 Schlüssel pro Konto möglich</li>
                </ul>
              </>
            ) : (
              <>
                <p>
                  A PIX key (Chave PIX) is an alias that links to your bank account. Instead of
                  sharing your full bank details (agency, account number, bank code), you share one
                  simple identifier. The PIX system (DICT) maps this key to your actual account
                  securely.
                </p>
                <p>Benefits:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>No need to share sensitive bank details</li>
                  <li>Easy to remember and share</li>
                  <li>Instant routing to the correct bank</li>
                  <li>Can have up to 5 keys per account</li>
                </ul>
              </>
            )}
          </div>
        </section>

        {/* All 5 key types */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Alle 5 PIX-Schlüsseltypen' : 'All 5 PIX Key Types'}
          </h2>
          <div className="space-y-4">
            {keyTypes.map((k) => (
              <div key={k.name} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{k.icon}</span>
                  <div>
                    <h3 className="font-bold text-slate-900">{k.name}</h3>
                    <p className="text-xs text-slate-500">{k.subtitle}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <p className="font-semibold text-slate-500 uppercase tracking-wide mb-0.5">{locale === 'de' ? 'Format' : 'Format'}</p>
                    <p className="font-mono text-slate-700 break-all">{k.format}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-500 uppercase tracking-wide mb-0.5">{locale === 'de' ? 'Für wen' : 'Who'}</p>
                    <p className="text-slate-700">{k.who}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-500 uppercase tracking-wide mb-0.5">{locale === 'de' ? 'Vorteile' : 'Pros'}</p>
                    <ul className="text-green-700 space-y-0.5">{k.pros.map((p) => <li key={p}>+ {p}</li>)}</ul>
                    <ul className="text-red-600 space-y-0.5 mt-0.5">{k.cons.map((c) => <li key={c}>− {c}</li>)}</ul>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-500 uppercase tracking-wide mb-0.5">{locale === 'de' ? 'Am besten für' : 'Best for'}</p>
                    <p className="text-slate-700">{k.bestFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How many keys */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Wie viele PIX-Schlüssel kannst du haben?' : 'How Many PIX Keys Can You Have?'}
          </h2>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2 text-sm">
            {(locale === 'de' ? [
              'Einzelpersonen (CPF): Bis zu 5 Schlüssel pro Konto',
              'Unternehmen (CNPJ): Bis zu 20 Schlüssel pro Konto',
              'Derselbe Schlüssel kann nicht bei zwei Banken sein',
              'Schlüssel können zwischen Banken übertragen werden',
            ] : [
              'Individuals (CPF): Up to 5 keys per account',
              'Companies (CNPJ): Up to 20 keys per account',
              "Same key can't be at two banks simultaneously",
              'Can transfer keys between banks',
            ]).map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span style={{ color: '#00B894' }} className="font-bold">•</span>
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Registration steps */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'PIX-Schlüssel registrieren' : 'PIX Key Registration Steps'}
          </h2>
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
        </section>

        {/* Decision table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Welchen PIX-Schlüssel solltest du verwenden?' : 'Which PIX Key Should You Use?'}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  {(locale === 'de' ? ['Situation', 'Bester Schlüssel'] : ['Situation', 'Best Key']).map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-slate-700 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {decisions.map(({ situation, key }) => (
                  <tr key={situation} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-600">{situation}</td>
                    <td className="px-4 py-3 font-semibold" style={{ color: '#00B894' }}>{key}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* DICT */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'DICT – Das PIX-Verzeichnis' : 'DICT – The PIX Directory'}
          </h2>
          <div className="text-slate-600 leading-relaxed text-[15px] space-y-3">
            <p>
              {locale === 'de'
                ? 'DICT = Diretório de Identificadores de Contas Transacionais. Der Banco Central do Brasil betreibt das DICT — ein sicheres, verschlüsseltes Verzeichnis, das alle PIX-Schlüssel auf Bankkonten abbildet.'
                : 'DICT = Diretório de Identificadores de Contas Transacionais. The Banco Central do Brasil operates DICT — a secure, encrypted directory that maps all PIX keys to bank accounts.'}
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>{locale === 'de' ? 'Nicht öffentlich zugänglich' : 'Never accessible to the public'}</li>
              <li>{locale === 'de' ? 'Wenn du einen PIX-Schlüssel eingibst, fragt deine Bank DICT ab' : 'When you type a PIX key, your bank queries DICT'}</li>
              <li>{locale === 'de' ? 'Gibt zurück: Empfängername + Bank (maskiert)' : 'Returns: recipient name + bank (masked)'}</li>
              <li>{locale === 'de' ? 'Du prüfst, bevor du sendest' : 'You verify before sending'}</li>
            </ul>
          </div>
        </section>

        {/* Security tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'PIX-Schlüssel Sicherheitstipps' : 'PIX Key Security Tips'}
          </h2>
          <ul className="space-y-2">
            {secTips.map((tip) => (
              <li key={tip} className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
                <span style={{ color: '#00B894' }} className="font-bold text-lg leading-none">✓</span>
                <span className="text-sm text-slate-700">{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* For foreigners */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {locale === 'de' ? 'Für Ausländer: Einen PIX-Schlüssel bekommen' : 'For Foreigners: Getting a PIX Key'}
          </h2>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 space-y-2 text-sm text-blue-900">
            {(locale === 'de' ? [
              'Zuerst CPF beantragen',
              'Dann brasilianisches Bankkonto eröffnen',
              'E-Mail kann sofort als Schlüssel verwendet werden',
              'Telefon erfordert brasilianische Nummer',
              'Zufallsschlüssel ab Tag 1 verfügbar',
            ] : [
              'Get CPF first',
              'Then open a Brazilian bank account',
              'Can use email as key immediately',
              'Phone requires a Brazilian number',
              'Random key available from day 1',
            ]).map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="text-blue-500 font-bold">→</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-sm">
            <Link href="/guides/brazil/pix-for-foreigners" className="text-blue-700 font-medium hover:underline">
              {locale === 'de' ? 'Vollständigen Guide für Ausländer lesen →' : 'Read full guide for foreigners →'}
            </Link>
          </p>
        </section>

        {/* CTA */}
        <div className="rounded-2xl p-6 text-center space-y-3" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <p className="font-semibold text-lg" style={{ color: '#065f46' }}>
            {locale === 'de'
              ? 'PIX-QR-Codes mit jedem Schlüsseltyp erstellen'
              : 'Generate PIX QR codes with any key type'}
          </p>
          <p className="text-sm text-slate-500">
            {locale === 'de'
              ? 'CPF, CNPJ, Telefon, E-Mail oder Zufallsschlüssel'
              : 'CPF, CNPJ, phone, email or random key'}
          </p>
          <Link
            href="/pix/generator"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl shadow-sm transition-colors"
            style={{ backgroundColor: '#00B894' }}
          >
            {locale === 'de' ? 'PIX-Generator öffnen →' : 'Open PIX Generator →'}
          </Link>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">{locale === 'de' ? 'Mehr zu Brasilien' : 'Related in Brazil'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RelatedToolCard
              icon="📷"
              name={locale === 'de' ? 'PIX-QR scannen' : 'Scan PIX QR Code'}
              url="/guides/brazil/scan-pix-qr-code"
              description={locale === 'de' ? 'Mit Nubank, Itaú oder Mercado Pago scannen' : 'Scan with Nubank, Itaú or Mercado Pago'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
            <RelatedToolCard
              icon="📱"
              name={locale === 'de' ? 'PIX QR-Code erklärt' : 'PIX QR Code Explained'}
              url="/guides/brazil/pix-qr-code-explained"
              description={locale === 'de' ? 'Technisches EMV-Format' : 'Technical EMV format'}
              visitLabel={locale === 'de' ? 'Lesen →' : 'Read →'}
              external={false}
            />
          </div>
        </section>

      </div>
    </div>
  );
}
