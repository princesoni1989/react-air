import fetch from 'isomorphic-fetch';
import {flatternObj} from './helper';

export default function callApi({path, method = 'get', body, query, headers}) {

  let queryString = query ? `?${flatternObj(query)}` : '';
  let url = `${path}${queryString}`;
  let data = {
    method,
    headers: {'Accept': 'application/json','Content-Type': 'application/json', ...headers},
    body: JSON.stringify(body),
  };

  return fetch(url, data)
    .then(response => response.json().then(json => ({json, response})))
    .then(({json, response}) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(
      response => (response),
      error => error
    );
}
