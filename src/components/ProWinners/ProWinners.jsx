import React from 'react';
import './ProWinners.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function ProWinners() {
  return (
    <div className="container">
      <div>
        <p>This the projector winners podium</p>
      </div>
    </div>
  );
}

export default ProWinners;
