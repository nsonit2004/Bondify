import React, { useState } from 'react';
import './HobbiesPopup.css'; // Ensure you've created this CSS file

const hobbiesList = [
  "90s Kid", "Harry Potter", "SoundCloud", "Spa", "Self Care",
  "Heavy Metal", "House Parties", "Gin tonic", "Gymnastics", "Hot Yoga",
  "Meditation", "Sushi", "Spotify", "Hockey", "Basketball",
  "Slam Poetry", "Home Workout", "Theater", "Cafe hopping", "Aquarium",
  "Sneakers", "Instagram", "Hot Springs", "Walking", "Running",
  "Travel", "Language Exchange", "Movies", "Guitarists", "Social Development",
  "Gym", "Social Media", "Hip Hop", "Skincare", "J-Pop",
  "Shisha", "Cricket", "Korean Dramas", "Freelance", "K-Pop",
  "Skateboarding", "Gospel", "Group X", "Potterhead", "Trying New Things",
  "Photography", "Bollywood", "Reading", "Singing", "Sports", "Poetry","Cars", "Start ups", 
  "Boba tea", "High School Sports", "Badminton", "Active Lifestyle", "Fashion", "Anime", "NBA", 
  "MLB", "Funk music", "Diving", "Caipirinha", "Flag Football", "Handball", "Artistic Swimming", 
  "Athletics", "Indoor Activities", "Softball", "Beach Volleyball", "Tempeh", "DIY", "Town Festivities", 
  "Cycling", "Outdoors", "TikTok", "Picnicking", "Twitch", "Judo", "Comedy", "Trap Music", "Music", 
  "Triathlon", "Netflix", "Disney", "Rugby", "Açaí", "Samba", "Tarot", "Stock Exchange", "Stocks", 
  "Swimming", "Self Love", "Table Tennis", "Killing time", "Working out", "Yoga", "Horror Movies", "Boxing", "Bar Chilling",
  "Escape Cafe", "Shopping", "Brunch", "Investment", "Jetski", "Reggaeton", "Second-hand apparel", "Black Lives Matter",
   "Jogging", "Road Trips", "Vintage fashion", "Voguing", "Couchsurfing", "Happy hour", "Inclusivity", "Country Music", 
   "Football", "Inline Skate", "Investing", "Tennis", "Ice Cream", "Ice Skating", "Human Rights", "Expositions", "Pig Roast",
    "Skiing", "Canoeing", "West End Musicals", "Snowboarding", "Pilates", "Pentathlon", "Broadway", "PlayStation", "Cheerleading",
     "Choir", "Pole Dancing", "Five-a-side Football", "Car Racing", "Pinterest", "Festivals", "Pub Quiz", "Catan", "Cosplay",
      "Motor Sports", "Coffee Stall", "E-Sports", "Content Creation", "Bicycle Racing"
];

const HobbiesPopup = ({ isOpen, onClose, selectedHobbies, setSelectedHobbies }) => {
  const [limitReached, setLimitReached] = useState(false);

  const toggleHobby = (hobby) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter(h => h !== hobby));
      setLimitReached(false);
    } else {
      if (selectedHobbies.length < 5) {
        setSelectedHobbies([...selectedHobbies, hobby]);
      } else {
        setLimitReached(true);
      }
    }
  };

  // Close the popup when clicking outside the popup box
  const handleClickOutside = (e) => {
    if (e.target.className === 'popup-overlay') {
      onClose();
    }
  };

  return (
    isOpen && (
      <div className="popup-overlay" onClick={handleClickOutside}>
        <div className="popup">
          <span className="popup-close" onClick={onClose}>&times;</span>
          <h2>What are you into?</h2>
          <div className="hobby-grid">
            {hobbiesList.map(hobby => (
              <button
                key={hobby}
                className={`hobby-button ${selectedHobbies.includes(hobby) ? 'selected' : ''}`}
                onClick={() => toggleHobby(hobby)}
              >
                {hobby}
              </button>
            ))}
          </div>
          {limitReached && <p className="error-message">You can only select up to 5 hobbies!</p>}
          <button className="save-button" onClick={onClose}>
            Save ({selectedHobbies.length}/5)
          </button>
        </div>
      </div>
    )
  );
};

export default HobbiesPopup;
