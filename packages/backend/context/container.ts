import { PrismaClient } from "@prisma/client";
import { asClass, asValue, createContainer, InjectionMode } from "awilix";
import { SignUpUseCase } from "../core/usecases/signup/signup.usecase";
import { EnvironmentAdapter } from "../data/adapters/Environment/Enviroment.adapter";
import { UserAdapter } from "../data/adapters/User/User.adapter";
import { JsonWebToken } from "../data/adapters/JsonWebToken/JsonWebToken.adapter";
import { LoginUsecase } from "../core/usecases/login/login.usecase";

export type GraphQLContext = {
  prisma: PrismaClient;
  userRepository: UserAdapter;
  signupUseCase: SignUpUseCase;
  environment: EnvironmentAdapter;
  headers: Headers;
  jsonWebToken: JsonWebToken;
  loginUsecase: LoginUsecase;
};

const container = createContainer<GraphQLContext>({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({
  prisma: asValue(new PrismaClient()),
  userRepository: asClass(UserAdapter).scoped(),
  signupUseCase: asClass(SignUpUseCase).scoped(),
  environment: asClass(EnvironmentAdapter).scoped(),
  jsonWebToken: asClass(JsonWebToken).scoped(),
  loginUsecase: asClass(LoginUsecase).scoped(),
});

export { container };
