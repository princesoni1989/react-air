import React, {Component} from "react";
import {StaticRouter} from 'react-router-dom'
import {Provider} from "react-redux";
import {ApolloProvider} from "react-apollo"
import ApolloClient from "apollo-client";
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from "components/App";


export const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
});


export default class Server extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={this.props.store}>
          <StaticRouter {...this.props} >
            <App />
          </StaticRouter>
        </Provider>
      </ApolloProvider>
    )
  }
}

