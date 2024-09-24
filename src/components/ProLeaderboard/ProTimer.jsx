import React, { useState, useEffect, useRef } from 'react';


const Timer = () => {
  const [time, setTime] = useState(900000);
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
      setTime(900000); 
    } else {
      // Starts the Timer
      setIsActive(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            return 0;
          }
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
        {isActive ? 'Reset Timer' : 'Start Timer'}
      </button>
    </div>
  );
};

export default Timer;