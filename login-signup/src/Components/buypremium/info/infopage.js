import React from 'react';
import Navbar from './Navbar';  // Import Navbar component
import PremiumPage from './info'; // Import PremiumPage component (info.js)
import './infopage.css';  // Import custom CSS for the page

const InfoPage = () => {
  return (
    <div className="info-page">
      <Navbar />
      <PremiumPage />
    </div>
  );
};

export default InfoPage;
