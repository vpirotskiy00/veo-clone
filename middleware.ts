import { auth } from '@/lib/auth';

export default auth(req => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAuthPage = nextUrl.pathname.startsWith('/auth');
  const _isDashboardPage =
    nextUrl.pathname.startsWith('/chat') ||
    nextUrl.pathname.startsWith('/videos') ||
    nextUrl.pathname.startsWith('/analytics') ||
    nextUrl.pathname.startsWith('/billing') ||
    nextUrl.pathname.startsWith('/library') ||
    nextUrl.pathname.startsWith('/settings') ||
    nextUrl.pathname === '/dashboard';

  // DEMO MODE: Allow access to dashboard pages without login for now
  // This will be disabled when full auth is implemented

  // If user is logged in and trying to access auth pages, redirect to chat
  if (isAuthPage && isLoggedIn) {
    return Response.redirect(new URL('/chat', nextUrl));
  }

  // Future: Uncomment when ready to enforce auth
  // if (_isDashboardPage && !isLoggedIn) {
  //   return Response.redirect(new URL('/auth/sign-in', nextUrl));
  // }

  return;
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
