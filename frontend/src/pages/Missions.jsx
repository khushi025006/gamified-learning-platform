import "./missions.css";
function Missions() {
  return (

    <div className="missions-page">
      <h1>🎯 Missions Page Working</h1>

      <div style={{
        background: "white",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "10px"
      }}>
        ✅ Complete Math Quiz (+50 XP)
      </div>

      <div style={{
        background: "white",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "10px"
      }}>
        ✅ Read English Story (+30 XP)
      </div>

      <div style={{
        background: "white",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "10px"
      }}>
        ⏳ Finish Science Chapter (+100 XP)
      </div>
    </div>
  );
}

export default Missions;