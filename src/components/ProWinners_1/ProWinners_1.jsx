import React from "react";
import "./ProWinners_1.css";
import logo from "../LandingPage/drawleague.png";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function ProWinners_1({ socket }) {


  const dispatch = useDispatch();
  const currentGame = useSelector((store) => store.currentGame)
  const history = useHistory();

  console.log(currentGame);

  //Get the winners and put them in the currentGame reducer.
  const fetchWinners = () => {
    axios.get(`/api/events/${currentGame.event_id}/winners`)
      .then((response) => {
        const winners = {
          firstPlaceName: response.data[0].teamName,
          firstPlaceScore: response.data[0].totalScore,
          firstPlaceId: response.data[0].teamId,
          firstPlaceUrl: response.data[0].drawingUrl,
          secondPlaceName: response.data[1].teamName,
          secondPlaceScore: response.data[1].totalScore,
          secondPlaceId: response.data[1].teamId,
          secondPlaceUrl: response.data[1].drawingUrl,
          thirdPlaceName: response.data[2].teamName,
          thirdPlaceScore: response.data[2].totalScore,
          thirdPlaceId: response.data[2].teamId,
          thirdPlaceUrl: response.data[2].drawingUrl
        };
        dispatch({ type: 'ADD_WINNERS_TO_CURRENT_GAME', payload: winners });
      })
      .catch((err) => {
        console.log('Error fetching winners:', err);
        alert("Error fetching the winners");
      })
  };

  useEffect(() => {
    if (currentGame) {
      fetchWinners();
    }
  }, []);


  useEffect(() => {
    if (socket) {
      const handleNavigation = (direction) => {
        console.log(`Navigating to: ${direction}`);
        if (direction === 'next') {
          history.push('/ProWinners_2');
        }
        else if (direction === 'back') {
          history.push('/ProPrompt3Rev');
        }
      };

      socket.on('navigate', handleNavigation);
      console.log('socket.id', socket.id);
      return () => {
        socket.off('navigate', handleNavigation);
      };
    }
  }, [socket, history]);

  const winners = [
    {
      name: currentGame.firstPlaceName,
      score: currentGame.firstPlaceScore,
      position: 1,
      drawing_url: currentGame.firstPlaceUrl
    },
    {
      name: "???",
      score: currentGame.secondPlaceScore,
      position: 2,
      drawing_url: currentGame.secondPlaceUrl
    },
    {
      name: "???",
      score: currentGame.thirdPlaceScore,
      position: 3,
      drawing_url: currentGame.thirdPlaceUrl
    },
  ];
  return (
    <div className="winners">
      <div className="winners-top">
        <button
          className="judge-view-title winners-title"
          onClick={() => window.location.reload()}
        >
          WINNERS
        </button>
        <img src={logo} className="nav-logo winners-logo" />
      </div>
      <div className="winners-list">
        {winners.map((x) => (
          <Podium winner={x} />
        ))}
      </div>
    </div>
  );
}

export default ProWinners_1;

function Podium({ winner }) {
  return (
    <div
      className={`winner ${winner.position === 3 ? 'prowinner_1-winner_3' : winner.position === 2 ? 'prowinner_1-winner_2' : 'prowinner_1-winner_1'}`}

      style={{
        order: winner.position === 1 ? 2 : winner.position === 2 ? 1 : 3 // Winner 1 is centered, Winner 2 is on the left
      }}
    >
      <div className="winner-drawing">
        {winner.drawing_url ? (
          <img src={winner.drawing_url} alt={`${winner.name} drawing`} />
        ) : (
          <div className="no-image"></div>
        )}
      </div>

      <div className="winner-name">{winner.name}</div>

      <div
        className="winner-position"
        style={{
          height: winner.position === 1 ? "150px" : winner.position === 2 ? "100px" : "50px",
        }}
      >
        {winner.score}
      </div>
    </div>
  );
}



