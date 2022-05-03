import { Field, InputType } from "type-graphql";
import { ObjectId } from "mongodb";

@InputType()
export class BaseMagazineInput {
  @Field()
  name: string;

  @Field()
  publication: string;

  @Field()
  theme: string;
}

@InputType()
export class MagazineInput extends BaseMagazineInput {
  @Field()
  _id: ObjectId;
}