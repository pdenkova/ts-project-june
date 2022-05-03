import { ObjectType, InputType, Field } from "type-graphql";
import { prop as Prop, getModelForClass } from "@typegoose/typegoose"
import { ObjectId } from "mongodb"

@ObjectType()
export class Book {

  @Field()
  readonly _id: ObjectId;

  @Prop({required: true})
  @Field()
  name: string;

  @Prop({required: true})
  @Field()
  author: string;

  @Prop({required: true})
  @Field()
  description: string;
}

export const BookModel = getModelForClass(Book, { schemaOptions: { timestamps: true }})