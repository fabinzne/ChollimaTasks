import { PrismaClient } from "@prisma/client";
import { YogaInitialContext } from "graphql-yoga";
import { container, GraphQLContext } from "./container";

export async function createContext({
  request,
}: YogaInitialContext): Promise<GraphQLContext> {
  return {
    ...container.cradle,
    headers: request.headers,
  };
}
