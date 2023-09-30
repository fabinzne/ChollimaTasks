import { SignUpUseCase } from "./signup.usecase";
import { UserPort } from "../../ports/User.port";
import { EnvironmentPort } from "../../ports/Environment.port";
import { JsonWebTokenPort } from "../../ports/JsonWebToken.port";
import { BcryptPort } from "../../ports/Bcrypt.port";
import { UserEntity } from "../../entities/User.entity";

describe("SignUpUseCase", () => {
  let signUpUseCase: SignUpUseCase;
  let userRepository: jest.MockedObjectDeep<UserPort>;
  let environment: jest.MockedObjectDeep<EnvironmentPort>;
  let jsonwebtoken: jest.MockedObjectDeep<JsonWebTokenPort>;
  let bcrypt: jest.MockedObjectDeep<BcryptPort>;

  beforeEach(() => {
    userRepository = {
      findUser: jest.fn(),
      createUser: jest.fn(),
    };

    environment = {
      getEnvByName: jest.fn(),
    };

    jsonwebtoken = {
      sign: jest.fn(),
    };

    bcrypt = {
      compare: jest.fn(),
      hash: jest.fn(),
    };

    signUpUseCase = new SignUpUseCase(
      userRepository,
      environment,
      jsonwebtoken,
      bcrypt
    );
  });

  it("should execute the signup use case successfully", async () => {
    const user: UserEntity = {
      email: "user@example.com",
      password: "password",
      name: "User Name",
    };

    const hashedPassword = "hashedpassword";
    const appSecret = "mysecret";
    const createdUser = {
      id: "1",
      ...user,
      password: hashedPassword,
    };

    userRepository.createUser.mockResolvedValue(createdUser);
    environment.getEnvByName.mockReturnValue(appSecret);
    bcrypt.hash.mockResolvedValue(hashedPassword);
    jsonwebtoken.sign.mockReturnValue("token");

    const result = await signUpUseCase.execute(user);

    expect(result).toEqual({
      token: "token",
    });

    expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 10);
    expect(userRepository.createUser).toHaveBeenCalledWith({
      ...user,
      password: hashedPassword,
    });
    expect(environment.getEnvByName).toHaveBeenCalledWith("APP_SECRET");
    expect(jsonwebtoken.sign).toHaveBeenCalledWith(
      { userId: createdUser.id },
      appSecret
    );
  });
});
