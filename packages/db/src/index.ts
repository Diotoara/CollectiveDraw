import { PrismaClient } from "@prisma/client";

// Extend globalThis type safely
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.prisma ??
  new PrismaClient({ log: ["warn", "error"] });

// Cache Prisma instance for dev to prevent multiple connections
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
