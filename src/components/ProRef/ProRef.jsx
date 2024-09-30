import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './ProRef.css';
import axios from 'axios';


function ProRef({socket}) {
  const dispatch = useDispatch();
  const currentGame = useSelector((store) => store.currentGame)
  const ref = useSelector((store) => store.projectionReducer);
  const history = useHistory();

console.log({currentGame});

  useEffect(() => {
    if(currentGame){
    dispatch({ type: "FETCH_REFS", payload: {currentGame} });}
  }, [currentGame, dispatch]);


  useEffect(() => {
    if (socket) {
      const handleNavigation = (direction) => {
        console.log(`Navigating to: ${direction}`);
        if(direction === 'next') {
          history.push('/ProJudge'); 
        }
        else if(direction === 'back') {
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

        <div key={ref.id}>
          <div className='ref-image'>

            <img className="ref-img" alt="placeholder image"
              src='https://images.unsplash.com/photo-1565194637906-8f45f3351a5d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img>

          </div>

          <div className='ref-name'>
            <p className='rname-style'>{ref.full_name} </p>
          </div>

          <div className='ref-facts'>
            <p className='ref-style'>
              ref fact
              <br />
              {ref.ref_fact}
              </p>
              <br /> 

            <p className='ref-style'>@instagram handle</p> 
            
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
