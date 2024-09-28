import { useEffect } from 'react';
import './ProLeaderboard.css';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import RefDash from '../RefDash/RefDash';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function ProLeaderboard({socket}) {
  const history = useHistory();
  useEffect(() => {
    if (socket) {
      const handleNavigation = (direction) => {
        console.log(`Navigating to: ${direction}`);
        if(direction === 'next') {
          history.push('/ProRules'); 
        }
        else if(direction === 'back') {
          history.push('/user');
        }
      };

      socket.on('navigate', handleNavigation);
      console.log('socket.id', socket.id);
      return () => {
        socket.off('navigate', handleNavigation);
      };
    }
  }, [socket, history]);
  // useEffect(() => {
  //   // Add the listener when we load the page
  //   if(socket) {
  //     socket.on('hello', (world) => {
  //       console.log('hello');
  //       console.log('socket connected!', socket.id);
  //       // history.push...
  //       history.push('/user');
  //     })
  //   } else {
  //     console.error('Socket not connected!!!')
  //   }
  //   // Turn off the listener when we leave the page
  //   return () => socket && socket.off('hello');
  // }, [socket, history]);
  
  // const sendNextPage = () => {
  //   if(socket) {
  //       socket.emit('navigate', 'HelloWorld3');
      
  //   }
  // }
  return (
    <div className="container">
      <div>
        <p>This the projector leaderboard</p>
        <p>This will get</p>
        <button onClick={sendNextPage}>Emit Socket Event</button>
      </div>
    </div>
  );
}

export default ProLeaderboard;
