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
                {Array.isArray(customers) && customers.length > 0 ? (
                        customers.map((row, index) => { 
                            // 1. Ambil ID unik untuk navigasi & React Key
                            console.log("Isi data per baris:", row);
                            const uniqueId = row.id || row.customer_id || row.customer_code || `idx-${index}`;
                            
                            // 2. Antisipasi nama properti dari REST API maupun SSE Stream
                            const displayId = row.customer_id || row.customer_code || "-";
                            const planName = row.plan_name || row.plan_type || "-";
                            const contractName = row.contract_name || row.contract_type || "-";
                            const usageHrs = row.monthly_usage_hrs !== undefined ? row.monthly_usage_hrs : (row.monthly_usage_hrs || 0);

                            // 3. Kalkulasi data prediksi/skor risiko
                            const riskScore = row.risk_score !== undefined 
                                ? row.risk_score 
                                : (row.prediction_results?.risk_score_pct || 0);
                                
                            const riskLevel = row.risk || row.prediction_results?.risk_level || "UNKNOWN";
                            const churnStatus = row.churn_status || row.prediction_results?.churn_status || "NO";

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
                                    <td className="text-center">{riskScore}</td>
                                    <td className={`text-center risk-text ${riskLevel.toLowerCase()}`}>
                                        {riskLevel}
                                    </td>
                                    <td className="text-center">{churnStatus}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="14" className="text-center" style={{ padding: "20px" }}>
                                Menunggu data stream pelanggan...
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
