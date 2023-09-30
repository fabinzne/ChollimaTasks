import { verify } from "jsonwebtoken";
import { JsonWebToken } from "./JsonWebToken.adapter";

describe("JsonWebToken", () => {
  let jsonWebToken: JsonWebToken;

  beforeEach(() => {
    jsonWebToken = new JsonWebToken();
  });

  it("should sign a payload with a secret key", () => {
    const payload = { userId: "123" };
    const secretKey = "mysecretkey";

    const token = jsonWebToken.sign(payload, secretKey);

    expect(token).toBeDefined();

    const decoded = verify(token, secretKey);
    expect(decoded).toMatchObject(payload);
  });
});
