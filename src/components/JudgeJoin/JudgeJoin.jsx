import React, { useState } from 'react';
import './JudgeJoin.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav.jsx';

function JudgeJoin() {
  const [judgeName, setJudgeName] = useState('');
  const [judgeCode, setJudgeCode] = useState('');
  const [judgeJob, setJudgeJob] = useState('');
  const [judgeLike, setJudgeLike] = useState('');
  const [judgeKnow, setJudgeKnow] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!judgeCode) {
      setErrorMessage('Please enter a judge code.');
      return;
    }

    try {
      const response = await axios.post('/api/events/verify-judge-code', { judgeCode });

      if (response.data.success) {
        const eventId = response.data.eventId;
        console.log(response.data);       

          history.push({
            pathname: `/judgegallery/${eventId}`,
            state: {
              judgeCode,
              eventId,
            }
          });
        
        
      } else {
        setErrorMessage('Invalid judge code. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying judge:', error);
      setErrorMessage('Error verifying judge, please enter code again.');
    }
  };

  return (
    <div>

    <Nav />

    <div className="container-join-game">      
      <div className="join-game-box">JOIN A GAME</div>
      <div className="join-game-content">
        <p className='join-game-subtitle'>ENTER JUDGE CODE</p>
        <form className='join-game-form' onSubmit={handleSubmit}>
          
          <input
            type="text"
            placeholder='JUDGE CODE'
            value={judgeCode}
            onChange={(e) => setJudgeCode(e.target.value)}
          />
          <button type='submit'>PLAY!</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
    </div>
  );
}

export default JudgeJoin;
