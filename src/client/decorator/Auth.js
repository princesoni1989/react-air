import React, {Component} from "react";
import {connect} from "react-redux";

const Auth = () => (WrappedComponent) => {
    class AuthWrapper extends Component {
        render() {
            return <WrappedComponent {...this.props}/>
        }
    }
    const mapStateToProps = (state) => ({
        loggedInUser : state.loggedInUser.user
    })

    return connect(mapStateToProps)(AuthWrapper);
}

export default Auth;
