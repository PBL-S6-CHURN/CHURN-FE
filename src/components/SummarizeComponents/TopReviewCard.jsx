import React from 'react'
import { Icon } from '@iconify/react';

export default function TopReviewCard({image, userName, score, content, iconRate}) {
    return (
        <div className="comment-card">
            <div className="comment-header">
            <div className="user-info">
                {/* <div className="user-avatar-sm">👤</div> */}
                <div className="user-avatar-sm">
                {image ? (
                    <img src={image} width={28} height={28} style={{ borderRadius: "50%" }} alt="User Avatar" />
                ) : (
                    "👤"
                )}
                </div>
                <span className="user-name">{userName}</span>
            </div>
            <div className="rating">
                <Icon
                icon={iconRate}
                width="24"
                height="24"
                color="#630000"
                />
                {score.toFixed(1)}
            </div>
            </div>
            <p className="comment-text">{content}</p>
        </div>
    )
}
