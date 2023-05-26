import { Ctx } from "type-graphql"
import { Context } from "vm"
import { User } from "../dtos/models/create-user-model"

export class UserRepository {
  async getUserByEmail(data: string, @Ctx() ctx: Context): Promise<User | null> {
    const userInfo: User = await ctx.prisma.users.findFirst({where: {
      email: data
    }})

    return userInfo
  }

  async validateUserExistById(data: number, @Ctx() ctx: Context): Promise<User | null> {
    const userInfo: User = await ctx.prisma.users.findFirst({ where: {
      id: data
    }})

    return userInfo
  }
}