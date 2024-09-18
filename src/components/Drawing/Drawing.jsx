import React, { useState } from 'react';
import './Drawing.css';
import axios from 'axios';
import logo from '../LandingPage/drawleague.png';

function Drawing({ teamName, gameCode, theme, prompt }) {
  const [photo, setPhoto] = useState(null);
  const fileInputRef = React.createRef();

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSnapClick = () => {
    fileInputRef.current.click();
  };

  const submitPhoto = () => {
    if (photo) {
      const formData = new FormData();
      formData.append('file', photo);
      formData.append('upload_preset', 'your_upload_preset');

      axios.post('https://api.cloudinary.com/v1_1/cloud_name/image/upload', formData)
        .then(response => {
          const imageUrl = response.data.secure_url;
          console.log('Photo submitted:', imageUrl);
          alert('Photo submitted!');
        })
        .catch(err => console.error("Error uploading image:", err));
    } else {
      alert('Please take a photo before submitting.');
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="Draw League Logo" className="logo" />

      <div className="header">
        <div className="tab">TEAM</div>
        <div className="team-box">{teamName || ""}</div>
      </div>

      <div className="main-content">
        <div className="left-panel">
          <div className="table-box">
            <div className="table-header">GAME</div>
            <div className="table-content">{gameCode || ""}</div>
          </div>

          <div className="table-box">
            <div className="table-header">THEME</div>
            <div className="table-content">{theme || ""}</div>
          </div>

          <div className="table-box">
            <div className="table-header">PROMPT 1</div>
            <div className="table-content">{prompt || ""}</div>
          </div>
        </div>

        <div className="center-panel">
          {!photo ? (
            <div>
              <input 
                type="file" 
                accept="image/*" 
                capture="environment" 
                ref={fileInputRef} 
                onChange={handlePhotoChange} 
                style={{ display: 'none' }}
              />
            </div>
          ) : (
            <img
              src={photo}
              alt="Captured"
              className="captured-image"
              style={{ width: '300px', height: 'auto' }}
            />
          )}
        </div>

        <div className="right-panel">
          <button className="action-button" onClick={handleSnapClick}>SNAP</button>
          <button className="action-button" onClick={() => setPhoto(null)}>RETAKE</button>
          <button className="action-button" onClick={submitPhoto}>SUBMIT</button>
        </div>
      </div>
    </div>
  );
}

export default Drawing;
