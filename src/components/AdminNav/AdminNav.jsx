import React from 'react';
import './AdminNav.css';
import { useHistory } from 'react-router-dom';
import logo from '../LandingPage/drawleague.png';
import LogOutButton from '../LogOutButton/LogOutButton';

function AdminNav() {
  const history = useHistory();

  const handleLogout = () => {
    history.push('/home');
  };

  const navigation = (path) => {
    history.push(path);
  };
  return (
    <div className="admin-nav-container">

      <img src={logo} className='admin-nav-logo' onClick={() => navigation('/admindash')} />

        <ul className="admin-nav-menu">       
          <li><button className="admin-nav-button" onClick={() => navigation('/admindash')}>DASHBOARD</button></li>
          <li><button className="admin-nav-button" onClick={() => navigation('/addevent')}>CREATE EVENT</button></li>
          <li><LogOutButton className="admin-nav-button" onLogout={handleLogout} /></li>
          {/* <li><button className="nav-button" onClick={() => navigation('/addref')}>ADD A REF</button></li> */}
        </ul>
      
    </div>
  );
}

export default AdminNav;
