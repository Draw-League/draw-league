import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import JudgeScore from "../JudgeScore/JudgeScore";
import "./JudgeGallery.css";

function JudgeGallery() {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [showOverview, setShowOverview] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState(null);

  const [showoptions, setShowOptions] = useState({
    promptone: false,
    prompttwo: false,
    promptthree: false,
    notscored: false,
    favorites: false,
  });

  const [score, setScore] = useState([0, 100]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("/api/drawings/submissions");
        setSubmissions(response.data);
        setFilteredSubmissions(response.data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, []);

  const getFilteredSubmissions = () => {
    let filtered = submissions;

    const activeRounds = [];
    if (showoptions.promptone) activeRounds.push(1);
    if (showoptions.prompttwo) activeRounds.push(2);
    if (showoptions.promptthree) activeRounds.push(3);

    if (activeRounds.length > 0) {
      filtered = filtered.filter((x) => activeRounds.includes(x.round));
    }

    if (showoptions.favorites) {
      filtered = filtered.filter((x) => x.favorite_drawing === true);
    }

    if (showoptions.notscored) {
      filtered = filtered.filter((x) => x.score === 0);
    }

    filtered = filtered.filter(
      (x) => x.score >= score[0] && x.score <= score[1]
    );

    return filtered;
  };

  useEffect(() => {
    setFilteredSubmissions(getFilteredSubmissions());
  }, [showoptions, score, submissions]);

  const handleChangeScore = (event, newValue) => {
    setScore(newValue);
  };

  const toggleFavoriteInGallery = (event, submissionId) => {
    event.stopPropagation();

    const updatedSubmissions = submissions.map((submission) => {
      if (submission.id === submissionId) {
        const updatedFavorite = !submission.favorite_drawing;
        
        axios
          .put(`/api/drawings/${submission.id}/favorite`, { favorite: updatedFavorite })
          .then((response) => {
            console.log("Favorite updated:", response.data);
          })
          .catch((error) => {
            console.error("Error updating favorite:", error);
          });

        return { ...submission, favorite_drawing: updatedFavorite };
      }
      return submission;
    });

    setSubmissions(updatedSubmissions);
  };

  const handleShowOverview = (submission) => {
    setCurrentSubmission(submission);
    setShowOverview(true);
  };

  const goNext = () => {
    const currentIndex = filteredSubmissions.findIndex(
      (x) => x.id === currentSubmission.id
    );
    const nextIndex = (currentIndex + 1) % filteredSubmissions.length;
    setCurrentSubmission(filteredSubmissions[nextIndex]);
  };

  const goPrevious = () => {
    const currentIndex = filteredSubmissions.findIndex(
      (x) => x.id === currentSubmission.id
    );
    const prevIndex =
      (currentIndex - 1 + filteredSubmissions.length) %
      filteredSubmissions.length;
    setCurrentSubmission(filteredSubmissions[prevIndex]);
  };

  return (
    <div className="judge-view">
      {showOverview ? (
        <JudgeScore
          submission={currentSubmission}
          gonext={goNext}
          goprevious={goPrevious}
          index={filteredSubmissions.findIndex(
            (x) => x.id === currentSubmission.id
          )}
          setSubmissions={setSubmissions}
        />
      ) : (
        <div className="judge-right">
          {filteredSubmissions.map((submission, i) => (
            <div className="judge-submission" key={submission.id} onClick={() => handleShowOverview(submission)}>
              <div className="submission-title">
                <span>#{i + 1}</span>
                <span>Prompt {submission.round}</span>
              </div>
              <div className="submission-drawing">
                <img
                  src={submission.drawing_url}
                  alt={`Drawing ${i + 1}`}
                  width="200px"
                />
              </div>
              <div className="submission-details">
                <div className="submission-team">
                  <span>Team {submission.team_name}</span>
                  <span>Score {submission.score}</span>
                </div>
                <button
                  onClick={(event) => toggleFavoriteInGallery(event, submission.id)}
                  className="judge-button-favorite"
                >
                  {submission.favorite_drawing ? (
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
              </div>
            </div>
          ))}
          {filteredSubmissions.length === 0 && (
            <div className="no-submissions">No Submissions</div>
          )}
        </div>
      )}
      <div className="judge-left">
        <button
          className="judge-view-title"
          onClick={() => window.location.reload()}
        >
          JUDGE DASHBOARD
        </button>

        <div className="judge-options">
          <FormControlLabel
            sx={{ color: "white", fontSize: "24px", fontWeight: "600" }}
            control={
              <Checkbox
                sx={{ accentColor: "#C3DD00", color: "#C3DD00" }}
                color="success"
                checked={showoptions.promptone}
                onChange={(e) =>
                  setShowOptions({ ...showoptions, promptone: e.target.checked })
                }
              />
            }
            label="Prompt 1"
          />
          <FormControlLabel
            sx={{ color: "white", fontSize: "24px", fontWeight: "600" }}
            control={
              <Checkbox
                sx={{ accentColor: "#C3DD00", color: "#C3DD00" }}
                color="success"
                checked={showoptions.prompttwo}
                onChange={(e) =>
                  setShowOptions({ ...showoptions, prompttwo: e.target.checked })
                }
              />
            }
            label="Prompt 2"
          />
          <FormControlLabel
            sx={{ color: "white", fontSize: "24px", fontWeight: "600" }}
            control={
              <Checkbox
                sx={{ accentColor: "#C3DD00", color: "#C3DD00" }}
                color="success"
                checked={showoptions.promptthree}
                onChange={(e) =>
                  setShowOptions({ ...showoptions, promptthree: e.target.checked })
                }
              />
            }
            label="Prompt 3"
          />
          <FormControlLabel
            sx={{ color: "white", fontSize: "24px", fontWeight: "600" }}
            control={
              <Checkbox
                sx={{ accentColor: "#C3DD00", color: "#C3DD00" }}
                color="success"
                checked={showoptions.notscored}
                onChange={(e) =>
                  setShowOptions({ ...showoptions, notscored: e.target.checked })
                }
              />
            }
            label="Not Scored"
          />
          <FormControlLabel
            sx={{ color: "white", fontSize: "24px", fontWeight: "600" }}
            control={
              <Checkbox
                sx={{ accentColor: "#C3DD00", color: "#C3DD00" }}
                color="success"
                checked={showoptions.favorites}
                onChange={(e) =>
                  setShowOptions({ ...showoptions, favorites: e.target.checked })
                }
              />
            }
            label="Favorites"
          />

          <div className="judge-score-range">
            <div className="range-details">
              <span>Scored</span>
              <span>{`${score[0]} - ${score[1]}`}</span>
            </div>
            <Slider
              value={score}
              onChange={handleChangeScore}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              sx={{ color: "white" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JudgeGallery;
