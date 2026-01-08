// packages/db/prisma.config.ts

export default {
  schema: "prisma/schema.prisma",
  migrate: {
    url: process.env.DATABASE_URL!,
  },
};
