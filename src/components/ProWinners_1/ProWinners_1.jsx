import React from "react";
import "./ProWinners_1.css";
import logo from "../LandingPage/drawleague.png";
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function ProWinners_1({socket}) {


  const dispatch = useDispatch();
  const currentGame = useSelector((store) => store.currentGame)
  const ref = useSelector((store) => store.projectionReducer);
  const history = useHistory();

console.log({currentGame});

  useEffect(() => {
    if(currentGame){
    dispatch({ type: "FETCH_REFS", payload: {currentGame} });}
  }, [currentGame, dispatch]);


  useEffect(() => {
    if (socket) {
      const handleNavigation = (direction) => {
        console.log(`Navigating to: ${direction}`);
        if(direction === 'next') {
          history.push('/ProWinners_2'); 
        }
        else if(direction === 'back') {
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
      name: "team panda",
      position: 1,
      drawing_url:
        ""  ,  
      },
    {
      name: "???",
      position: 2,
      drawing_url:
        "",   
      },
    {
      name: "???",
      position: 3,
      drawing_url:
        "",
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

let animal
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
        {winner.position}
      </div>
    </div>
  );
}



