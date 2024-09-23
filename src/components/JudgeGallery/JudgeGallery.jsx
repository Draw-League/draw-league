import React, { useEffect, useState } from "react";
import "./JudgeGallery.css";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import JudgeScore from "../JudgeScore/JudgeScore";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function JudgeGallery() {
  // filter options for the submissions
  const [showoptions, setshowoptions] = useState({
    promptone: false,
    prompttwo: false,
    promptthree: false,
    notscored: false,
    favorites: false,
  });

  // score range for the submissions
  const [score, setScore] = React.useState([0, 100]);

  const changeScore = (event, newValue) => {
    setScore(newValue);
  };

  // sample submissions - this will be replaced with the actual submissions from the saga
  const submissions = [
    {
      team_id: 0,
      id: 0,
      drawing_url:
        "https://images.unsplash.com/photo-1724666696560-aec1b5732c92?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      favorite_drawing: false,
      score: 75,
      round: 1,
      created_at: "2024-09-15 10:36:45.300527",
    },
    {
      team_id: 1,
      id: 1,
      drawing_url:
        "https://images.unsplash.com/photo-1724666696560-aec1b5732c92?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      favorite_drawing: true,
      score: 50,
      round: 2,
      created_at: "2024-09-15 10:36:45.300527",
    },
    {
      team_id: 0,
      id: 2,
      drawing_url:
        "https://images.unsplash.com/photo-1724666696560-aec1b5732c92?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      favorite_drawing: false,
      score: 75,
      round: 1,
      created_at: "2024-09-15 10:36:45.300527",
    },
    {
      team_id: 0,
      id: 3,
      drawing_url:
        "https://images.unsplash.com/photo-1724666696560-aec1b5732c92?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      favorite_drawing: false,
      score: 75,
      round: 1,
      created_at: "2024-09-15 10:36:45.300527",
    },
    {
      team_id: 2,
      id: 4,
      drawing_url:
        "https://images.unsplash.com/photo-1724666696560-aec1b5732c92?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      favorite_drawing: true,
      score: 30,
      round: 2,
      created_at: "2024-09-16 11:00:00.000000",
    },
    {
      team_id: 1,
      id: 5,
      drawing_url:
        "https://images.unsplash.com/photo-1724666696560-aec1b5732c92?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      favorite_drawing: false,
      score: 60,
      round: 1,
      created_at: "2024-09-16 11:10:00.000000",
    },
    {
      team_id: 2,
      id: 6,
      drawing_url:
        "https://images.unsplash.com/photo-1724666696560-aec1b5732c92?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      favorite_drawing: true,
      score: 80,
      round: 2,
      created_at: "2024-09-17 12:30:00.000000",
    },
    {
      team_id: 0,
      id: 7,
      drawing_url:
        "https://images.unsplash.com/photo-1724666696560-aec1b5732c92?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      favorite_drawing: false,
      score: 45,
      round: 1,
      created_at: "2024-09-17 13:45:00.000000",
    },
    {
      team_id: 1,
      id: 8,
      drawing_url:
        "https://images.unsplash.com/photo-1724666696560-aec1b5732c92?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      favorite_drawing: false,
      score: 50,
      round: 3,
      created_at: "2024-09-18 08:00:00.000000",
    },
    {
      team_id: 3,
      id: 9,
      drawing_url:
        "https://images.unsplash.com/photo-1724666696560-aec1b5732c92?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      favorite_drawing: true,
      score: 70,
      round: 2,
      created_at: "2024-09-18 09:15:00.000000",
    },
    {
      team_id: 2,
      id: 10,
      drawing_url:
        "https://images.unsplash.com/photo-1724666696560-aec1b5732c92?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      favorite_drawing: false,
      score: 55,
      round: 3,
      created_at: "2024-09-18 10:20:00.000000",
    },
    {
      team_id: 3,
      id: 11,
      drawing_url:
        "https://images.unsplash.com/photo-1724666696560-aec1b5732c92?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      favorite_drawing: true,
      score: 25,
      round: 1,
      created_at: "2024-09-19 14:45:00.000000",
    },
    {
      team_id: 0,
      id: 12,
      drawing_url:
        "https://images.unsplash.com/photo-1724666696560-aec1b5732c92?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      favorite_drawing: false,
      score: 75,
      round: 1,
      created_at: "2024-09-19 16:00:00.000000",
    },
  ];

  // hold the filtered submissions
  const [filteredSubmissions, setfilteredsubmissions] = useState(submissions);

  // logic to filter the submissions based on the filter options
  const getfilteredsubmissions = () => {
    // we first filter the submissions based on the active rounds
    const activerounds = [
      showoptions.promptone ? 1 : -1,
      showoptions.prompttwo ? 2 : -1,
      showoptions.promptthree ? 3 : -1,
    ];
    const roundsSubmissions = submissions.filter((x) =>
      activerounds.includes(x.round)
    );

    // then we filter the submissions based on whether they have been scored or not
    const notscoredsubmissions = roundsSubmissions.filter((x) =>
      showoptions.notscored ? x.score === 0 : x.score !== 0
    );

    // then we filter the submissions based on the favorite drawing
    const favoriteSubmissions = notscoredsubmissions.filter(
      (x) => x.favorite_drawing === showoptions.favorites
    );

    // then we filter the submissions based on the score range
    const scorerangesubmissions = favoriteSubmissions.filter(
      (x) => x.score >= score[0] && x.score <= score[1]
    );

    // return the filtered submissions
    return scorerangesubmissions;
  };

  // this useEffect will run whenever the filter options, score range or submissions change
  useEffect(() => {
    // first we check if any of the filter options are active or the score range is not the default
    if (
      !Object.values(showoptions).every((value) => value === false) ||
      score[0] !== 0 ||
      score[1] !== 100
    ) {
      setfilteredsubmissions(getfilteredsubmissions());
    } else {
      setfilteredsubmissions(submissions);
    }
  }, [showoptions, score, submissions]);

  const [showoverview, setshowoverview] = useState(false);
  const [currentsubmission, setcurrentsubmission] = useState(
    filteredSubmissions[0]
  );

  return (
    <div className="judge-view">
      <div className="judge-left">
        <h1 className="judge-view-title">JUDGE DASHBOARD</h1>
        <div className="judge-options">
          <JudgeOption
            value={showoptions.promptone}
            onchange={(value) => {
              setshowoptions({ ...showoptions, promptone: value });
            }}
            text="Prompt 1"
          />
          <JudgeOption
            value={showoptions.prompttwo}
            onchange={(value) => {
              setshowoptions({ ...showoptions, prompttwo: value });
            }}
            text="Prompt 2"
          />
          <JudgeOption
            value={showoptions.promptthree}
            onchange={(value) => {
              setshowoptions({ ...showoptions, promptthree: value });
            }}
            text="Prompt 3"
          />
          <JudgeOption
            value={showoptions.notscored}
            onchange={(value) => {
              setshowoptions({ ...showoptions, notscored: value });
            }}
            text="Not Scored"
          />
          <JudgeOption
            value={showoptions.favorites}
            onchange={(value) => {
              setshowoptions({ ...showoptions, favorites: value });
            }}
            text="Favorites"
          />
          <div className="judge-score-range">
            <div className="range-details">
              <span>Scored</span>
              <span>{`${score[0]} - ${score[1]}`}</span>
            </div>
            <Slider
              value={score}
              onChange={changeScore}
              valueLabelDisplay="auto"
              sx={{
                color: "white",
              }}
            />
          </div>
        </div>
      </div>
      {showoverview ? (
        <JudgeScore
          submission={currentsubmission}
          key={currentsubmission.id}
          gonext={() =>
            setcurrentsubmission(
              filteredSubmissions.findIndex(
                (x) => x.id === currentsubmission.id
              ) +
                1 ===
                filteredSubmissions.length
                ? filteredSubmissions[0]
                : filteredSubmissions[
                    filteredSubmissions.findIndex(
                      (x) => x.id === currentsubmission.id
                    ) + 1
                  ]
            )
          }
          goprevious={() =>
            setcurrentsubmission(
              filteredSubmissions.findIndex(
                (x) => x.id === currentsubmission.id
              ) -
                1 ===
                -1
                ? filteredSubmissions[0]
                : filteredSubmissions[
                    filteredSubmissions.findIndex(
                      (x) => x.id === currentsubmission.id
                    ) - 1
                  ]
            )
          }
          index={filteredSubmissions.findIndex(
            (x) => x.id === currentsubmission.id
          )}
        />
      ) : (
        <div className="judge-right">
          {filteredSubmissions.map((x, i) => (
            <Submission
              submission={x}
              index={i}
              showoverview={() => {
                setcurrentsubmission(x);
                setshowoverview(true);
              }}
            />
          ))}
          {filteredSubmissions.length === 0 && (
            <div className="no-submissions">No Submissions</div>
          )}
        </div>
      )}
    </div>
  );
}

export default JudgeGallery;

function JudgeOption({ text, value, onchange }) {
  return (
    <FormControlLabel
      sx={{
        color: "white",
        fontSize: "24px",
        fontWeight: "600",
      }}
      control={
        <Checkbox
          sx={{
            accentColor: "#C3DD00",
            color: "#C3DD00",
          }}
          color="succes"
          checked={value}
          onChange={(e) => onchange(e.target.checked)}
        />
      }
      label={text}
    />
  );
}

function Submission({ submission, index, showoverview }) {
  return (
    <div className="judge-submission" onClick={showoverview}>
      <div className="submission-title">
        <span>#{index}</span>
        <span>Prompt {submission.round}</span>
      </div>
      <div className="submission-drawing">
        <img src={submission.drawing_url} alt="" />
      </div>
      <div className="submission-details">
        <div className="submission-team">
          <span>Team {submission.team_id}</span>
          <span>Score {submission.score}</span>
        </div>
        {submission.favorite_drawing ? (
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
        )}
      </div>
    </div>
  );
}
