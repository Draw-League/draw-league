import React from 'react';
import './Join.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function Join() {
  return (
    <div className="container">
      <div>
        <p>This is where teams join the game</p>
        <p>This will post</p>
      </div>
    </div>
  );
}

export default Join;
