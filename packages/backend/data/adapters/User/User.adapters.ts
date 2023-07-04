import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime";
import { UserEntity } from "../../../core/entities/User.entity";
import { UserPort } from "../../../core/ports/User.port";

export class UserAdapter implements UserPort {
  constructor(private readonly prisma: PrismaClient) {}

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
