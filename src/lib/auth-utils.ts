/* ============================================
 * FILE: src/lib/auth-utils.ts
 * PURPOSE: Authentication utilities and user management
 * LAST MODIFIED: August 2025
 * ============================================ */

import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';

export interface CreateUserData {
  email: string;
  password: string;
  name?: string;
  role?: UserRole;
  organizationId?: string;
}

export async function createUser({
  email,
  password,
  name,
  role = 'USER',
  organizationId,
}: CreateUserData) {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Hash password
  const hashedPassword = await hash(password, 12);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role,
      organizationId,
      isActive: true,
    },
    include: {
      organization: true,
    },
  });

  // Remove password from response
  const { password: _password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function createOrganization(name: string, description?: string) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  
  return await prisma.organization.create({
    data: {
      name,
      slug,
      description,
    },
  });
}

export async function createAdminUser(
  organizationId: string,
  userData: Omit<CreateUserData, 'organizationId' | 'role'>
) {
  return await createUser({
    ...userData,
    role: 'ORG_ADMIN',
    organizationId,
  });
}

// Seeding function for development
export async function seedDatabase() {
  // Create demo organization
  const org = await createOrganization(
    'Demo Insurance Agency',
    'Demo organization for testing IT Asset Management'
  );

  // Create admin user
  const adminUser = await createAdminUser(org.id, {
    email: 'admin@demo.com',
    password: 'admin123',
    name: 'Admin User',
  });

  // Create regular user
  const regularUser = await createUser({
    email: 'user@demo.com',
    password: 'user123',
    name: 'Regular User',
    role: 'USER',
    organizationId: org.id,
  });

  // Create trusted advisor (cross-org access)
  const trustedAdvisor = await createUser({
    email: 'advisor@trusted.com',
    password: 'advisor123',
    name: 'Trusted Advisor',
    role: 'TRUSTED_ADVISOR',
  });

  console.log('Database seeded successfully!');
  console.log('Users created:');
  console.log('- Admin:', adminUser.email);
  console.log('- User:', regularUser.email);
  console.log('- Trusted Advisor:', trustedAdvisor.email);
  
  return {
    organization: org,
    users: {
      admin: adminUser,
      user: regularUser,
      advisor: trustedAdvisor,
    },
  };
}