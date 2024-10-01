import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo from './Contact-PH.png';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function ProContactUs({socket}) {
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
            history.push('/'); 
          }
          else if(direction === 'back') {
            history.push('/ProBest');
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
    <div className="contactus-container">
      <div>
      <img src={logo} alt="Contact Place Holder" className="ContactUs-Info" />
      </div>
    </div>
  );
}

export default ProContactUs;
