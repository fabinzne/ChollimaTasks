import { UserEntity, UserOutput } from "../../entities/User.entity";

export type SignUpUseCaseOutput = {
  token: string;
};

export type ISignUpUseCase = {
  execute(user: UserEntity): Promise<SignUpUseCaseOutput>;
};
