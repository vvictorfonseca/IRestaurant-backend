import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

import { Context, context } from "../context";
import { CreateUserInput } from "../dtos/inputs/create-user-input";
import { User } from "../dtos/models/create-user-model";
import { Adress } from "../dtos/models/create-adress-model";
import { CreateAdressInput } from "../dtos/inputs/create-adress-input";

import { SignupService } from "../services/signup-service";

const signupService = new SignupService()

@Resolver()
export class SignupResolver {

  @Query(() => String)
  async helloWorld() {
    return 'Deu bom!'
  }

  @Mutation(() => User)
  async createUser(@Arg('data') data: CreateUserInput, @Ctx() ctx: Context): Promise<User> {

    return signupService.createUser(data, ctx)
  }

  @Mutation(() => Adress)
  async createAdress(@Arg('data') data: CreateAdressInput) {

    const newAdress = await context.prisma.adresses.create({ data: data })

    return newAdress
  }
}