import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserEntity } from "../../entities/User.entity";
import { EnvironmentPort } from "../../ports/Environment.port";
import { UserPort } from "../../ports/User.port";
import { ISignUpUseCase } from "./signup.usecase.types";
import { JsonWebTokenPort } from "../../ports/JsonWebToken.port";

export class SignUpUseCase implements ISignUpUseCase {
  constructor(
    private readonly userRepository: UserPort,
    private readonly environment: EnvironmentPort,
    private readonly jsonwerbtoken: JsonWebTokenPort
  ) {}

  public async execute(user: UserEntity) {
    // TODO: Create an abstraction for bcrypt in the future if it's necessary
    const password = await hash(user.password, 10);

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
