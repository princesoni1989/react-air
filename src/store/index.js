import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import logger from "./logger/client";
import rootReducer from '../reducers';

const middleware = [thunk];
if (process.env.BROWSER) {
  middleware.push(logger);
}

const configureStore = (initialState = {}) => createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
)

export default configureStore;
