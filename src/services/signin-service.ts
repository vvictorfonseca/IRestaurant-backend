import { Ctx } from "type-graphql";

import { Context } from "../context";
import { ApolloError } from "apollo-server";
import { UserRepository } from "../repositories/user-repository";
import { CreateSigninInput } from "../dtos/inputs/signin-user-input";
import { SiginUser } from "../dtos/models/signin-user-model";

import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const userRepository = new UserRepository()

export class SigninService {
    async findUserByEmail(data: CreateSigninInput, @Ctx() ctx: Context): Promise<SiginUser> {
        const userInfo = await userRepository.getUserByEmail(data.email, ctx);

        console.log(userInfo);

        if (!userInfo) {
            throw new ApolloError('E-mail not register', 'NOT_FOUND');
        }

        const isCorrectPassword = bcrypt.compareSync(
            data.password,
            userInfo.password
        );

        if (!isCorrectPassword) {
            throw new ApolloError('Wrong password', 'UNAUTHORIZED');
        }

        const key: string = (process.env.JWT_SECRET as string);
        const expiresAt = { expiresIn: 60 * 60 * 24 };
        const token = jwt.sign(
            { email: userInfo.email, name: userInfo.lastName },
            key,
            expiresAt
        );
        const res = { ...userInfo, token: token };

        return res;
    }
}