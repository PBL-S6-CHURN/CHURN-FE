import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminProfile from './components/AdminProfile';
import CustomerDetail from './components/CustomerDetail';
import Summarize from './components/Summarize'; 

function App() {
  const [page, setPage] = useState('login'); 
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [adminData, setAdminData] = useState({
    nama: 'Admin Churn Center',
    email: 'admin@churncenter.id',
    password: 'admin', 
    foto: null 
  });
  const handleViewDetail = (customer) => {
    setSelectedCustomer(customer);
    setPage('detail');
  };

  return (
    <>
      {/*HALAMAN DASHBOARD */}
      {page === 'dashboard' && (
        <Dashboard 
          adminData={adminData} 
          onLogout={() => setPage('login')} 
          onProfileClick={() => setPage('profile')}
          onViewDetail={handleViewDetail}
          onNavChange={setPage} 
        />
      )}

      {/* HALAMAN SUMMARIZE */}
      {page === 'summarize' && (
        <Summarize 
          adminData={adminData}
          onLogout={() => setPage('login')}
          onProfileClick={() => setPage('profile')}
          onNavChange={setPage} 
        />
      )}

      {/*HALAMAN PROFIL */}
      {page === 'profile' && (
        <AdminProfile 
          adminData={adminData}
          setAdminData={setAdminData}
          onBack={() => setPage('dashboard')} 
          onLogout={() => setPage('login')}
        />
      )}

      {/*HALAMAN DETAIL CUSTOMER */}
      {page === 'detail' && (
        <CustomerDetail 
          customer={selectedCustomer}
          adminData={adminData}
          onBack={() => setPage('dashboard')} 
          onLogout={() => setPage('login')}
          onProfileClick={() => setPage('profile')}
        />
      )}

      {/* HALAMAN AUTH (LOGIN) */}
      {(page === 'login' || page === 'register' || page === 'forget') && (
        <div className="page-wrapper">
          {page === 'login' && (
            <Login 
              adminData={adminData}
              onLoginSuccess={() => setPage('dashboard')} 
            />
          )}
          {/* Tambahkan Register/ForgetPassword di sini jika filenya sudah ada */}
        </div>
      )}
    </>
  );
}

export default App;