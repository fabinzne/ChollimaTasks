import { sign } from "jsonwebtoken";
import { JsonWebTokenPort } from "../../../core/ports/JsonWebToken.port";

export class JsonWebToken implements JsonWebTokenPort {
  public sign(payload: string | object | Buffer, secretOrPrivateKey: string) {
    return sign(payload, secretOrPrivateKey);
  }
}
