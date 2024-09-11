import React from 'react';
import './AddEvent.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AddEvent() {
  return (
    <div className="container">
      <div>
        <p>This the admin dashboard</p>
      </div>
    </div>
  );
}

export default AddEvent;
