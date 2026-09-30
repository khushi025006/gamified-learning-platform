import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { quizzes } from "../data/quizzes";
import "./quiz.css";
function Quiz() {

  const navigate = useNavigate();

  const { subject, chapter } = useParams();

  const student =
    JSON.parse(localStorage.getItem("student")) || {};

  const studentClass =
    student.studentClass || "8";

  const questions =
    quizzes[studentClass]?.[
      decodeURIComponent(subject)
    ]?.[
      decodeURIComponent(chapter)
    ] || [];

  const [current, setCurrent] =
    useState(0);

  const [score, setScore] =
    useState(0);

  const handleAnswer = (option) => {

    if (
      option ===
      questions[current].answer
    ) {
      setScore(score + 1);
    }

    if (
      current + 1 <
      questions.length
    ) {
      setCurrent(current + 1);
    }
    else {

      localStorage.setItem(
        "lastQuizScore",
        score
      );

      navigate("/app/result");
    }
  };

 if (questions.length === 0) {
  return (
    <div className="quiz-not-found">
      Quiz Not Available
    </div>
  );
}

return (
  <div className="quiz-page">

    <div className="quiz-card">

      <h1 className="quiz-title">
        🎯 Quiz Challenge
      </h1>

      <p className="question-count">
        Question {current + 1} of {questions.length}
      </p>

      <div className="question">
        {questions[current].question}
      </div>

      <div className="options">
        {questions[current].options.map(
          (option, index) => (
            <button
              key={index}
              className="option-btn"
              onClick={() =>
                handleAnswer(option)
              }
            >
              {option}
            </button>
          )
        )}
      </div>

      <div className="score-box">
        Current Score: {score}
      </div>

    </div>

  </div>
);

  return (
    <div style={{ padding: "30px" }}>

      <h1>Quiz</h1>

      <h2>
        Question {current + 1}
      </h2>

      <p>
        {questions[current].question}
      </p>

      {questions[current].options.map(
        (option, index) => (
          <button
            key={index}
            onClick={() =>
              handleAnswer(option)
            }
            style={{
              display: "block",
              margin: "10px"
            }}
          >
            {option}
          </button>
        )
      )}

    </div>
  );
}

export default Quiz;