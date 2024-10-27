import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getUserId, saveHobbies, saveUserProfile } from '../../apiService';
import './ProfileCreate.css';
import HobbiesPopup from './HobbiesPopup';

const ProfileCreate = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [showHobbyModal, setShowHobbyModal] = useState(false);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [firstName, setFirstName] = useState('');
  const [uploadedImages, setUploadedImages] = useState([null, null, null, null, null, null]);
  const [userId, setUserId] = useState(null);

  const handleHobbyModal = () => {
    setShowHobbyModal(!showHobbyModal);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const nextEmptyIndex = uploadedImages.findIndex((image) => image === null);
      if (nextEmptyIndex !== -1) {
        const newImages = [...uploadedImages];
        newImages[nextEmptyIndex] = URL.createObjectURL(file);
        setUploadedImages(newImages);
      }
    }
  };
  const handleImageClick = (index) => {
    document.getElementById(`photo-upload`).click();
  };

  const handleCreateProfile = async () => {
    try {
      const response = await getUserId(email);  // Assuming getUserId() fetches the user object
      console.log(response); // Debugging the response object

      // If your backend sends a {userID: ..., getId: ...} object, use the appropriate key
      if (response && response.userID) {
        localStorage.setItem('userId', response.userID);
      } else {
        console.error("Invalid response structure:", response);
      }
    } catch (error) {
      console.error("Error occurred while fetching user ID:", error);
    }




    const storedUserId = localStorage.getItem('userId'); // Hoặc lấy từ response
    console.log('Stored User ID:', storedUserId); // Kiểm tra giá trị lấy ra
    if (!storedUserId) {
      alert('User ID is missing.');
      return;
    }

    const profileData = {
      userId: storedUserId,
      firstName,
      email,
      bio,
      gender: selectedGender,
      interestedIn: selectedInterest,
      profilePhotos: uploadedImages.filter(image => image !== null)
    };

    try {
      console.log('Profile data:', profileData); // Kiểm tra dữ liệu
      const profileResponse = await saveUserProfile(profileData);
      console.log('Profile created:', profileResponse);

      // Lưu sở thích nếu có chọn
      if (selectedHobbies.length > 0) {
        const hobbiesResponse = await saveHobbies(email, selectedHobbies);
        console.log('Hobbies saved:', hobbiesResponse);
      }

      alert('Profile created successfully!');
    } catch (error) {
      console.error('Error creating profile:', error); // In lỗi cụ thể
      alert('Error creating profile!');
    }
  };


  return (
      <div className="main-container">
        <h1 className="create-profile">Create Profile</h1>
        <div className="content-container">
          <div className="profile-form">
            <Form>
              <Form.Group controlId="formFirstName">
                <Form.Label className='tittle'>First Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label className='tittle'>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBio">
                <Form.Label className='tittle'>Bio</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Write something about yourself..."
                    rows={5}
                    className="bio-textbox"
                    value={bio} // Thêm dòng này
                    onChange={(e) => setBio(e.target.value)} // Thay đổi giá trị của bio
                />
              </Form.Group>

              <Form.Group controlId="formGender">
                <Form.Label className='tittle'>Gender</Form.Label>
                <div className="radio-button-group">
                  <div
                      className={`radio-button ${selectedGender === 'Male' ? 'selected' : ''}`}
                      onClick={() => setSelectedGender('Male')}
                  >
                    Male
                  </div>
                  <div
                      className={`radio-button ${selectedGender === 'Female' ? 'selected' : ''}`}
                      onClick={() => setSelectedGender('Female')}
                  >
                    Female
                  </div>
                  <div
                      className={`radio-button ${selectedGender === 'Other' ? 'selected' : ''}`}
                      onClick={() => setSelectedGender('Other')}
                  >
                    Other
                  </div>
                </div>
              </Form.Group>

              <Form.Group controlId="formInterestedIn">
                <Form.Label className='tittle'>Interested In</Form.Label>
                <div className="radio-button-group">
                  <div
                      className={`radio-button ${selectedInterest === 'Men' ? 'selected' : ''}`}
                      onClick={() => setSelectedInterest('Men')}
                  >
                    Men
                  </div>
                  <div
                      className={`radio-button ${selectedInterest === 'Women' ? 'selected' : ''}`}
                      onClick={() => setSelectedInterest('Women')}
                  >
                    Women
                  </div>
                  <div
                      className={`radio-button ${selectedInterest === 'Both' ? 'selected' : ''}`}
                      onClick={() => setSelectedInterest('Both')}
                  >
                    Both
                  </div>
                </div>
              </Form.Group>

              <Form.Group controlId="formHobby">
                <Form.Label className='tittle'>Hobby:</Form.Label>
                <div>
                  <Button variant="outline-primary" className="add-hobbies-button" onClick={handleHobbyModal}>
                    + Add Hobbies
                  </Button>
                </div>
                <div>
                  {selectedHobbies.length > 0 && <p>Selected hobbies: {selectedHobbies.join(', ')}</p>}
                </div>
              </Form.Group>
            </Form>
          </div>

          <div className="profile-photos">
            <h2>Profile photos</h2>
            <div className="photo-grid">
              {uploadedImages.map((image, index) => (
                  <div key={index} className="photo-box" onClick={() => handleImageClick(index)}>
                    {image ? (
                        <img src={image} alt={`Uploaded ${index}`} className="uploaded-photo" />
                    ) : (
                        <span className="plus-icon">+</span>
                    )}
                  </div>
              ))}
            </div>
            <p className="upload-instructions">
              Upload 2 photos to start. Add 4 or more to make your profile stand out.
            </p>
            <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="photo-input"
                onChange={handleImageUpload}
            />
          </div>
        </div>

        <div className="create-button-container">
          <Button className="create-button" onClick={handleCreateProfile}>Create</Button>
        </div>

        <HobbiesPopup
            isOpen={showHobbyModal}
            onClose={handleHobbyModal}
            selectedHobbies={selectedHobbies}
            setSelectedHobbies={setSelectedHobbies}
        />
      </div>
  );
};

export default ProfileCreate;
