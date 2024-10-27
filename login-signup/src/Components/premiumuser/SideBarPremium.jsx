import React from 'react';
import './SideBarPremium.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function SideBar() {
  return (
    <div className="sidebar-container-premium">
      {/* Top Banner */}
      <div className="banner-premium">
        15 people have liked your profile
      </div>

      {/* Notifications Section */}
      <div className="section-premium">
        <div className="section-title-premium">People Who Liked You</div>
        <div className="list-group-premium">
          {Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="list-group-item-premium">
              <img
                src="https://detuoivinhloc.net/wp-content/uploads/2024/05/anh-doremon.jpg"
                alt="Profile liked"
                className="avatar-premium"
              />
              <div className="notification-text-premium">
                User {index + 1} liked your profile
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
