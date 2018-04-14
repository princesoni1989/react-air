import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  GET_USER,
} from '../constants';

import endpoints from '../endpoints/authentication';
import callApi from '../util/apiCaller';
import SignUpUser from 'components/Authentication/SignUp/SignUp.graphql'

function sendResult (type, response) {
  return {
    type,
    response,
  };
}


function loggedInUser (response) {
  return {
    type: GET_USER,
    response,
  };
}

export default function login (data) {
  return dispatch => {
    return callApi({
        path: endpoints.login.path,
        method: endpoints.login.method,
        body: data,
      }
    )
      .then((response) => {
          dispatch(sendResult(LOGIN_SUCCESS, response));
      }).catch(error => {
        dispatch(sendResult(LOGIN_FAILURE, error));
      });
  };
}

export function signUp (payload) {
  return (dispatch, getState, { client }) => {
    const mutationResult = client.mutate({
      mutation: SignUpUser,
      variables: payload
    })

    return mutationResult.then(response => {
      dispatch(sendResult(SIGNUP_SUCCESS, response.data.signUp));
    }).catch(error => {
      dispatch(sendResult(SIGNUP_FAILURE, error));
    });
    
    // return callApi({
    //     path: endpoints.signup.path,
    //     method: endpoints.signup.method,
    //     body: data,
    //   }
    // ).then((response) => {
    //   dispatch(sendResult(SIGNUP_SUCCESS, response));
    // }).catch(error => {
    //   dispatch(sendResult(SIGNUP_FAILURE, error));
    // });
  };
}

export function fetchLoggedInUsers (headers) {
  return dispatch => {
    return callApi({
        path: endpoints.loggedInUser.path,
        method: endpoints.loggedInUser.method,
        headers,
      }
    )
      .then((response) => {
        dispatch(loggedInUser(response));
      });
  };
}
