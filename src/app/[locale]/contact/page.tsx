import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  return {
    title: 'Contact | QRPayHub',
    description: 'Get in touch with QRPayHub',
    robots: { index: true, follow: true },
    alternates: buildAlternates(locale, '/contact'),
  };
}

const EMAIL = 'jahnke.kaleb@gmail.com';

export default async function ContactPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'legal' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Breadcrumb
          items={[
            { label: tNav('home'), href: '/' },
            { label: t('contact') },
          ]}
        />

        {/* Hero */}
        <div className="mt-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            {t('contactTitle')}
          </h1>
          <p className="text-lg text-slate-500">{t('contactSubtitle')}</p>
        </div>

        {/* Main contact card */}
        <div className="mt-10 max-w-lg mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
          <div className="text-5xl mb-4">📧</div>
          <p className="text-slate-600 mb-2 font-medium">Send us an email</p>
          <p className="text-slate-500 text-sm mb-6 font-mono">
            {EMAIL}
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            {t('sendEmail')}
          </a>
        </div>

        {/* Info boxes */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
          <InfoBox
            icon="🐛"
            title="Bug Report"
            description="Found a bug? Let us know and we'll fix it."
            email={EMAIL}
          />
          <InfoBox
            icon="💡"
            title="Feature Request"
            description="Have an idea for a new payment standard?"
            email={EMAIL}
          />
          <InfoBox
            icon="🤝"
            title="Business Inquiry"
            description="API access, partnerships or custom solutions?"
            email={EMAIL}
          />
        </div>

        {/* Response time */}
        <p className="mt-8 text-center text-sm text-slate-400">
          {t('responseTime')}
        </p>
      </div>
    </div>
  );
}

function InfoBox({
  icon,
  title,
  description,
  email,
}: {
  icon: string;
  title: string;
  description: string;
  email: string;
}) {
  return (
    <a
      href={`mailto:${email}?subject=${encodeURIComponent(title)}`}
      className="flex flex-col items-center text-center p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all group"
    >
      <span className="text-2xl mb-2">{icon}</span>
      <span className="text-sm font-semibold text-slate-800 mb-1 group-hover:text-blue-700 transition-colors">
        {title}
      </span>
      <span className="text-xs text-slate-500 leading-relaxed">{description}</span>
    </a>
  );
}
