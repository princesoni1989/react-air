import React, {Component} from "react";
import {StaticRouter} from 'react-router-dom'
import {Provider} from "react-redux";
import {ApolloProvider} from "react-apollo"
import ApolloClient from "apollo-boost";
import App from "components/App";

const client = new ApolloClient();
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

