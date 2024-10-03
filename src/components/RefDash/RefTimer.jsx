import React, { useState, useEffect, useRef } from 'react';
import './ProTimer.css';

const DEFAULT_CLOCK_TIME = 900000; // 900000ms = 15min
const RefTimer = ({ socket }) => {
  const [time, setTime] = useState(DEFAULT_CLOCK_TIME);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  // Convert milliseconds to MM:SS:ms
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');

    return `${minutes}:${seconds}:${milliseconds}`;
  };

  const handleButtonClick = () => {
    if (isActive) {
      // Resets the Timer
      clearInterval(intervalRef.current);
      setIsActive(false);
      setTime(DEFAULT_CLOCK_TIME);
      socket.emit('setTime', DEFAULT_CLOCK_TIME)
    } else {
      // Starts the Timer
      setIsActive(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            setTime(DEFAULT_CLOCK_TIME);
            socket.emit('setTime', DEFAULT_CLOCK_TIME)
            return 0;
          }
          // Every 50 ticks of the interval, we'll emit the time remaining.
          // Any slower and we don't see the last digit on the client clock move.
          // Any faster and we bog down the system.
          (prevTime % 50 === 0) ? socket.emit('setTime', prevTime) : null;
          return prevTime - 10;
        });
      }, 10);
    }
  };


  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="timer-container">
      <h1 className="timer-display">{formatTime(time)}</h1>
      <button className="timer-button" onClick={handleButtonClick}>
        {isActive ? 'Reset Timer' : 'START CLOCK'}
      </button>
    </div>
  );
};

export default RefTimer;
