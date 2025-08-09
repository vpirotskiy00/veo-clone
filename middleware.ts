import { auth } from '@/lib/auth';

export default auth(req => {
  const { nextUrl } = req;
  const _isLoggedIn = !!req.auth;

  const _isAuthPage = nextUrl.pathname.startsWith('/auth');
  const _isDashboard = nextUrl.pathname.startsWith('/dashboard');

  // TEMPORARY: Disable auth checks for demo - allow access to dashboard
  // TODO: Re-enable when authentication is fully implemented

  // if (_isDashboard && !_isLoggedIn) {
  //   return Response.redirect(new URL('/auth/sign-in', nextUrl));
  // }

  // if (_isAuthPage && _isLoggedIn) {
  //   return Response.redirect(new URL('/dashboard', nextUrl));
  // }

  return;
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
