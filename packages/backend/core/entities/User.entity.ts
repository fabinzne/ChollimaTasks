export type UserEntity = {
  email: string;
  name: string;
  password: string;
};

export type UserPersisted = {
  id: string;
} & UserEntity;

export type UserOutput = Omit<UserPersisted, "password">;
