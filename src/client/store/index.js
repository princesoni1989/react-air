import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import logger from "./logger/client";
import rootReducer from '../reducers';

const middleware = [];

if (process.env.BROWSER) {
  middleware.push(logger);
}

const configureStore = (client, initialState = {}) => {
  middleware.push(thunk.withExtraArgument({client}))
  return createStore(
	rootReducer,
	initialState,
	applyMiddleware(...middleware)
  )
}

export default configureStore;
