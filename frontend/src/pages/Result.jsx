import "./result.css";

function Result() {

  const score =
    localStorage.getItem(
      "lastQuizScore"
    ) || 0;

  return (
    <div className="result-page">

      <div className="result-card">

        <h1>🎉 Quiz Completed</h1>

        <div className="result-score">
          Score: {score}
        </div>

        <div className="result-xp">
          +{score * 10} XP Earned
        </div>

      </div>

    </div>
  );
}

export default Result;