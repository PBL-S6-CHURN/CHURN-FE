import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./style.css";
import InfoItem from "./InfoItem";
import { getAlertById, markAlertAsResolved } from "../../api/alertapi"; 

export default function AlertDetailModal({ isOpen, alertId, onClose, onRefreshData }) {
    const [detailData, setDetailData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Tarik data dari endpoint AlertGetByIdController saat modal terbuka
    useEffect(() => {
        if (isOpen && alertId) {
            setLoading(true);
            
            getAlertById(alertId)
                .then((res) => {
                    if (res.status === "success") {
                        setDetailData(res.data);
                    }
                })
                .catch((err) => console.error("Gagal memuat detail alert", err))
                .finally(() => setLoading(false));
        } else {
            setDetailData(null);
        }
    }, [isOpen, alertId]);

    // Fungsi untuk memproses penandatanganan penyelesaian masalah (Resolve)
    const handleResolve = async () => {
        try {
            // Panggil langsung fungsi markAlertAsResolved (disesuaikan dengan nama di alertapi.js)
            await markAlertAsResolved(alertId);
            alert("Alert berhasil diselesaikan!");
            if (onRefreshData) onRefreshData(); // Trigger refresh di halaman utama
            onClose(); // Tutup modal
        } catch (error) {
            // Menggunakan string penanganan error yang dilempar catch jika ada
            alert(typeof error === "string" ? error : "Gagal memperbarui status alert");
        }
    };

    if (!isOpen || !alertId) return null;
    if (loading || !detailData) return <div className="modal-overlay"><div className="modal-content">Loading data...</div></div>;

    const { alert_details, ai_prediction_analysis, customer_profile } = detailData;

    // Mapping plan ID ke nama teks
    const plans = { 1: "Starter", 2: "Professional", 3: "Enterprise" };
    const contracts = { 1: "Monthly", 2: "Annual" };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Header Modal */}
                <div className="modal-header-row">
                    <h3>Alert Details</h3>
                    <button className="close-x" onClick={onClose}>
                        &times;
                    </button>
                </div>

                {/* Profil Singkat */}
                <div className="modal-profile-section">
                    <div className="notif-icon-avatar large">
                        <Icon icon="entypo:user" width="52" color="#630000" />
                    </div>
                    <div className="profile-info">
                        <h4>{customer_profile?.customer_id || "N/A"}</h4>
                        <p>Churn Risk : {ai_prediction_analysis?.risk_level || "UNKNOWN"}</p>
                    </div>
                    <span className={`warning-tag-large ${alert_details?.severity?.toLowerCase()}`}>
                        {alert_details?.severity?.toUpperCase() || "WARNING"}
                    </span>
                </div>

                {/* Prediction Result Section */}
                {ai_prediction_analysis && (
                    <div className="group-prediction">
                        <div className="section-divider">Prediction Result</div>
                        <div className="info-grid predict">
                            <InfoItem label="Prediction" value={ai_prediction_analysis.risk_level} />
                            <InfoItem label="Probability" value={`${ai_prediction_analysis.risk_score_pct}%`} />
                            <InfoItem label="Diagnostic" value={ai_prediction_analysis.churn_factors?.join(", ") || "Normal"} />
                            <InfoItem label="Solution" value={ai_prediction_analysis.solutions?.join(", ") || "No action needed"} />
                        </div>
                    </div>
                )}

                {/* Customer Data Section */}
                <div className="group-item">
                    <div className="section-divider">Customer Data</div>
                    <div className="info-grid">
                        <InfoItem label="Plan Type" value={plans[customer_profile?.plan_id] || "Starter"} />
                        <InfoItem label="Contract Type" value={contracts[customer_profile?.contract_id] || "Monthly"} />
                        <InfoItem label="Tenure" value={`${customer_profile?.tenure_months || 0} Months`} />
                        <InfoItem label="Monthly Revenue" value={`$ ${customer_profile?.monthly_revenue || 0}`} />
                        <InfoItem label="Support Tickets" value={`${customer_profile?.support_ticket_last_90d || 0} Tiket`} />
                        <InfoItem label="Payment Delay" value={`${customer_profile?.payment_delay_count || 0} Times`} />
                        <InfoItem label="Monthly Usage Hours" value={`${customer_profile?.monthly_usage_hrs || 0} Hours`} />
                        <InfoItem label="Total User" value={`${customer_profile?.total_users || 0} User`} />
                        <InfoItem label="Feature Adoption" value={`${customer_profile?.feature_adoption_pct || 0}%`} />
                        <InfoItem label="Last Login Days Ago" value={`${customer_profile?.last_login_days_ago || 0} Days`} />
                        <InfoItem label="NPS Score" value={customer_profile?.nps_score || "0"} />
                    </div>
                </div>

                {/* Action Button */}
                <div className="btn-end">
                    {!alert_details?.alert_is_read && !alert_details?.is_read ? (
                        <button className="btn-resolve-action" onClick={handleResolve}>
                            Mark as Resolve
                        </button>
                    ) : (
                        <span className="resolved-status-label">✅ Resolved</span>
                    )}
                </div>
            </div>
        </div>
    );
}