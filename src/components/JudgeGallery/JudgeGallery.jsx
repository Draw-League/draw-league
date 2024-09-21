import React, { useState } from "react";
import "./JudgeGallery.css";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function JudgeGallery() {
  const [showoptions, setshowoptions] = useState({
    promptone: true,
    prompttwo: false,
    promptthree: false,
    notscored: false,
    favorites: false,
  });
  return (
    <div className="container judge-view">
      <div className="judge-left">
        <h1 className="judge-view-title">JUDGE DASHBOARD</h1>
        <div className="judge-options">
          <JudgeOption
            value={showoptions.promptone}
            onchange={(value) =>
              setshowoptions({ ...showoptions, promptone: value })
            }
            text="Prompt 1"
          />
          <JudgeOption
            value={showoptions.promptwo}
            onchange={(value) =>
              setshowoptions({ ...showoptions, promptwo: value })
            }
            text="Prompt 2"
          />
          <JudgeOption
            value={showoptions.prompthree}
            onchange={(value) =>
              setshowoptions({ ...showoptions, prompthree: value })
            }
            text="Prompt 3"
          />
          <JudgeOption
            value={showoptions.notscored}
            onchange={(value) =>
              setshowoptions({ ...showoptions, notscored: value })
            }
            text="Not Scored"
          />
          <JudgeOption
            value={showoptions.favorites}
            onchange={(value) =>
              setshowoptions({ ...showoptions, favorites: value })
            }
            text="Favorites"
          />
        </div>
      </div>
      <div className="judge-right">
        <h1>hello</h1>
      </div>
    </div>
  );
}

export default JudgeGallery;

function JudgeOption({ text, value, onchange }) {
  return (
    <FormControlLabel
      sx={{
        color: "white",
        fontSize:"24px",
        fontWeight:"600"
      }}
      
      control={
        <Checkbox
          sx={{
            accentColor: "#C3DD00",
            color: "#C3DD00",
          }}
          color="succes"
          value={value}
          onChange={(e) => onchange(e.target.checked)}
        />
      }
      label={text}
    />
  );
}
