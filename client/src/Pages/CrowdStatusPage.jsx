import { useState } from "react";
import { Users } from "lucide-react";
import "./CrowdStatusPage.css";

const crowdData = {
  "2026-03-01": "Low",
  "2026-03-02": "Medium",
  "2026-03-03": "High",
  "2026-03-04": "Low",
  "2026-03-05": "Medium",
  "2026-03-06": "High",
  "2026-03-07": "Low",
  "2026-03-08": "Medium",
  "2026-03-09": "Low",
  "2026-03-10": "High",
};

const levelConfig = {
  Low: {
    color: "green",
    message: "Best time to visit the temple!",
    percentage: 25,
  },
  Medium: {
    color: "orange",
    message: "Moderate crowd — plan accordingly.",
    percentage: 55,
  },
  High: {
    color: "red",
    message: "Temple is crowded. Consider visiting later.",
    percentage: 90,
  },
};

function CrowdStatusPage() {
  const [date, setDate] = useState("");

  const key = date || "2026-03-01";
  const level = crowdData[key] || "Low";
  const config = levelConfig[level];

  return (
    <div className="crowd-container">
      <h1 className="crowd-title">Live Crowd Status</h1>
      <p className="crowd-subtitle">
        Select a date to check temple occupancy
      </p>

      <div className="crowd-grid">

        {/* ===== Date Card ===== */}
        <div className="crowd-card">
          <div className="calendar-header">
            <Users size={16} />
            <span>Pick a Date</span>
          </div>

          <input
            type="date"
            className="date-input"
            onChange={(e) => setDate(e.target.value)}
          />

          {/* ✅ LIVE INDICATOR */}
          <div className="live-indicator">
            🟢 Live Crowd Data Updated
          </div>

          {/* ✅ TIP BOX */}
          <div className="crowd-tip">
            💡 Tip: Arrive early for smooth darshan and better parking.
          </div>

        </div>

        {/* ===== Status Card ===== */}
        <div className="crowd-status-card">

          <Users className="status-icon" />

          <div className="status-date">
            <p className="small-text">Status for</p>
            <p className="date-text">
              {date || "Select Date"}
            </p>
          </div>

          {/* ===== Meter ===== */}
          <div className="meter-container">
            <div className="meter-bg">
              <div
                className={`meter-fill ${config.color}`}
                style={{ width: `${config.percentage}%` }}
              />
            </div>

            <div className="meter-labels">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>

          {/* ===== Badge ===== */}
          <div className={`crowd-badge ${config.color}`}>
            <div className={`dot ${config.color}`} />
            {level} Crowd
          </div>

          <p className="crowd-message">{config.message}</p>

        </div>

      </div>
    </div>
  );
}

export default CrowdStatusPage;