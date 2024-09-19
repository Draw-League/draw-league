import React from 'react';
import './AddRef.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AddRef() {
  return (
    <div className="container">
      <div className='add-ref-form'>
      <h2 className='form-title'>Add  A Ref</h2>
                <label htmlFor="name">
                    <input className='add-new-input'
                        type="text"
                        name="name"
                        placeholder='NAME'
                        required
                        // value={INSERT VALUE NAME}
                    />
                </label>
                <br />
                <label htmlFor="email">
                    <input className='add-new-input'
                        type="text"
                        name="email"
                        placeholder='EMAIL'
                        required
                        // value={INSERT VALUE NAME}
                    />
                </label>
                <br />
                <label htmlFor="phone">
                    <input className='add-new-input'
                        type="text"
                        name="phone"
                        placeholder='PHONE #'
                        required
                        // value={INSERT VALUE NAME}
                    />
                </label>
                <br />
                <label htmlFor="occupation">
                    <input className='add-new-input'
                        type="text"
                        name="occupation"
                        placeholder='OCCUPATION'
                        required
                        // value={INSERT VALUE NAME}
                    />
                </label>
                <br />
                <label htmlFor="artMedium">
                    <input className='add-new-input'
                        type="text"
                        name="artMedium"
                        placeholder='ART MEDIUM'
                        required
                        // value={INSERT VALUE NAME}
                    />
                </label>
                <br />
                <label htmlFor="funFact">
                    <input className='add-new-input'
                        type="text"
                        name="funFact"
                        placeholder='FUN FACT'
                        required
                        // value={INSERT VALUE NAME}
                    />
                </label>
        <div>
        {/* UPLOAD REF IMAGE BUTTON AND PREVIEW GOES HERE */}
        </div>
      <button>ADD REF SUBMIT BUTTON</button>
      </div>

      <div>
        
      </div>

    </div>
  );
}

export default AddRef;
