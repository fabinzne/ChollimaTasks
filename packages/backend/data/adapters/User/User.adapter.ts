import { PrismaClient } from "@prisma/client";
import { UserEntity } from "../../../core/entities/User.entity";
import { UserPort } from "../../../core/ports/User.port";

export class UserAdapter implements UserPort {
  constructor(private readonly prisma: PrismaClient) {}

  public async findUser(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }

  public async createUser(user: UserEntity) {
    const createdUser = await this.prisma.user.create({
      data: user,
    });

    return {
      id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
    };
  }
}
