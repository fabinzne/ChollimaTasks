import { AuthPayload } from "../../../../resolvers-types";
import { Resolver } from "../../../types";
import { LoginArgs } from "./login.resolver.types";

export const loginResolver: Resolver<LoginArgs, AuthPayload> = async (
  _,
  args,
  { loginUsecase }
) => {
  const result = await loginUsecase.execute(args);

  return result;
};
