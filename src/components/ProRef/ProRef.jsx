import React from 'react';
import './ProRef.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function ProRef() {
  return (
    <div className="container">
      <div className='ref-tite'>
      <h2 className='ref-title'> REFEREE</h2>
      </div>

      <div className='ref-info'>
      <div className='ref-image'>
        <p>Ref Image</p>
      </div>

      <div className='ref-name'>
       <p>Ref Name</p>
      </div>

      <div className='ref-facts'>
        <p className='ref-style'>occupation</p>
        <p className='ref-style'>art medium</p>
        <p className='ref-style'>fun fact</p>
      </div>
      </div>
      <div className='ref-social-media'>
        <p> @instagram/social media handle </p>
      </div>

      <div className='ref-info'>
      <div className='ref-image'>
        <p>Ref Image</p>
      </div>

      <div className='ref-name'>
       <p>Ref Name</p>
      </div>

      <div className='ref-facts'>
        <p className='ref-style'>occupation</p>
        <p className='ref-style'>art medium</p>
        <p className='ref-style'>fun fact</p>
      </div>
      </div>
      <div className='ref-social-media'>
        <p> @instagram/social media handle </p>
      </div>
    
    </div>

    
    
  );
}

export default ProRef;
