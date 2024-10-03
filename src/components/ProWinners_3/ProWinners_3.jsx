import React from "react";
import "./ProWinners_3.css";
import logo from "../LandingPage/drawleague.png";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function ProWinners_3({ socket }) {

  const dispatch = useDispatch();
  const currentGame = useSelector((store) => store.currentGame)
  const history = useHistory();

  console.log({ currentGame });

  useEffect(() => {
    if (currentGame) {
      dispatch({ type: "FETCH_REFS", payload: { currentGame } });
    }
  }, [currentGame, dispatch]);

  useEffect(() => {
    if (socket) {
      const handleNavigation = (direction) => {
        console.log(`Navigating to: ${direction}`);
        if (direction === 'next') {
          history.push('/ProBest');
        }
        else if (direction === 'back') {
          history.push('/ProWinners_2');
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
      name: currentGame.secondPlaceName,
      score: currentGame.secondPlaceScore,
      position: 2,
      drawing_url: currentGame.secondPlaceUrl
    },
    {
      name: currentGame.thirdPlaceName,
      position: 3,
      score: currentGame.thirdPlaceScore,
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

export default ProWinners_3;

function Podium({ winner }) {
  return (
    <div
      className={`winner ${winner.position === 3 ? 'winner_3' : winner.position === 2 ? 'winner_2' : 'winner_1'}`}

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
