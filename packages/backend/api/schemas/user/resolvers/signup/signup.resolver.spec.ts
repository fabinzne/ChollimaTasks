import { signUpResolver } from "./signup.resolver";
import { container } from "../../../../../context/container";
import { asValue } from "awilix";

describe("SignUp Resolver - Unit Tests", () => {
  it("Should return the token and user created", async () => {
    container.register({
      prisma: asValue({
        user: {
          create: jest.fn().mockResolvedValue({
            id: "1e12312cvm23214_2",
            password: "123",
            name: "John Dee",
            email: "example@email.com",
          }),
        } as any,
      }) as any,
      environment: asValue({
        getEnvByName: jest.fn().mockReturnValue("BLABLABLA"),
      }),
    });

    const authPayload = await signUpResolver(
      {},
      {
        email: "example@email.com",
        name: "John Dee",
        password: "123",
      },
      {
        ...container.cradle,
      } as any
    );

    expect(authPayload).toStrictEqual({
      token: expect.any(String),
    });
  });
});
