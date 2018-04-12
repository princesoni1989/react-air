import {
  GraphQLObjectType
} from "graphql";
import {findUsersQuery, findUserQuery} from "../api/user/user.query"

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    findUsersQuery,
    findUserQuery
  }
})

export default query;
