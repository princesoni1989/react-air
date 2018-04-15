import {
  GET_USERS,
} from '../constants';
import endpoints from '../endpoints/users';
import callApi from '../util/apiCaller';
import AuthService from 'client/services/authService'

function users (response) {
  return {
    type: GET_USERS,
    response,
  };
}

export default function fetchUsers (headers = {'x-access-token': AuthService.getToken()}) {
  return dispatch => {
    return callApi({
        path: endpoints.users.path,
        method: endpoints.users.method,
        headers,
      }
    )
      .then((response) => {
        dispatch(users(response));
      });
  };
}



