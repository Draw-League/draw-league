import React, { useState, useEffect } from 'react';
import './Drawing.css';
import axios from 'axios';
import logo from '../LandingPage/drawleague.png';

function Drawing({ teamName, gameCode, theme, prompt }) {
  const [photo, setPhoto] = useState(null);
  const fileInputRef = React.createRef();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    console.log("Photo state has been updated:", photo);
  }, [photo]); 

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSnapClick = () => {
    fileInputRef.current.click();
  };

  const submitPhoto = () => {
    console.log("Cloud Name:", import.meta.env.VITE_CLOUD_NAME);
    console.log("Preset Name:", import.meta.env.VITE_PRESET_NAME);
  
    if (photo) {
      const formData = new FormData();
      formData.append('file', photo);
      formData.append('upload_preset', import.meta.env.VITE_PRESET_NAME);
  
      axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, formData)
        .then(response => {
          const drawing_url = response.data.secure_url;
          console.log('Photo submitted to Cloudinary:', drawing_url);
  
          return axios.post('/api/drawings', {
            team_id: 1,
            event_id: 1,
            drawing_url: drawing_url
          });
        })
        .then(() => {
          console.log('Data successfully sent to backend.');
          setIsSubmitted(true);
        })
        .catch(err => {
          console.error('Error:', err.message);
          alert('Error occurred during photo submission.');
        });
    } else {
      alert('Please take a photo before submitting.');
    }
  };
  
  const closePopupAndRefresh = () => {
    console.log("Popup closed, refreshing the page...");
    window.location.reload();
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
              src={URL.createObjectURL(photo)}
              alt="Captured"
              className="captured-image"
              style={{ width: '300px', height: 'auto' }}
            />
          )}
        </div>

        <div className="right-panel">
          <button className="action-button" onClick={handleSnapClick}>SNAP</button>
          <button className="action-button" onClick={submitPhoto}>SUBMIT</button>
        </div>

        {isSubmitted && (
          <div className="popup">
            <div className="popup-content">
              <h2>Submitted!</h2>
              <p>Your photo is submitted successfully.</p>
              <button className="close-button" onClick={closePopupAndRefresh}>Okay</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawing;
