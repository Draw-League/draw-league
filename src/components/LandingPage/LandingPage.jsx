import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import logo from './drawleague.png';
import Nav from '../Nav/Nav.jsx';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useHistory } from 'react-router-dom';

function LandingPage() {
  const history = useHistory();
  const [iconSize, setIconSize] = useState(40);

  const navigation = (path) => {
    history.push(path);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(orientation: portrait)").matches) {
        setIconSize(40);
      } else {
        setIconSize(70);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <Nav />
      <main className="landing-main">
        <img src={logo} alt="DRAW LEAGUE LOGO" className="main-logo" />
        <p className="main-subtitle">A DRAWING GAME PLAYED AT PUBS</p>
        <a
        href='https://www.instagram.com/drawleague_/' target="_blank" rel="noopener noreferrer">
        <InstagramIcon className='instaicon'style={{ fontSize: iconSize }}  ></InstagramIcon>
        </a>
        {/* <button className="landing-nav-button" onClick={() => navigation('/login')}>ADMIN LOGIN</button> */}
        <button className="landing-nav-button" onClick={() => navigation('/judgejoin')}>JUDGE LOGIN</button>
      </main>
    </div>
  );
}

export default LandingPage;
