import { Ctx } from "type-graphql";
import { CreateAdressInput } from "../dtos/inputs/create-adress-input";
import { AdressRepository } from "../repositories/adress-repository";
import { Adress } from "../dtos/models/create-adress-model";
import { UserRepository } from "../repositories/user-repository";
import { ApolloError } from "apollo-server";
import { Context } from "../context";

const adressRepository = new AdressRepository()
const userRepository = new UserRepository()

export class AdressService {
  async createAdress(data: CreateAdressInput, @Ctx() ctx: Context): Promise<Adress> {
    const userInfo = userRepository.validateUserExistById(data.userId, ctx)
    
    if (!userInfo) {
      throw new ApolloError('This user is not registered!', 'BAD_REQUEST')
    }

    return adressRepository.createAdress(data, ctx)
  }
}