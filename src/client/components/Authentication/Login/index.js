import React, {Component} from "react";
import PropTypes from "prop-types"
import {bindActionCreators} from "redux";
import login, {reset} from "actions/authentication";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import AuthService from "client/services/authService"
import "./style.scss";

class Login extends Component {
  static propTypes = {
    userLogin: PropTypes.func.isRequired,
    login: PropTypes.bool,
    response: PropTypes.any,
    history: PropTypes.any
  };

  state = {
    inputs: {
      email: "",
      password: ""
    },
    type: "password",
    error: false
  }

  componentDidMount() {
    this.props.reset();
  }

  changeHandler = (event, property) => {
    const {inputs} = this.state;
    inputs[event.target.name] = event.target.value;
    this.setState({inputs});
  };

  showPassword = () => {
    const {type} = this.state;
    this.setState({
      type: type === "password" ? "text" : "password",
    });
  };
  handleLogin = async() => {
    const {inputs: {email, password}} = this.state;
    await this.props.userLogin({email, password});
    AuthService.setToken(this.props.response.token)
  };

  checkRedirection = () => {
    const {login} = this.props;
    if (login) {
      this.props.history.push("/users")
    }
  }

  render() {
    const {error} = this.state;
    const renderError = error ? <div className="danger">Bad credentials</div> : null;
    this.checkRedirection();
    return (
      <div className="login-form-container">
        <div className="seperator-line">
          {renderError}
          <h1 className="heading">Login Form</h1>
        </div>
        <p className="form-group text-danger"/>
        <ul className="login-form">
          <li className="form-group">
            <input className="form-control" id="email" type="email" name="email" placeholder="Email"
                   onChange={this.changeHandler} value={this.state.inputs.email} required/>
          </li>
          <li className="form-group">
            <input className="form-control" id="password" type={this.state.type} name="password"
                   placeholder="Password"
                   onChange={this.changeHandler} value={this.state.inputs.password} required/>
            <span className="show-password" onClick={this.showPassword}>SHOW</span>
          </li>
          <li className="form-group txt-center">
            <button className="btn-default" onClick={this.handleLogin}>Login</button>
          </li>
          <li className="form-group txt-center">
            <NavLink to="/signup" className="form-link">Not a member yet? <span>Register</span></NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.authentication.status,
  response: state.authentication.data,
});

const mapDispatchToProps = (dispatch) => ({
  userLogin: bindActionCreators(login, dispatch),
  reset: bindActionCreators(reset, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
