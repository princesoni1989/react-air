import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import style from "./style.scss";

class Landing extends Component {
  render () {
    return (
      <div className='container'>
        <div className='welcome'>
          <div className='seperator-line'>
            <h1 className='heading'>
              Welcome To React Boiler Plate
            </h1>
            <NavLink to='/login' className='form-link'>Login</NavLink>
            <NavLink to='/signup' className='form-link'>Sign Up</NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
