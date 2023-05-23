import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  phone: string

  @Field()
  email: string

  @Field()
  password: string

  @Field()
  confirmPassword: string

  @Field()
  adressId: number
}