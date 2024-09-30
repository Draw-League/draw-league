import React from "react";
import "./ProWinners.css";
import logo from "../LandingPage/drawleague.png";

function ProWinners() {
  const winners = [
    {
      name: "team panda",
      position: 1,
      drawing_url:
        "https://images.unsplash.com/photo-1724666696560-aec1b5732c92?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "team cake",
      position: 2,
      drawing_url:
        "https://images.unsplash.com/photo-1724666696560-aec1b5732c92?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "team yuka",
      position: 3,
      drawing_url:
        "https://images.unsplash.com/photo-1724666696560-aec1b5732c92?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

export default ProWinners;

function Podium({ winner }) {
  return (
    <div className="winner" style={{ order:winner.position===1?1:winner.position===2?0:2}}>
      <div className="winner-drawing">
        <img src={winner.drawing_url} alt="" />
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
      {/* <button onClick={() => history.push('/probest')}>x</button> */}
    </div>
  );
}
