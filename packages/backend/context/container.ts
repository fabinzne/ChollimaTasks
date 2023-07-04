import { PrismaClient } from "@prisma/client";
import { asClass, asValue, createContainer, InjectionMode } from "awilix";
import { SignUpUseCase } from "../core/usecases/signup/signup.usecase";
import { EnvironmentAdapter } from "../data/adapters/Environment/Enviroment.adapter";
import { UserAdapter } from "../data/adapters/User/User.adapters";

export type GraphQLContext = {
  prisma: PrismaClient;
  userRepository: UserAdapter;
  signupUseCase: SignUpUseCase;
  environment: EnvironmentAdapter;
  headers: Headers;
};

const container = createContainer<GraphQLContext>({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({
  prisma: asValue(new PrismaClient()),
  userRepository: asClass(UserAdapter).scoped(),
  signupUseCase: asClass(SignUpUseCase).scoped(),
  environment: asClass(EnvironmentAdapter).scoped(),
});

export { container };
