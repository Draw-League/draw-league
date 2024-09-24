import React, { useState }  from 'react';
import './AddRef.css';
import { useDispatch } from 'react-redux';


// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AddRef() {
    const [newRef, setNewRef] = useState({
        fullName: '',
        email: '',
        phone: '',
        occupation: '',
        artMedium: '',
        funFact: '',
    //  REF IMAGE
      });
    
      const dispatch = useDispatch();
    
      const createRef = (event) => {
        event.preventDefault();
    
        dispatch({
          type: 'ADD_REF',
          payload: newRef, // Send the entire newRef object
        });
      };


  return (
    <div className="container">
      <div className='add-ref-form'>
      <h2 className='form-title'>Add  A Ref</h2>
                <label htmlFor="name">
                    <input className='add-new-input'
                        type="text"
                        name="name"
                        placeholder='FULL NAME'
                        required
                        value={newRef.fullName}
                        onChange={(event) => setNewRef({ ...newRef, fullName: event.target.value })}
                    />
                </label>
                <br />
                <label htmlFor="email">
                    <input className='add-new-input'
                        type="text"
                        name="email"
                        placeholder='EMAIL'
                        required
                        value={newRef.email}
                        onChange={(event) => setNewRef({ ...newRef, email: event.target.value })}                    />
                </label>
                <br />
                <label htmlFor="phone">
                    <input className='add-new-input'
                        type="text"
                        name="phone"
                        placeholder='PHONE #'
                        required
                        value={newRef.phone}
                        onChange={(event) => setNewRef({ ...newRef, phone: event.target.value })}
                    />
                </label>
                <br />
                <label htmlFor="occupation">
                    <input className='add-new-input'
                        type="text"
                        name="occupation"
                        placeholder='OCCUPATION'
                        required
                        value={newRef.occupation}
                        onChange={(event) => setNewRef({ ...newRef, occupation: event.target.value })}
                    />
                </label>
                <br />
                <label htmlFor="artMedium">
                    <input className='add-new-input'
                        type="text"
                        name="artMedium"
                        placeholder='ART MEDIUM'
                        required
                        value={newRef.artMedium}
                        onChange={(event) => setNewRef({ ...newRef, artMedium: event.target.value })}
                    />
                </label>
                <br />
                <label htmlFor="funFact">
                    <input className='add-new-input'
                        type="text"
                        name="funFact"
                        placeholder='FUN FACT'
                        required
                        value={newRef.funFact}
                        onChange={(event) => setNewRef({ ...newRef, funFact: event.target.value })}
                    />
                </label>
        <div>
        {/* UPLOAD REF IMAGE BUTTON AND PREVIEW GOES HERE */}
        </div>
      <button className='btn_desktop'>ADD REF SUBMIT BUTTON</button>
      </div>

      <div>
        
      </div>

    </div>
  );
}

export default AddRef;
