import React, { createContext, useContext, useState } from "react";
import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const username = localStorage.getItem("zenith_admin_username");
    return username ? { username } : null;
  });

  const login = async (username, password) => {
    const { data } = await api.post("/auth/login", { username, password });
    localStorage.setItem("zenith_admin_token", data.token);
    localStorage.setItem("zenith_admin_username", data.username);
    setAdmin({ username: data.username });
  };

  const logout = () => {
    localStorage.removeItem("zenith_admin_token");
    localStorage.removeItem("zenith_admin_username");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
