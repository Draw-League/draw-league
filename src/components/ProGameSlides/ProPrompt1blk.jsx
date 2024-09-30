import React, { useState } from 'react';
import './ProPrompts.css';
import '../RefDash/RefDash.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import Timer from '../RefDash/ProTimer';
import logo from '../RefDash/drawleague.png';

function ProPrompt1blk({socket}){

return (
    
    <div className="dashboard-container">
      <div className="top-portion">
        <div className="timer-container">
          <Timer />
        </div>
        <div className="theme-container-reveal">
          <span className="theme-label">{}THEME</span>
          <div className="theme-display-reveal">???</div>
        </div>
      </div>
     
      <div className="body-content">
        <div className='logo-container'>
          <img src={logo} alt="DRAW LEAGUE LOGO" className="logo-image" />
        </div>

        <div className="right-content">
          <div className="prompt-container">
          <h2 className="prompt-header">PROMPT #1</h2>
           <div className="prompt-reveal">???</div>
          </div>
          <div className="square-containers">
            <div className="square-box">Leaderboard</div>
            <div className="square-box">Future ADs</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProPrompt1blk;