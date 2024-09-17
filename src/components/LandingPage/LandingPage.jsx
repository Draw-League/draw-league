import React from 'react';
import './LandingPage.css';
import logo from './drawleague.png';
import Nav from '../Nav/Nav.jsx'
import InstagramIcon from '@mui/icons-material/Instagram';

// CUSTOM COMPONENTS

function LandingPage() {

  return (
    <div>

      <Nav />

      <main className="landing-main">
        <img src={logo} alt="DRAW LEAUGE LOGO" className="main-logo" />
        <p className="main-subtitle">A DRAWING GAME PLAYED AT PUBS</p>
      <InstagramIcon className='instaicon'></InstagramIcon>
      </main>
    </div>
  );
}

export default LandingPage;
