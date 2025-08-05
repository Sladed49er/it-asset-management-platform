/* ============================================
 * FILE: scripts/seed.ts
 * PURPOSE: Database seeding script for development
 * LAST MODIFIED: August 2025
 * ============================================ */

import { seedDatabase } from '../src/lib/auth-utils';

async function main() {
  try {
    await seedDatabase();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

main();