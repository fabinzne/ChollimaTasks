import { EnvironmentAdapter } from "./Enviroment.adapter";

describe("EnvironmentAdapter", () => {
  let environmentAdapter: EnvironmentAdapter;

  beforeEach(() => {
    environmentAdapter = new EnvironmentAdapter();
  });

  it("should return the environment variable value when it exists", () => {
    const variableName = "EXISTING_ENV_VAR";
    const expectedValue = "12345";
    process.env[variableName] = expectedValue;

    const result = environmentAdapter.getEnvByName(variableName);

    expect(result).toBe(expectedValue);
  });

  it("should throw an error when the environment variable does not exist", () => {
    const variableName = "NON_EXISTING_ENV_VAR";

    expect(() => environmentAdapter.getEnvByName(variableName)).toThrowError(
      `No environment variable found with name: ${variableName}`
    );
  });
});
