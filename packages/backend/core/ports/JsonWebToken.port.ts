export type JsonWebTokenPort = {
  sign(payload: string | object | Buffer, secretOrPrivateKey: string): string;
};
