import React from "react";

// Sub-Komponen yang lebih rapi
export default function InfoBox({ label, value, unit, isFull }) {
    return (
      <div className={`info-box ${isFull ? "full-width" : ""}`}>
        <p className="info-label">{label}</p>
        <div className="info-content">
          <h2 className="info-value">{value}</h2>
          {unit && <span className="info-unit">{unit}</span>}
        </div>
      </div>
    );
  }