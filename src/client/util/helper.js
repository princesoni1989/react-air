import  querystring from "querystring";
import  _merge from "lodash/merge";
import {ENV}from "../constants";

export function getApiUrl(env) {
  switch (env) {
    case ENV.DEVELOPMENT:
      return 'http://localhost:3000';
    case ENV.PRODUCTION:
      return 'http://localhost:3000';
    default:
      return 'http://localhost:3000'
  }
}

export function flatternObj(obj) {
  return querystring.stringify(obj);
}

export function mergeDefault(parent, child) {
  return _merge({}, parent, child);
}


