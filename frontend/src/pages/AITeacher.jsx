import { useState } from "react";
import "./aiTeacher.css";

function AITeacher() {

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const askTeacher = () => {

    const q =
      question.toLowerCase();

    if (
      q.includes("rational number")
    ) {

      setAnswer(
        "A rational number is any number that can be written as p/q where q is not zero. Examples: 1/2, 3/4, -5/2."
      );

    } else if (
      q.includes("photosynthesis")
    ) {

      setAnswer(
        "Photosynthesis is the process by which green plants prepare food using sunlight, water and carbon dioxide."
      );

    } else if (
      q.includes("noun")
    ) {

      setAnswer(
        "A noun is a naming word. Example: Ram, School, Book, India."
      );

    } else {

      setAnswer(
        "🤖 Sorry, I don't know this yet. Real AI integration will be added soon."
      );

    }
  };

  return (
    <div className="ai-page">

      <div className="ai-card">

        <h1>
          🤖 AI Teacher
        </h1>

        <p>
          Ask any question about
          your subjects.
        </p>

        <textarea
          placeholder="Ask your question..."
          value={question}
          onChange={(e) =>
            setQuestion(
              e.target.value
            )
          }
        />

        <button
          onClick={askTeacher}
        >
          Ask AI
        </button>

        {answer && (

          <div className="answer-box">

            <h3>
              AI Answer
            </h3>

            <p>
              {answer}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default AITeacher;