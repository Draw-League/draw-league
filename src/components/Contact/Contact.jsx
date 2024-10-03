import React from 'react';
import './Contact.css';
import Nav from '../Nav/Nav';
import InstagramIcon from '@mui/icons-material/Instagram';


function Contact() {

  return (
    <div className="contact-container">
      <Nav />

        <div className='contact-info'>
        <p>DRAW LEAGUE is a casual drawing game that takes 90 minutes to play. </p>
        <br></br>
        <p>Are you a brewery in need of unique entertainment?</p>
        <p>Are you instrested in running a game at your local pub?</p>
        <br></br>

        <p>Please contact us here!</p>
	      <br></br>
        <p className='email'>hi@drawleague.app</p>
        <a
        href='https://www.instagram.com/drawleague_/' target="_blank" rel="noopener noreferrer">
        <InstagramIcon className='instaicon' ></InstagramIcon>
        </a>
        </div>
     
    </div>
  );
}

export default Contact;

