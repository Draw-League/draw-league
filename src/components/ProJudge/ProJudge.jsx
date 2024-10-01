import React from 'react';
import './ProJudge.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';



function ProJudge({socket, currentGame, ...props}) {

  const history = useHistory();
  // const currentGame = useSelector((store) => store.currentGame)
  const judge = useSelector((store) => store.projectionReducer);
  const dispatch = useDispatch();

  //console.log('current game', currentGame)



  useEffect(() => {
    if (socket) {
      const handleNavigation = (direction, currentGameIn) => {
        console.log(`Navigating to: ${direction}`);
        console.log(`currentGame:`, currentGameIn);
        if(direction === 'next') {
          history.push('/prothemeblk'); 
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
              src='https://images.unsplash.com/photo-1565194637906-8f45f3351a5d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>
          </div>

          <div className='judge-name'>
            <h3 className='question-style'>JUDGE <br />{judge.judge_name}</h3>
          </div>
        </div>

        <div className="questions">
          <div className='judge-question'>
            <h3 className='question-style'>WHAT DO YOU DO?</h3>
          </div>
          <div className='judge-answer'>
            <h3 className='answer-style'>{judge.judge_job}</h3>
          </div>
          
          <div className='judge-question'>
            <h3 className='question-style'>WHAT DO YOU LIKE?</h3>
          </div>
          <div className='judge-answer'>
            <h3 className='answer-style'>{judge.judge_like}</h3>
          </div>

          <div className='judge-question'>
            <h3 className='question-style'>WHAT DO YOU KNOW?</h3>
          </div>
          <div className='judge-answer'>
            <h3 className='answer-style'>{judge.judge_know}</h3>
          </div>
        </div>
        <br />
        <div className='draw-league-button'>
        <input type="image" src='../../documentation/images/DRAWLEAGUE_Logo02_thicker.png' onClick={() => history.push('/refdash')}></input>
        </div>
      </div>
    </div>
  );
}

export default ProJudge;
