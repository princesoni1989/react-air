import {
  GET_USERS,
} from "../constants";

const initialState = {
  userList: [],
};

const users = function (state = initialState, action) {
  switch (action.type) {
    case GET_USERS: {
      let list = action.response && action.response.success && action.response.success.data
      return {
          userList: list
      };
    }
    default:
      return state;
  }
};
export default users;
