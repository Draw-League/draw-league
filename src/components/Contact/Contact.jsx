import React from 'react';
import './Contact.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function Contact() {
  return (
    <div className="container">
      <div>
        <p>This lists the email for contact purposes!</p>
      </div>
    </div>
  );
}

export default Contact;
