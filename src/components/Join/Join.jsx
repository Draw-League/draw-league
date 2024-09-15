import React from 'react';
import './Join.css';
import logo from '../LandingPage/drawleague.png';
// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function Join() {
  return (
    <div className="container join-game">
       <img src={logo} alt="DRAW LEAUGE LOGO" className="main-logo small-logo" />
       <div className='join-game-content'>
        <h1 className='join-game-title'>JOIN A GAME</h1>
        <p className='join-game-subtitle'>ENTER TEAM NAME & <br /> GAME CODE TO PLAY</p>
        <form className='join-game-form'>
          <input type="text" placeholder='TEAM NAME' />
          <input type="text" placeholder='GAME CODE'/>
          <button type='submit'>PLAY!</button>
        </form>
       </div>
    </div>
  );
}

export default Join;
