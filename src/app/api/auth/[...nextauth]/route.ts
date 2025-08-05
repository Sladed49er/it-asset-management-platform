/* ============================================
 * FILE: src/app/api/auth/[...nextauth]/route.ts
 * PURPOSE: NextAuth API route handler
 * LAST MODIFIED: August 2025
 * ============================================ */

import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };