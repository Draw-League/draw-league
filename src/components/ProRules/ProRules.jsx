import React from 'react';
import './ProRules.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function ProRules() {
  return (
    <div className="container">
      <div>
        <p>This the projector rules page</p>
      </div>
    </div>
  );
}

export default ProRules;
