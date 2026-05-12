import React from 'react';
import logo from '../assets/logoChurn.png';

function Summarize({ onLogout, onProfileClick, adminData, onNavChange }) {
  const comments = [
    { id: 1, name: "Jonathan", rating: 4.0, text: "Wkwkwkwk yg pada bingung ganti bahasa, ada disettingan..." },
    { id: 2, name: "Jonathan", rating: 4.0, text: "Wkwkwkwk yg pada bingung ganti bahasa, ada disettingan..." },
  ];

  return (
    <div className="dashboard-wrapper">
      {/* SIDEBAR*/}
      <aside className="sidebar-new">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="logo-img" />
          <hr className="divider" />
        </div>
        <nav className="nav-menu">
          {/* Dashboard Icon */}
          <div className="nav-link" onClick={() => onNavChange('dashboard')} style={{ cursor: 'pointer' }}>
            <span className="icon-svg">
              <svg width="22" height="22" viewBox="0 0 24 24"><path fill="#630000" d="m16 11.78l4.24-7.33l1.73 1l-5.23 9.05l-6.51-3.75L5.46 19H22v2H2V3h2v14.54L9.5 8z"/></svg>
            </span> Dashboard
          </div>
          <div className="nav-link" style={{ cursor: 'pointer' }}>
            <span className="icon-svg">
              <svg width="22" height="22" viewBox="0 0 24 24"><path fill="#630000" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"/></svg>
            </span> Tambah Customer
          </div>
          <div className="nav-link active" style={{ cursor: 'pointer' }}>
            <span className="icon-svg">
              <svg width="22" height="22" viewBox="0 0 24 24"><path fill="#630000" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11l5 5v11q0 .825-.587 1.413T19 21zm3.713-4.288Q9 16.426 9 16t-.288-.712T8 15t-.712.288T7 16t.288.713T8 17t.713-.288m0-4Q9 12.425 9 12t-.288-.712T8 11t-.712.288T7 12t.288.713T8 13t.713-.288m0-4Q9 8.426 9 8t-.288-.712T8 7t-.712.288T7 8t.288.713T8 9t.713-.288M15 9h4l-4-4z"/></svg>
            </span> Summarize
          </div>
        </nav>
        <button className="btn-logout-new" onClick={onLogout}>Logout</button>
      </aside>

      <main className="main-content-new">
        <header className="top-bar">
          <h1 className="title">Summarize</h1>
          <div className="user-actions">
            <span className="notif-svg">
              <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#630000" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
            </span>
            <span className="profile-svg" onClick={onProfileClick} style={{ cursor: 'pointer' }}>
              {adminData?.foto ? <img src={adminData.foto} style={{ width: '32px', height: '32px', borderRadius: '50%' }} alt="p" /> : "👤"}
            </span>
          </div>
        </header>

        {/* Persentase Section */}
        <div className="summarize-section">
          <h3 className="sub-title-sm">Percentage</h3>
          <div className="percentage-container">
            <div className="perc-card white shadow-real-black">
              <p>Positif</p>
              <h2>20%</h2>
            </div>
            <div className="perc-card maroon shadow-real-black">
              <p>Negatif</p>
              <h2>80%</h2>
            </div>
          </div>
        </div>

        {/* Teks Summarize */}
        <div className="summarize-section">
          <h3 className="sub-title-sm">Summarize</h3>
          <div className="text-content-sm">
            <div className="sm-item">
              <h4>Positif</h4>
              <p>Review customer memberikan feedback positif terkait kemudahan akses fitur dan navigasi aplikasi yang intuitif.</p>
            </div>
            <div className="sm-item">
              <h4>Negatif</h4>
              <p>Banyak keluhan terkait lambatnya respon customer service dan kendala teknis saat melakukan login di jam sibuk.</p>
            </div>
          </div>
        </div>

        {/* Komentar Section */}
        <div className="summarize-section" style={{ paddingBottom: '40px' }}>
          <h3 className="sub-title-sm">Top 5 Comment</h3>
          <div className="comments-list">
            {comments.map(c => (
              <div key={c.id} className="comment-card shadow-real-black">
                <div className="comment-header">
                  <div className="user-info">
                    <div className="user-avatar-sm">👤</div>
                    <span className="user-name">{c.name}</span>
                  </div>
                  <div className="rating"><span className="star">★</span> {c.rating.toFixed(1)}</div>
                </div>
                <p className="comment-text">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Summarize;