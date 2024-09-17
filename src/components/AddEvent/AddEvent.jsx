import React from 'react';
import './AddEvent.css';
import '../CodeGenerator/CodeGenerator';
import GenerateRandomString from '../CodeGenerator/CodeGenerator';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AddEvent() {
  
  function handleSubmit() {
    GenerateRandomString();
  }
  return (
    <div className="container">
      <div>
        <p>This the add an event page</p>
        <h3>Event Details</h3> 
        <form>
          <input type="text" placeholder="Date"></input>
          <input type="text" placeholder="Time"></input>
          <input type="text" placeholder="Location"></input>
          <input type="text" placeholder="Theme"></input>
          <input type="text" placeholder="Prompt 1"></input>
          <input type="text" placeholder="Prompt 2"></input>
          <input type="text" placeholder="Prompt 3"></input>      
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
