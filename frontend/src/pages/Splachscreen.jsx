import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./splash.css";
import { initSplash } from "./splashAnimations";

function SplashScreen() {
  const navigate = useNavigate();

  // auto-advance after 6s if user doesn't click
  useEffect(() => {
    initSplash();
    const t = setTimeout(() => navigate("/login"), 8000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="splash-root">

      {/* animated bg layers — JS fills stars & dust */}
      <div className="splash-aurora" />
      <div className="splash-ground" />
      <div id="splash-stars" />
      <div id="splash-dust" />
      <div id="splash-orbs" />

      {/* teacher + student scene */}
      <div className="splash-scene">

        <div className="splash-teacher">
          <div className="sp-head" />
          <div className="sp-body">
            <div className="sp-arm sp-arm-l" />
            <div className="sp-arm sp-arm-r" />
          </div>
          <span className="sp-label">Master</span>
        </div>

        <div className="splash-beam" />

        <div className="splash-student">
          <div className="sp-head sp-head-s" />
          <div className="sp-body sp-body-s">
            <div className="sp-arm sp-arm-sl" />
            <div className="sp-arm sp-arm-sr" />
          </div>
          <span className="sp-label">Apprentice</span>
        </div>

      </div>

      {/* floating icons row */}
      <div className="splash-icons">
        {["⭐","📚","🏆","💡","✨","🎯","📖","💎"].map((ic, i) => (
          <span key={i} className="splash-floaticon" style={{ "--fi-delay": `${i * 0.9}s` }}>
            {ic}
          </span>
        ))}
      </div>

      {/* centre UI */}
      <div className="splash-ui">
        <h1 className="splash-logo">LearnQuest</h1>
        <p className="splash-tagline">Your Epic Learning Adventure Awaits</p>
        <button className="splash-btn" onClick={() => navigate("/login")}>
          ✦ Begin Your Journey
        </button>
      </div>

      {/* bottom stats bar */}
      <div className="splash-statsbar">
        {[
          { val: "10,000+", lbl: "Students"  },
          { val: "500+",    lbl: "Quests"    },
          { val: "50+",     lbl: "Subjects"  },
          { val: "∞",       lbl: "Adventure" },
        ].map(({ val, lbl }) => (
          <div className="splash-stat" key={lbl}>
            <div className="splash-stat-val">{val}</div>
            <div className="splash-stat-lbl">{lbl}</div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default SplashScreen;