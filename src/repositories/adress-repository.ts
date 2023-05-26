import { Ctx } from "type-graphql";
import { CreateAdressInput } from "../dtos/inputs/create-adress-input";
import { Context } from "../context";
import { Adress } from "../dtos/models/create-adress-model";

export class AdressRepository {
  async createAdress(data: CreateAdressInput, @Ctx() ctx: Context): Promise<Adress> {

    return await ctx.prisma.adresses.create({ data })
  }
}