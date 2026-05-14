import React from "react";

export default function InfoItem({ label, value }) {
    return (
        <div className="info-item">
        <label>{label}</label>
        <p>{value}</p>
        </div>
    );
}
