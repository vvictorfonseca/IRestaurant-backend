import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Adress } from "../dtos/models/create-adress-model";
import { CreateAdressInput } from "../dtos/inputs/create-adress-input";
import { Context } from "../context";
import { AdressService } from "../services/adress-service";

const adressService = new AdressService()

@Resolver()
export class AdressResolver {
  @Mutation(() => Adress)
  async createAdress(@Arg('data') data: CreateAdressInput, @Ctx() ctx: Context): Promise<Adress> {

    return await adressService.createAdress(data, ctx)
  }
}