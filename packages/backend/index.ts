import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { createContext } from "./context";
import { schema } from "./api/schemas";
import dotenv from "dotenv";
import path from "path";

function main() {
  dotenv.config({ path: path.resolve(__dirname, ".env") });
  const yoga = createYoga({ schema, context: createContext });
  const server = createServer(yoga);

  server.listen(4000, () => {
    console.info("Server is running on http://localhost:4000/graphql");
  });
}

main();
