// LoginPage.jsx
import React from 'react';
import './login.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-left">
        <div className="particles"></div>
        <h1 className="login-title">Welcome Back!</h1>
        <p className="login-subtitle">Let's get you signed in</p>
      </div>

      <div className="login-right">
        <form className="login-form">
          <h2 className="form-title">Login</h2>
          <label>Email</label>
          <input type="email" placeholder="you@example.com" />

          <label>Password</label>
          <input type="password" placeholder="••••••••" />

          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>

          <button type="submit" className="login-button">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
