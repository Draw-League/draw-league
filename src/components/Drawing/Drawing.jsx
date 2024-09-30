import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import DrawingRound1 from './DrawingRound1';
import DrawingRound2 from './DrawingRound2';
import DrawingRound3 from './DrawingRound3';

const socket = io('/socket.io');

function Drawing() {
  const [currentRound, setCurrentRound] = useState(1);

  useEffect(() => {
    socket.on('roundChange', (newRound) => {
      setCurrentRound(newRound);
    });

    return () => {
      socket.off('roundChange');
    };
  }, []);

  const renderRoundComponent = () => {
    switch (currentRound) {
      case 1:
        return <DrawingRound1 />;
      case 2:
        return <DrawingRound2 />;
      case 3:
        return <DrawingRound3 />;
      default:
        return <div>Invalid round</div>;
    }
  };

  return (
    <div>
      {renderRoundComponent()}
    </div>
  );
}

export default Drawing;
