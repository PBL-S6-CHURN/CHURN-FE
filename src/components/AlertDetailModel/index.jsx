import React from "react";
import { Icon } from "@iconify/react";
import "./style.css";
import InfoItem from "./InfoItem";

export default function AlertDetailModal({ isOpen, customer, onClose }) {
    if (!isOpen || !customer) return null;

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
                        <h4>{customer.id}</h4>
                        <p>Churn Risk : HIGH</p>
                    </div>
                    <span className="warning-tag-large">WARNING</span>
                </div>

                {/* Prediction Result Section */}
                <div className="group-prediction">
                    <div className="section-divider">Prediction Result</div>
                    <div className="info-grid predict">
                        <InfoItem label="Prediction" value="HIGH" />
                        <InfoItem label="Probability" value="90%" />
                        <InfoItem label="Diagnostic" value="Customer lambat merespon" />
                        <InfoItem label="Solution" value="Segera hubungi ke Whatsapp" />
                    </div>
                </div>

                {/* Customer Data Section */}
                <div className="group-item">
                    <div className="section-divider">Customer Data</div>
                    <div className="info-grid">
                        <InfoItem label="Plan Type" value={customer.plan_type || "Starter"} />
                        <InfoItem label="Contract Type" value="Monthly" unit="Months" />
                        <InfoItem label="Tenure" value="19 Months" />
                        <InfoItem label="Monthly Revenue" value="$ 112.58" />
                        <InfoItem label="Support Tickets" value="0 Days" />
                        <InfoItem label="Payment Delay" value="4 Times" />
                        <InfoItem label="Monthly Usage Hours" value="20.1 Hours" />
                        <InfoItem label="Total User" value="4 User" />
                        <InfoItem label="Feature Adoption" value="75.5" />
                        <InfoItem label="Last Login Days Ago" value="34" />
                        <InfoItem label="NPS Score" value="8" />
                        <InfoItem label="Payment Delay Count" value="4 Times" />
                    </div>
                </div>

                {/* Action Button */}
                <div className="btn-end">
                    <button className="btn-resolve-action" onClick={onClose}>
                        Mark as Resolve
                    </button>
                </div>
            </div>
        </div>
    );
}
