import React from 'react';
import './ProJudge.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import  { useState } from 'react';



function ProJudge({socket, ...props}) {

  const history = useHistory();
  const currentGame = useSelector((store) => store.currentGame)
  // const judge = useSelector((store) => store.projectionReducer);
  const dispatch = useDispatch();


  useEffect(() => {
    if (socket) {
      const handleNavigation = (direction, currentGameIn) => {
        console.log(`Navigating to: ${direction}`);
        console.log(`currentGame:`, currentGameIn);
        // setCurrentGame2(currentGameIn)
        if(direction === 'next') {
          history.push('/prothemeblk');
          // setCurrentGame2(currentGameIn) 
        }
        else if(direction === 'back') {
          console.log(`currentGame:`, currentGameIn);
          history.push('/proref');
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
    <div className="container-projudge">

      <div className='judge-title'>
        <h2 className='jtitle-style'> JUDGE</h2>
      </div>

      <div className="judge-details">

        <div className='name-info'>
          <div className='judge-image'>

            <img alt="placeholder image"
              src={currentGame.judge_img}></img>
          </div>

          <div className='judge-name'>
            <h3 className='question-style'>{currentGame.judge_name}</h3>
          </div>
        </div>

        <div className="questions">
          <div className='judge-question'>
            <h3 className='question-style'>WHAT DO YOU DO?</h3>
          </div>
          <div className='judge-answer'>
            <h3 className='answer-style'>{currentGame.judge_job}</h3>
          </div>
          
          <div className='judge-question'>
            <h3 className='question-style'>WHAT DO YOU LIKE?</h3>
          </div>
          <div className='judge-answer'>
            <h3 className='answer-style'>{currentGame.judge_like}</h3>
          </div>

          <div className='judge-question'>
            <h3 className='question-style'>WHAT DO YOU KNOW?</h3>
          </div>
          <div className='judge-answer'>
            <h3 className='answer-style'>{currentGame.judge_know}</h3>
          </div>
        </div>      
      </div>
    </div>
  );
}

export default ProJudge;
