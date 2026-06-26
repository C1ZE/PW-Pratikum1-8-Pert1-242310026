import React, { useState } from 'react';
import Clock from './components/Clock';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

// Komponen Utama (Functional Component)
function App() {
  // State untuk mengelola status Dark Mode / Light Mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fungsi event handling untuk mengubah tema ketika tombol diklik
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="clock-card">
        <h2 className="app-title">DIGITAL CLOCK</h2>
        <hr className="divider" />
        
        {/* Memanggil Komponen Modular Jam */}
        <Clock />
        
        {/* Memanggil Komponen Modular Tombol Tema */}
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}

export default App;