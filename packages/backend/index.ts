import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { createContext } from "./context";
import { schema } from "./schemas";

const yoga = createYoga({ schema, context: createContext });

const server = createServer(yoga);

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
