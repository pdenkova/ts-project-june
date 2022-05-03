import { Resolver, Query, Mutation, Args, Ctx } from "type-graphql";
import { User, UserModel } from "../../entities/user-entity";
import bcryptjs from "bcryptjs"
import { LoginArguments } from "./login-arguments";
import { UserInputError, AuthenticationError } from "apollo-server-core";
import { getToken } from "./token";
import { Context } from "./context";


@Resolver()
export class AuthResolver {

  @Query(returns => User)
  async currentUser(@Ctx() ctx: Context):Promise<User> {
    if(!ctx.user) {
        throw new AuthenticationError('user_not_authenticated');
    }
    return await UserModel.findById(ctx.user._id)
  }


  @Mutation(returns => String)
  async login(@Args(){email, password}: LoginArguments) {
    
    const user = await UserModel.findOne({email})
    if(!user) {
        throw new UserInputError('Incorrect input');
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password)

    if(!isPasswordValid) {
        throw new UserInputError('Incorrect input');
    }

    user.lastLogin = Date.now()
    await user.save();
    return getToken(user._id)

    }
}