import { useParams } from "react-router-dom";
import { notesData } from "../data/notes";
import "./chapternotes.css";
import { useNavigate } from "react-router-dom";
function ChapterNotes() {

  const { subject, chapter } = useParams();

  const student =
    JSON.parse(localStorage.getItem("student")) || {};
const navigate = useNavigate();
  const studentClass =
    student.studentClass || "1";
    const markComplete = () => {

  const progress =
    JSON.parse(
      localStorage.getItem("progress")
    ) || [];

  const chapterId =
    `${studentClass}-${subject}-${chapter}`;

  if (!progress.includes(chapterId)) {

    progress.push(chapterId);

    localStorage.setItem(
      "progress",
      JSON.stringify(progress)
    );

    // 💎 Gems System
    const currentGems =
      Number(
        localStorage.getItem("gems")
      ) || 0;

    localStorage.setItem(
      "gems",
      currentGems + 5
    );

    alert(
      "🎉 Chapter Completed!\n\n+50 XP\n+5 Gems 💎"
    );
  }

  else {

    alert(
      "This chapter is already completed."
    );

  }
};

  const note =
    notesData[studentClass]?.[
      decodeURIComponent(subject)
    ]?.[
      decodeURIComponent(chapter)
    ];

  if (!note) {
    return (
      <div className="notes-page">
        <div className="notes-card">
          <h2>📚 Notes Not Available Yet</h2>
          <p>
            Learning material for this chapter
            will be added soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="notes-page">

      <div className="notes-card">

        <div className="chapter-badge">
          Class {studentClass}
        </div>

        <h1 className="notes-title">
          📖 {note.title}
        </h1>

        <p className="notes-content">
          {note.content}
        </p>

        <h2 className="examples-title">
          ✨ Examples
        </h2>

        <ul className="examples-list">
          {note.examples.map((example, index) => (
            <li key={index}>
              {example}
            </li>
          ))}
        </ul>

        <button
  className="complete-btn"
  onClick={markComplete}
>
  ✅ Mark Chapter Complete
</button>
<button
  className="complete-btn"
  onClick={() =>
    navigate(
      `/app/quiz/${encodeURIComponent(
        subject
      )}/${encodeURIComponent(
        chapter
      )}`
    )
  }
>
  🎯 Start Quiz
</button>
      </div>

    </div>
  );
}

export default ChapterNotes;