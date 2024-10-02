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
    const ref = useSelector((store) => store.projectionReducer);
    const currentGame = useSelector((store) => store.currentGame)

    const history = useHistory();
  
    const eventId = currentGame.event_id
    
   useEffect(() => {
    dispatch({ type: 'FETCH_WINNERS', payload: eventId });
  }, [dispatch, eventId]);
  
    useEffect(() => {
      if (socket) {
        const handleNavigation = (direction, currentGameIn) => {
          console.log(`Navigating to: ${direction}`);
          console.log(`currentGame:`, currentGameIn);
          if(direction === 'next') {
            history.push('/ProContactUs'); 
          }
          else if(direction === 'back') {
            history.push('/ProWinners_3');
          }
        };
  
        socket.on('navigate', handleNavigation);
        console.log('socket.id', socket.id);
        return () => {
          socket.off('navigate', handleNavigation);
        };
      }
    }, [socket, history]);

  const winners = useSelector((store) => store.winnersReducer);
  
  

 

console.log('Drawings from db:', winners)

  const favoriteWinner = winners.find(winner => winner.favorite_drawing === true);
console.log(favoriteWinner);
  return (
    <div className="winners">
      <div className="winners-top">
        <button
          className="judge-view-title winners-title"
          onClick={() => window.location.reload()}
        >
          TOP DRAWING
        </button>
        {/* <button
          className="judge-view-title winners-title best-link"
          
        >
          REVEAL LEADERBOARD
        </button> */}
      </div>
      <div className="winners-list">
        <div
          className="winner"
          style={{
            
          }}
        >
          <div className="winner-drawing">
            <img className="best-img" src={favoriteWinner.drawing_url} alt="" />
          </div>
          <div className="winner-name">{favoriteWinner.team_name}</div>
         
        </div>
      </div>
      
    </div>
  );
}

export default ProBest;
