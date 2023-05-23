import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { context } from "../context";
import { CreateUserInput } from "../dtos/inputs/create-user-input";
import { User } from "../dtos/models/create-user-model";
import { Adress } from "../dtos/models/create-adress-model";
import { CreateAdressInput } from "../dtos/inputs/create-adress-input";

import bcrypt from 'bcrypt'

@Resolver()
export class SignupResolver {

  @Query(() => String)
  async helloWorld() {
    return 'Deu bom!'
  }

  @Mutation(() => User)
  async createUser(@Arg('data') data: CreateUserInput) {

    const adress = await context.prisma.adresses.findFirst({
      orderBy: {
        id: 'desc'
      },
      select: {
        id: true
      },
      take: 1
    })

    if (adress) {
      data.adressId =  adress.id
    }

    if (data.password == data.confirmPassword) {
      const SALT = 10

      const passwordEncrypted = bcrypt.hashSync(data.password, SALT)
      const confirmPasswordEncrypted = bcrypt.hashSync(data.confirmPassword, SALT)

      data.password = passwordEncrypted
      data.confirmPassword = confirmPasswordEncrypted
    }
    
    const newUser = await context.prisma.users.create({ data: data })

    return newUser
  }

  @Mutation(() => Adress)
  async createAdress(@Arg('data') data: CreateAdressInput) {

    const newAdress = await context.prisma.adresses.create({ data: data})

    return newAdress
  }
}