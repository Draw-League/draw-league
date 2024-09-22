import React from "react";
import "./JudgeScore.css";
import Slider from '@mui/material/Slider';
function JudgeScore({submission,gonext,goprevious,index}) {
  const [score, setScore] = React.useState(submission.score ||70);

  const changeScore = (event, newValue) => {
    setScore(newValue);
  };

  const [isFavorite, setisFavorite] = React.useState( submission.favorite_drawing ||false);
  return (
    <div className="container judge-score">
      <div className="judge-score-nav">
        <button onClick={goprevious} className="judge-button-gray"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-left"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>PREVIOUS</button>
        <button onClick={gonext} className="judge-button-gray judge-button-next">NEXT <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg></button>
      </div>
      <div className="judge-score-content">
        <div className="submission-drawing score-drawing">
          <img src={submission.drawing_url} alt="" />
        </div>
        <div className="judge-score-right">
          <div className="judge-score-details">
            <span>Prompt {submission.round}</span>
            <span>#{index}</span>
            <span>Team {submission.team_id}</span>
          </div>
          <div className="judge-score-actions">
            <Slider
              value={score}
              onChange={changeScore}
              valueLabelDisplay="auto"
              sx={{
                color: "white",
                width:"90%",
                margin:"0 auto"
              }}
            />
            <div className="judge-score-buttons">
              <button className="judge-button-favorite">
                {isFavorite ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                    height={40}
                    width={40}
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                    width={40}
                    height={40}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                )}{" "}
                Favorite
              </button>
              <button className="judge-button-gray">SCORE IT!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JudgeScore;
