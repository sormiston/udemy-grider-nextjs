import { PrismaClient } from '@/generated/prisma';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();
// export const db = new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
