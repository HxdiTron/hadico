import React from "react";
import "./Login.css";

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-image">
        {/* Background Image is set in CSS */}
      </div>
      <div className="login-form">
        <div className="login-header">
          <h1>Welcome Back Resident!</h1>
          <p>Please enter your login details</p>
        </div>
        <form>
          <label>Email ID</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <div className="login-options">
            <div>
              <input type="checkbox" id="stay-signed-in" />
              <label htmlFor="stay-signed-in">Stay signed in</label>
            </div>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="login-button">Log In</button>
        </form>
        <p className="register-link">Do not have your login details?</p>
      </div>
    </div>
  );
};

export default Login;
