/* ============================================
 * FILE: src/types/next-auth.d.ts
 * PURPOSE: NextAuth TypeScript type extensions
 * LAST MODIFIED: August 2025
 * ============================================ */

import { UserRole } from '@prisma/client';
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: UserRole;
      organizationId?: string | null;
      organizationName?: string | null;
    };
  }

  interface User {
    role: UserRole;
    organizationId?: string | null;
    organizationName?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: UserRole;
    organizationId?: string | null;
    organizationName?: string | null;
  }
}