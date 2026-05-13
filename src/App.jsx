import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminProfile from './components/AdminProfile';
import CustomerDetail from './components/CustomerDetail';
import Summarize from './components/Summarize'; 
import TambahCustomer from './components/TambahCustomer'; // 1. TAMBAHKAN IMPORT INI

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
      {/* 2. HALAMAN DASHBOARD */}
      {page === 'dashboard' && (
        <Dashboard 
          adminData={adminData} 
          onLogout={() => setPage('login')} 
          onProfileClick={() => setPage('profile')}
          onViewDetail={handleViewDetail}
          onNavChange={setPage} 
        />
      )}

      {/* 3. HALAMAN TAMBAH CUSTOMER */}
      {page === 'tambah' && (
        <TambahCustomer 
          adminData={adminData}
          onLogout={() => setPage('login')}
          onProfileClick={() => setPage('profile')}
          onNavChange={setPage} 
        />
      )}

      {/* 4. HALAMAN SUMMARIZE */}
      {page === 'summarize' && (
        <Summarize 
          adminData={adminData}
          onLogout={() => setPage('login')}
          onProfileClick={() => setPage('profile')}
          onNavChange={setPage} 
        />
      )}

      {/* 5. HALAMAN PROFIL */}
      {page === 'profile' && (
        <AdminProfile 
          adminData={adminData}
          setAdminData={setAdminData}
          onBack={() => setPage('dashboard')} 
          onLogout={() => setPage('login')}
        />
      )}

      {/* 6. HALAMAN DETAIL CUSTOMER */}
      {page === 'detail' && (
        <CustomerDetail 
          customer={selectedCustomer}
          adminData={adminData}
          onBack={() => setPage('dashboard')} 
          onLogout={() => setPage('login')}
          onProfileClick={() => setPage('profile')}
        />
      )}

      {/* 7. HALAMAN AUTH (LOGIN) */}
      {(page === 'login' || page === 'register' || page === 'forget') && (
        <div className="page-wrapper">
          {page === 'login' && (
            <Login 
              adminData={adminData}
              onLoginSuccess={() => setPage('dashboard')} 
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;