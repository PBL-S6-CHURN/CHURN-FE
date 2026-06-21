import React from "react";

export default function PercentageCard({ percentageTitle, percentage, bgColor }) {
    return (
      <div className={`perc-card ${bgColor}`} >
        <p>{percentageTitle}</p>
        <h2>{percentage}%</h2>
      </div>
  );
}
