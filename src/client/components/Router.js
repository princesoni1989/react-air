import React, {Component} from "react";
import PropTypes from "prop-types"
import {Route, Switch, Redirect} from "react-router-dom";
import routes from "./routes";

const PrivateRoute = ({component:WrappedComponent, isAuthenticated, ...rest}) => (
  <Route {...rest} render={props => (
     isAuthenticated ? <WrappedComponent {...props} /> : <Redirect to="/login" />
   )}/>
)

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  component: PropTypes.any
}

export default class Router extends Component {
  render() {
    const renderRoutes = routes.map(route => route.authenticate ?
      <PrivateRoute key={route.path} isAuthenticated={this.props.isAuthenticated} {...route} /> :
      <Route key={route.path} {...route} />
    );

    return (
      <div>
        <Switch>
          {renderRoutes}
        </Switch>
      </div>
    )
  }
}
