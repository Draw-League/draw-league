import React from 'react';
import './AddRef.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AddRef() {
  return (
    <div className="container">
      <div>
        <p>This the add a ref page</p>
      </div>
    </div>
  );
}

export default AddRef;
