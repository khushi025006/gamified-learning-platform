import { useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  return (

    <div style={styles.sidebar}>

      <h2 style={styles.logo}>
        🚀 LearnQuest
      </h2>

      <button onClick={() => navigate("/app/dashboard")}>
        🏠 Dashboard
      </button>

      <button onClick={() => navigate("/app/courses")}>
        📚 Courses
      </button>

      <button onClick={() => navigate("/app/friends")}>
        👥 Social Hub
      </button>

      <button onClick={() => navigate("/app/leaderboard")}>
        🏆 Leaderboard
      </button>

      <button onClick={() => navigate("/app/profile")}>
        👤 Profile
      </button>

      <button onClick={() => navigate("/app/missions")}>
        🎯 Missions
      </button>

      <button onClick={() => navigate("/app/shop")}>
        💎 Shop
      </button>

      <button onClick={() => navigate("/app/ai-teacher")}>
        🤖 AI Teacher
      </button>

    </div>

  );

}

const styles = {

  sidebar: {

    width: "230px",

    background: "#0b1220",

    color: "white",

    padding: "20px",

    display: "flex",

    flexDirection: "column",

    gap: "12px",

    borderRight: "1px solid rgba(255,255,255,0.08)",

    minHeight: "100vh"

  },

  logo: {

    textAlign: "center",

    marginBottom: "20px",

    color: "#7dd3fc"

  }

};

export default Sidebar;