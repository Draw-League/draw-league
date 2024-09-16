import React from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import logo from './drawleague.png';

// CUSTOM COMPONENTS

function LandingPage() {
  const history = useHistory();

  const navigation = (path) => {
    history.push(path);
  };


  return (
    <div className="container">
      <header className="landing-header">
      <nav>
        <ul className="nav-menu">
          <li><button className="nav-button" onClick={() => navigation('/rules')}>HOW TO PLAY</button></li>
          <li><button className="nav-button" onClick={() => navigation('/join-game')}>JOIN A GAME</button></li>
          <li><button className="nav-button" onClick={() => navigation('/contact')}>CONTACT US</button></li>
        </ul>
      </nav>
      </header>

      <main className="landing-main">
        <img src={logo} alt="DRAW LEAUGE LOGO" className="main-logo" />
        <p className="main-subtitle">A DRAWING GAME PLAYED AT PUBS</p>
      </main>
    </div>
  );
}

export default LandingPage;
