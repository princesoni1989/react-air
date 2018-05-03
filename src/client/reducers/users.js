import {
  GET_USERS,
} from "../constants";

const initialState = {
  userList: [],
};

const users = function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
    {
      let userList = []
      if (action.response) {
        userList = action.response
      }
      return {userList};
    }
    default:
      return state;
  }
};
export default users;
