import React from "react";
import "./ProWinners_3.css";
import logo from "../LandingPage/drawleague.png";
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function ProWinners_3({socket}) {


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
          history.push('/ProBest'); 
        }
        else if(direction === 'back') {
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
      name: "team panda",
      position: 1,
      drawing_url:
        "",
    },
    {
      name: "team cake",
      position: 2,
      drawing_url:
        "",
    },
    {
      name: "team yuka",
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

export default ProWinners_3;

function Podium({ winner }) {
  return (
    <div className="winner" style={{ order:winner.position===1?1:winner.position===2?0:2}}>
      <div className="winner-drawing">
       
      </div>
      <div className="winner-name">{winner.name}</div>
      <div
        className="winner-position"
        style={{
          height: `${
            winner.position === 1
              ? "150px"
              : winner.position === 2
              ? "100px"
              : "50px"
          }`,
         
        }}
      >
        {winner.position}
      </div>
    </div>
  );
}
