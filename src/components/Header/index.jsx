import React, { useState } from 'react'
import './style.css'
import { Icon } from '@iconify/react';

export default function Header({ title, adminData, onProfileClick, highRiskCustomers, onViewDetail }) {
    const [showNotif, setShowNotif] = useState(false);
    return (
        <header className="top-bar">
            <h1 className="title">{title}</h1>
            <div className="user-actions" style={{ position: 'relative' }}>
                <Icon icon="mdi:bell" width="26" height="26" color='#630000' onClick={() => setShowNotif(!showNotif)} style={{ cursor: 'pointer', position: 'relative' }} />

                {showNotif && (
                <div className="notif-dropdown shadow-real-black">
                    <div className="notif-header"><h4>Notification</h4></div>
                    <div className="notif-body">
                    {highRiskCustomers.length > 0 ? (
                        highRiskCustomers.slice(0, 5).map(item => (
                        <div key={item.id} className="notif-item" onClick={() => {onViewDetail(item); setShowNotif(false);}}>
                            <div className="notif-icon-circle">👤</div>
                            <div className="notif-text">
                            <p className="notif-msg">Customer <strong>{item.id}</strong> High Risk!</p>
                            <span className="notif-time">Just now</span>
                            </div>
                        </div>
                        ))
                    ) : (
                        <div className="notif-item"><p className="notif-msg">No alerts today</p></div>
                    )}
                    </div>
                </div>
                )}
                
                <span className="profile-svg" >
                    {adminData?.foto ? <img src={adminData.foto} className="avatar-img-small" alt="p" /> :  <Icon icon="mingcute:user-4-fill" width="26" height="26" color='#630000' onClick={onProfileClick} style={{ cursor: 'pointer' }} />}
                </span>
            </div>
        </header>
    )
}
