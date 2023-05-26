import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class SiginUser {
  @Field()
  email: string
  
  @Field()
  token: string
}