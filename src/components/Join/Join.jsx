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
    </div>
  );
}

export default Join;
