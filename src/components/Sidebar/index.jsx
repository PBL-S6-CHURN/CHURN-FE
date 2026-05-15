import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logoChurn.png'
import { Icon } from '@iconify/react';
import './style.css'

export default function Sidebar({ onLogout }) {
    const navigate = useNavigate();
    const location = useLocation();

    const activeNav = (itemId) => {
        // Jika di halaman dashboard ATAU detail, maka menu Dashboard menyala
        if (itemId === '/dashboard') {
            return location.pathname === '/dashboard' || location.pathname === '/detail';
        }
        // Untuk menu lainnya tetap sama (strict match)
        return location.pathname === itemId;
    };;
    
    const menuItems = [
        { id: '/dashboard', label: 'Dashboard', icon: 'material-symbols:dashboard-outline' },
        { id: '/add-customer', label: 'Tambah Customer', icon: 'material-symbols:person-add-outline' },
        { id: '/summarize', label: 'Summarize', icon: 'material-symbols:description-outline' },
        // { id: '/profile', label: 'Profil Admin', icon: 'vaadin:user' },
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
                    className={`nav-link ${activeNav(item.id) ? 'active' : ''}`} 
                    onClick={() => navigate(item.id)}
                    style={{ cursor: 'pointer' }}
                >
                    <Icon icon={item.icon} width="22" height="22" color="#630000" />
                    {item.label}
                </div>
                ))}
            </nav>
            <button className="btn-logout-new" onClick={() => {
                onLogout();
            }}>
            <Icon icon="material-symbols:logout-rounded" width="24" height="24"  color='#ffffff'/>
                Logout
            </button>
        </aside>
    )
}
