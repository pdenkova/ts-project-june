import { ObjectType, InputType, Field } from "type-graphql";
import { prop as Prop, getModelForClass } from "@typegoose/typegoose"
import { ObjectId } from "mongodb"

@ObjectType()
export class Magazine {

  @Field()
  readonly _id: ObjectId;

  @Prop({required: true})
  @Field()
  name: string;

  @Prop({required: true})
  @Field()
  publication: string;

  @Prop({required: true})
  @Field()
  theme: string;
}

export const MagazineModel = getModelForClass(Magazine, { schemaOptions: { timestamps: true }})