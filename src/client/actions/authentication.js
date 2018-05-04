import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  GET_USER,
  RESET
} from "../constants";

import endpoints from "../endpoints/authentication";
import callApi from "../util/apiCaller";

function sendResult(type, response) {
  return {
    type,
    response,
  };
}

function loggedInUser(response) {
  return {
    type: GET_USER,
    response,
  };
}
export function reset() {
  console.log("dsdsdsdds>>>>>>> called")
  return {
    type: RESET
  };
}

export default function login(data) {
  return dispatch => callApi({
    path: endpoints.login.path,
    method: endpoints.login.method,
    body: data,
  })
    .then((response) => dispatch(sendResult(LOGIN_SUCCESS, response)))
    .catch(error => dispatch(sendResult(LOGIN_FAILURE, error)));
}

export function signUp(data) {
  return dispatch => callApi({
    path: endpoints.signup.path,
    method: endpoints.signup.method,
    body: data,
  })
    .then((response) => dispatch(sendResult(SIGNUP_SUCCESS, response)))
    .catch(error => dispatch(sendResult(SIGNUP_FAILURE, error)));
}

export function fetchLoggedInUsers(headers) {
  return dispatch => callApi({
    path: endpoints.loggedInUser.path,
    method: endpoints.loggedInUser.method,
    headers,
  })
    .then((response) => dispatch(loggedInUser(response)));
}
