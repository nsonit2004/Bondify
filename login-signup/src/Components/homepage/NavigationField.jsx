import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link từ react-router-dom
import './NavigationField.css';  // Import file CSS tùy chỉnh
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const NavigationField = () => {
  return (
    <div>
      {/* Navigation bar cho màn hình lớn hơn 993px */}
      <div className={`nav-field d-none d-lg-flex flex-column align-items-center p-4`}>
        <img src="/img/logo.png" alt="Icon" className="header-icon2" />
        <button className="brand-name">BONDIFY</button>
        <div className="nav-buttons d-flex flex-column justify-content-center align-items-start w-100">
          <Link to="/" className="nav-item active"> {/* Điều hướng đến trang Home */}
            <img src="https://static-00.iconduck.com/assets.00/home-icon-2048x1951-2wkyg5fe.png" alt="home" className="icon"/>
            <span className='nav-text'>Home</span>
          </Link>
          <Link to="/messages" className="nav-item active"> {/* Điều hướng đến trang Messages */}
            <img src="https://static-00.iconduck.com/assets.00/message-icon-2043x2048-td4t8czk.png" alt="messages" className="icon"/>
            <span className='nav-text'>Messages</span>
          </Link>
          <Link to="/notifications" className="nav-item active"> {/* Điều hướng đến trang Notifications */}
            <img src="https://www.svgrepo.com/show/31480/notification-bell.svg" alt="notifications" className="icon"/>
            <span className='nav-text'>Notifications</span>
          </Link>
          <Link to="/normalprofile" className="nav-item active"> {/* Điều hướng đến trang Profile */}
            <img src="https://static-00.iconduck.com/assets.00/profile-icon-512x512-w0uaq4yr.png" alt="profile" className="icon"/>
            <span className='nav-text'>Profile</span>
          </Link>
          <Link to="/settings" className="nav-item active"> {/* Điều hướng đến trang Settings */}
            <img src="https://cdn-icons-png.flaticon.com/512/929/929872.png" alt="settings" className="icon"/>
            <span className='nav-text'>Settings</span>
          </Link>
        </div>
        <Link to="/premium" className="nav-item no-underline class-premium"> {/* Điều hướng đến trang Settings */}
          <button className="btn-premium">BUY PREMIUM</button>
        </Link>

        <Link to="/premium" className="icon-premium"> {/* Điều hướng đến trang Settings */}
          <img src="https://img.icons8.com/flat-round/50/star--v1.png" alt="premium" />
        </Link>
      </div>

      {/* Navigation bar ngang cho màn hình nhỏ hơn 993px */}
      <div className="nav-field-horizontal d-lg-none">
        <Link to="/" className="nav-item-horizontal active"> {/* Điều hướng đến trang Home */}
          <img src="https://img.icons8.com/glyph-neue/64/FFFFFF/home-page.png" alt="home"/>
          {/* <span>Home</span> */}
        </Link>
        <Link to="/messages" className="nav-item-horizontal active"> {/* Điều hướng đến trang Messages */}
          <img src="https://img.icons8.com/ios/50/FFFFFF/chat-message--v1.png" alt="messages"/>
          {/* <span>Messages</span> */}
        </Link>
        <Link to="/notifications" className="nav-item-horizontal active"> {/* Điều hướng đến trang Notifications */}
          <img src="https://img.icons8.com/ios/50/FFFFFF/appointment-reminders--v1.png" alt="notifications"/>
          {/* <span>Notifications</span> */}
        </Link>
        <Link to="/normalprofile" className="nav-item-horizontal active"> {/* Điều hướng đến trang Profile */}
          <img src="https://img.icons8.com/parakeet-line/48/FFFFFF/gender-neutral-user.png" alt="profile"/>
          {/* <span>Profile</span> */}
        </Link>
        <Link to="/settings" className="nav-item-horizontal active"> {/* Điều hướng đến trang Settings */}
          <img src="https://img.icons8.com/parakeet-line/48/FFFFFF/settings.png" alt="settings"/>
          {/* <span>Settings</span> */}
        </Link>
      </div>
    </div>
  );
};

export default NavigationField;
