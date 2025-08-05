/* ============================================
 * FILE: src/components/providers/SessionProvider.tsx
 * PURPOSE: NextAuth session provider wrapper
 * LAST MODIFIED: August 2025
 * ============================================ */

'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

interface SessionProviderProps {
  children: React.ReactNode;
  session?: Session | null;
}

export function SessionProvider({ children, session }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}