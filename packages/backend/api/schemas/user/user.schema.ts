import fs from "fs";
import path from "path";
import { signUpResolver } from "./resolvers/signup/signup.resolver";
import { loginResolver } from "./resolvers/login/login.resolver";

const userTypeDefinitions = fs.readFileSync(
  path.join(__dirname, "user.schema.graphql"),
  "utf-8"
);

const userResolvers = {
  Mutation: {
    signup: signUpResolver,
    login: loginResolver,
  },
};

export { userTypeDefinitions, userResolvers };
