import React from "react";
import "./sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBan,
  faSignOutAlt,
  faGift,
  faWarning,
  faStar, // Add star icon for premium users
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom"; // Use NavLink
import { logoutUser } from '../../apiService';
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
  const navigate = useNavigate();
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
  return (
      <div className="sidebar-container">
        <nav className="sidebar">
          <div className="sidebar-header">
            <img src="/img/logo.png" alt="Admin Tools Icon" className="header-icon" />
            <span className="admin-text">Admin Tools</span>
          </div>

          <ul>
            <li className="sidebar-item">
              <NavLink
                  to="/manage-gift"
                  className={({isActive}) => (isActive ? "active-link" : "")}
              >
                <FontAwesomeIcon icon={faGift}/>
                <span className="sidebar-text">Manage Virtual Gift</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                  to="/verify-profile"
                  className={({isActive}) => (isActive ? "active-link" : "")}
              >
                <FontAwesomeIcon icon={faUser}/>
                <span className="sidebar-text">Verify Profile</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                  to="/view-report"
                  className={({isActive}) => (isActive ? "active-link" : "")}
              >
                <FontAwesomeIcon icon={faWarning}/>
                <span className="sidebar-text">View Report</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                  to="/banned-users"
                  className={({isActive}) => (isActive ? "active-link" : "")}
              >
                <FontAwesomeIcon icon={faBan}/>
                <span className="sidebar-text">Banned Users List</span>
              </NavLink>
            </li>
            {/* New item for managing premium users */}
            <li className="sidebar-item">
              <NavLink
                  to="/premium-users"
                  className={({isActive}) => (isActive ? "active-link" : "")}
              >
                <FontAwesomeIcon icon={faStar}/>
                <span className="sidebar-text">Manage Premium Users</span>
              </NavLink>
            </li>
          </ul>
          <div className="logout-box">
            <button onClick={handleLogout} className="logout-button">
              <FontAwesomeIcon icon={faSignOutAlt}/>
              <span className="logout-text">Log Out</span>
            </button>
          </div>
        </nav>
      </div>
  );
};

export default Sidebar;
