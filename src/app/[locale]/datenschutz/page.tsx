import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Breadcrumb from '@/components/ui/Breadcrumb';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Datenschutzerklärung | QRPayHub',
    robots: { index: false, follow: false },
  };
}

export default function DatenschutzPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);

  const isDE = locale === 'de';

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: isDE ? 'Datenschutzerklärung' : 'Privacy Policy' },
          ]}
        />

        <div className="mt-8">
          {isDE ? <ContentDE /> : <ContentEN />}
        </div>
      </div>
    </div>
  );
}

function ContentDE() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Datenschutzerklärung
      </h1>

      <Section number="1" title="Verantwortlicher">
        <address className="not-italic text-slate-700 leading-relaxed">
          Kaleb Jahnke<br />
          Koppelstraße 6A, 27711 Osterholz-Scharmbeck<br />
          E-Mail:{' '}
          <a href="mailto:jahnke.kaleb@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors">
            jahnke.kaleb@gmail.com
          </a>
        </address>
      </Section>

      <Section number="2" title="Allgemeine Hinweise">
        <p className="text-slate-700 leading-relaxed">
          Der Betrieb dieser Website erfolgt unter Beachtung der
          Datenschutz-Grundverordnung (DSGVO) sowie des
          Bundesdatenschutzgesetzes (BDSG).
        </p>
      </Section>

      <Section number="3" title="Datenerfassung auf dieser Website">
        <Subsection title="Server-Log-Dateien">
          <p className="text-slate-700 leading-relaxed">
            Der Hosting-Anbieter (Vercel Inc., 340 Pine Street, Suite 603, San
            Francisco, CA 94104, USA) erhebt automatisch Informationen in
            Server-Log-Dateien. Dies umfasst: Browsertyp, Betriebssystem,
            Referrer-URL, Hostname, Uhrzeit der Anfrage.
            <br />
            <span className="font-medium">Rechtsgrundlage:</span> Art. 6 Abs. 1
            lit. f DSGVO.
          </p>
        </Subsection>
        <Subsection title="Geolocation">
          <p className="text-slate-700 leading-relaxed">
            Beim Aufruf der Website wird Ihre ungefähre geografische Region
            anhand Ihrer IP-Adresse ermittelt, um passende Zahlungsstandards
            vorzuschlagen. Diese Information wird nicht gespeichert und ist
            nicht mit Ihrer Person verknüpfbar.
            <br />
            <span className="font-medium">Rechtsgrundlage:</span> Art. 6 Abs. 1
            lit. f DSGVO.
          </p>
        </Subsection>
      </Section>

      <Section number="4" title="QR-Code-Generierung">
        <p className="text-slate-700 leading-relaxed">
          Alle QR-Codes werden ausschließlich in Ihrem Browser generiert
          (clientseitig). Die eingegebenen Zahlungsdaten (IBAN, Name, Betrag)
          werden zu keinem Zeitpunkt an unsere Server übertragen oder
          gespeichert. Wir haben keinen Zugriff auf Ihre Zahlungsdaten.
        </p>
      </Section>

      <Section number="5" title="Cookies & LocalStorage">
        <p className="text-slate-700 leading-relaxed">
          Diese Website verwendet keine Tracking-Cookies. Im LocalStorage Ihres
          Browsers wird lediglich Ihre erkannte geografische Region für 24
          Stunden gespeichert, um wiederholte Abfragen zu vermeiden. Diese
          Information ist anonym und enthält keine personenbezogenen Daten.
        </p>
      </Section>

      <Section number="6" title="Vercel Analytics">
        <p className="text-slate-700 leading-relaxed">
          Diese Website nutzt Vercel Analytics, einen datenschutzfreundlichen
          Analysedienst von Vercel Inc. Es werden keine Cookies gesetzt und
          keine personenbezogenen Daten erhoben. Die Analyse erfolgt vollständig
          anonym.
          <br />
          Weitere Informationen:{' '}
          <a
            href="https://vercel.com/docs/analytics/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            vercel.com/docs/analytics/privacy-policy
          </a>
        </p>
      </Section>

      <Section number="7" title="Google AdSense (coming soon)">
        <p className="text-slate-700 leading-relaxed">
          Diese Website plant die zukünftige Nutzung von Google AdSense zur
          Anzeigenschaltung. Sobald Google AdSense aktiviert wird, wird diese
          Datenschutzerklärung entsprechend aktualisiert.
        </p>
      </Section>

      <Section number="8" title="Ihre Rechte (DSGVO Art. 15–21)">
        <p className="text-slate-700 mb-3">Sie haben das Recht auf:</p>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>Auskunft über Ihre gespeicherten Daten (Art. 15)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16)</li>
          <li>Löschung Ihrer Daten (Art. 17)</li>
          <li>Einschränkung der Verarbeitung (Art. 18)</li>
          <li>Datenübertragbarkeit (Art. 20)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21)</li>
        </ul>
        <p className="text-slate-700 mt-3">
          Zur Ausübung Ihrer Rechte wenden Sie sich an:{' '}
          <a
            href="mailto:jahnke.kaleb@gmail.com"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            jahnke.kaleb@gmail.com
          </a>
        </p>
      </Section>

      <Section number="9" title="Beschwerderecht">
        <p className="text-slate-700 leading-relaxed">
          Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
          beschweren. Die zuständige Behörde für Niedersachsen ist:
          <br />
          <span className="font-medium">
            Die Landesbeauftragte für den Datenschutz Niedersachsen
          </span>
          <br />
          Prinzenstraße 5, 30159 Hannover
          <br />
          <a
            href="https://www.lfd.niedersachsen.de"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            www.lfd.niedersachsen.de
          </a>
        </p>
      </Section>

      <Section number="10" title="Aktualität">
        <p className="text-slate-700 leading-relaxed">
          Diese Datenschutzerklärung ist aktuell gültig und hat den Stand:{' '}
          <span className="font-medium">April 2026</span>.
        </p>
      </Section>
    </article>
  );
}

function ContentEN() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Privacy Policy</h1>

      <Section number="1" title="Controller">
        <address className="not-italic text-slate-700 leading-relaxed">
          Kaleb Jahnke<br />
          Koppelstraße 6A, 27711 Osterholz-Scharmbeck, Germany<br />
          Email:{' '}
          <a href="mailto:jahnke.kaleb@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors">
            jahnke.kaleb@gmail.com
          </a>
        </address>
      </Section>

      <Section number="2" title="General Information">
        <p className="text-slate-700 leading-relaxed">
          This website is operated in compliance with the General Data
          Protection Regulation (GDPR) and the German Federal Data Protection
          Act (BDSG).
        </p>
      </Section>

      <Section number="3" title="Data Collection on this Website">
        <Subsection title="Server Log Files">
          <p className="text-slate-700 leading-relaxed">
            The hosting provider (Vercel Inc., 340 Pine Street, Suite 603, San
            Francisco, CA 94104, USA) automatically collects information in
            server log files. This includes: browser type, operating system,
            referrer URL, hostname, and time of request.
            <br />
            <span className="font-medium">Legal basis:</span> Art. 6(1)(f) GDPR.
          </p>
        </Subsection>
        <Subsection title="Geolocation">
          <p className="text-slate-700 leading-relaxed">
            When you visit the website, your approximate geographic region is
            determined based on your IP address to suggest relevant payment
            standards. This information is not stored and cannot be linked to
            your identity.
            <br />
            <span className="font-medium">Legal basis:</span> Art. 6(1)(f) GDPR.
          </p>
        </Subsection>
      </Section>

      <Section number="4" title="QR Code Generation">
        <p className="text-slate-700 leading-relaxed">
          All QR codes are generated exclusively in your browser (client-side).
          The payment data you enter (IBAN, name, amount) is never transmitted
          to or stored on our servers. We have no access to your payment data.
        </p>
      </Section>

      <Section number="5" title="Cookies & LocalStorage">
        <p className="text-slate-700 leading-relaxed">
          This website does not use tracking cookies. Your detected geographic
          region is stored in your browser&apos;s LocalStorage for 24 hours to
          avoid repeated lookups. This information is anonymous and contains no
          personal data.
        </p>
      </Section>

      <Section number="6" title="Vercel Analytics">
        <p className="text-slate-700 leading-relaxed">
          This website uses Vercel Analytics, a privacy-friendly analytics
          service by Vercel Inc. No cookies are set and no personal data is
          collected. Analytics are completely anonymous.
          <br />
          More information:{' '}
          <a
            href="https://vercel.com/docs/analytics/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            vercel.com/docs/analytics/privacy-policy
          </a>
        </p>
      </Section>

      <Section number="7" title="Google AdSense (coming soon)">
        <p className="text-slate-700 leading-relaxed">
          This website plans to use Google AdSense for advertising in the
          future. Once Google AdSense is activated, this privacy policy will be
          updated accordingly.
        </p>
      </Section>

      <Section number="8" title="Your Rights (GDPR Art. 15–21)">
        <p className="text-slate-700 mb-3">You have the right to:</p>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>Access your stored data (Art. 15)</li>
          <li>Rectification of inaccurate data (Art. 16)</li>
          <li>Erasure of your data (Art. 17)</li>
          <li>Restriction of processing (Art. 18)</li>
          <li>Data portability (Art. 20)</li>
          <li>Object to processing (Art. 21)</li>
        </ul>
        <p className="text-slate-700 mt-3">
          To exercise your rights, contact:{' '}
          <a
            href="mailto:jahnke.kaleb@gmail.com"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            jahnke.kaleb@gmail.com
          </a>
        </p>
      </Section>

      <Section number="9" title="Right to Lodge a Complaint">
        <p className="text-slate-700 leading-relaxed">
          You have the right to lodge a complaint with a data protection
          supervisory authority. The competent authority for Lower Saxony,
          Germany is:
          <br />
          <span className="font-medium">
            Die Landesbeauftragte für den Datenschutz Niedersachsen
          </span>
          <br />
          Prinzenstraße 5, 30159 Hannover, Germany
          <br />
          <a
            href="https://www.lfd.niedersachsen.de"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            www.lfd.niedersachsen.de
          </a>
        </p>
      </Section>

      <Section number="10" title="Currency of this Policy">
        <p className="text-slate-700 leading-relaxed">
          This privacy policy is currently valid as of{' '}
          <span className="font-medium">April 2026</span>.
        </p>
      </Section>
    </article>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-slate-800 mb-3">
        {number}. {title}
      </h2>
      {children}
    </section>
  );
}

function Subsection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <h3 className="text-base font-semibold text-slate-800 mb-2 italic">
        {title}
      </h3>
      {children}
    </div>
  );
}
