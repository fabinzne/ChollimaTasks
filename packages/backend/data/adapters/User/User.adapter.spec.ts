import { PrismaClient } from "@prisma/client";
import { UserAdapter } from "./User.adapter";
import { UserEntity, UserPersisted } from "../../../core/entities/User.entity";

describe("UserAdapter", () => {
  const mockPrismaClient = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const userAdapter: UserAdapter = new UserAdapter(
    mockPrismaClient as unknown as PrismaClient
  );

  describe("findUser", () => {
    it("should find an existing user by email", async () => {
      mockPrismaClient.user.findUnique.mockResolvedValue({
        id: "123",
        email: "existinguser@example.com",
        name: "Existing User",
        password: "123",
      });

      const userEmail = "existinguser@example.com";

      const foundUser = await userAdapter.findUser(userEmail);

      expect(foundUser.email).toBe(userEmail);
    });

    it("should throw an error when the user does not exist", async () => {
      mockPrismaClient.user.findUnique.mockResolvedValue(null);

      const userEmail = "nonexistentuser@example.com";

      await expect(userAdapter.findUser(userEmail)).rejects.toThrowError(
        "User not found."
      );
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const newUser: UserEntity = {
        email: "newuser@example.com",
        name: "New User",
        password: "213213",
      };

      mockPrismaClient.user.create.mockResolvedValue({
        ...newUser,
        id: "12334",
      });

      const createdUser = await userAdapter.createUser(newUser);

      expect(createdUser).toHaveProperty("id");
      expect(createdUser.email).toBe(newUser.email);
      expect(createdUser.name).toBe(newUser.name);
    });
  });
});
