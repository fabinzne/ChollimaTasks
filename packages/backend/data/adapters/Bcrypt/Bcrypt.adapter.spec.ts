import { BCryptAdapter } from "./Bcrypt.adapter";
import { hash } from "bcryptjs";

describe("BCryptAdapter", () => {
  let bcryptAdapter: BCryptAdapter;

  beforeEach(() => {
    bcryptAdapter = new BCryptAdapter();
  });

  describe("hash", () => {
    it("should hash a string with salt correctly", async () => {
      const plainText = "password";

      const hashedPassword = await bcryptAdapter.hash(plainText, 10);

      expect(hashedPassword).toBeDefined();
    });
  });

  describe("compare", () => {
    it("should compare a string with a hash correctly", async () => {
      const plainText = "password";
      const hashedPassword = await hash(plainText, 10); // Generate a hash

      const result = await bcryptAdapter.compare(plainText, hashedPassword);

      expect(result).toBeTruthy();
    });

    it("should return false when comparing an incorrect string with a hash", async () => {
      const correctPlainText = "password";
      const incorrectPlainText = "wrongpassword";
      const hashedPassword = await hash(correctPlainText, 10); // Generate a hash

      const result = await bcryptAdapter.compare(
        incorrectPlainText,
        hashedPassword
      );

      expect(result).toBeFalsy();
    });
  });
});
