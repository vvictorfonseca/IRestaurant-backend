import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

import { Context } from "../context";
import { CreateSigninInput } from "../dtos/inputs/signin-user-input";
import { SiginUser } from "../dtos/models/signin-user-model";
import { SigninService } from "../services/signin-service";

const signinService = new SigninService()

@Resolver()
export class SigninResolver {

  @Mutation(() => SiginUser)
  async signIn(@Arg('data') data: CreateSigninInput, @Ctx() ctx: Context): Promise<SiginUser> {

    return signinService.findUserByEmail(data, ctx);
  }
}