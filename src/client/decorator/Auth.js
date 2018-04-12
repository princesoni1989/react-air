import React, {Component} from "react";
import {connect} from "react-redux";

const Auth = () => (WrapperComponent) => {
    class AuthWrapper extends Component {
        render() {
            return <WrapperComponent {...this.props}/>
        }
    }
    const mapStateToProps = (state) => ({
        loggedInUser : state.loggedInUser.user
    })

    return connect(mapStateToProps)(AuthWrapper);
}

export default Auth;
