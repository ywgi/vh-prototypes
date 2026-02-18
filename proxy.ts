import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const session = request.cookies.get('session_id');
  const isLoginPage = request.nextUrl.pathname === '/';

  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (session && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}