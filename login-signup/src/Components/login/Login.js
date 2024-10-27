

// src/components/login/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, forgotPassword } from '../../apiService';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!email || !password) {
      setMessage('Email and password are required.');
      setLoading(false);
      return;
    }

    

    try {
      const response = await loginUser({ email, password });
      localStorage.setItem('token', response.token);
      const token = localStorage.getItem('token');
      console.log("Token stored:", token);
      const userData = jwtDecode(token);
      console.log(userData);
  
      // Kiểm tra vai trò và trạng thái của người dùng
      if (userData.role === 'admin' && userData.user_status === 'active') {
          navigate("/adminhome");
      } else if (userData.role === 'user' && userData.user_status === 'active') {
          if (userData.is_premium === '1') {
              navigate("/user/premiumhome");
          } else {
              navigate("/user/home");
          }
      } else {
          setMessage("Your account is not active or you don't have the right permissions.");
      }
  } catch (error) {
      setMessage(error.message || 'Login failed!');
  } finally {
      setLoading(false);
  }
  };

  //xử lý Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotMessage('');

    if (!forgotEmail) {
      setForgotMessage('Please enter your email.');
      return;
    }

    try {
      const response = await forgotPassword(forgotEmail);
      setForgotMessage(response.message || 'Password reset link has been sent to your email.');
      navigate('resetpassword');
    } catch (error) {
      setForgotMessage(error.error || 'Failed to send reset link!');
    }
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:8080/oauth2/authorization/google", "_self");
  };

  return (
    <div className="login-container">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div className="login-box">
        <div className="login-title">LOG IN</div>

        <div className="login-content">
          <form onSubmit={handleLogin}>
            <div className="login-input-section">
              <div className="login-label">Email:</div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                required
              />
            </div>

            <div className="login-input-section">
              <div className="login-label">Password:</div>
              <div className="login-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="login-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="password-toggle"
                  onMouseDown={() => setShowPassword(true)}
                  onMouseUp={() => setShowPassword(false)}
                  onMouseLeave={() => setShowPassword(false)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={24} />
                  ) : (
                    <AiOutlineEye size={24} />
                  )}
                </span>
              </div>
            </div>

            {message && <div className="login-message">{message}</div>}

            <button
              type="submit"
              className="login-button"
            >
              Log In
            </button>
          </form>

          <div className="login-or">or</div>

          <button className="google-login-button" onClick={handleGoogleLogin}>
            Log in with Google
          </button>
        </div>

        <div className="login-footer">
          <p>Don't have an account? <Link className="register-link" to="/register">Sign up</Link></p>
          <p>
            <a
              className="forgot-password-link"
              onClick={() => setShowForgotPasswordModal(true)}
            >
              Forgot your password?
            </a>
          </p>
        </div>
      </div>

      {showForgotPasswordModal && (
  <div className="modal-overlay" onClick={() => setShowForgotPasswordModal(false)}>
    <div className="forgot-password-modal" onClick={(e) => e.stopPropagation()}>
      <span className="close-modal" onClick={() => setShowForgotPasswordModal(false)}>&times;</span>
      <h2>Reset Your Password</h2>
      <form onSubmit={handleForgotPassword}>
        <label htmlFor="forgotEmail">Enter your email:</label>
        <input
          type="email"
          id="forgotEmail"
          value={forgotEmail}
          onChange={(e) => setForgotEmail(e.target.value)}
          placeholder="Email Address"
          required
        />
        <button type="submit">Submit</button>
        {forgotMessage && <div className={forgotMessage.includes('sent') ? 'success-message' : 'error-message'}>{forgotMessage}</div>}
      </form>
    </div>
  </div>
)}
  </div>
);
}
export default Login;

