import { CreateUserInput } from "../dtos/inputs/create-user-input";
import { SignupRepository } from "../repositories/signup-repository";
import { User } from "../dtos/models/create-user-model";

import bcrypt from 'bcrypt'
import { Ctx } from "type-graphql";
import { Context } from "../context";
import { ApolloError } from "apollo-server";
import { UserRepository } from "../repositories/user-repository";

const signupRepository = new SignupRepository()
const userRepository = new UserRepository()

export class SignupService {
  async createUser(data: CreateUserInput, @Ctx() ctx: Context): Promise<User> {

    const userInfo = await userRepository.getUserByEmail(data.email, ctx)

    if (userInfo) {
      throw new ApolloError('This email is already registered', 'CONFLICT')
    }
    
    if (data.password == data.confirmPassword) {
      const SALT = 10

      const passwordEncrypted = bcrypt.hashSync(data.password, SALT)
      const confirmPasswordEncrypted = bcrypt.hashSync(data.confirmPassword, SALT)

      data.password = passwordEncrypted
      data.confirmPassword = confirmPasswordEncrypted
    
    } else {
      throw new ApolloError("Passwords must match", 'NOT_ALLOWED')
    }

    return signupRepository.createUser(data, ctx)
  }
}