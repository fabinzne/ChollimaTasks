import { UserEntity, UserOutput, UserPersisted } from "../entities/User.entity";

export type UserPort = {
  createUser(user: UserEntity): Promise<UserOutput>;
  findUser(email: string): Promise<UserPersisted>;
};
