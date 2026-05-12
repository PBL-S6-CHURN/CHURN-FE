import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function MainLayout({ 
    children, 
    title, 
    activeNav, 
    onNavChange, 
    onLogout, 
    adminData, 
    highRiskCustomers, 
    onViewDetail,
    onProfileClick 
  }) {
    return (
        <div className="dashboard-wrapper">
            <Sidebar onLogout={onLogout} onNavChange={onNavChange} activeNav={activeNav} />
            <main className="main-content-new">
                <Header title={title} adminData={adminData} onProfileClick={onProfileClick} highRiskCustomers={highRiskCustomers} onViewDetail={onViewDetail} />
                <div className="content-body">
                    {children}
                </div>
            </main>
        </div>
    )
}
