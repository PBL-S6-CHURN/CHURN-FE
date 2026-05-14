import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// pages
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Summarize from "../pages/Summarize";
import AdminProfile from "../pages/AdminProfile";
import CustomerDetail from "../pages/CustomerDetail";
import TambahCustomer from "../pages/TambahCustomer";

export default function Router({
  adminData,
  setAdminData,
  allData,
  highRiskCustomers,
  selectedCustomer,
  setSelectedCustomer,
}) {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login adminData={adminData} />} />
      <Route path="/register" element={<Register />} />

      {/* Private Routes */}
      <Route
        path="/dashboard"
        element={
          <Dashboard
            allData={allData}
            adminData={adminData}
            highRiskCustomers={highRiskCustomers}
            onViewDetail={setSelectedCustomer}
          />
        }
      />

      <Route
        path="/summarize"
        element={
          <Summarize
            adminData={adminData}
            highRiskCustomers={highRiskCustomers}
            onViewDetail={setSelectedCustomer}
          />
        }
      />

      <Route
        path="/profile"
        element={
          <AdminProfile
            adminData={adminData}
            setAdminData={setAdminData}
            highRiskCustomers={highRiskCustomers}
          />
        }
      />

      <Route
        path="/add-customer"
        element={
          <TambahCustomer
            adminData={adminData}
            highRiskCustomers={highRiskCustomers}
          />
        }
      />

      <Route
        path="/detail"
        element={
          <CustomerDetail
            customer={selectedCustomer}
            adminData={adminData}
            highRiskCustomers={highRiskCustomers}
          />
        }
      />

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
