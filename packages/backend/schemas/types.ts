import { GraphQLContext } from "../context";

export type Resolver<Args, Result> = (
  parent: unknown,
  args: Args,
  context: GraphQLContext
) => Promise<Result>;
