import React from 'react';
import './ProJudge.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function ProJudge() {
  return (
    <div className="container">
      <div>
        <p>This the projector judge page</p>
        <p>This will get</p>
      </div>
    </div>
  );
}

export default ProJudge;
