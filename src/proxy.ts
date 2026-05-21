import createMiddleware from 'next-intl/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { updateSession } from './lib/supabase/middleware';

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedPaths = ['/dashboard', '/test', '/resultater', '/profil', '/admin'];
  const isProtected = protectedPaths.some((p) =>
    pathname.startsWith(p) ||
    pathname.startsWith(`/en${p}`) ||
    pathname.startsWith(`/no${p}`)
  );

  if (isProtected) {
    const sessionResponse = await updateSession(request);
    if (sessionResponse.status === 307 || sessionResponse.status === 302) {
      return sessionResponse;
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
};
