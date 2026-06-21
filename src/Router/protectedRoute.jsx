import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Jika token tidak ada, arahkan paksa ke login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Jika ada token, tampilkan halaman yang diminta
  return children;
};

export default ProtectedRoute;
