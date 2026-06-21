import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";

// pages
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Summarize from "../pages/Summarize";
import AdminProfile from "../pages/AdminProfile";
import CustomerDetail from "../pages/CustomerDetail";
import TambahCustomer from "../pages/TambahCustomer";
import SentimentCheck from "../pages/SentimentCheck";

export default function Router({
  adminData,
  setAdminData,
  selectedCustomer,
  setSelectedCustomer
}) {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login adminData={adminData} setAdminData={setAdminData} />} />
      <Route path="/register" element={<Register />} />

      {/* Private Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard
              adminData={adminData}
              onViewDetail={setSelectedCustomer}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/summarize"
        element={
          <ProtectedRoute>
            <Summarize
              adminData={adminData}
              onViewDetail={setSelectedCustomer}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <AdminProfile
              adminData={adminData}
              setAdminData={setAdminData}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sentiment-check"
        element={
          <ProtectedRoute>
            <SentimentCheck
              adminData={adminData}
              setAdminData={setAdminData}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-customer"
        element={
          <ProtectedRoute>
            <TambahCustomer
              adminData={adminData}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/detail/:id"
        element={
          <ProtectedRoute>
            <CustomerDetail
              customer={selectedCustomer}
              adminData={adminData}
            />
          </ProtectedRoute>
        }
      />

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
