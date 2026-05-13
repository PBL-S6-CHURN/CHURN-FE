import React from 'react';
import logo from '../assets/logoChurn.png';

function TambahCustomer({ onLogout, onProfileClick, adminData, onNavChange }) {
  return (
    <div className="dashboard-wrapper">
      {/* SIDEBAR */}
      <aside className="sidebar-new">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="logo-img" />
          <hr className="divider" />
        </div>
        <nav className="nav-menu">
          <div className="nav-link" onClick={() => onNavChange('dashboard')} style={{ cursor: 'pointer' }}>
            <span className="icon-svg">
              <svg width="22" height="22" viewBox="0 0 24 24"><path fill="#630000" d="m16 11.78l4.24-7.33l1.73 1l-5.23 9.05l-6.51-3.75L5.46 19H22v2H2V3h2v14.54L9.5 8z"/></svg>
            </span> Dashboard
          </div>
          <div className="nav-link active" style={{ cursor: 'pointer' }}>
            <span className="icon-svg">
              <svg width="22" height="22" viewBox="0 0 24 24"><path fill="#630000" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"/></svg>
            </span> Tambah Customer
          </div>
          <div className="nav-link" onClick={() => onNavChange('summarize')} style={{ cursor: 'pointer' }}>
            <span className="icon-svg">
              <svg width="22" height="22" viewBox="0 0 24 24"><path fill="#630000" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11l5 5v11q0 .825-.587 1.413T19 21zm3.713-4.288Q9 16.426 9 16t-.288-.712T8 15t-.712.288T7 16t.288.713T8 17t.713-.288m0-4Q9 12.425 9 12t-.288-.712T8 11t-.712.288T7 12t.288.713T8 13t.713-.288m0-4Q9 8.426 9 8t-.288-.712T8 7t-.712.288T7 8t.288.713T8 9t.713-.288M15 9h4l-4-4z"/></svg>
            </span> Summarize
          </div>
        </nav>
        <button className="btn-logout-new" onClick={onLogout}>Logout</button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content-new">
        <header className="top-bar">
          <h1 className="title">Tambah Customer</h1>
          <div className="user-actions">
            <span className="notif-svg"><svg width="24" height="24" viewBox="0 0 24 24"><path fill="#630000" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg></span>
            <span className="profile-svg" onClick={onProfileClick} style={{ cursor: 'pointer' }}>
              {adminData?.foto ? <img src={adminData.foto} className="avatar-img-small" alt="p" /> : "👤"}
            </span>
          </div>
        </header>

        <section className="form-container">
          <div className="form-grid">
            <div className="form-group">
              <label>Customer id</label>
              <input type="text" placeholder="" className="form-input" />
            </div>
            <div className="form-group">
              <label>Plan Type</label>
              <select className="form-input">
                <option>Starter</option>
                <option>Professional</option>
                <option>Enterprise</option>
              </select>
            </div>
            <div className="form-group">
              <label>Contract Type</label>
              <select className="form-input">
                <option>Monthly</option>
                <option>Annual</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tenure Months (month)</label>
              <input type="number" className="form-input" />
            </div>
            <div className="form-group">
              <label>Payment Delay Count</label>
              <input type="number" className="form-input" />
            </div>
            <div className="form-group">
              <label>Monthly Usage Hours (hour)</label>
              <input type="number" className="form-input" />
            </div>
            <div className="form-group">
              <label>Total Users (user)</label>
              <input type="number" className="form-input" />
            </div>
            <div className="form-group">
              <label>Feature Adoption</label>
              <input type="number" className="form-input" />
            </div>
            <div className="form-group">
              <label>Support Tickets Last 90 Days (day)</label>
              <input type="number" className="form-input" />
            </div>
            <div className="form-group">
              <label>Last Login Days Ago (day)</label>
              <input type="number" className="form-input" />
            </div>
            <div className="form-group full-width">
              <label>NPS Score</label>
              <input type="number" className="form-input" style={{ width: '48.5%' }} />
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-submit">Tambahkan</button>
            <button className="btn-cancel">Batalkan</button>
          </div>

          <div className="form-divider">
            <span>OR</span>
          </div>

          <div className="form-upload">
            <button className="btn-excel">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
              Upload by Excel
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TambahCustomer;