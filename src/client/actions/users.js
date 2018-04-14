import {
  GET_USERS,
} from '../constants';
import endpoints from '../endpoints/users';
import callApi from '../util/apiCaller';
import AuthService from 'client/services/authService'

import fetchUsersQuery from 'components/Users/fetchUsers.graphql'

function users (response) {
  return {
    type: GET_USERS,
    response,
  };
}

export default function fetchUsers (headers = {'authorization': `Bearer ${AuthService.getToken()}`}) {
  return (dispatch, getState, { client }) => {
    const fetchUsersResult = client.query({
      query: fetchUsersQuery
    })

    return fetchUsersResult.then(response => {
      console.log('response',response)
      dispatch(users(response.data.findUsersQuery));
    }).catch(error => {
     
    });
    
    // return callApi({
    //     path: endpoints.users.path,
    //     method: endpoints.users.method,
    //     headers,
    //   }
    // )
    // .then((response) => {
    //   dispatch(users(response));
    // });
  };
}



