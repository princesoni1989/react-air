import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {signUp} from '../../../actions/authentication';
import {bindActionCreators} from 'redux';
import {NavLink} from 'react-router-dom';
import {signUpNewUser} from '../../../actions/authentication';
import "./style.scss";

class SignUp extends Component {
  static propTypes = {
    signup: PropTypes.bool,
    userSignUp: PropTypes.func,
  }

  state = {
    inputs: {
      name: '',
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

  showHandler = () => {
    this.setState({
      type: this.state.type === 'password' ? 'text' : 'password',
    });
  }

  handleSignUp = () => {
    let {inputs: {name, email, password}} =  this.state;
    this.props.userSignUp({name, email, password});
  }

  render() {
    const {email, password, type} = this.state;
    return (
      <div className='signup-form'>
        <div className='seperator-line'>
          <h1 className='heading'>Sign Up For Free</h1>
        </div>
        <ul>
          <li className='form-group'>
            <input className='form-control' type='text' placeholder='Full Name' name="name"
                   onChange={this.changeHandler} value={this.state.inputs.name} required/>
            <p className='form-group text-danger'>
            </p>
          </li>

          <li className='form-group'>
            <input className='form-control' type='text' placeholder='Email Address' name="email"
                   onChange={this.changeHandler} required value={this.state.inputs.email}/>
            <p className='form-group text-danger'>
            </p>
          </li>

          <li className='form-group'>
            <input className='form-control' type={type} placeholder='Password' name="password"
                   onChange={this.changeHandler} value={this.state.inputs.password} required/>
            <span className='show-password' onClick={this.showHandler}>SHOW</span>
            <p className='form-group text-danger'>
            </p>
          </li>
          <li className='form-group txt-center'>
            <button className='btn-default' onClick={this.handleSignUp}>Sign Up</button>
          </li>

          <li className='form-group txt-center'>
            <NavLink to='/login' className='form-link'>Already a member? <span>Login</span></NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  signup: state.authentication.status,
});

const mapDispatchToProps = (dispatch) => ({
  userSignUp: bindActionCreators(signUp, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);

