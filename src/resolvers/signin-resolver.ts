import { Arg, Mutation, Resolver } from "type-graphql";

import { context } from "../context";
import { CreateSigninInput } from "../dtos/inputs/signin-user-input";
import { SiginUser } from "../dtos/models/sigin-user-model";

import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

@Resolver()
export class SigninResolver {

  @Mutation(() => SiginUser)
  async signIn(@Arg('data') data: CreateSigninInput) {

    const userInfo = await context.prisma.users.findFirst({
      where: {
        email: data.email
      },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true
      }
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

    const res = {...userInfo, token: token};
    return res;
  }
}