import React from "react";

export default function SummarizeParagraf({summarizeTitle, summarizeParaghraph}) {
  return (
    <div className="sm-item">
      <h4>{summarizeTitle}</h4>
      <p>{summarizeParaghraph}</p>
    </div>
  );
}
