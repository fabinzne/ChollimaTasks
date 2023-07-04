import { UserEntity, UserOutput } from "../entities/User.entity";

export type UserPort = {
  createUser(user: UserEntity): Promise<UserOutput>;
};
