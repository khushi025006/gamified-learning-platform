import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [shake, setShake] = useState(false);

  const updateStreak = () => {

    const today =
      new Date().toDateString();

    const streakData =
      JSON.parse(
        localStorage.getItem("streakData")
      ) || {
        streak: 0,
        lastLogin: null
      };

    if (
      streakData.lastLogin !== today
    ) {

      const yesterday =
        new Date();

      yesterday.setDate(
        yesterday.getDate() - 1
      );

      if (
        streakData.lastLogin ===
        yesterday.toDateString()
      ) {

        streakData.streak += 1;

      } else {

        streakData.streak = 1;

      }

      streakData.lastLogin =
        today;

      localStorage.setItem(
        "streakData",
        JSON.stringify(streakData)
      );

      // Reward Gems Every 3 Days

      if (
        streakData.streak % 3 === 0
      ) {

        const gems =
          Number(
            localStorage.getItem("gems")
          ) || 0;

        localStorage.setItem(
          "gems",
          gems + 20
        );

        alert(
          `🔥 ${streakData.streak} Day Streak!\n\n+20 Gems 💎`
        );
      }
    }
  };

  const triggerShake = () => {

    setShake(true);

    setTimeout(
      () => setShake(false),
      500
    );
  };

 const handleLogin = async () => {

  try {

    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    const user =
      userCredential.user;

    alert(
      "⚔️ Welcome back, Adventurer!"
    );

    navigate(
      "/app/dashboard"
    );

  } catch (error) {

    triggerShake();

    alert(
      "❌ " + error.message
    );

  }
};

  return (
    <div className="login-container">

      <div className="portal-ring" />

      <div
        className={`login-card ${
          shake ? "shake" : ""
        }`}
      >

        <div className="card-corner tl" />
        <div className="card-corner tr" />
        <div className="card-corner bl" />
        <div className="card-corner br" />

        <div className="card-header">

          <div className="emblem">

            <div className="emblem-ring">
              <span className="emblem-icon">
                ⚔️
              </span>
            </div>

          </div>

          <div className="game-title">
            LearnQuest
          </div>

          <div className="game-subtitle">
            Enter the Academy
          </div>

        </div>

        <div className="card-body">

          <div className="xp-bar-wrap">

            <span className="xp-label">
              Guild Progress
            </span>

            <div className="xp-track">
              <div className="xp-fill" />
            </div>

            <span className="xp-val">
              68 / 100 XP
            </span>

          </div>

          <div className="field-group">

            <label className="field-label">
              Hero Name
            </label>

            <div className="field-wrap">

              <span className="field-icon">
                ✉
              </span>

              <input
                className="game-input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  handleLogin()
                }
              />

              <div className="field-glow" />

            </div>

          </div>

          <div className="field-group">

            <label className="field-label">
              Secret Passphrase
            </label>

            <div className="field-wrap">

              <span className="field-icon">
                🔒
              </span>

              <input
                className="game-input"
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  handleLogin()
                }
              />

              <div className="field-glow" />

            </div>

          </div>

          <div className="options-row">

            <label className="checkbox-wrap">

              <div
                className={`game-checkbox ${
                  remember
                    ? "checked"
                    : ""
                }`}
                onClick={() =>
                  setRemember(
                    !remember
                  )
                }
              />

              <span className="checkbox-label">
                Remember Adventurer
              </span>

            </label>

            <span className="forgot-link">
              Forgot Rune?
            </span>

          </div>

          <button
            className="login-btn"
            onClick={handleLogin}
          >
            ⚡ Enter the Realm
          </button>

          <div className="divider">

            <div className="divider-line" />

            <span className="divider-text">
              or continue via
            </span>

            <div className="divider-line" />

          </div>

          <div className="social-row">

            <button className="social-btn">
              G Google
            </button>

            <button className="social-btn">
              ⌥ GitHub
            </button>

          </div>

        </div>

        <div className="card-footer">

          <span className="footer-text">

            New to the realm?{" "}

            <span
              className="signup-link"
              onClick={() =>
                navigate("/signup")
              }
            >
              Create Your Character →
            </span>

          </span>

        </div>

      </div>

    </div>
  );
}

export default Login;