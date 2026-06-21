import React from 'react'

export default function RiskCountChurn({colorRisk, titleRisk, countRisk}) {
    return (
        <div class="risk-section">
            <span class={`risk-label ${colorRisk}`} style={{ fontFamily: "Roboto, sans-serif"}}>{titleRisk}</span>
            <span class="risk-count" style={{ fontFamily: "Roboto, sans-serif"}}>{countRisk}</span>
        </div>
    )
}
