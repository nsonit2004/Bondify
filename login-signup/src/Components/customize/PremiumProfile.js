import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaEdit } from "react-icons/fa"; // Importing a pencil and close icons
import "./Profile.css";
import HobbiesPopup from "./HobbiesPopup";

const ProfileCreate = () => {
    const [clickedImageIndex, setClickedImageIndex] = useState(null);
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedInterest, setSelectedInterest] = useState(null);
    const [showHobbyModal, setShowHobbyModal] = useState(false);
    const [selectedHobbies, setSelectedHobbies] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([null, null, null, null, null, null]);
    const [isEditable, setIsEditable] = useState({
        gender: false,
        interest: false,
        hobbies: false,
        firstName: false,
        location: false, // Changed from email to location
        bio: false,
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    
    // State for confirmation modal
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null); // Store index of image to delete

    const handleHobbyModal = () => setShowHobbyModal(!showHobbyModal);
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && clickedImageIndex !== null) {
            const newImages = [...uploadedImages];
            newImages[clickedImageIndex] = URL.createObjectURL(file); // Replace the image at the clicked index
            
            const shiftedImages = newImages.filter((image) => image !== null); // Shift images up
            while (shiftedImages.length < uploadedImages.length) {
                shiftedImages.push(null); // Fill remaining slots with null
            }
    
            setUploadedImages(shiftedImages); // Update the state with shifted images
            setClickedImageIndex(null); // Reset the clicked index after upload
        }
    
        // Clear the file input so that the same image can be uploaded again
        event.target.value = ''; 
    };
    const handleEditClick = (field) => {
        // Lock the input fields when the edit icon is clicked
        setIsEditable((prev) => ({ ...prev, [field]: true }));
    };

    const handleImageClick = (index) => {
        setClickedImageIndex(index); // Set the clicked image index
        if (uploadedImages[index]) {
            // If the image already exists, show confirmation modal for deletion
            setImageToDelete(index);
            setShowConfirmModal(true);
        } else {
            // Trigger the file input click for uploading a new image
            document.getElementById(`photo-upload`).click();
        }
    };



    const handleDeleteImage = () => {
        const newImages = [...uploadedImages];
    
        // Dồn các ảnh lên từ vị trí đã xoá
        for (let i = imageToDelete; i < newImages.length - 1; i++) {
            newImages[i] = newImages[i + 1];
        }
        newImages[newImages.length - 1] = null; // Đặt ô cuối cùng thành null
    
        setUploadedImages(newImages);
        setShowConfirmModal(false); // Đóng modal xác nhận
        setImageToDelete(null); // Reset imageToDelete
    };
    

    const handleCancelDelete = () => {
        setShowConfirmModal(false); // Close the confirmation modal
        setImageToDelete(null); // Reset image to delete
      };
    const handleSave = () => {
        // Shift images up by removing null values
        const shiftedImages = uploadedImages.filter((image) => image !== null);
    
        // Fill the remaining slots with null to maintain the array's length
        while (shiftedImages.length < uploadedImages.length) {
            shiftedImages.push(null);
        }
    
        // Update the state with the shifted image array
        setUploadedImages(shiftedImages);
    
        // Lock all fields after saving
        setIsEditable({
            gender: false,
            interest: false,
            hobbies: false,
            firstName: false,
            location: false, // Changed from email to location
            bio: false,
        });
    
        // Show success message
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000); // Hide after 3 seconds
    };

    return (
        <div className="main-container">
            <h1 className="create-profile">Profile</h1>
            <div className="content-container">
                <div className="profile-form">
                    <Form>
                        <Form.Group controlId="formFirstName">
                            <Form.Label className="tittle">First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                readOnly={!isEditable.firstName}
                                style={{
                                    backgroundColor: isEditable.firstName ? "white" : "#f0f0f0",
                                    cursor: isEditable.firstName ? "text" : "not-allowed",
                                }}
                            />
                            <Button
                                variant="link"
                                onClick={() => handleEditClick("firstName")}
                                className="edit-button"
                            >
                                <FaEdit size={12} color="black" /> {/* Black pencil icon */}
                            </Button>
                        </Form.Group>

                        <Form.Group controlId="formLocation"> {/* Changed from formEmail to formLocation */}
                            <Form.Label className="tittle">Location</Form.Label> {/* Changed from Email to Location */}
                            <Form.Control
                                type="text"
                                placeholder="Enter location" 
                                readOnly={!isEditable.location}
                                style={{
                                    backgroundColor: isEditable.location ? "white" : "#f0f0f0",
                                    cursor: isEditable.location ? "text" : "not-allowed",
                                }}
                            />
                            <Button
                                variant="link"
                                onClick={() => handleEditClick("location")} // Changed from email to location
                                className="edit-button"
                            >
                                <FaEdit size={12} color="black" /> {/* Black pencil icon */}
                            </Button>
                        </Form.Group>

                        <Form.Group controlId="formBio">
                            <Form.Label className="tittle">Bio</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Write something about yourself..."
                                rows={5}
                                className="bio-textbox"
                                readOnly={!isEditable.bio}
                                style={{
                                    backgroundColor: isEditable.bio ? "white" : "#f0f0f0",
                                    cursor: isEditable.bio ? "text" : "not-allowed",
                                }}
                            />
                            <Button
                                variant="link"
                                onClick={() => handleEditClick("bio")}
                                className="edit-button"
                            >
                                <FaEdit size={12} color="black" /> {/* Black pencil icon */}
                            </Button>
                        </Form.Group>

                        <Form.Group controlId="formGender">
                            <Form.Label className="tittle">Gender</Form.Label>
                            <div className="radio-button-group">
                                <div
                                    className={`radio-button ${selectedGender === "Male" ? "selected" : ""}`}
                                    onClick={() =>
                                        selectedGender !== "Male" &&
                                        isEditable.gender &&
                                        setSelectedGender("Male")
                                    }
                                    style={{
                                        pointerEvents: isEditable.gender ? "auto" : "none",
                                        opacity: isEditable.gender ? 1 : 0.5,
                                    }}
                                >
                                    Male
                                </div>
                                <div
                                    className={`radio-button ${selectedGender === "Female" ? "selected" : ""}`}
                                    onClick={() =>
                                        selectedGender !== "Female" &&
                                        isEditable.gender &&
                                        setSelectedGender("Female")
                                    }
                                    style={{
                                        pointerEvents: isEditable.gender ? "auto" : "none",
                                        opacity: isEditable.gender ? 1 : 0.5,
                                    }}
                                >
                                    Female
                                </div>
                                <div
                                    className={`radio-button ${selectedGender === "Other" ? "selected" : ""}`}
                                    onClick={() =>
                                        selectedGender !== "Other" &&
                                        isEditable.gender &&
                                        setSelectedGender("Other")
                                    }
                                    style={{
                                        pointerEvents: isEditable.gender ? "auto" : "none",
                                        opacity: isEditable.gender ? 1 : 0.5,
                                    }}
                                >
                                    Other
                                </div>
                                <Button
                                    variant="link"
                                    onClick={() => handleEditClick("gender")}
                                    className="edit-button"
                                >
                                    <FaEdit size={12} color="black" /> {/* Black pencil icon */}
                                </Button>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="formInterestedIn">
                            <Form.Label className="tittle">Interested In</Form.Label>
                            <div className="radio-button-group">
                                <div
                                    className={`radio-button ${selectedInterest === "Men" ? "selected" : ""}`}
                                    onClick={() =>
                                        selectedInterest !== "Men" &&
                                        isEditable.interest &&
                                        setSelectedInterest("Men")
                                    }
                                    style={{
                                        pointerEvents: isEditable.interest ? "auto" : "none",
                                        opacity: isEditable.interest ? 1 : 0.5,
                                    }}
                                >
                                    Men
                                </div>
                                <div
                                    className={`radio-button ${selectedInterest === "Women" ? "selected" : ""}`}
                                    onClick={() =>
                                        selectedInterest !== "Women" &&
                                        isEditable.interest &&
                                        setSelectedInterest("Women")
                                    }
                                    style={{
                                        pointerEvents: isEditable.interest ? "auto" : "none",
                                        opacity: isEditable.interest ? 1 : 0.5,
                                    }}
                                >
                                    Women
                                </div>
                                <div
                                    className={`radio-button ${selectedInterest === "Both" ? "selected" : ""}`}
                                    onClick={() =>
                                        selectedInterest !== "Both" &&
                                        isEditable.interest &&
                                        setSelectedInterest("Both")
                                    }
                                    style={{
                                        pointerEvents: isEditable.interest ? "auto" : "none",
                                        opacity: isEditable.interest ? 1 : 0.5,
                                    }}
                                >
                                    Both
                                </div>
                                <Button
                                    variant="link"
                                    onClick={() => handleEditClick("interest")}
                                    className="edit-button"
                                >
                                    <FaEdit size={12} color="black" /> {/* Black pencil icon */}
                                </Button>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="formHobby">
                            <Form.Label className="tittle">Hobby:</Form.Label>
                            <div>
                                <Button
                                    variant="outline-primary"
                                    className="add-hobbies-button"
                                    onClick={handleHobbyModal}
                                    disabled={!isEditable.hobbies}
                                >
                                    + Change Hobbies
                                </Button>
                                <Button
                                    variant="link"
                                    onClick={() => handleEditClick("hobbies")}
                                    className="edit-button"
                                >
                                    <FaEdit size={12} color="black" /> {/* Black pencil icon */}
                                </Button>
                            </div>
                            <div>
                                {selectedHobbies.length > 0 && (
                                    <p>Selected hobbies: {selectedHobbies.join(", ")}</p>
                                )}
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
                  <>
                    <img src={image} alt={`Uploaded ${index}`} className="uploaded-photo" />
                    <button className="remove-photo" onClick={(e) => { e.stopPropagation(); handleImageClick(index); }}>&times;</button>
                  </>
                ) : (
                  <span className="plus-icon">+</span>
                )}
              </div>
            ))}
          </div>
          <p className="upload-instructions">
            
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


            <div className="save-button-container">
                <Button className="save-button" onClick={handleSave}>
                    Save
                </Button>
            </div>

            {showSuccessMessage && (
                <div className="success-popup">
                    Profile saved successfully!
                </div>
            )}

            <HobbiesPopup
                isOpen={showHobbyModal}
                onClose={handleHobbyModal}
                selectedHobbies={selectedHobbies}
                setSelectedHobbies={setSelectedHobbies}
            />

            {/* Confirmation Modal */}
            <Modal show={showConfirmModal} onHide={handleCancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this image?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelDelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteImage}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProfileCreate;
