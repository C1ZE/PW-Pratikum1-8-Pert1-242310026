import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Membungkus route Admin Panel agar hanya bisa diakses setelah login
function ProtectedRoute({ children }) {
  const { admin } = useAuth();
  if (!admin) return <Navigate to="/admin" replace />;
  return children;
}

export default ProtectedRoute;
