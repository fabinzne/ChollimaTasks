import { EnvironmentPort } from "../../ports/Environment.port";
import { JsonWebTokenPort } from "../../ports/JsonWebToken.port";
import { UserPort } from "../../ports/User.port";
import { ILoginUseCase, LoginUseCaseInput } from "./login.usecase.types";
import { BcryptPort } from "../../ports/Bcrypt.port";

export class LoginUsecase implements ILoginUseCase {
  constructor(
    private readonly userRepository: UserPort,
    private readonly jsonwebtoken: JsonWebTokenPort,
    private readonly environment: EnvironmentPort,
    private readonly bcrypt: BcryptPort
  ) {}

  public async execute({ email, password }: LoginUseCaseInput) {
    const user = await this.userRepository.findUser(email);

    const authorized = await this.bcrypt.compare(password, user.password);

    if (!authorized) {
      throw new Error("User is not authorized.");
    }

    const token = this.jsonwebtoken.sign(
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
