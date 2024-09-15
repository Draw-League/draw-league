import React from 'react';
import './Contact.css';
import { useHistory } from 'react-router-dom';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function Contact() {
  const history= useHistory()
  const navigation = (path) => {
    history.push(path);
  }

  return (
    <div className="container">
      <header className='contact-header'>
        <nav className='nav-menu'>
          <button onClick={() => navigation('/home')}>HOME</button>
        </nav>
      </header>
      
      <main className='contact-main'>
      <p className='contactus-title'>CONTACT US</p>
        <br></br>

        <div className='contact-info'>
        <p className='info'>DRAW LEAGUE is a drawing game played in a brewery. It takes 
          about 90 minutes to play. Participants, working in teams or 
          individually, draw pictures based on prompts given in three 
          rounds. A single judge looks at each individual drawing and 
          gives it a score from 1—100. The top 3 highest ranked scores 
          totaled from all three rounds win prizes.</p>
        <p>Want to host a game?</p>
        <p>Want to judge?</p>
        <p>Want to play?</p>
        <br></br>

        <p>Hit us up at</p>
        <p>drawleague@email.com</p>
        </div>
      </main>
    </div>
  );
}

export default Contact;
