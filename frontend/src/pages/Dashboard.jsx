import "./dashboard.css";
import { chaptersByClass } from "../data/chapters";

function Dashboard() {

  const student =
    JSON.parse(localStorage.getItem("student")) || {};

  const studentClass =
    student.studentClass || "1";

  const progress =
    JSON.parse(localStorage.getItem("progress")) || [];

  const completedChapters =
    progress.length;

  const streakData =
    JSON.parse(
      localStorage.getItem("streakData")
    ) || {
      streak: 0
    };

  const streak =
    streakData.streak;

  const streakBonus =
    streak * 10;
    const gems =
  Number(
    localStorage.getItem("gems")
  ) || 0;

  const xp =
    completedChapters * 50 +
    streakBonus;

  const level =
    Math.floor(xp / 200) + 1;

  const xpPercentage =
    Math.min(
      ((xp % 200) / 200) * 100,
      100
    );

  const subjectsByClass = {
    1: ["➕ Maths", "📖 English", "🎨 Drawing", "🌱 EVS"],
    2: ["➕ Maths", "📖 English", "🎨 Drawing", "🌱 EVS"],
    3: ["➕ Maths", "📖 English", "🌱 EVS", "💻 Computer"],
    4: ["➕ Maths", "📖 English", "🌱 EVS", "💻 Computer"],
    5: ["➕ Maths", "📖 English", "🔬 Science", "🌍 SST"],
    6: ["➕ Maths", "📖 English", "🔬 Science", "🌍 SST"],
    7: ["➕ Maths", "📖 English", "🔬 Science", "🌍 SST"],
    8: [
      "➕ Mathematics",
      "📖 English",
      "🔬 Science",
      "🌍 Social Studies",
      "💻 Computer"
    ],
    9: [
      "➕ Mathematics",
      "📖 English",
      "🔬 Science",
      "🌍 Social Studies",
      "💻 Computer"
    ],
    10: [
      "➕ Mathematics",
      "📖 English",
      "🔬 Science",
      "🌍 Social Studies",
      "💻 Computer"
    ]
  };

  return (
    <div className="dashboard">

      {/* Welcome */}
      <div className="welcome-card">

        <div>
          <h1>
            👋 Welcome {student.name || "Student"}!
          </h1>

          <p>
            Class {studentClass} Student
          </p>
        </div>

        <div className="level-box">
          ⭐ Level {level} Explorer
        </div>

      </div>

      {/* Stats */}
      <div className="stats-grid">

        <div className="stat-card">
          <h2>{completedChapters}</h2>
          <p>Completed Chapters</p>
        </div>

        <div className="stat-card">
          <h2>🔥 {streak}</h2>
          <p>Day Streak</p>
        </div>

        <div className="stat-card">
          <h2>⚡ {streakBonus}</h2>
          <p>Bonus XP</p>
        </div>

        <div className="stat-card">
          <h2>{xp}</h2>
          <p>Total XP</p>
        </div>
        <div className="stat-card">
  <h2>💎 {gems}</h2>
  <p>Total Gems</p>
</div>

      </div>

      {/* XP Progress */}
      <div className="xp-card">

        <h2>XP Progress</h2>

        <p>
          {xp % 200} / 200 XP
        </p>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${xpPercentage}%`
            }}
          ></div>

        </div>

      </div>

      {/* Daily Streak Rewards */}
      <div className="mission-card">

        <h2>🔥 Daily Streak Rewards</h2>

        <div className="mission">
          Current Streak:
          {" "}
          {streak} Days
        </div>

        <div className="mission">
          Bonus XP Earned:
          {" "}
          {streakBonus}
        </div>

        <div className="mission">
          Keep logging in daily
          to increase rewards!
        </div>
        <div className="mission">
  💎 Earn Gems by completing chapters
</div>

      </div>

      {/* Subjects */}
      <div className="subjects-section">

        <h2>📚 My Subjects</h2>

        <div className="subjects-grid">

          {(subjectsByClass[studentClass] || []).map(
            (subject, index) => {

              const chapters =
                chaptersByClass[studentClass]?.[
                  subject
                ] || [];

              const completed =
                chapters.filter((chapter) =>
                  progress.includes(
                    `${studentClass}-${subject}-${chapter}`
                  )
                ).length;

              const percentage =
                chapters.length > 0
                  ? Math.round(
                      (completed /
                        chapters.length) *
                        100
                    )
                  : 0;

              return (
                <div
                  className="subject-card"
                  key={index}
                >

                  <h3>{subject}</h3>

                  <p>
                    {completed}/
                    {chapters.length}
                    {" "}
                    Chapters Completed
                  </p>

                  <div
                    style={{
                      width: "100%",
                      height: "10px",
                     
                      borderRadius: "10px",
                      marginTop: "10px"
                    }}
                  >

                    <div
                      style={{
                        width: `${percentage}%`,
                        height: "100%",
                        background: "#22c55e",
                        borderRadius: "10px"
                      }}
                    ></div>

                  </div>

                  <p
                    style={{
                      marginTop: "10px"
                    }}
                  >
                    {percentage}% Progress
                  </p>

                </div>
              );
            }
          )}

        </div>

      </div>

      {/* Missions */}
      <div className="mission-card">

        <h2>🎯 Today's Missions</h2>

        <div className="mission">
  ✅ Complete 1 Chapter (+50 XP + 5 💎)
</div>

        <div className="mission">
          📚 Read Learning Notes
        </div>

        <div className="mission">
          🚀 Reach Next Level
        </div>

      </div>

      {/* AI Teacher */}
      <div className="ai-card">

        <h2>🤖 AI Teacher</h2>

        <p>
          AI Teacher will help explain
          chapters, answer doubts and
          generate practice questions.
        </p>

        <button>
          Ask AI Teacher
        </button>

      </div>

    </div>
  );
}

export default Dashboard;