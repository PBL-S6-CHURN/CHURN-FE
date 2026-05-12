// sama bagian ini tolong agak dirapihin sedikit biar sama kek di desain, trus juga nontifikasi tolong banget
// itu udh gua buat setengah tapii gua binggung euyy

import { useState, useMemo } from 'react';
import logo from '../assets/logoChurn.png';

function Dashboard({ onLogout, onProfileClick, adminData, onViewDetail, onNavChange }) {
  const allData = useMemo(() => {
    const plans = ['Starter', 'Enterprise', 'Professional'];
    const risks = ['Low', 'Medium', 'High'];
    return Array.from({ length: 40 }, (_, i) => ({
      id: `C-00${(i + 1).toString().padStart(2, '0')}`,
      plan: plans[Math.floor(Math.random() * plans.length)],
      contract: Math.random() > 0.5 ? 'Monthly' : 'Annual',
      users: Math.floor(Math.random() * 50) + 5,
      hours: (Math.random() * 200 + 20).toFixed(2),
      feature: (Math.random() * 100).toFixed(1),
      delay: Math.floor(Math.random() * 10),
      score: Math.floor(Math.random() * 100),
      risk: risks[Math.floor(Math.random() * risks.length)],
      churn: Math.random() > 0.5 ? 'Yes' : 'No',
    }));
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showNotif, setShowNotif] = useState(false);
  const itemsPerPage = 8; 

  const filteredData = allData.filter(item => 
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const stayedCount = allData.filter(item => item.churn === 'No').length;
  const churnedCount = allData.filter(item => item.churn === 'Yes').length;
  const lowRiskCount = allData.filter(item => item.risk === 'Low').length;
  const medRiskCount = allData.filter(item => item.risk === 'Medium').length;
  const highRiskCount = allData.filter(item => item.risk === 'High').length;

  const planStats = useMemo(() => {
    const categories = ['Starter', 'Enterprise', 'Professional'];
    return categories.map(planName => {
      const count = allData.filter(item => item.plan === planName).length;
      const percentage = allData.length > 0 ? ((count / allData.length) * 100).toFixed(0) : 0;
      return { name: planName, count, percentage };
    });
  }, [allData]);

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar-new">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="logo-img" />
          <hr className="divider" />
        </div>
        <nav className="nav-menu">
          {/* DASHBOARD ICON */}
          <div className="nav-link active" style={{ cursor: 'pointer' }}>
            <span className="icon-svg">
              <svg width="22" height="22" viewBox="0 0 24 24"><path fill="#630000" d="m16 11.78l4.24-7.33l1.73 1l-5.23 9.05l-6.51-3.75L5.46 19H22v2H2V3h2v14.54L9.5 8z"/></svg>
            </span> Dashboard
          </div>
          
          {/* TAMBAH CUSTOMER ICON */}
          <div className="nav-link" style={{ cursor: 'pointer' }}>
            <span className="icon-svg">
              <svg width="22" height="22" viewBox="0 0 24 24"><path fill="#630000" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"/></svg>
            </span> Tambah Customer
          </div>
          
          {/* SUMMARIZE ICON */}
          <div className="nav-link" onClick={() => onNavChange('summarize')} style={{ cursor: 'pointer' }}>
            <span className="icon-svg">
              <svg width="22" height="22" viewBox="0 0 24 24"><path fill="#630000" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11l5 5v11q0 .825-.587 1.413T19 21zm3.713-4.288Q9 16.426 9 16t-.288-.712T8 15t-.712.288T7 16t.288.713T8 17t.713-.288m0-4Q9 12.425 9 12t-.288-.712T8 11t-.712.288T7 12t.288.713T8 13t.713-.288m0-4Q9 8.426 9 8t-.288-.712T8 7t-.712.288T7 8t.288.713T8 9t.713-.288M15 9h4l-4-4z"/></svg>
            </span> Summarize
          </div>
        </nav>
        <button className="btn-logout-new" onClick={onLogout}>Logout</button>
      </aside>

      <main className="main-content-new">
        <header className="top-bar">
          <h1 className="title">Dashboard</h1>
          <div className="user-actions" style={{ position: 'relative' }}>
            <span className="notif-svg" onClick={() => setShowNotif(!showNotif)} style={{ cursor: 'pointer', position: 'relative' }}>
              <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#630000" d="M1 20v-2.946c1.993-.656 2.575-2.158 3.668-6.077.897-3.218 1.891-6.784 4.873-8.023-.027-.147-.041-.299-.041-.454 0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5c0 .156-.014.309-.042.458 2.987 1.244 3.984 4.813 4.884 8.033 1.103 3.95 1.697 5.423 3.658 6.062v2.947h-7c0 2.208-1.792 4-4 4s-4-1.792-4-4h-7z"/></svg>
              {highRiskCount > 0 && <span className="notif-badge"></span>}
            </span>

            {showNotif && (
              <div className="notif-dropdown shadow-real-black">
                <div className="notif-header"><h4>Notification</h4></div>
                <div className="notif-body">
                  {allData.filter(c => c.risk === 'High').slice(0, 5).map(item => (
                    <div key={item.id} className="notif-item" onClick={() => {onViewDetail(item); setShowNotif(false);}}>
                      <div className="notif-icon-circle">👤</div>
                      <div className="notif-text">
                        <p className="notif-msg">Customer <strong>{item.id}</strong> High Risk!</p>
                        <span className="notif-time">Just now</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <span className="profile-svg" onClick={onProfileClick} style={{ cursor: 'pointer' }}>
                {adminData?.foto ? <img src={adminData.foto} className="avatar-img-small" alt="p" /> : "👤"}
            </span>
          </div>
        </header>

        {/* STATS, PLAN TYPE, TOOLS, TABLE */}
        <div className="stats-container">
          <div className="card churn-card">
            <h3>Churn Status</h3>
            <div className="churn-content">
              <div className="churn-box-white"><span>Stayed</span><span className="number">{stayedCount}</span></div>
              <div className="churn-box-maroon"><span>Churned</span><span className="number">{churnedCount}</span></div>
            </div>
          </div>
          <div className="card risk-card">
            <div className="risk-accent-line"></div>
            <h3>Risk Category Count</h3>
            <div className="risk-content">
              <div className="risk-stat"><span>Low</span><span className="number">{lowRiskCount}</span></div>
              <div className="v-divider"></div>
              <div className="risk-stat"><span>Medium</span><span className="number">{medRiskCount}</span></div>
              <div className="v-divider"></div>
              <div className="risk-stat"><span>High</span><span className="number">{highRiskCount}</span></div>
            </div>
          </div>
        </div>

        <div className="card plan-card-new">
          <h3>Plan Type Category</h3>
          {planStats.map((plan) => (
            <div key={plan.name} className="plan-item">
              <div className="plan-info"><span>{plan.name}</span><span>{plan.count} Customer</span></div>
              <div className="progress-container"><div className="progress-bar-maroon" style={{ width: `${plan.percentage}%` }}></div></div>
              <span className="percent">{plan.percentage}%</span>
            </div>
          ))}
        </div>

        <div className="table-header-tools" style={{ marginTop: '20px' }}>
          <div className="search-bar-new">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#630000" width="18" height="18" style={{ marginRight: '8px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input type="text" placeholder="Search ID..." value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Customer_id</th><th>Plan Type</th><th>Contract Type</th><th>Total Users</th>
                <th>Monthly Usage Hours</th><th>Feature Adoption Pct</th><th>Payment Delay Count</th>
                <th>Score</th><th>Risk</th><th>Churn</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((row) => (
                <tr key={row.id}>
                  <td onClick={() => onViewDetail(row)} style={{ cursor: 'pointer', color: '#3a3a3a', fontWeight: 'bold', textDecoration: 'underline' }}>{row.id}</td>
                  <td>{row.plan}</td><td>{row.contract}</td><td>{row.users}</td>
                  <td>{row.hours}</td><td>{row.feature}</td><td>{row.delay}</td><td>{row.score}</td>
                  <td className={`risk-text-${row.risk.toLowerCase()}`}>{row.risk}</td><td>{row.churn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-new">
          <div className="pages">
            <span onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} style={{ cursor: 'pointer' }}>‹</span>
            {[...Array(totalPages)].map((_, i) => (
              <span key={i+1} onClick={() => setCurrentPage(i+1)} className={currentPage === i+1 ? 'active-p' : ''} style={{ cursor: 'pointer' }}>{i+1}</span>
            ))}
            <span onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} style={{ cursor: 'pointer' }}>›</span>
          </div>
          <div className="page-info">Page {currentPage} of {totalPages || 1}</div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;