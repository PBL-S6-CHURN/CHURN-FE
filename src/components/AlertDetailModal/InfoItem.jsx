import React from "react";

export default function InfoItem({ label, value }) {
    return (
        <div className="info-item">
            <label>{label}</label>
            <p className="line-clamp-2">{value}</p>
        </div>
    );
}
