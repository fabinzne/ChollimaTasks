import { GraphQLError } from "graphql";
import { AuthPayload } from "../../../../resolvers-types";
import { Resolver } from "../../../types";
import { SignUpArgs } from "./signup.resolver.types";

export const signUpResolver: Resolver<SignUpArgs, AuthPayload> = async (
  _,
  args,
  { signupUseCase }
) => {
  try {
    const result = await signupUseCase.execute(args);

    return result;
  } catch (err) {
    const error = err as Error;
    throw new GraphQLError(error.message);
  }
};
