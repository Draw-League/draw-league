import React from "react";
import "./ProBest.css";

function ProBest() {
  return (
    <div className="winners">
      <div className="winners-top">
        <button
          className="judge-view-title winners-title"
          onClick={() => window.location.reload()}
        >
          TOP DRAWING
        </button>
        <button
          className="judge-view-title winners-title best-link"
          
        >
          REVEAL LEADERBOARD
        </button>
      </div>
      <div className="winners-list">
        <div
          className="winner"
          style={{
            
          }}
        >
          <div className="winner-drawing">
            <img className="best-img" src="https://images.unsplash.com/photo-1724666696560-aec1b5732c92?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
          <div className="winner-name">team panda</div>
         
        </div>
      </div>
      <button
          className="judge-view-title winners-title best-link best-exit"
          
        >
          EXIT
        </button>
    </div>
  );
}

export default ProBest;
