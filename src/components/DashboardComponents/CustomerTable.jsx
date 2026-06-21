import React from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerTable({ customers, onViewDetail }) {
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
                        <th>Score (%)</th>
                        <th>Risk</th>
                        <th>Churn</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(customers) && customers.length > 0 ? (
                        customers.map((row, index) => {
                            const uniqueId    = row.id || row.customer_id || row.customer_code || `idx-${index}`;
                            const displayId   = row.customer_id || row.customer_code || "-";
                            const planName    = row.plan_name    || row.plan_type     || "-";
                            const contractName = row.contract_name || row.contract_type || "-";
                            const usageHrs    = row.monthly_usage_hrs !== undefined ? row.monthly_usage_hrs : 0;

                            // Score: raw SVM score (dari risk_score di DB / prediction_results)
                            const riskScore = row.risk_score !== undefined
                                ? row.risk_score
                                : (row.prediction_results?.risk_score_pct ?? "-");

                            // Score (%): Platt probability 0–100
                            // Cari di root dulu (sudah dinormalisasi Dashboard),
                            // fallback ke prediction_results dari backend
                            const rawPlatt = row.platt_score_pct !== undefined && row.platt_score_pct !== null
                                ? row.platt_score_pct
                                : (row.prediction_results?.platt_score_pct ?? null);

                            // Format: kalau sudah string "xx.xx%" biarkan, kalau number tambah "%"
                            const plattDisplay = rawPlatt !== null && rawPlatt !== undefined && rawPlatt !== "-"
                                ? (typeof rawPlatt === "string" && rawPlatt.includes("%")
                                    ? rawPlatt
                                    : `${Number(rawPlatt).toFixed(2)}%`)
                                : "-";

                            const riskLevel   = row.risk || row.prediction_results?.risk_level || "UNKNOWN";
                            const churnStatus = row.churn_status || row.prediction_results?.churn_status || (row.score == 1 ? "YES" : "NO");

                            return (
                                <tr key={uniqueId}>
                                    <td
                                        style={{ cursor: "pointer", fontWeight: "bold" }}
                                        onClick={() => {
                                            if (onViewDetail) onViewDetail(row);
                                            navigate(`/detail/${uniqueId}`);
                                        }}
                                        className="clickable-id"
                                    >
                                        {displayId}
                                    </td>
                                    <td>{planName}</td>
                                    <td>{contractName}</td>
                                    <td className="text-center">{row.tenure_months ?? 0} m</td>
                                    <td className="text-center">${row.monthly_revenue ?? 0}</td>
                                    <td className="text-center">{row.total_users ?? 0}</td>
                                    <td className="text-center">{usageHrs}h</td>
                                    <td className="text-center">{row.feature_adoption_pct ?? 0} %</td>
                                    <td className="text-center">{row.payment_delay_count ?? 0}</td>
                                    <td className="text-center">{row.support_ticket_last_90d || row.support_tickets_last_90d || 0}</td>
                                    <td className="text-center">{row.nps_score ?? 0}</td>

                                    {/* Score: raw SVM (bisa negatif) */}
                                    <td className="text-center">
                                        {riskScore !== "-" ? Number(riskScore).toFixed(4) : "-"}
                                    </td>

                                    {/* Score (%): Platt probability */}
                                    <td className="text-center">
                                        {plattDisplay}
                                    </td>

                                    <td className={`text-center risk-text ${riskLevel.toLowerCase()}`}>
                                        {riskLevel}
                                    </td>
                                    <td className="text-center">{churnStatus}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="15" className="text-center" style={{ padding: "20px" }}>
                                Menunggu data stream pelanggan...
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}