import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

// Available character classes
const CLASSES = [
  { icon: "⚔️", label: "Warrior" },
  { icon: "🧙", label: "Mage"    },
  { icon: "🏹", label: "Ranger"  },
  { icon: "🛡️", label: "Paladin" },
];

// Grade options with RPG rank names
const GRADES = [
  { value: "6",  label: "Grade 6  — Apprentice"  },
  { value: "7",  label: "Grade 7  — Initiate"    },
  { value: "8",  label: "Grade 8  — Adept"       },
  { value: "9",  label: "Grade 9  — Scholar"     },
  { value: "10", label: "Grade 10 — Expert"      },
  { value: "11", label: "Grade 11 — Master"      },
  { value: "12", label: "Grade 12 — Grandmaster" },
];

// Password strength helper (0–4)
function getStrength(pw) {
  if (pw.length === 0) return 0;
  if (pw.length < 4)   return 1;
  if (pw.length < 7)   return 2;
  if (pw.length < 10)  return 3;
  if (pw.length >= 10 && /[A-Z]/.test(pw) && /[0-9]/.test(pw)) return 4;
  return 3;
}

const STRENGTH_CLASS = ["", "s1", "s2", "s3", "s4"];

function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [grade,     setGrade]     = useState("");
  const [heroClass, setHeroClass] = useState("Warrior");
  const [shake,     setShake]     = useState(false);

  const strength = getStrength(password);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSignup = async () => {

  if (
    !firstName ||
    !email ||
    !password ||
    !grade
  ) {
    triggerShake();
    alert(
      "⚠️ Complete all fields to forge your character!"
    );
    return;
  }

  try {

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    const user =
      userCredential.user;
     await setDoc(
doc(db,"users",user.uid),
{
uid:user.uid,

firstName,

lastName,

email,

grade,

heroClass,

xp:0,

gems:0,

streak:0,

badges:[],

progress:[],
friends:[],

friendRequests:[],


createdAt:new Date().toISOString(),

/* NEW */

xp: 0,
gems: 0,
streak: 0,

friends: [],
friendRequests: [],
sentRequests: [],

badges: [],
progress: [],

status:"Online",

level:1,

rank:"Beginner",

avatar:heroClass

}
);
    const student = {
      uid: user.uid,
      firstName,
      lastName,
      email,
      grade,
      heroClass,
      xp: 5
    };

    localStorage.setItem(
      "student",
      JSON.stringify(student)
    );

    alert(
      `🌟 Character created! Welcome, ${firstName} the ${heroClass}!`
    );

    navigate("/");

  } catch (error) {

    alert(
      "❌ " + error.message
    );

  }
};

  return (
    <div className="signup-container">
      {/* Decorative portal ring */}
      <div className="portal-ring" />

      <div className={`signup-card${shake ? " shake" : ""}`}>
        {/* Corner brackets */}
        <div className="card-corner tl" />
        <div className="card-corner tr" />
        <div className="card-corner bl" />
        <div className="card-corner br" />

        {/* Header */}
        <div className="card-header">
          <div className="emblem">
            <div className="emblem-ring">
              <span className="emblem-icon">🌟</span>
            </div>
          </div>
          <div className="game-title">LearnQuest</div>
          <div className="game-subtitle">Create Your Character</div>
        </div>

        {/* Step tracker */}
        <div className="step-tracker">
          <div className="step-dot active">1</div>
          <div className="step-line" />
          <div className="step-dot">2</div>
          <div className="step-line" />
          <div className="step-dot">3</div>
        </div>

        {/* Body */}
        <div className="card-body">

          {/* XP bar — new character starts at ~5% */}
          <div className="xp-bar-wrap">
            <span className="xp-label">Character Level</span>
            <div className="xp-track">
              <div className="xp-fill" />
            </div>
            <span className="xp-val">NEW</span>
          </div>

          {/* First + Last name */}
          <div className="field-row">
            <div className="field-group">
              <label className="field-label">First Name</label>
              <div className="field-wrap">
                <span className="field-icon">👤</span>
                <input
                  className="game-input"
                  type="text"
                  placeholder="Hero"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <div className="field-glow" />
              </div>
            </div>
            <div className="field-group">
              <label className="field-label">Last Name</label>
              <div className="field-wrap">
                <span className="field-icon">📜</span>
                <input
                  className="game-input"
                  type="text"
                  placeholder="Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <div className="field-glow" />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="field-group">
            <label className="field-label">Hero Email</label>
            <div className="field-wrap">
              <span className="field-icon">✉</span>
              <input
                className="game-input"
                type="email"
                placeholder="hero@academy.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="field-glow" />
            </div>
          </div>

          {/* Password + strength bar */}
          <div className="field-group">
            <label className="field-label">Secret Passphrase</label>
            <div className="field-wrap">
              <span className="field-icon">🔒</span>
              <input
                className="game-input"
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="field-glow" />
            </div>
            {/* Password strength segments */}
            <div className="strength-wrap">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className={`strength-seg${strength >= n ? ` ${STRENGTH_CLASS[n]}` : ""}`}
                />
              ))}
            </div>
          </div>

          {/* Choose Class */}
          <div className="field-group">
            <label className="field-label">Choose Your Class</label>
            <div className="class-grid">
              {CLASSES.map(({ icon, label }) => (
                <div
                  key={label}
                  className={`class-badge${heroClass === label ? " selected" : ""}`}
                  onClick={() => setHeroClass(label)}
                >
                  <span className="class-icon">{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Grade select */}
          <div className="field-group">
            <label className="field-label">Academy Grade</label>
            <div className="field-wrap">
              <span className="field-icon">🎓</span>
              <select
                className="game-select"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                <option value="">— Select your grade —</option>
                {GRADES.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <span className="select-arrow">▼</span>
              <div className="field-glow" />
            </div>
          </div>

          {/* CTA */}
          <button className="signup-btn" onClick={handleSignup}>
            ⚡ Begin Your Quest
          </button>

          {/* Divider */}
          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">or join via</span>
            <div className="divider-line" />
          </div>

          {/* Social buttons — wire OAuth as needed */}
          <div className="social-row">
            <button className="social-btn">G&nbsp; Google</button>
            <button className="social-btn">⌥&nbsp; GitHub</button>
          </div>
        </div>

        {/* Footer */}
        <div className="card-footer">
          <span className="footer-text">
            Already an adventurer?{" "}
            <span
              className="login-link"
              onClick={() => navigate("/")}
            >
              Return to Gate →
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;