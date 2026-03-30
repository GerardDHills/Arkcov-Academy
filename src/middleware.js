import { NextResponse } from 'next/server';

// Simple JWT decode for Edge Runtime (no jsonwebtoken library needed)
// This only READS the token payload — actual verification happens in API routes
function decodeToken(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    // Check expiration
    if (payload.exp && payload.exp < Date.now() / 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

export function middleware(request) {
  const token = request.cookies.get('arkcov_token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes — always accessible
  const publicRoutes = ['/', '/login', '/signup', '/pricing', '/api/auth/login', '/api/auth/signup', '/api/stripe/webhook'];
  const publicPrefixes = ['/pricing/', '/api/auth/'];
  
  const isPublic = publicRoutes.some(route => pathname === route) || 
                   publicPrefixes.some(prefix => pathname.startsWith(prefix));

  if (isPublic) {
    // Redirect logged-in users away from login/signup
    if (token && (pathname === '/login' || pathname === '/signup')) {
      const user = decodeToken(token);
      if (user) {
        const redirect = user.role === 'admin' ? '/admin' : '/dashboard';
        return NextResponse.redirect(new URL(redirect, request.url));
      }
    }
    return NextResponse.next();
  }

  // API routes that need auth
  if (pathname.startsWith('/api/')) {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = decodeToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    // Admin API routes
    if (pathname.startsWith('/api/admin') && user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }
    return NextResponse.next();
  }

  // Protected page routes
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const user = decodeToken(token);
  if (!user) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Admin pages
  if (pathname.startsWith('/admin') && user.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/explore/:path*',
    '/course/:path*',
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/content/:path*',
    '/api/progress/:path*',
    '/api/stripe/checkout',
    '/api/stripe/portal',
    '/login',
    '/signup',
  ],
};
