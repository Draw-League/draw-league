import React, { useState, useEffect } from 'react';
import './ProTimer.css';

const DEFAULT_CLOCK_TIME = 900000; // 900000ms = 15min
const Timer = ({ socket }) => {
  const [time, setTime] = useState(DEFAULT_CLOCK_TIME);

  // Convert milliseconds to MM:SS:ms
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');

    return `${minutes}:${seconds}:${milliseconds}`;
  };

  useEffect(() => {
    // Add the listener when we load the page
    if (socket) {
        socket.on('setTime', (timeRemaining) => {
            console.log('setTime', timeRemaining);
            setTime(timeRemaining);
        });
    } else {
      console.error('Socket not connected!!!')
    }
    // Turn off the listener when we leave the page
    return () => socket && socket.off('navigate');

  }, []);

  return (
    <div className="timer-container">
      <h1 className="timer-display">{formatTime(time)}</h1>
    </div>
  );
};

export default Timer;
