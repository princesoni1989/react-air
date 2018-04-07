import {
  GET_USERS,
} from '../constants';
import endpoints from '../endpoints/users';
import callApi from '../util/apiCaller';

function users (response) {
  return {
    type: GET_USERS,
    response,
  };
}

export default function fetchUsers (headers) {
  console.log("caleed>>>>>>>>>>>>")
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



