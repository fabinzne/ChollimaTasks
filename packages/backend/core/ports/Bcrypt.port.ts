export type BcryptPort = {
  compare(s: string, hash: string): Promise<boolean>;
  hash(s: string, salt: string | number): Promise<string>;
};
