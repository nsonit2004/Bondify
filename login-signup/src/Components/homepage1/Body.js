// Body.js
import React, { useContext } from 'react';
import './Body.css'; 
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../LanguageContext';

const Body = () => {
  const { language, fontFamily } = useContext(LanguageContext); 
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register'); // Chuyển hướng đến trang đăng ký
  };

  return (
    <div className="homepage-body" style={{ fontFamily }}> 
      <h1 className="slogan">
        {language === 'en' ? 'Find your bond today' : 'Tìm kiếm mối quan hệ của bạn hôm nay'}
        <img src="/img/heart-logo.png" alt="Heart Logo" className="heart-logo" /> {/* Thêm logo trái tim */}
      </h1>
      <button className="register-button" onClick={handleRegister}>
        {language === 'en' ? 'Register' : 'Đăng Ký'}
      </button>
      
    </div>
  );
};

export default Body;
