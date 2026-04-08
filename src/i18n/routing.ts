import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de', 'fr', 'es', 'pt', 'hi', 'id', 'th', 'vi', 'tl', 'ar', 'it', 'nl', 'pl'],
  defaultLocale: 'en',
});

export type Locale = (typeof routing.locales)[number];
