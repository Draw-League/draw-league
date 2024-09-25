import React from 'react';
import './RefDash.css';
import Timer from './ProTimer';
import logo from './drawleague.png';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'
{/* This is the ref dashboard
This will get, post, and put */}
function RefDash() {
  return (
    <div className="dashboard-container">
      <div className='top-row'>
       <div className="timer">
          <Timer/>
        </div>
        </div>
        <div className='body-row'>
        <div className='logo-container'>
          <img src={logo} alt="DRAW LEAUGE LOGO" className='logo'/>
        </div>
        </div>
    </div>
  );
}

export default RefDash;
