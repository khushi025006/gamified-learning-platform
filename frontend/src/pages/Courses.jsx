import "./courses.css";
import { useNavigate } from "react-router-dom";
import { subjectsByClass } from "../data/subjects";

function Courses() {

  const navigate = useNavigate();

  const student =
    JSON.parse(localStorage.getItem("student")) || {};

  const studentClass =
    student.studentClass || "1";

  const subjects =
    subjectsByClass[studentClass] || [];

  return (
    <div className="courses-page">

      <div className="courses-header">
        <h1>
          📚 Class {studentClass} Subjects
        </h1>

        <p>
          Select a subject and start
          earning XP rewards.
        </p>
      </div>

      <div className="courses-grid">

        {subjects.map((subject, index) => (

          <div
            className="course-card"
            key={index}
          >

            <div className="course-icon">
              {subject.split(" ")[0]}
            </div>

            <h2>{subject}</h2>

            <p className="level">
              Class {studentClass}
            </p>

            <div className="progress-container">

              <div
                className="progress-fill"
                style={{ width: "0%" }}
              ></div>

            </div>

            <p>0% Complete</p>

            <div className="xp-reward">
              🏆 Reward: 100 XP
            </div>

            <button
              className="start-btn"
              onClick={() =>
                navigate(
                  `/app/subject/${encodeURIComponent(subject)}`
                )
              }
            >
              Start Challenge 🚀
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Courses;