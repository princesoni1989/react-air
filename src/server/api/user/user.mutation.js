import {GraphQLID, GraphQLString, GraphQLNonNull} from "graphql"
import user from "./user.type";
import {signUpUser} from "./user.service"

export const signUp = {
  type: user,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve (parent, args) {
    return signUpUser(args);
  }
}
