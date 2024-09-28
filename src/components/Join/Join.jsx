import React, { useState } from 'react';
import './Join.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import NavPlayer from '../NavPlayer/NavPlayer';

function Join() {
  const [teamName, setTeamName] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!teamName || !gameCode) {
      setErrorMessage('Please enter both team name and game code.');
      return;
    }

    try {
      const response = await axios.post('/api/events/verify-game-code', { gameCode });

      if (response.data.success) {
        const eventId = response.data.eventId;

        const teamResponse = await axios.post('/api/teams/verify-or-add-team', { teamName, eventId });

        if (teamResponse.data.success) {
          history.push({
            pathname: '/drawing',
            state: {
              teamName,
              gameCode,
              eventId,
              teamId: teamResponse.data.teamId
            }
          });
        } else {
          setErrorMessage('Error creating or verifying team.');
        }
      } else {
        setErrorMessage('Invalid game code. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying game code or team:', error);
      setErrorMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="container join-game">
      <NavPlayer />
      <div className="join-game-box">JOIN A GAME</div>
      <div className="join-game-content">
        <p className='join-game-subtitle'>ENTER TEAM NAME & <br /> GAME CODE TO PLAY</p>
        <form className='join-game-form' onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder='TEAM NAME'
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <input
            type="text"
            placeholder='GAME CODE'
            value={gameCode}
            onChange={(e) => setGameCode(e.target.value)}
          />
          <button type='submit'>PLAY!</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Join;
