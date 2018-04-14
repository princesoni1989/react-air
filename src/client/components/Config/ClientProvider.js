import React, {Component} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import ApolloClient from "apollo-client";
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';

import configureStore from "store/";
import App from "components/App";

export const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
});

const store = configureStore(client, window.App)

export default class Client extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </ApolloProvider>
    )
  }
}

