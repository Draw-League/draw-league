import React, { useState } from 'react';
import './RefDash.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import ProLeaderboard from '../ProLeaderboard/ProLeaderboard';

import Timer from './ProTimer';
import logo from './drawleague.png';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function RefDash({socket}) {
  const history = useHistory();
  useEffect(() => {
    // Add the listener when we load the page
    if(socket) {
      socket.on('navigate', (pageName) => {
        
        console.log('socket connected!', socket.id);
      })
    } else {
      console.error('Socket not connected!!!')
    }
    // Turn off the listener when we leave the page
    return () => socket && socket.off('navigate');
  }, [socket]);
  const sendNextPage = () => {
    if(socket) {
        socket.emit('navigate', 'next');
        console.log('socket.id', socket.id);
    }
  }

  const sendBackPage = () => {
    if(socket) {
        socket.emit('navigate', 'back');
        console.log('socket.id', socket.id);
    }
  }
  // return (
  //   <div className="container">
  //     <div>
  //       <p>This is the ref dashboard</p>
  //       <p>This will get, post, and put</p>

        
  //       <button onClick={sendBackPage} className='btn_desktop'>Back</button>
  //       <button onClick={sendNextPage} className='btn_desktop'>Next</button>




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
