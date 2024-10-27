import React from 'react';
import ProfileCreate from './ProfileCreate';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';

function Profile() {
  return (
    <div>
    <Navbar/>
      <ProfileCreate />
    </div>
  );
}

export default Profile;