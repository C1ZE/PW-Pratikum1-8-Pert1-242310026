import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import MenuList from "./components/MenuList";
import OrderCart from "./components/OrderCart";
import Footer from "./components/Footer";

import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";

function HomePage() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (menu) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.menuId === menu.id);
      if (existing) {
        return prev.map((item) =>
          item.menuId === menu.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { menuId: menu.id, name: menu.name, price: menu.price, quantity: 1 }];
    });
  };

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <MenuList cart={cart} onAddToCart={handleAddToCart} />
      <OrderCart cart={cart} setCart={setCart} />
      <Footer />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
