import { useParams, useNavigate } from "react-router-dom";
import { chaptersByClass } from "../data/chapters";
import "./subjectdetails.css";

function SubjectDetails() {

  const navigate = useNavigate();

  const { subject } = useParams();

  const decodedSubject =
    decodeURIComponent(subject);

  const student =
    JSON.parse(localStorage.getItem("student")) || {};

  const studentClass =
    student.studentClass || "1";

  const chapters =
    chaptersByClass[studentClass]?.[
      decodedSubject
    ] || [];

  return (
    <div className="subject-page">

      <h1>{decodedSubject}</h1>

      <p>Class {studentClass}</p>

      <div className="chapter-list">

        {chapters.map((chapter, index) => (

          <div
            className="chapter-card"
            key={index}
          >

            <h3>{chapter}</h3>

            <p>
              Chapter available for learning
            </p>

            <button
              onClick={() =>
                navigate(
                  `/app/notes/${encodeURIComponent(
                    decodedSubject
                  )}/${encodeURIComponent(
                    chapter
                  )}`
                )
              }
            >
              Open Notes
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SubjectDetails;