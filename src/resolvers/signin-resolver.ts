import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { context } from "../context";
import { CreateUserInput } from "../dtos/inputs/create-user-input";
import { User } from "../dtos/models/create-user-model";

import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

@Resolver()
export class SigninResolver {

  // @Query(() => String)
  // async helloWorld() {
  //   return 'Deu bom!'
  // }

  @Mutation(() => User)
  async signIn(@Arg('data') data: CreateUserInput) {
    const userInfo = await context.prisma.users.findFirst({
      select: {
        email: true,
        password: true,
        id: true,
        lastName: true
      },
      take: 1
    });

    if (!userInfo) {
      throw {
        type: "Not_Found",
        message: "E-mail not register",
      };
    }

    const isCorrectPassword = bcrypt.compareSync(
      data.password,
      userInfo.password
    );

    if (!isCorrectPassword) {
      throw {
        type: "Unauthorized",
        message: "Wrong password",
      };
    }

    const key: string = (process.env.JWT_SECRET as string);
    const expiresAt = { expiresIn: 60 * 60 * 24 };
    const token = jwt.sign(
      { id: userInfo.id, email: userInfo.email, name: userInfo.lastName },
      key,
      expiresAt
    );

    return token;
  }
}