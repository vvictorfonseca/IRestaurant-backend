import { Ctx } from "type-graphql";
import { User } from "../dtos/models/create-user-model"
import { Context } from "../context";
import { CreateUserInput } from "../dtos/inputs/create-user-input";

export class SignupRepository {
  async createUser(data: CreateUserInput, @Ctx() ctx: Context): Promise<User> {
    
    return await ctx.prisma.users.create({ data })
  }
}