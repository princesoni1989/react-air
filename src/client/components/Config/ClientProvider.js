import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "store/";
import App from "components/App";

const store = configureStore(window.App);

export default function Client() {
  return (
    <Provider store={store}>
      <Router >
        <App />
      </Router>
    </Provider>
  )
}

