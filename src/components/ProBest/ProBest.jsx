import React from 'react';
import './ProBest.css';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function ProBest({socket}) {

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
            history.push('/ProContactUs'); 
          }
          else if(direction === 'back') {
            history.push('/ProWinners');
          }
        };
  
        socket.on('navigate', handleNavigation);
        console.log('socket.id', socket.id);
        return () => {
          socket.off('navigate', handleNavigation);
        };
      }
    }, [socket, history]);

  const winners = useSelector((store) => store.adminDashReducer);
  


  useEffect(() => {
    dispatch({ type: 'FETCH_WINNERS' });
  }, [dispatch]);

  return (
    <div className="winners">
      <div className="winners-top">
        <button
          className="judge-view-title winners-title"
          onClick={() => window.location.reload()}
        >
          TOP DRAWING
        </button>
        <button
          className="judge-view-title winners-title best-link"
          
        >
          REVEAL LEADERBOARD
        </button>
      </div>
      <div className="winners-list">
        <div
          className="winner"
          style={{
            
          }}
        >
          <div className="winner-drawing">
            <img className="best-img" src="https://images.unsplash.com/photo-1724666696560-aec1b5732c92?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
          <div className="winner-name">team panda</div>
         
        </div>
      </div>
      <button
          className="judge-view-title winners-title best-link best-exit"
          
        >
          EXIT
        </button>
    </div>
  );
}

export default ProBest;
