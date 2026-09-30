/**
 * splashAnimations.js
 * Call initSplash() once in SplashScreen's useEffect to seed
 * the animated background layers (stars, dust, orbs).
 */

export function initSplash() {
  const starsEl = document.getElementById("splash-stars");
  const dustEl  = document.getElementById("splash-dust");
  const orbsEl  = document.getElementById("splash-orbs");

  if (!starsEl || !dustEl || !orbsEl) return;

  // ── Stars ──────────────────────────────────────────────
  for (let i = 0; i < 100; i++) {
    const s   = document.createElement("div");
    s.className = "spl-star";
    const sz  = (Math.random() * 2 + 0.4).toFixed(1);
    const top = Math.random() * 65; // top 65% of screen only
    s.style.cssText = [
      `width:${sz}px`,
      `height:${sz}px`,
      `top:${top}%`,
      `left:${Math.random() * 100}%`,
      `--ts:${(Math.random() * 3 + 1.5).toFixed(1)}s`,
      `--tdl:${(Math.random() * 4).toFixed(1)}s`,
      `--top:${(Math.random() * 0.55 + 0.18).toFixed(2)}`,
    ].join(";");
    starsEl.appendChild(s);
  }

  // ── Dust particles ─────────────────────────────────────
  for (let i = 0; i < 32; i++) {
    const d   = document.createElement("div");
    d.className = "spl-dust";
    const sz  = (Math.random() * 3 + 1).toFixed(1);
    d.style.cssText = [
      `width:${sz}px`,
      `height:${sz}px`,
      `bottom:${Math.random() * 30}%`,
      `left:${Math.random() * 100}%`,
      `--dr:${(Math.random() * 10 + 6).toFixed(1)}s`,
      `--ddl:${(Math.random() * 10).toFixed(1)}s`,
      `--dx:${(Math.random() * 60 - 30).toFixed(0)}px`,
    ].join(";");
    dustEl.appendChild(d);
  }

  // ── Floating orbs ──────────────────────────────────────
  const orbDefs = [
    { left:"7%",  top:"22%", size:130, color:"rgba(140,10,40,.08)",  ox:"20px",  oy:"-18px", od:"8s" },
    { left:"74%", top:"14%", size:95,  color:"rgba(100,10,160,.07)", ox:"-15px", oy:"12px",  od:"11s"},
    { left:"54%", top:"58%", size:72,  color:"rgba(200,60,40,.06)",  ox:"10px",  oy:"-20px", od:"7s" },
    { left:"18%", top:"68%", size:58,  color:"rgba(80,0,120,.08)",   ox:"-12px", oy:"8px",   od:"9s" },
    { left:"38%", top:"30%", size:44,  color:"rgba(160,20,60,.06)",  ox:"8px",   oy:"-12px", od:"6s" },
  ];
  orbDefs.forEach((o) => {
    const el = document.createElement("div");
    el.className = "spl-orb";
    el.style.cssText = [
      `left:${o.left}`,
      `top:${o.top}`,
      `width:${o.size}px`,
      `height:${o.size}px`,
      `background:radial-gradient(circle,${o.color},transparent 70%)`,
      `filter:blur(${Math.round(o.size / 4)}px)`,
      `--ox:${o.ox}`,
      `--oy:${o.oy}`,
      `--od:${o.od}`,
    ].join(";");
    orbsEl.appendChild(el);
  });
}