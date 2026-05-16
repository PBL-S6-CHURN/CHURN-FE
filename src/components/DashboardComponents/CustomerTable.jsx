import React from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerTable({customers, onViewDetail}) {
    const navigate = useNavigate();
    
    return (
        <div className="table-wrapper">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Customer_id</th>
                        <th>Plan Type</th>
                        <th>Contract Type</th>
                        <th>Tenure Months</th>
                        <th>Monthly Revenue</th>
                        <th>Total Users</th>
                        <th>Monthly Usage Hours</th>
                        <th>Feature Adoption Pct</th>
                        <th>Payment Delay Count</th>
                        <th>Support Tickets Last 90d</th>
                        <th>NPS Score</th>
                        <th>Score</th>
                        <th>Risk</th>
                        <th>Churn</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((row) => (
                        <tr key={row.id}>
                        <td
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                onViewDetail(row);
                                navigate(`/detail/${row.id}`);
                            }}
                            className="clickable-id"
                        >
                            {row.customer_id}
                        </td>
                        <td>{row.plan_name}</td>
                        <td>{row.contract_name}</td>
                        <td className="text-center">{row.tenure_months} m</td>
                        <td className="text-center">${row.monthly_revenue}</td>
                        <td className="text-center">{row.total_users}</td>
                        <td className="text-center">{row.monthly_usage_hrs}h</td>
                        <td className="text-center">{row.feature_adoption_pct} %</td>
                        <td className="text-center">{row.payment_delay_count}</td>
                        <td className="text-center">{row.support_ticket_last_90d}</td>
                        <td className="text-center">{row.nps_score}</td>
                        <td className="text-center">100</td>
                        {/* <td
                        className={`text-center risk-text ${row.risk.toLowerCase()}`}
                        >
                        high
                        </td> */}
                        <td className={`text-center risk-text high`}>High</td>
                        <td className="text-center">Yes</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
