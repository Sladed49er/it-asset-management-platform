/* ============================================
 * FILE: src/app/layout.tsx
 * PURPOSE: Root layout with authentication and session management
 * LAST MODIFIED: August 2025
 * ============================================ */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { SessionProvider } from '@/components/providers/SessionProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IT Asset Management Platform',
  description: 'Professional IT asset management for insurance agencies with trusted advisor capabilities',
  keywords: ['IT management', 'asset tracking', 'insurance', 'enterprise'],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}