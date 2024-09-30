import React from "react";
import "./ProWinners_3_q.css";
import "../ProWinners/ProWinners.css";
import logo from "../LandingPage/drawleague.png";

function ProWinners_3_q() {
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

export default ProWinners_3_q;

function Podium({ winner }) {
  return (
    <div 
      className={`winner ${winner.position === 3 ? 'winner_3' : ''}`} 
      style={{ order: winner.position === 1 ? 1 : winner.position === 2 ? 2 : 3 }}
    >
      <div className="winner-drawing">
        {winner.drawing_url ? (
          <img src={winner.drawing_url} alt={`${winner.name} drawing`} />
        ) : (
          <div>No Image Available</div> // Or you can leave it empty if you don't want to display anything
        )}
      </div>

      <div className="winner-name">{winner.name}</div>
      
      <div
        className="winner-position"
        style={{
          height: winner.position === 1 ? "100px" : winner.position === 2 ? "150px" : "50px",
          order: winner.position === 1 ? 1 : winner.position === 2 ? 2 : 3
        }}
      >
        {winner.position === 1 ? 2 : winner.position === 2 ? 1 : 3} {/* Display correct number */}
      </div>
    </div>
    
  );
}


