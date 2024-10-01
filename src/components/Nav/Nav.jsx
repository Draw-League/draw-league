import React, { useState, useEffect } from 'react';
import './Nav.css';
import { useHistory } from 'react-router-dom';
import logo from '../LandingPage/drawleague.png';
import imagePortrait from '../NavPlayer/howtoplay.png';
import imageLandscape from '../NavPlayer/howtoplayhorizontal.png';

function Nav() {
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [orientation, setOrientation] = useState('portrait');
  const history = useHistory();

  const navigate = (path) => {
    history.push(path);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > window.innerHeight) {
        setOrientation('landscape');
      } else {
        setOrientation('portrait');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openHowToPlayModal = () => {
    setShowHowToPlay(true);
  };

  const closeHowToPlayModal = () => {
    setShowHowToPlay(false);
  };

  return (
    <div className="nav-wrapper">
      <div className="logo-container">
        <img src={logo} className="nav-logo" onClick={() => navigate('/home')} />
      </div>
      <div className="menu-container">
        <ul className="nav-menu">
          <li>
            <button className="nav-button" onClick={openHowToPlayModal}>HOW TO PLAY</button>
          </li>
          <li>
            <button className="nav-button" onClick={() => navigate('/join-game')}>JOIN A GAME</button>
          </li>
          <li>
            <button className="nav-button" onClick={() => navigate('/contact')}>CONTACT US</button>
          </li>
        </ul>
      </div>

      {showHowToPlay && (
        <div className="modal-overlay">
          <div className="modal-content">
            <img
              src={orientation === 'portrait' ? imagePortrait : imageLandscape}
              alt="How to Play"
              className="how-to-play-image"
              style={{ width: '100%', height: 'auto' }}
            />
            <button className="action-button" onClick={closeHowToPlayModal}>CLOSE</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Nav;
