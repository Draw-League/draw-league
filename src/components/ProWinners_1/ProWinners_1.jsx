import React from "react";
import "./ProWinners_1.css";
import "../ProWinners/ProWinners.css";
import logo from "../LandingPage/drawleague.png";

function ProWinners_1() {
  const winners = [
    {
      name: "team panda",
      position: 1,
      drawing_url:
        "https://images.unsplash.com/photo-1724666696560-aec1b5732c92?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      <button className="next-button">Next</button>
    </div>
  );
}

export default ProWinners_1;

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
          <div className="no-image">No Image Available</div>
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



