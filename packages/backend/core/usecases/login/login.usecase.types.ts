export type LoginUseCaseInput = {
  email: string;
  password: string;
};

export type LoginUseCaseOutput = {
  token: string;
};

export type ILoginUseCase = {
  execute(input: LoginUseCaseInput): Promise<LoginUseCaseOutput>;
};
