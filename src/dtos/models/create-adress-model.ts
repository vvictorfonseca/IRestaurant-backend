import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Adress {
  @Field()
  userId: number
  
  @Field()
  city: string

  @Field()
  state: string

  @Field()
  street: string

  @Field()
  cep: string

  @Field()
  number: string

  @Field()
  district: string

  @Field()
  complement: string
}