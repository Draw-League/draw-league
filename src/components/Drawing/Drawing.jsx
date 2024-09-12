import React from 'react';
import './Drawing.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function Drawing() {
  return (
    <div className="container">
      <div>
        <p>This where teams upload their drawing</p>
        <p>This will get and post</p>
      </div>
    </div>
  );
}

export default Drawing;
