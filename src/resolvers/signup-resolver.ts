import { Query, Resolver } from "type-graphql";

@Resolver()
export class SignupResolver {
  
  @Query(() => String)
  async helloWorld() {
    return 'Deu bom!'
  }

}