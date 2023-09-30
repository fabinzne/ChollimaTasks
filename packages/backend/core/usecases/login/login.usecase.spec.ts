import { LoginUsecase } from "./login.usecase";
import { UserPort } from "../../ports/User.port";
import { JsonWebTokenPort } from "../../ports/JsonWebToken.port";
import { EnvironmentPort } from "../../ports/Environment.port";
import { BcryptPort } from "../../ports/Bcrypt.port";

describe("LoginUsecase", () => {
  let loginUsecase: LoginUsecase;
  let userRepository: jest.MockedObjectDeep<UserPort>;
  let jsonwebtoken: jest.MockedObjectDeep<JsonWebTokenPort>;
  let environment: jest.MockedObjectDeep<EnvironmentPort>;
  let bcrypt: jest.MockedObjectDeep<BcryptPort>;

  beforeEach(() => {
    userRepository = {
      createUser: jest.fn(),
      findUser: jest.fn(),
    };

    jsonwebtoken = {
      sign: jest.fn(),
    };

    environment = {
      getEnvByName: jest.fn(),
    };

    bcrypt = {
      hash: jest.fn(),
      compare: jest.fn(),
    };

    loginUsecase = new LoginUsecase(
      userRepository,
      jsonwebtoken,
      environment,
      bcrypt
    );
  });

  it("should execute the login use case successfully", async () => {
    const email = "user@example.com";
    const password = "password";
    const userId = "1";
    const appSecret = "mysecret";

    userRepository.findUser.mockResolvedValue({
      id: userId,
      email,
      password: "hashedpassword",
      name: "User Name",
    });

    bcrypt.compare.mockResolvedValue(true);

    environment.getEnvByName.mockReturnValue(appSecret);
    jsonwebtoken.sign.mockReturnValue("token");

    const result = await loginUsecase.execute({ email, password });

    expect(result).toEqual({
      token: "token",
    });

    expect(userRepository.findUser).toHaveBeenCalledWith(email);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, "hashedpassword");
    expect(environment.getEnvByName).toHaveBeenCalledWith("APP_SECRET");
    expect(jsonwebtoken.sign).toHaveBeenCalledWith({ userId }, appSecret);
  });

  it("should throw an error when user is not authorized", async () => {
    const email = "user@example.com";
    const password = "password";

    userRepository.findUser.mockResolvedValue({
      id: "1",
      email,
      password: "hashedpassword",
      name: "User Name",
    });

    bcrypt.compare.mockResolvedValue(false);

    await expect(
      loginUsecase.execute({ email, password })
    ).rejects.toThrowError("User is not authorized.");
  });
});
