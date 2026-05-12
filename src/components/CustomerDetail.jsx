import React from 'react';
import logo from '../assets/logoChurn.png';

function CustomerDetail({ customer, onBack, onLogout, adminData, onProfileClick }) {
  if (!customer) return null;

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar-new">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="logo-img" />
          <hr className="divider" />
        </div>
        <nav className="nav-menu">
          <div className="nav-link active" onClick={onBack} style={{ cursor: 'pointer' }}>
            <span className="icon-svg">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="#630000" d="m16 11.78l4.24-7.33l1.73 1l-5.23 9.05l-6.51-3.75L5.46 19H22v2H2V3h2v14.54L9.5 8z"/></svg>
            </span> Dashboard
          </div>
          <div className="nav-link">
            <span className="icon-svg">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="#630000" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"/></svg>
            </span> Tambah Customer
          </div>
          <div className="nav-link">
            <span className="icon-svg">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="#630000" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11l5 5v11q0 .825-.587 1.413T19 21zm3.713-4.288Q9 16.426 9 16t-.288-.712T8 15t-.712.288T7 16t.288.713T8 17t.713-.288m0-4Q9 12.425 9 12t-.288-.712T8 11t-.712.288T7 12t.288.713T8 13t.713-.288m0-4Q9 8.426 9 8t-.288-.712T8 7t-.712.288T7 8t.288.713T8 9t.713-.288M15 9h4l-4-4z"/></svg>
            </span> Summarize
          </div>
        </nav>
        <button className="btn-logout-new" onClick={onLogout}>Logout</button>
      </aside>

      <main className="main-content-new">
        <header className="top-bar">
  <div className="breadcrumb-wrapper">
    <h1 className="title-link" onClick={onBack}>Dashboard</h1>
    <span className="breadcrumb-sep">/</span>
    <h1 className="title-active">Detail_{customer.id}</h1>
  </div>
  
  <div className="user-actions">
    <span className="notif-svg" onClick={() => setShowNotif(!showNotif)}>
      <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#630000" d="M1 20v-2.946c1.993-.656 2.575-2.158 3.668-6.077..." /></svg>
    </span>
    <span className="profile-svg" onClick={onProfileClick}>{adminData?.foto ? <img src={adminData.foto} className="avatar-img-small" /> : "👤"}</span>
  </div>
</header>

        <div className="detail-layout" style={{ padding: '20px', display: 'flex', gap: '20px' }}>
          <div className="detail-card-main" style={{ flex: '0 0 300px', textAlign: 'center' }}>
             <div className="photo-placeholder" style={{ borderRadius: '12px', border: '1px solid #ddd', padding: '10px', background: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ background: '#f8f8f8', height: '280px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="180" height="180" viewBox="0 0 24 24" fill="#630000"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                <h4 style={{ color: '#630000', margin: '15px 0 5px', fontSize: '1rem' }}>Status : {customer.churn === 'Yes' ? 'Churned' : 'Stayed'}</h4>
             </div>
          </div>
          <div className="detail-grid" style={{ flex: '1', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <InfoBox label="Plan Type" value={customer.plan} />
            <InfoBox label="Contract Type" value={customer.contract} />
            <InfoBox label="Tenure Months" value="19" unit="Months" />
            
            <InfoBox label="Payment Delay Count" value={customer.delay} unit="Times" />
            <InfoBox label="Monthly Usage Hours" value={customer.hours} unit="Hours" />
            <InfoBox label="Total User" value={customer.users} unit="User" />
            
            <InfoBox label="Feature Adoption Pct" value={customer.feature} unit="Pct" />
            <InfoBox label="Support Tickets (last 30 Days)" value="0" unit="Days" />
            <InfoBox label="Last Login Days Ago" value="34" unit="Days" />
            
            <InfoBox label="Nps Score" value={customer.score} isFull={true} />
          </div>
        </div>

        {/* PREDICTION RESULT SECTION */}
        <div style={{ padding: '0 20px 20px' }}>
          <div className="prediction-card" style={{ border: '1px solid #EEEBDD', borderRadius: '12px', padding: '15px', background: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '0.9rem', marginBottom: '15px', color: '#333' }}>Prediction Result</h3>
            <div style={{ display: 'flex', gap: '15px' }}>
              <PredictBox title="Risk" value={customer.risk.toUpperCase()} isRisk={true} />
              <PredictBox title="Churn Factor" value="Keterangan faktor churn customer ini berdasarkan analisis data penggunaan..." />
              <PredictBox title="Solution" value="Saya puas" />
            </div>
          </div>
        </div>

        {/* CONTACT BUTTONS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', paddingBottom: '40px' }}>
        <button 
            className="contact-btn" 
            style={{ 
            background: '#d3cdbc', 
            color: '#333', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            border: '1px solid #c5bea9'
            }}
            onClick={() => window.open(`https://wa.me/6281385169580`, '_blank')}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512">
            <path fill="#25D366" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.6-6.5 8.3-9.8 2.8-3.2 3.7-5.5 5.5-9.3 1.9-3.7.9-6.9-.5-9.8-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.3 5.7 23.7 9.1 31.7 11.7 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
            </svg>
            Whatsapp
        </button>
        <button 
            className="contact-btn" 
            style={{ 
            background: '#d3cdbc', 
            color: '#333', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            border: '1px solid #c5bea9'
            }}
            onClick={() => window.location.href = `mailto:customer@churncenter.id`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="#000000" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            Gmail
        </button>

        </div>
      </main>
    </div>
  );
}

//Box Info
function InfoBox({ label, value, unit, isFull }) {
  return (
    <div className="info-box" style={{ 
      gridColumn: isFull ? 'span 3' : 'span 1',
      background: 'white', border: '1px solid #ddd', borderRadius: '10px', 
      padding: '10px 15px', position: 'relative', height: '85px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
    }}>
      <p style={{ fontSize: '0.65rem', color: '#999', margin: '0 0 5px' }}>{label}</p>
      <h2 style={{ fontSize: '1.2rem', margin: '0', color: '#333' }}>{value}</h2>
      {unit && <span style={{ position: 'absolute', bottom: '8px', right: '10px', fontSize: '0.6rem', color: '#630000', fontWeight: 'bold' }}>{unit}</span>}
    </div>
  );
}

// Prediction Box
function PredictBox({ title, value, isRisk }) {
  return (
    <div style={{ 
      flex: '1', background: '#EEEBDD', border: '1px solid #d3cdbc', 
      borderRadius: '8px', padding: '12px' 
    }}>
      <p style={{ fontSize: '0.7rem', fontWeight: 'bold', margin: '0 0 8px', color: '#333' }}>{title}</p>
      <div style={{ fontSize: isRisk ? '2.2rem' : '0.7rem', fontWeight: isRisk ? 'bold' : 'normal', color: isRisk ? '#630000' : '#555', lineHeight: '1.3' }}>
        {value}
      </div>
    </div>
  );
}

export default CustomerDetail;