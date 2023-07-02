import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ApplicationEnvs = {
  APP_SECRET: string;
};

export type GraphQLContext = {
  prisma: PrismaClient;
  env: ApplicationEnvs;
};

export async function createContext(): Promise<GraphQLContext> {
  const APP_SECRET = process.env.APP_SECRET;
  if (!APP_SECRET) {
    throw new Error(
      "Cannot load ENV Var = APP_SECRET please make sure you've defined environment correctly!"
    );
  }

  return {
    prisma,
    env: {
      APP_SECRET,
    },
  };
}
