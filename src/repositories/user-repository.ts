import { Ctx } from "type-graphql"
import { Context } from "../context"
import { User } from "../dtos/models/create-user-model"

export class UserRepository {
  async getUserByEmail(data: string, @Ctx() ctx: Context): Promise<User | null> {
    const userInfo = await ctx.prisma.users.findFirst({where: {
      email: data
    }})

    return userInfo
  }

  async validateUserExistById(data: number, @Ctx() ctx: Context): Promise<User | null> {
    const userInfo = await ctx.prisma.users.findFirst({ where: {
      id: data
    }})

    return userInfo
  }
}