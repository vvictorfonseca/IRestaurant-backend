import { CreateUserInput } from "../dtos/inputs/create-user-input";
import { SignupRepository } from "../repositories/signup-repository";
import { User } from "../dtos/models/create-user-model";

import bcrypt from 'bcrypt'
import { Ctx } from "type-graphql";
import { Context } from "../context";

const signupRepository = new SignupRepository()

export class SignupService {
  async createUser(data: CreateUserInput, @Ctx() ctx: Context): Promise<User> {
    
    if (data.password == data.confirmPassword) {
      const SALT = 10

      const passwordEncrypted = bcrypt.hashSync(data.password, SALT)
      const confirmPasswordEncrypted = bcrypt.hashSync(data.confirmPassword, SALT)

      data.password = passwordEncrypted
      data.confirmPassword = confirmPasswordEncrypted
    }

    return signupRepository.createUser(data, ctx)
  }
}