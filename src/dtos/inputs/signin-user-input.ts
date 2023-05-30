import { Field, InputType } from "type-graphql";

@InputType()
export class CreateSigninInput {
  @Field()
  email: string

  @Field()
  password: string
}