import React from 'react'

export default function RiskCountChurn({colorRisk, titleRisk, countRisk}) {
    return (
        <div class="risk-section">
            <span class={`risk-label ${colorRisk}`}>{titleRisk}</span>
            <span class="risk-count">{countRisk}</span>
        </div>
    )
}
