/* ============================================
 * FILE: src/lib/auth.ts
 * PURPOSE: NextAuth.js configuration with Prisma adapter
 * LAST MODIFIED: August 2025
 * ============================================ */

import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
// import { compare } from 'bcryptjs'; // Uncomment when bcryptjs is installed
import { UserRole } from '@prisma/client';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'your@email.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        // Temporary demo user for testing
        if (credentials.email === 'admin@demo.com' && credentials.password === 'admin123') {
          return {
            id: '1',
            email: 'admin@demo.com',
            name: 'Demo Admin',
            image: null,
            role: 'ORG_ADMIN' as UserRole,
            organizationId: '1',
            organizationName: 'Demo Organization',
          };
        }

        if (credentials.email === 'user@demo.com' && credentials.password === 'user123') {
          return {
            id: '2',
            email: 'user@demo.com',
            name: 'Demo User',
            image: null,
            role: 'USER' as UserRole,
            organizationId: '1',
            organizationName: 'Demo Organization',
          };
        }

        throw new Error('Invalid credentials');

        /* 
        // TODO: Uncomment when bcryptjs is installed and prisma is working
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            organization: true,
          },
        });

        if (!user || !user.password) {
          throw new Error('Invalid credentials');
        }

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }

        if (!user.isActive) {
          throw new Error('Account is deactivated');
        }

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          organizationId: user.organizationId,
          organizationName: user.organization?.name,
        };
        */
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.organizationId = user.organizationId;
        token.organizationName = user.organizationName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as UserRole;
        session.user.organizationId = token.organizationId as string;
        session.user.organizationName = token.organizationName as string;
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      console.log(`User ${user.email} signed in`);
    },
    async signOut() {
      console.log(`User signed out`);
    },
  },
};

// Role-based access control helpers
export const hasRole = (userRole: UserRole, requiredRoles: UserRole[]): boolean => {
  return requiredRoles.includes(userRole);
};

export const roleHierarchy: Record<UserRole, number> = {
  USER: 1,
  MANAGER: 2,
  ORG_ADMIN: 3,
  TRUSTED_ADVISOR: 4,
  SUPER_ADMIN: 5,
};

export const hasMinimumRole = (userRole: UserRole, minimumRole: UserRole): boolean => {
  return roleHierarchy[userRole] >= roleHierarchy[minimumRole];
};