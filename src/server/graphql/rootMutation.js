import {GraphQLObjectType} from "graphql";
import {signUp} from "api/user/user.mutation"

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signUp
  }
})

export default mutation
