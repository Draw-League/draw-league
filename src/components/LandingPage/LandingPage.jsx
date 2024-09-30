import React from 'react';
import './LandingPage.css';
import logo from './drawleague.png';
import Nav from '../Nav/Nav.jsx'
import InstagramIcon from '@mui/icons-material/Instagram';
import { useHistory } from 'react-router-dom';


// CUSTOM COMPONENTS


function LandingPage() {
  const history = useHistory();

  const navigation = (path) => {
    history.push(path);
  };

  return (
    <div>

      <Nav />
      <main className="landing-main">
        <img src={logo} alt="DRAW LEAUGE LOGO" className="main-logo" />
        <p className="main-subtitle">A DRAWING GAME PLAYED AT PUBS</p>
        <InstagramIcon className='instaicon'></InstagramIcon>
        <button className="landing-nav-button" onClick={() => navigation('/login')}>ADMIN LOGIN</button>
      </main>
    </div>
  );
}

export default LandingPage;
