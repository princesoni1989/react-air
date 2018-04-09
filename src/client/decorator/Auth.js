import React, {Component} from "react";
import {connect} from "react-redux";

const Auth = () => (Component) => {
    class AuthWrapper extends Component {
        render() {
            return <Component {...this.props}/>
        }
    }
    const mapStateToProps = (state) => ({
        loggedInUser : state.loggedInUser.user
    })

    return connect(mapStateToProps)(AuthWrapper);
}

export default Auth;
