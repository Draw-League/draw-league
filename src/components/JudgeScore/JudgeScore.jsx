import React from 'react';
import './JudgeScore.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function JudgeScore() {
  return (
    <div className="container">
      <div>
        <p>This the judge's gallery for scoring</p>
      </div>
    </div>
  );
}

export default JudgeScore;
