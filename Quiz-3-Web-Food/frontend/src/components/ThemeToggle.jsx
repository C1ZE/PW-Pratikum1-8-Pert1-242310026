import React from "react";
import { useTheme } from "../context/ThemeContext";

// Komponen modular untuk tombol switch Dark Mode (dikembangkan dari Quiz 2)
function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="toggle-container">
      <span className="mode-status">
        {isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </span>
      <button
        className={`toggle-btn ${isDarkMode ? "dark" : "light"}`}
        onClick={toggleTheme}
      >
        {isDarkMode ? "Switch to Light" : "Switch to Dark"}
      </button>
    </div>
  );
}

export default ThemeToggle;
