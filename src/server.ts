import "reflect-metadata";

import path from 'node:path'

import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { SignupResolver } from "./resolvers/signup-resolver";
import { context } from "./context";
import { AdressResolver } from "./resolvers/adress-resolver";

async function main() {
  const schema = await buildSchema({
    resolvers: [
      SignupResolver,
      AdressResolver
    ],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql')
  })
  
  const server = new ApolloServer({
    schema,
    context
  })

  const { url } = await server.listen()

  console.log(`HTTP server running on ${url}`)
}

main()