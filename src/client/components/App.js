import React, {Component} from "react";
import PropTypes from "prop-types"
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom"
import * as AuthAction from "../actions/authentication"
import AuthService from "../services/authService"
import Router from "./Router";
import "../styles/core.scss";

class App extends Component {
  static propTypes = {
    loggedInUser : PropTypes.object.isRequired,
    fetchLoggedInUsers: PropTypes.func.isRequired
  }

  componentDidMount() {
   this.props.fetchLoggedInUsers({'authorization': `Bearer ${AuthService.getToken()}`});
  }

  render() {
    const {loggedInUser} = this.props;
    const loggedInUserStatus = (loggedInUser && loggedInUser.email !== null);
    return (
      <div className="app-container">
        <Router isAuthenticated={loggedInUserStatus}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedInUser: state.loggedInUser.user
});

const mapDispatchToProps = (dispatch) => bindActionCreators(AuthAction, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
