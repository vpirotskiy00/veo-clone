import { auth } from '@/lib/auth';

export default auth(req => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAuthPage = nextUrl.pathname.startsWith('/auth');
  const isDashboard = nextUrl.pathname.startsWith('/dashboard');

  if (isDashboard && !isLoggedIn) {
    return Response.redirect(new URL('/auth/sign-in', nextUrl));
  }

  if (isAuthPage && isLoggedIn) {
    return Response.redirect(new URL('/dashboard', nextUrl));
  }

  return;
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
