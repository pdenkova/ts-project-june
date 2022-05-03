import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Magazine, MagazineModel } from "../../entities/magazine-entity";
import { BaseMagazineInput, MagazineInput } from "./magazine-arguments";

@Resolver()
export class MagazineResolver {

  @Query(returns => [Magazine])
  async magazines():Promise<Magazine[]> {
    return await MagazineModel.find({})
  }

  @Query(returns => Magazine)
  async magazine(@Arg("_id") _id: string):Promise<Magazine> {
    return await MagazineModel.findById(_id);
  }

  @Mutation(returns => Magazine)
  async createMagazine(@Arg("data") data: BaseMagazineInput):Promise<Magazine> {
    const newMagazine = new MagazineModel(data);
    await newMagazine.save();
    return newMagazine
  }

  @Mutation(returns => Magazine)
  async deleteMagazine(@Arg("_id") _id: string):Promise<Magazine> {
    return await MagazineModel.findByIdAndRemove(_id);
  }

  @Mutation(returns => Magazine)
  async editMagazine(@Arg("_id") _id: string, @Arg("data") data: MagazineInput):Promise<Magazine> {
    return await MagazineModel.findByIdAndUpdate(_id, data, {new: true});
  }

}