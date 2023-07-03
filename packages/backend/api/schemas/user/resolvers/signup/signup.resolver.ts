import { hash } from "bcryptjs";
import { GraphQLError } from "graphql";
import { sign } from "jsonwebtoken";
import { AuthPayload } from "../../../../resolvers-types";
import { Resolver } from "../../../types";
import { SignUpArgs } from "./signup.resolver.types";

export const signUpResolver: Resolver<SignUpArgs, AuthPayload> = async (
  _,
  args,
  context
) => {
  try {
    const password = await hash(args.password, 10);

    const user = await context.prisma.user.create({
      data: { ...args, password },
    });

    const token = sign({ userId: user.id }, context.env.APP_SECRET);

    return {
      token,
      user: {
        ...user,
        password: undefined,
      },
    };
  } catch (err) {
    const error = err as Error;

    throw new GraphQLError(error.message);
  }
};
