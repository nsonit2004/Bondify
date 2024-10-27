import React from 'react';
import './SideBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function SideBar() {
  return (
    <div className="sidebar-container-normal">
      {/* Top Banner */}
      <div className="banner">
        15 people have liked your profile
      </div>

      <div className="section">
        <a href="https://www.nike.com/vn/u/custom-pegasus-trail-gtx-by-you-10001703/7606223122">
        <img src="https://image.adsoftheworld.com/h9jamkn2d6d8c3kgb2vb8ierfne3" alt="ads" />
        </a>
      </div>

      <div className="section">
        <a href="https://www.coca-cola.com/vn/vi/brands/coca-cola">
        <img src="https://i.pinimg.com/736x/a1/63/36/a16336cc9b54714c494d6191fb338931.jpg" alt="ads" />
        </a>
      </div>
    </div>
  );
}

export default SideBar;
