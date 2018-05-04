import React from "react";
import PropTypes from "prop-types"
import {StaticRouter} from "react-router-dom"
import {Provider} from "react-redux";
import App from "components/App";

export default function Server(props) {
  return (
    <Provider store={props.store}>
      <StaticRouter {...props} >
        <App />
      </StaticRouter>
    </Provider>
  )
}

Server.propTypes = {
  store: PropTypes.object
}

