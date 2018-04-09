import { combineReducers } from 'redux';
import authentication from './authentication';
import loggedInUser from './loggedInUser';
import users from './users';

const rootReducer = combineReducers({
  authentication,
  loggedInUser,
  users,
});

export default rootReducer;
