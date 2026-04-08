import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/(de|en|fr|es|pt|hi|id|th|vi|tl|ar|it|nl|pl)/:path*',
    // Match all paths except _next, _vercel, static files, and API routes
    '/((?!_next|_vercel|api|.*\\..*).*)',
  ],
};
