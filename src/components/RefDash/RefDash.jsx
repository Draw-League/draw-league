import React, { useState } from 'react';
import './RefDash.css';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';


import { useDispatch, useSelector } from 'react-redux';

import Timer from './ProTimer';
import logo from './drawleague.png';



function RefDash({socket, props}) {
  console.log('props ref dash', props)
  const currentGame = useSelector((store) => store.currentGame);

  console.log('current game', currentGame)
  const dispatch = useDispatch();
  const history = useHistory();
  



  useEffect(() => {
    // Add the listener when we load the page
    if(socket) {

      socket.on('sendGameInfo', () => socket.emit('sendingGameInfo', currentGame));

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
        socket.emit('gameInfo', 'navigate', 'next', currentGame);
        console.log('socket.id', socket.id);
        console.log('current game is:', currentGame)
    }
  }

  const sendBackPage = () => {
    if(socket) {
        socket.emit('navigate', 'back', currentGame);
        console.log('socket.id', socket.id);
    }
  }
  


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
        <button className="reveal-button" onClick={sendBackPage}>PREV SLIDE</button>
        <div className="theme-container">
          <span className="theme-label">THEME</span>
          <div className="theme-display">{currentGame.theme}</div>
        </div>
        <button className="reveal-button" onClick={sendNextPage}>NEXT SLIDE</button>
      </div>
     
      <div className="body-content">
        <div className='dash-logo-container'>
          <img src={logo} alt="DRAW LEAGUE LOGO" className="dash-logo-image" />
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
