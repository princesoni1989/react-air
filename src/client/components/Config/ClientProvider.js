import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import ClientErrorPage from "../Error/ClientErrorPage";
import configureStore from "store/";
import App from "components/App";


const store = configureStore(window.App);

export default function Client() {
  return (
    <Provider store={store}>
      <ClientErrorPage >
        <Router >
          <App />
        </Router>
      </ClientErrorPage>
    </Provider>
  )
}

