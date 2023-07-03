import { makeExecutableSchema } from "@graphql-tools/schema";
import fs from "fs";
import path from "path";
import { userResolvers, userTypeDefinitions } from "./user/user.schema";

const typeDefinitions = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf-8"
);

const resolvers = {
  Query: {
    hello: () => "Hello World!",
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers, userResolvers],
  typeDefs: [typeDefinitions, userTypeDefinitions],
});
