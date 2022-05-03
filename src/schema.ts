import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user/user-resolver";
import { AuthResolver } from "./resolvers/auth/auth-resolver";
import {TypegooseMiddleware} from "./typegoose-middleware";
import * as path from "path";
import {ObjectId} from "mongodb";
import { ObjectIdScalar } from "./object-id.scalar";
import { BookResolver } from "./resolvers/book/book-resolver";
import { MagazineResolver } from "./resolvers/magazine/magazine-resolver";

export const getSchema = async () => {
    const schema = await buildSchema({
        resolvers: [
            UserResolver,
            AuthResolver,
            BookResolver,
            MagazineResolver,
        ],
        emitSchemaFile: path.resolve(__dirname, "schema.gql"),
        // use document converting middleware
        globalMiddlewares: [TypegooseMiddleware],
        // use ObjectId scalar mapping
        scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
      });
    return schema
}