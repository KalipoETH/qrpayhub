'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname, Link } from '@/i18n/navigation';

const LANGUAGES: { code: string; flag: string; name: string }[] = [
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'fr', flag: '🇫🇷', name: 'Français' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'pt', flag: '🇵🇹', name: 'Português' },
  { code: 'hi', flag: '🇮🇳', name: 'हिन्दी' },
  { code: 'id', flag: '🇮🇩', name: 'Indonesia' },
  { code: 'th', flag: '🇹🇭', name: 'ไทย' },
  { code: 'vi', flag: '🇻🇳', name: 'Tiếng Việt' },
  { code: 'tl', flag: '🇵🇭', name: 'Filipino' },
  { code: 'ar', flag: '🇸🇦', name: 'العربية' },
  { code: 'it', flag: '🇮🇹', name: 'Italiano' },
  { code: 'nl', flag: '🇳🇱', name: 'Nederlands' },
  { code: 'pl', flag: '🇵🇱', name: 'Polski' },
];

const AVAILABLE_STANDARDS = [
  { flag: '🇪🇺', name: 'GiroCode / EPC', href: '/girocode' },
  { flag: '🇨🇭', name: 'Swiss QR Code', href: '/swiss-qr' },
  { flag: '🇮🇳', name: 'UPI QR', href: '/upi' },
  { flag: '🇧🇷', name: 'PIX QR', href: '/pix' },
  { flag: '🇹🇭', name: 'PromptPay', href: '/promptpay' },
] as const;

const COMING_SOON_STANDARDS = [
  { flag: '🇮🇩', name: 'QRIS' },
  { flag: '🇲🇾', name: 'DuitNow' },
  { flag: '🇸🇬', name: 'PayNow' },
  { flag: '🇭🇰', name: 'FPS' },
  { flag: '🇻🇳', name: 'VietQR' },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileStdOpen, setMobileStdOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function switchLocale(code: string) {
    router.replace(pathname, { locale: code });
    setLangOpen(false);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          <span className="text-2xl">⬛</span>
          QRPayHub
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
          >
            {t('home')}
          </Link>

          {/* Standards Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
              {t('standards')}
              <svg
                className="w-4 h-4 transition-transform duration-150 group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown panel */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[420px] bg-white rounded-2xl shadow-xl border border-slate-100 p-4 invisible opacity-0 group-hover:visible group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-150 z-50">
              <div className="grid grid-cols-2 gap-x-6">
                {/* Left column: Available */}
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Available Now
                  </p>
                  <ul className="space-y-1">
                    {AVAILABLE_STANDARDS.map((s) => (
                      <li key={s.href}>
                        <Link
                          href={s.href as `/${string}`}
                          className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                          <span className="text-base leading-none">{s.flag}</span>
                          <span className="font-medium">{s.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right column: Coming Soon */}
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Coming Soon
                  </p>
                  <ul className="space-y-1">
                    {COMING_SOON_STANDARDS.map((s) => (
                      <li
                        key={s.name}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-slate-400 cursor-default select-none"
                      >
                        <span className="text-base leading-none">{s.flag}</span>
                        <span>{s.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer link */}
              <div className="mt-3 pt-3 border-t border-slate-100">
                <Link
                  href="/"
                  className="text-xs text-slate-500 hover:text-blue-600 transition-colors font-medium"
                >
                  View all standards →
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/api"
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
          >
            {t('api')}
          </Link>
          <Link
            href="/pricing"
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
          >
            {t('pricing')}
          </Link>
        </div>

        {/* Right: Language Switcher */}
        <div className="hidden md:flex items-center gap-3">
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors"
              aria-label="Switch language"
            >
              <span>{currentLang.flag}</span>
              <span className="uppercase">{currentLang.code}</span>
              <svg
                className={`w-4 h-4 transition-transform ${langOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 max-h-80 overflow-y-auto">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLocale(lang.code)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-slate-50 transition-colors text-left ${
                      lang.code === locale ? 'text-blue-600 font-medium bg-blue-50' : 'text-slate-700'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                    <span className="ml-auto text-xs text-slate-400 uppercase">{lang.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pb-4 space-y-1">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
          >
            {t('home')}
          </Link>

          {/* Standards accordion */}
          <div>
            <button
              onClick={() => setMobileStdOpen((v) => !v)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <span>{t('standards')}</span>
              <svg
                className={`w-4 h-4 transition-transform ${mobileStdOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {mobileStdOpen && (
              <div className="mt-1 ml-3 pl-3 border-l-2 border-blue-100 space-y-0.5">
                {AVAILABLE_STANDARDS.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href as `/${string}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-2 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <span>{s.flag}</span>
                    <span className="font-medium">{s.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/api"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
          >
            {t('api')}
          </Link>
          <Link
            href="/pricing"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
          >
            {t('pricing')}
          </Link>

          <div className="pt-3 border-t border-slate-100 mt-3">
            <p className="px-3 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Language
            </p>
            <div className="grid grid-cols-2 gap-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => switchLocale(lang.code)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                    lang.code === locale
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.code.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
