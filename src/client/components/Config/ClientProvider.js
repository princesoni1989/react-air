import React, {Component} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import {ApolloProvider} from 'react-apollo';
import ApolloClient from "apollo-boost";
import configureStore from "store/";
import App from "components/App";

const store = configureStore(window.App)

const client = new ApolloClient({
  uri: "/graphql"
});

export default class Client extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router >
            <App />
          </Router>
        </Provider>
      </ApolloProvider>
    )
  }
}

