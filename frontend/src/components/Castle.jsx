function Castle() {
  return (
    <svg
      className="castle"
      viewBox="0 0 1920 700"
      preserveAspectRatio="none"
    >
      {/* Left Tower */}
      <rect x="720" y="270" width="80" height="250" />

      <polygon
        points="710,270 760,180 810,270"
      />

      {/* Right Tower */}
      <rect x="1120" y="270" width="80" height="250" />

      <polygon
        points="1110,270 1160,180 1210,270"
      />

      {/* Main Building */}
      <rect
        x="800"
        y="320"
        width="320"
        height="200"
      />

      {/* Center Tower */}
      <rect
        x="930"
        y="180"
        width="60"
        height="340"
      />

      <polygon
        points="920,180 960,80 1000,180"
      />

      {/* Door */}
      <rect
        x="935"
        y="420"
        width="50"
        height="100"
      />

      {/* Windows */}

      <circle cx="760" cy="340" r="8" />
      <circle cx="1160" cy="340" r="8" />

      <circle cx="960" cy="240" r="10" />
    </svg>
  );
}

export default Castle;