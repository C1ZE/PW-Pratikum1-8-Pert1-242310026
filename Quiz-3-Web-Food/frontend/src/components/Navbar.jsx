import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        ZENITH<span>BITES</span>
      </div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#tech">Tech</a></li>
        <li><Link to="/admin" className="admin-link">Admin</Link></li>
        <li><ThemeToggle /></li>
      </ul>
    </nav>
  );
}

export default Navbar;
