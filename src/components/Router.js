import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import routes from "./routes";

const PrivateRoute = ({component:Component, isAuthenticated, ...rest}) => (
  <Route {...rest} render={props => (
     isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
   )}/>
)

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
