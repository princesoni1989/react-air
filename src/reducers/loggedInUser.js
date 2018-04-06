import {
  GET_USER,
} from '../constants';

const initialState = {
  loading: true,
  user: {},
};

const loggedInUser = function (state = initialState, action) {
  switch (action.type) {
    case GET_USER: {
      return {
        status: action.response.success, user: action.response,
      };

    }
    default:
      return state;
  }
};
export default loggedInUser;
