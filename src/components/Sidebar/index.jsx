import React from 'react'
import logo from '../../assets/logoChurn.png'
import { Icon } from '@iconify/react';
import './style.css'

export default function Sidebar({ onLogout, onNavChange, activeNav }) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'material-symbols:dashboard-outline' },
        { id: 'add-customer', label: 'Tambah Customer', icon: 'material-symbols:person-add-outline' },
        { id: 'summarize', label: 'Summarize', icon: 'material-symbols:description-outline' },
    ];
    
    return (
        <aside className="sidebar-new">
            <div className="flex sidebar-header">
                <img src={logo} alt="Logo" className="logo-img" />
                <hr className="divider" />
            </div>
            <nav className="nav-menu">
                {menuItems.map((item) => (
                <div 
                    key={item.id}
                    className={`nav-link ${activeNav === item.id ? 'active' : ''}`} 
                    onClick={() => onNavChange(item.id)}
                    style={{ cursor: 'pointer' }}
                >
                    <Icon icon={item.icon} width="22" height="22" color="#630000" />
                    {item.label}
                </div>
                ))}
            </nav>
            <button className="btn-logout-new" onClick={onLogout}>Logout</button>
        </aside>
    )
}
