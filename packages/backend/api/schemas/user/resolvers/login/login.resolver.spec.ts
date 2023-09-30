import { asValue } from "awilix";
import { container } from "../../../../../context/container";
import { loginResolver } from "./login.resolver";

describe("loginResolver", () => {
  container.register({
    prisma: asValue({
      user: {
        findUnique: jest.fn().mockResolvedValue({
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
    bcrypt: asValue({
      hash: jest.fn(),
      compare: jest.fn().mockImplementation((a, b) => Promise.resolve(a === b)),
    }),
  });

  it("Should return the user token if authentication is ok", async () => {
    const result = await loginResolver(
      {},
      {
        email: "example@email.com",
        password: "123",
      },
      {
        ...container.cradle,
      }
    );

    expect(result).toStrictEqual({
      token: expect.any(String),
    });
  });

  it("Should return an error if user is not authorized", async () => {
    await expect(
      loginResolver(
        {},
        {
          email: "example@email.com",
          password: "124",
        },
        {
          ...container.cradle,
        }
      )
    ).rejects.toThrow("User is not authorized.");
  });
});
