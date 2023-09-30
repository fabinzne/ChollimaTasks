import { compare } from "bcryptjs";
import { EnvironmentPort } from "../../ports/Environment.port";
import { JsonWebTokenPort } from "../../ports/JsonWebToken.port";
import { UserPort } from "../../ports/User.port";
import {
  ILoginUseCase,
  LoginUseCaseInput,
  LoginUseCaseOutput,
} from "./login.usecase.types";

export class LoginUsecase implements ILoginUseCase {
  constructor(
    private readonly userRepository: UserPort,
    private readonly jsonWebToken: JsonWebTokenPort,
    private readonly environment: EnvironmentPort
  ) {}

  public async execute({ email, password }: LoginUseCaseInput) {
    const user = await this.userRepository.findUser(email);

    const authorized = await compare(password, user.password);

    if (!authorized) {
      throw new Error("User is not authorized.");
    }

    const token = this.jsonWebToken.sign(
      {
        userId: user.id,
      },
      this.environment.getEnvByName("APP_SECRET")
    );

    return {
      token,
    };
  }
}
