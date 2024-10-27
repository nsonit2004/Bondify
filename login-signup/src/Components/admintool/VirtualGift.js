import React, { useState, useCallback } from 'react';
import './VerifyProfile';
import './VirtualGift.scss'; // Make sure the path is correct
import Button from 'react-bootstrap/Button';
import { useDropzone } from 'react-dropzone';
import Sidebar from './sidebar';

const VirtualGift = () => {
  const [image, setImage] = useState(null);
  const [stickers, setStickers] = useState([]); // State to hold existing stickers

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*', // Only accept images
    multiple: false, // Only accept one image
  });

  const handleDeleteSticker = (index) => {
    // Delete sticker by index (simulate delete)
    const updatedStickers = stickers.filter((_, i) => i !== index);
    setStickers(updatedStickers);
  };

  return (
    <div className="app-container">
      <Sidebar />
    <div className="virtual-gift-container">
      <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Thả ảnh vào đây...</p>
        ) : (
          <p>Drop your image here</p>
        )}
      </div>

      {image && (
        <div className="preview">
          <img src={image} alt="Sticker Preview" className="sticker-preview" />
          <Button 
            className="create-sticker-btn" 
            onClick={() => {
              // Add new sticker (simulating a save to the database)
              setStickers([...stickers, image]);
              setImage(null); // Reset image after saving
            }}
          >
            Create Gift
          </Button>
        </div>
      )}

      {/* Display existing stickers */}
      <div className="sticker-list">
        {stickers.map((sticker, index) => (
          <div key={index} className="sticker-item">
            <img src={sticker} alt={`Sticker ${index}`} className="sticker-preview" />
            <Button 
              className="delete-gift-btn" 
              onClick={() => handleDeleteSticker(index)}
            >
              Delete Gift
            </Button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default VirtualGift;
