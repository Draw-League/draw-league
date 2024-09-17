import React from 'react';
import './Contact.css';
import Nav from '../Nav/Nav';
import InstagramIcon from '@mui/icons-material/Instagram';
// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function Contact() {

  return (
    <div className="container">
      <Nav />

        <div className='contact-info'>
        <p>DRAW LEAGUE is a casual drawing game that takes 90 minutes to play. </p>
        <br></br>
        <p>Are you a brewery in need of unique entertainment?</p>
        <p>Are you instrested in running a game at your local pub?</p>
        <br></br>

        <p>Please contact us here!</p>
	      <br></br>
        <p className='email'>hello@drawleague.app!</p>
        <InstagramIcon className='instaicon'></InstagramIcon>

        </div>
     
    </div>
  );
}

export default Contact;

