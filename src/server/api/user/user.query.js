import {GraphQLList, GraphQLID} from "graphql"
import user from "./user.type";
import {findUsers, findUser} from './user.service'

export const findUsersQuery = {
  type: new GraphQLList(user),
  resolve () {
    return findUsers();
  }
}


export const findUserQuery = {
  type: user,
  args: {
    id: {
      type: GraphQLID
    }
  },
  resolve (parent, {id}) {
    return findUser(id);
  }
}

