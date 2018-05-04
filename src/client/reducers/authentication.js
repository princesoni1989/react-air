import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  RESET
} from "../constants";

const initialState = {
  loginStatus: false,
  signupStatus: false,
  data: {},
};

const authentication = function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {loginStatus: true, data: action.response}
    case SIGNUP_SUCCESS:
      return {signupStatus: true, data: action.response};
    case LOGIN_FAILURE:
      return {loginStatus: false, data: action.response}
    case SIGNUP_FAILURE:
      return {signupStatus: false, data: action.response};
    case RESET:
      return initialState;
    default:
      return state;
  }
};
export default authentication;
