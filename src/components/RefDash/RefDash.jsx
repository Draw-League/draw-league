import React, { useState } from 'react';
import './RefDash.css';
import Timer from './ProTimer';
import logo from './drawleague.png';

function RefDash() {
  const [theme, setTheme] = useState("???");
  const [buttonLabel, setButtonLabel] = useState("REVEAL THEME");

  const handleRevealClick = () => {
    if (buttonLabel === "REVEAL THEME") {
      setTheme("Fantasy"); 
      setButtonLabel("REVEAL PROMPT");
    } else if (buttonLabel === "REVEAL PROMPT") {
    }
  };

  return (
    <div className="dashboard-container">
      <div className="top-portion">
        <div className="timer-container">
          <Timer />
        </div>
        <div className="theme-container">
          <span className="theme-label">THEME</span>
          <div className="theme-display">{theme}</div>
        </div>
        <button className="reveal-button" onClick={handleRevealClick}>{buttonLabel}</button>
      </div>
     
      <div className="body-content">
        <div className='logo-container'>
          <img src={logo} alt="DRAW LEAGUE LOGO" className="logo-image" />
        </div>

        <div className="right-content">
          <div className="prompt-container">
          <h2 className="prompt-header">PROMPTS</h2>
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

export default RefDash;
