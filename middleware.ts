/* ============================================
 * FILE: middleware.ts
 * PURPOSE: Authentication middleware for route protection
 * LAST MODIFIED: August 2025
 * ============================================ */

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default withAuth(
  function middleware(req: NextRequest) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth');

    // Redirect authenticated users away from auth pages
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // Allow unauthenticated access to auth pages
    if (isAuthPage && !isAuth) {
      return NextResponse.next();
    }

    // Protect all other routes
    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/auth/signin?callbackUrl=${encodeURIComponent(from)}`, req.url)
      );
    }

    // Role-based access control for admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      const userRole = token?.role;
      const allowedRoles = ['SUPER_ADMIN', 'ORG_ADMIN'];
      
      if (!allowedRoles.includes(userRole as string)) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }

    // Trusted advisor specific routes
    if (req.nextUrl.pathname.startsWith('/advisor')) {
      const userRole = token?.role;
      const allowedRoles = ['SUPER_ADMIN', 'TRUSTED_ADVISOR'];
      
      if (!allowedRoles.includes(userRole as string)) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow all requests to auth pages
        if (req.nextUrl.pathname.startsWith('/auth')) {
          return true;
        }
        
        // Require authentication for all other pages
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)',
  ],
};