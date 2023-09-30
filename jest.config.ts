const backendPkg = require("./packages/backend/package.json");

module.exports = {
  verbose: true,
  projects: [
    {
      preset: "ts-jest",
      testEnvironment: "node",
      displayName: backendPkg.name,
      testMatch: ["<rootDir>/packages/backend/**/**.spec.ts"],
    },
  ],
};
