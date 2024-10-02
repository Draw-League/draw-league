import React from 'react';
import './ProRules.css';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { useDispatch, useSelector}from 'react-redux';
import { useState } from 'react';


function ProRules({socket}) {
const history = useHistory();
const dispatch = useDispatch();
const currentGame = useSelector((store) => store.currentGame);

  useEffect(() => {
    
    if (socket) {

      socket.emit("getGameInfo");

      const handleNavigation = (direction, currentGameIn) => {
        console.log(`Navigating to: ${direction}`);

        if(direction === 'next') {
            history.push('/proref');      
        }
        else if(direction === 'back') {
          console.log(`currentGame:`, currentGameIn);
          history.push('/admindash');
        }
      };

      const saveGameInfo = (currentGame) => {
        console.log('in saveGameInfo');
        console.log('currentGame', currentGame);
        dispatch({type:'UPDATE_CURRENT_GAME', payload: currentGame});
      };

      socket.on('navigate', handleNavigation);
      socket.on('gameInfo', saveGameInfo)
      console.log('socket.id', socket.id);
      return () => {
        socket.off('navigate', handleNavigation);
      };
    }
  }, [socket, history]);
  
  return (
    <div className="main-container">
      
    <div className="rules-container">
      <div className="page-title">RULES</div>
      </div>

      <div className="form-container">
        <div className="round-container">
          <div className="round-header">3 ROUNDS</div>
          <div className="round-divider"></div>
          <div className="round-description">
            EACH ROUND <br></br><span>A DRAWING PROMPT IS GIVEN</span>
          </div>
          <div className="round-format">
            <div className="session">
              <div className="session-circle">15 MIN</div>
              <p className="session-box">DRAWING SESSION</p>
            </div>
            <div className="arrow-container">
              <ArrowDownwardIcon className="arrow" />
            </div>
            <div className="session">
              <div className="session-circle">5 MIN</div>
              <p className="session-box">SUBMITTING SESSION</p>
            </div>
            <div className="arrow-container">
              <ArrowDownwardIcon className="arrow" />
            </div>
            <div className="session">
              <div className="session-circle">10 MIN</div>
              <p className="session-box">JUDGING SESSION</p>
            </div>
          </div>
        </div>

        <div className="game-rules">
          <div className="rule-box">
            <h2>TEAMS</h2>
            <ul>
              <li>DRAW AS AN INDIVIDUAL OR IN A TEAM</li>
              <li>CREATE A TEAM NAME</li>
              <li>1 SUBMISSION PER TEAM PER ROUND</li>
            </ul>
          </div>
          <div className="rule-box">
            <h2>PENALTIES</h2>
            <ul>
              <li>DRAWINGS WITH CRUDE LANGUAGE, SEXUAL, OR OVERTLY VIOLENT CONTENT ARE SUBJECT TO PENALTIES OR DISQUALIFICATION.</li>
            </ul>
          </div>
          <div className="rule-box">
            <h2>DRAWING</h2>
            <ul>
              <li>GRAB 3 SHEETS OF OFFICIAL DRAW LEAGUE PAPER</li>
              <li>MUST DRAW ALL 3 ROUNDS TO WIN BIG</li>
              <li>SUBMIT DRAWINGS BY CAPTURING THEM ON DRAWLEAGUE.APP</li>
            </ul>
          </div>
          <div className="rule-box">
            <h2>JUDGING</h2>
            <ul>
              <li>JUDGING IS BASED ON SUBJECTIVE PREFERENCES OF OUR GUEST JUDGE</li>
              <li>SCORING IS 0-100, 300 POINTS TOTAL</li>
              <li>THE 3 TEAMS WITH THE HIGHEST SCORES WIN</li>
            </ul>
            </div>
          </div>
        </div>
      </div>
    // </div>
   
  );
}

export default ProRules;
