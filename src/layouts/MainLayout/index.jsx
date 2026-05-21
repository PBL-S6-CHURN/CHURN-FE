import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "./style.css";
import AlertDetailModal from "../../components/AlertDetailModal";
import { getProfile } from "../../api/userApi";

export default function MainLayout({
  children,
  title,
  activeNav,
  onNavChange,
  onLogout,
  onProfileClick,
}) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminData, setAdminData] = useState({username: "", email: ""});
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Fungsi ini dipassing ke Header
  const handleViewDetail = (id) => {
    console.log(id);
    setSelectedCustomer(id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchGlobalProfile = async () => {
      try {
        const response = await getProfile();
        const userData = response?.data?.message || response?.message;
        if (userData) {
          setAdminData(userData);
        }
      } catch (err) {
        console.error("Gagal memuat profil di Layout:", err);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchGlobalProfile();
  }, [activeNav]);

  return (
    <div className="dashboard-wrapper">
      <Sidebar
        onLogout={onLogout}
        onNavChange={onNavChange}
        activeNav={activeNav}
      />
      <main className="main-content-new">
        <Header
          title={title}
          adminData={adminData}
          onProfileClick={onProfileClick}
          onViewDetail={handleViewDetail}
        />
        <AlertDetailModal
          isOpen={isModalOpen}
          alertId={selectedCustomer}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCustomer(null);
          }}
          onRefreshData={() => {
            // Jika ada fungsi refresh data dashboard global, taruh di sini
            console.log("Data di-refresh setelah resolve");
          }}
        />
        {/* <div className="content-body">{children}</div> */}
        {/* (Dashboard, Customers, dll.) */}
        <main style={{ padding: '30px', flex: 1 }}>
          {loadingProfile ? (
            <div style={{ textAlign: 'center', marginTop: '50px', color: '#630000' }}>
              <h4>Sinkronisasi sistem...</h4>
            </div>
          ) : (
            // Inject adminData dan fungsi refresh ke halaman anak jika dibutuhkan
            React.Children.map(children, child => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, { adminData });
              }
              return child;
            })
          )}
        </main>
      </main>
    </div>
  );
}
