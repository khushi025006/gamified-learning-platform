import "./Splash.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AICore from "../components/AICore";

function Splash() {

  const navigate = useNavigate();

  useEffect(() => {

  const timer = setTimeout(() => {

    navigate("/login");

  }, 7000);

  return () => clearTimeout(timer);

}, [navigate]);

  const handleMouseMove=(e)=>{

    const x=
      (window.innerWidth/2-e.clientX)/45;

    const y=
      (window.innerHeight/2-e.clientY)/45;

    document.documentElement.style.setProperty(
      "--moveX",
      `${x}px`
    );

    document.documentElement.style.setProperty(
      "--moveY",
      `${y}px`
    );

  };

  return(

<div
className="splash"
onMouseMove={handleMouseMove}
>

{/* SPACE */}

<div className="space"></div>

<div className="nebula"></div>

<div className="stars"></div>

<div className="camera"></div>

<div className="screen-glow"></div>

<div className="god-rays"></div>


{/* PARTICLES */}

<div className="particles">

{

[...Array(25)].map((_,index)=>(

<div
key={index}
className="particle"
/>


))

}

</div>

{/* SHOOTING STARS */}

<div className="shooting shooting1"></div>

<div className="shooting shooting2"></div>

<div className="shooting shooting3"></div>

{/* CONTENT */}

<div className="hero">

<h1>

LEARNQUEST

</h1>

<p>

Academy Of Knowledge

</p>

</div>

</div>

  );

}

export default Splash;