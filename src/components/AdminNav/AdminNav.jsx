import React from 'react';
import './AdminNav.css';
import { useHistory } from 'react-router-dom';
import logo from '../LandingPage/drawleague.png';

function AdminNav() {
  const history = useHistory();

  const navigation = (path) => {
    history.push(path);
  };
  return (
    <div className="nav-container">

      <img src={logo} className='nav-logo' onClick={() => navigation('/admindash')} />

        <ul className="nav-menu">
          <li><button className="nav-button" onClick={() => navigation('/admindash')}>DASHBOARD</button></li>
          <li><button className="nav-button" onClick={() => navigation('/addevent')}>CREATE EVENT</button></li>
          <li><button className="nav-button" onClick={() => navigation('/addref')}>ADD A REF</button></li>
        </ul>
      
    </div>
  );
}

export default AdminNav;
