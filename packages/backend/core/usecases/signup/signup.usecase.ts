import { UserEntity } from "../../entities/User.entity";
import { EnvironmentPort } from "../../ports/Environment.port";
import { UserPort } from "../../ports/User.port";
import { ISignUpUseCase } from "./signup.usecase.types";
import { JsonWebTokenPort } from "../../ports/JsonWebToken.port";
import { BcryptPort } from "../../ports/Bcrypt.port";

export class SignUpUseCase implements ISignUpUseCase {
  constructor(
    private readonly userRepository: UserPort,
    private readonly environment: EnvironmentPort,
    private readonly jsonwerbtoken: JsonWebTokenPort,
    private readonly bcrypt: BcryptPort
  ) {}

  public async execute(user: UserEntity) {
    const password = await this.bcrypt.hash(user.password, 10);

    const createdUser = await this.userRepository.createUser({
      ...user,
      password,
    });

    const token = this.jsonwerbtoken.sign(
      { userId: createdUser.id },
      this.environment.getEnvByName("APP_SECRET")
    );

    return {
      token,
    };
  }
}
