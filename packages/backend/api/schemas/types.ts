import { GraphQLContext } from "../../context/container";

export type Resolver<Args, Result> = (
  parent: unknown,
  args: Args,
  context: GraphQLContext
) => Promise<Result>;
