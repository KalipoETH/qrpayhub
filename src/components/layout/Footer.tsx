'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-[#0F172A] text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tagline */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-2xl">⬛</span>
            <span className="text-xl font-bold text-white">QRPayHub</span>
          </div>
          <p className="text-sm text-slate-400">{t('tagline')}</p>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mb-6" />

        {/* Links + Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 order-2 sm:order-1">
            © 2026 qrpayhub.com
          </p>

          <nav className="flex items-center gap-6 order-1 sm:order-2" aria-label="Footer navigation">
            <Link
              href="/privacy"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {t('privacy')}
            </Link>
            <Link
              href="/imprint"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {t('imprint')}
            </Link>
            <Link
              href="/contact"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {t('contact')}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
