import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import "./style.css";
import AlertDetailModal from "../../components/AlertDetailModel";

export default function MainLayout({
  children,
  title,
  activeNav,
  onNavChange,
  onLogout,
  adminData,
  highRiskCustomers,
  onProfileClick,
}) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fungsi ini dipassing ke Header
  const handleViewDetail = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

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
          highRiskCustomers={highRiskCustomers}
          onViewDetail={handleViewDetail}
        />
        <AlertDetailModal
          isOpen={isModalOpen}
          customer={selectedCustomer}
          onClose={() => setIsModalOpen(false)}
        />
        <div className="content-body">{children}</div>
      </main>
    </div>
  );
}
