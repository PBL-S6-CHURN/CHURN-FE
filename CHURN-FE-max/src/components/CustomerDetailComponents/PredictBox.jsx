import React from "react";

export default function PredictBox({ title, value, isRisk }) {
    return (
      <div className="predict-box">
        <p className="predict-title">{title}</p>
        <div className={isRisk ? "predict-value-risk" : "predict-value-text"}>
          {value}
        </div>
      </div>
    );
  }