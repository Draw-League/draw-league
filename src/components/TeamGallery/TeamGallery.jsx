import React, { useState, useEffect } from 'react';
import './TeamGallery.css';
import NavPlayer from '../NavPlayer/NavPlayer';
import axios from 'axios';

function TeamGallery() {
  const [drawings, setDrawings] = useState([]);

  useEffect(() => {
    const fetchDrawings = async () => {
      try {
        const response = await axios.get('/api/drawings');
        setDrawings(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDrawings();
  }, []);

  const renderDrawing = (round) => {
    const drawingForRound = drawings.find(drawing => drawing.round === round);
    return drawingForRound ? (
      <img src={drawingForRound.drawing_url} alt={`Round ${round} Drawing`} className="gallery-image" />
    ) : (
      <div className="placeholder-image">No drawing submitted yet</div>
    );
  };

  return (
    <div className="container team-gallery">
      <header className="header">
        <NavPlayer className="hamburger-right" />
      </header>

      <div className="team-gallery-box">TEAM GALLERY</div>

      <div className="gallery-content">
        <div className="gallery-item">
          <div className="image-container">
            {renderDrawing(1)}
          </div>
          <div className="round-label">ROUND 1</div>
        </div>

        <div className="gallery-item">
          <div className="image-container">
            {renderDrawing(2)}
          </div>
          <div className="round-label">ROUND 2</div>
        </div>

        <div className="gallery-item">
          <div className="image-container">
            {renderDrawing(3)}
          </div>
          <div className="round-label">ROUND 3</div>
        </div>
      </div>
    </div>
  );
}

export default TeamGallery;
