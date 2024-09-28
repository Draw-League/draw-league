import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import axios from "axios";
import "./JudgeScore.css";

function JudgeScore({ submission, gonext, goprevious, index, setSubmissions }) {
  const [score, setScore] = useState(submission.score || 50);
  const [isFavorite, setIsFavorite] = useState(submission.favorite_drawing || false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isSubmitting) {
      setScore(submission.score || 50);
      setIsFavorite(submission.favorite_drawing || false);
    }
  }, [submission]);

  const scoreSubmission = () => {
    setIsSubmitting(true);
    axios
      .put(`/api/drawings/${submission.id}/score`, { score })
      .then((response) => {
        console.log("Score updated:", response.data);

        setSubmissions((prevSubmissions) =>
          prevSubmissions.map((sub) =>
            sub.id === submission.id ? { ...sub, score: score } : sub
          )
        );
        
        alert('Score successfully updated!');
        
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("Error updating score:", error);
        setIsSubmitting(false);
        alert('Error updating score. Please try again.');
      });
  };

  const toggleFavorite = () => {
    const updatedFavorite = !isFavorite;
    setIsFavorite(updatedFavorite);

    axios
      .put(`/api/drawings/${submission.id}/favorite`, { favorite: updatedFavorite })
      .then((response) => {
        console.log('Favorite updated:', response.data);

        setSubmissions((prevSubmissions) =>
          prevSubmissions.map((sub) =>
            sub.id === submission.id ? { ...sub, favorite_drawing: updatedFavorite } : sub
          )
        );
      })
      .catch((error) => {
        console.error('Error updating favorite:', error);
      });
  };

  const changeScore = (event, newValue) => {
    setScore(newValue);
  };

  return (
    <div className="judge-score">
      <div className="judge-score-nav">
        <button onClick={goprevious} className="judge-button-gray">PREVIOUS</button>
        <button onClick={gonext} className="judge-button-gray judge-button-next">NEXT</button>
      </div>
      <div className="judge-score-content">
        <div className="submission-drawing score-drawing">
          <img src={submission.drawing_url} alt="" />
        </div>
        <div className="judge-score-right">
          <div className="judge-score-details">
            <span>Prompt {submission.round}</span>
            <span>#{index}</span>
            <span>Team {submission.team_name}</span>
          </div>
          <div className="judge-score-actions">
            <Slider
              value={score}
              onChange={changeScore}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              sx={{ color: "white", width: "90%", margin: "0 auto" }}
            />
            <div className="judge-score-buttons">
              <button className="judge-button-favorite" onClick={toggleFavorite}>
                {isFavorite ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                    height={40}
                    width={40}
                  >
                    <path d="M11.645 20.91a25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17z" />
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
              </button>
              <button onClick={scoreSubmission} className="judge-button-gray">
                SCORE IT!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JudgeScore;
