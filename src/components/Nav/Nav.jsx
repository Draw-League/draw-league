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
    <div className="nav-wrapper">
      <div className="logo-container">
        <img src={logo} className="nav-logo" onClick={() => navigation('/home')} />
      </div>
      <div className="menu-container">
        <ul className="nav-menu">
          <li>
            <button className="nav-button" onClick={() => navigation('/rules')}>HOW TO PLAY</button>
          </li>
          <li>
            <button className="nav-button" onClick={() => navigation('/join-game')}>JOIN A GAME</button>
          </li>
          <li>
            <button className="nav-button" onClick={() => navigation('/contact')}>CONTACT US</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
