import { EnvironmentPort } from "../../../core/ports/Environment.port";

export class EnvironmentAdapter implements EnvironmentPort {
  getEnvByName(name: string): string {
    const env = process.env[name];

    if (!env) {
      throw new Error(`No environment variable found with name: ${name}`);
    }

    return env;
  }
}
