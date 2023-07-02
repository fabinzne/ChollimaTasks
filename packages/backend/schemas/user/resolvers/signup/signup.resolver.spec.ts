import { signUpResolver } from "./signup.resolver";

describe("SignUp Resolver - Unit Tests", () => {
  it("Should return the token and user created", async () => {
    const authPayload = await signUpResolver(
      {},
      {
        email: "example@email.com",
        name: "John Dee",
        password: "123",
      },
      {
        prisma: {
          user: {
            create: jest.fn().mockResolvedValue({
              id: "1e12312cvm23214_2",
              password: "123",
              name: "John Dee",
              email: "example@email.com",
            }),
          },
        } as any,
        env: {
          APP_SECRET: "example_secret",
        },
      }
    );

    expect(authPayload).toStrictEqual({
      token: expect.any(String),
      user: {
        email: "example@email.com",
        id: "1e12312cvm23214_2",
        name: "John Dee",
        password: undefined,
      },
    });
  });
});
