import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import MenuManager from "./MenuManager";
import OrderManager from "./OrderManager";

function AdminDashboard() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Panel — Zenith Bites</h2>
        <div className="admin-header-right">
          <span>Halo, {admin?.username}</span>
          <ThemeToggle />
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <MenuManager />
      <OrderManager />
    </div>
  );
}

export default AdminDashboard;
