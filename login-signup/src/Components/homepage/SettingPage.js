import React, { useState } from 'react';
import './SettingPage.css';
import { FaSun, FaMoon } from 'react-icons/fa'; // Icons for the theme toggle
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../apiService';

const SettingPage = () => {
  const [notifications, setNotifications] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const navigate = useNavigate();

  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleLogout = async () => {
    try {
        const message = await logoutUser(); // Gọi hàm logout
        console.log(message); // Hiển thị thông báo logout thành công
        localStorage.removeItem('token');
        // Chuyển hướng về trang login
        navigate('/');
    } catch (error) {
        console.error("Logout failed:", error.error);
    }
};

  const confirmLogout = () => {
    alert('Logged out!');
    setShowLogoutPopup(false);
  };

  const handleDeleteAccount = () => {
    setShowDeletePopup(true);
  };

  const confirmDeleteAccount = () => {
    alert('Account deleted!');
    setShowDeletePopup(false);
  };

  const navigateNormalHome = () => {
    navigate('/user/home');
  };

  return (
    
    <div className={`setting-page-wrapper ${isDarkTheme ? 'dark' : ''}`}>
      
      <div className="setting-page-container">
      
        <div className="header-normal">
        <span 
            className="setting-page-title" 
            onClick={navigateNormalHome} 
            style={{ cursor: 'pointer' }}
          >
            BONDIFY
          </span>
          <span className="setting-page-version">version 1.0.0</span>
        </div>

        <div className="toggle-container">
          <label className="switch">
            <input 
              type="checkbox" 
              checked={notifications} 
              onChange={toggleNotifications} 
            />
            <span className="slider"></span>
          </label>
          <span className="toggle-label">Notifications</span>
        </div>

        <div className="toggle-container">
          <label className="switch theme-toggle">
            <input 
              type="checkbox" 
              checked={isDarkTheme} 
              onChange={toggleTheme} 
            />
            <span className="slider">
              {isDarkTheme ? <FaMoon className="theme-icon moon-icon" /> : <FaSun className="theme-icon sun-icon" color='black' />}
            </span>
          </label>
          <span className="toggle-label">{isDarkTheme ? 'Dark Theme' : 'Light Theme'}</span>
        </div>

        <div className="button-container">
          <button 
            onClick={handleLogout} 
            className="custom-button logout-button"
          >
            Log Out
          </button>
        </div>

        <div className="button-container">
          <button 
            onClick={handleDeleteAccount} 
            className="custom-button delete-button"
          >
            Delete Account
          </button>
        </div>

        {showLogoutPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <p>Are you sure you want to log out?</p>
              <button onClick={confirmLogout} className="popup-button confirm">Yes</button>
              <button onClick={() => setShowLogoutPopup(false)} className="popup-button cancel">No</button>
            </div>
          </div>
        )}

        {showDeletePopup && (
          <div className="popup-overlay">
            <div className="popup delete-warning">
              <p className="warning-text">⚠️ Warning: This action is irreversible!</p>
              <p className="explanation-text">
                Deleting your account will permanently remove all your data, including your profile, messages, and any associated content.
              </p>
              <p className="explanation-text">
                This action cannot be undone. Are you sure you want to proceed?
              </p>
              <button onClick={confirmDeleteAccount} className="popup-button confirm">Yes, Delete My Account</button>
              <button onClick={() => setShowDeletePopup(false)} className="popup-button cancel">No</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingPage;
