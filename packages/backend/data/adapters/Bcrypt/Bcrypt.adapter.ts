import { compare, hash } from "bcryptjs";
import { BcryptPort } from "../../../core/ports/Bcrypt.port";

export class BCryptAdapter implements BcryptPort {
  public async compare(s: string, hash: string) {
    return compare(s, hash);
  }

  public async hash(s: string, salt: string | number) {
    return hash(s, salt);
  }
}
