import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux';
import login from 'actions/authentication';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import AuthService from "client/services/authService"
import './style.scss';

class Login extends Component {
  static propTypes = {
    login: PropTypes.bool,
    userLogin: PropTypes.func
  };

  state = {
    inputs: {
      email: '',
      password: ''
    },
    type: "password",
  }

  changeHandler = (event, property) => {
    const inputs = this.state.inputs;
    inputs[event.target.name] = event.target.value;
    this.setState({
      inputs: inputs,
    });
  };

  showPassword = () => {
    const {type} = this.state;
    this.setState({
      type: type === 'password' ? 'text' : 'password',
    });
  };
  handleLogin = async() => {
    const {inputs: {email, password}} = this.state;
    await  this.props.userLogin({
      email,
      password,
    });
    AuthService.setToken(this.props.response.token)
    this.props.history.push('/users')
  };

  render() {
    return (
      <div className='login-form-container'>
        <div className='seperator-line'>
          <h1 className='heading'>Login Form</h1>
        </div>
        <p className='form-group text-danger'>
        </p>
        <ul className='login-form'>
          <li className='form-group'>
            <input className='form-control' id='email' type='email' name='email' placeholder='Email'
                   onChange={this.changeHandler} value={this.state.inputs.email} required/>
          </li>
          <li className='form-group'>
            <input className='form-control' id='password' type={this.state.type} name='password'
                   placeholder='Password'
                   onChange={this.changeHandler} value={this.state.inputs.password} required/>
            <span className='show-password' onClick={this.showPassword}>SHOW</span>
          </li>
          <li className='form-group txt-center'>
            <button className='btn-default' onClick={this.handleLogin}>Login</button>
          </li>
          <li className='form-group txt-center'>
            <NavLink to='/signup' className='form-link'>Not a member yet? <span>Register</span></NavLink>
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
  userLogin: bindActionCreators(login, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
