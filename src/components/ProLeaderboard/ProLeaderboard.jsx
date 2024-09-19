import { useEffect } from 'react';
import './ProLeaderboard.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function ProLeaderboard({socket}) {
  useEffect(() => {
    // Add the listener when we load the page
    if(socket) {
      socket.on('hello', (world) => {
        console.log('hello', world);
        // history.push...
      })
    } else {
      console.error('Socket not connected!!!')
    }
    // Turn off the listener when we leave the page
    return () => socket && socket.off('hello');
  }, []);
  
  const sendNextPage = () => {
    if(socket) {
        socket.emit('navigate', 'HelloWorld');
    }
  }
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
