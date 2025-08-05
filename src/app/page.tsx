/* ============================================
 * FILE: src/app/page.tsx
 * PURPOSE: Protected dashboard with user session integration
 * LAST MODIFIED: August 2025
 * ============================================ */

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardClient from '@/components/dashboard/DashboardClient';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return <DashboardClient session={session} />;
}