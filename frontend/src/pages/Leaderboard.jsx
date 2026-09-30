import "./leaderboard.css";

function Leaderboard() {

  const student =
    JSON.parse(
      localStorage.getItem("student")
    ) || {};

  const progress =
    JSON.parse(
      localStorage.getItem("progress")
    ) || [];

  const streakData =
    JSON.parse(
      localStorage.getItem("streakData")
    ) || {
      streak: 0
    };

  const completedChapters =
    progress.length;

  const xp =
    completedChapters * 50 +
    (streakData.streak * 10);

  const level =
    Math.floor(xp / 200) + 1;

  const gems =
    Number(
      localStorage.getItem("gems")
    ) || 0;

  const students = [

    {
      name:
        student.name || "You",
      xp,
      level,
      gems,
      streak:
        streakData.streak
    },

    {
      name: "Aarav",
      xp: 900,
      level: 5,
      gems: 120,
      streak: 8
    },

    {
      name: "Anaya",
      xp: 750,
      level: 4,
      gems: 90,
      streak: 6
    },

    {
      name: "Vivaan",
      xp: 600,
      level: 4,
      gems: 80,
      streak: 5
    },

    {
      name: "Diya",
      xp: 500,
      level: 3,
      gems: 60,
      streak: 4
    }

  ];

  students.sort(
    (a, b) => b.xp - a.xp
  );

  return (
    <div className="leaderboard">

      <h1>
        🏆 Leaderboard
      </h1>

      {students.map(
        (student, index) => (

          <div
            className="leader-card"
            key={index}
          >

            <span>
              #{index + 1}
            </span>

            <span>
              👤 {student.name}
            </span>

            <span>
              ⭐ Lv.{student.level}
            </span>

            <span>
              ⚡ {student.xp} XP
            </span>

            <span>
              💎 {student.gems}
            </span>

            <span>
              🔥 {student.streak}
            </span>

          </div>

        )
      )}

    </div>
  );
}

export default Leaderboard;