import { GraphQLScalarType, Kind } from "graphql";
import { ObjectId } from "mongodb";

export const ObjectIdScalar = new GraphQLScalarType({
  name: "ObjectId",
  description: "Mongo object id scalar type",
  parseValue(value: unknown): ObjectId | null {
    if (typeof value === 'string') {
      return new ObjectId(value);
    }
    return null; // Return null or throw an error if value is not a string
  },
  serialize(value: any): unknown {
    if (value instanceof ObjectId) {
      return value.toHexString();
    }
    throw new Error('Serialize error: ObjectId expected');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value); // value from the client query
    }
    return null;
  },
});
