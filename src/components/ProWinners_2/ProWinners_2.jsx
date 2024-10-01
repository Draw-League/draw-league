import React from "react";
import "./ProWinners_2.css";
import logo from "../LandingPage/drawleague.png";

function ProWinners_2() {
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

export default ProWinners_2;

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
        {winner.position}
      </div>
    </div>
  );
}


