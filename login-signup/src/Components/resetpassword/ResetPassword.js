// src/components/resetPassword/ResetPassword.js
import React, { useState } from 'react';
import { resetPassword } from '../../apiService';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!email || !code || !newPassword || !confirmPassword) {
      setMessage('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    // Kiểm tra định dạng mật khẩu
    const passwordRegex = /^(?=.*[A-Z])[A-Za-z0-9]{6,18}$/;
    if (!passwordRegex.test(newPassword)) {
      setMessage('Password must be 6-18 characters long, include an uppercase letter, and contain no special characters.');
      return;
    }

    setLoading(true);

    try {
      const response = await resetPassword({ email, code, newPassword });
      setMessage(response.message || 'Password has been reset successfully.');
      // Redirect hoặc thực hiện hành động khác sau khi reset thành công
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setMessage(error.error || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div className="reset-password-box">
        <h2>Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="code">Verification Code:</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm New Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {message && <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</div>}

          <button type="submit" className="reset-button">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
