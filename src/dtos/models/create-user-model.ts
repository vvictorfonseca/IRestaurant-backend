import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
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
}