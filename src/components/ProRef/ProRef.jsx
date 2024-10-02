import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './ProRef.css';
import axios from 'axios';


function ProRef({socket}) {
  const dispatch = useDispatch();
  const currentGame = useSelector((store) => store.currentGame)
  const history = useHistory();
  

console.log({currentGame});

  useEffect(() => {
    if (socket) {
      const handleNavigation = (direction, currentGameIn) => {
        console.log(`Navigating to: ${direction}`);
        console.log(`currentGame:`, currentGameIn);
        if(direction === 'next') {
          history.push('/ProJudge'); 
          // setCurrentGame2(currentGameIn);
        }
        else if(direction === 'back') {
          console.log(`currentGame:`, currentGameIn);
          history.push('/ProRules');
        }
      };

      socket.on('navigate', handleNavigation);
      console.log('socket.id', socket.id);
      return () => {
        socket.off('navigate', handleNavigation);
      };
    }
  }, [socket, history]);

  return (
    <div className="container-ref">
      <div className='ref-title'>
        <h2 className='ref-title-style'> REFEREE</h2>
      </div>
      <div className="ref-info">

        <div key={currentGame.id}>
          <div className='ref-image'>

            <img className="ref-img" alt="placeholder image"
              src={currentGame.ref_img}></img>

          </div>

          <div className='ref-name'>
            <p className='rname-style'>{currentGame.full_name} </p>
          </div>

          <div className='ref-facts'>
            <p className='ref-style'>
              ref fact
              <br />
              {currentGame.ref_fact}
              </p>
              <br /> 

           
            
          </div>
        </div>
      </div>
      <div className='draw-league-button'>
        <input type="image" src='../../documentation/images/DRAWLEAGUE_Logo02_thicker.png' onClick={() => history.push('/projudge')}></input>
        </div>
    </div>
  );
}

export default ProRef;
