import { UserEntity, UserOutput } from "../../entities/User.entity";

export type SignUpUseCaseOutput = {
  user: UserOutput;
  token: string;
};

export type ISignUpUseCase = {
  execute(user: UserEntity): Promise<SignUpUseCaseOutput>;
};
