import React from 'react'

export default function PlanPercentageCard({plan_name, total_count, percentage}) {
    return (
        <div className="plan-item">
            <div className="plan-info">
                <span>{plan_name}</span>
                <span>{total_count} Customer</span>
            </div>
            <div className="progress-container">
                <div
                    className="progress-bar-maroon"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        <span className="percent">{Math.round(percentage)}%</span>
    </div>
    )
}
