import React from 'react';

// Komponen modular untuk tombol switch Dark Mode
function ThemeToggle({ isDarkMode, toggleTheme }) {
  return (
    <div className="toggle-container">
      {/* Menampilkan status mode yang sedang aktif sesuai instruksi */}
      <span className="mode-status">
        {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </span>
      
      <button 
        className={`toggle-btn ${isDarkMode ? 'dark' : 'light'}`} 
        onClick={toggleTheme}
      >
        {isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
      </button>
    </div>
  );
}

export default ThemeToggle;