import { Field, InputType } from "type-graphql";

@InputType()
export class CreateAdressInput {
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