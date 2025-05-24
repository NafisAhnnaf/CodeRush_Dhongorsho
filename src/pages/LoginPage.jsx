import React, { useEffect } from 'react';
import './login.css';

const LoginPage = () => {

  return (
    <div className="container">
      <div className="left-panel">
        
        <h1 className="headline">Shop, Smile, <br />Repeat</h1>
        <p className="author">By Dhonghorsho</p>
      </div>
      <div className="right-panel">
        <h2 className="register-title">Register</h2>
        <form className="register-form">
          <label>First Name:</label>
          <input type="text" placeholder="John" />

          <label>Last Name:</label>
          <input type="text" placeholder="Doe" />

          <label>Institutional mail</label>
          <input type="email" placeholder="example@university.edu" />

          <label>Enter Password:</label>
          <input type="password" placeholder="********" />

          <label>Re-enter Password:</label>
          <input type="password" placeholder="********" />

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
