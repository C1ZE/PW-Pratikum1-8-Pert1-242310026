import React, { useEffect, useState } from "react";
import api from "../api/api";

// Komponen ini mengambil data Menu dari backend (bukan hardcoded lagi seperti Quiz 1)
function MenuList({ cart, onAddToCart }) {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const { data } = await api.get("/menu");
        setMenus(data);
      } catch (err) {
        setError("Gagal memuat menu. Pastikan backend sedang berjalan.");
      } finally {
        setLoading(false);
      }
    };
    fetchMenus();
  }, []);

  if (loading) return <p className="status-text">Memuat menu...</p>;
  if (error) return <p className="status-text error">{error}</p>;

  return (
    <section id="menu" className="menu-section">
      <h2 className="section-title">Chef's Recommendations</h2>
      <div className="container grid">
        {menus.length === 0 && <p className="status-text">Belum ada menu tersedia.</p>}
        {menus.map((menu) => (
          <div className="menu-card" key={menu.id}>
            <span className="emoji">{menu.emoji}</span>
            <h4>{menu.name}</h4>
            <p className="menu-desc">{menu.description}</p>
            <p className="menu-price">Rp {menu.price.toLocaleString("id-ID")}</p>
            <button onClick={() => onAddToCart(menu)} disabled={!menu.available}>
              {menu.available ? "Pesan" : "Habis"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MenuList;
