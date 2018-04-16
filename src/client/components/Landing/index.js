import React from 'react';
import {NavLink} from "react-router-dom";

export default function Landing() {
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
