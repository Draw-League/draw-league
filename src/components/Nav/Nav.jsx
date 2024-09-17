import React from 'react';
import './Nav.css';
import { useHistory } from 'react-router-dom';
import logo from '../LandingPage/drawleague.png';

function Nav() {
  const history = useHistory();

  const navigation = (path) => {
    history.push(path);
  };
  return (
    <div className="nav-container">

      <img src={logo} className='nav-logo' />

        <ul className="nav-menu">
          <li><button className="nav-button" onClick={() => navigation('/rules')}>HOW TO PLAY</button></li>
          <li><button className="nav-button" onClick={() => navigation('/join-game')}>JOIN A GAME</button></li>
          <li><button className="nav-button" onClick={() => navigation('/contact')}>CONTACT US</button></li>
        </ul>
      
    </div>
  );
}

export default Nav;
