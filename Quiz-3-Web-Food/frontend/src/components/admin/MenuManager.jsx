import React, { useEffect, useState } from "react";
import api from "../../api/api";

const emptyForm = { name: "", description: "", price: "", emoji: "🍽️", category: "Makanan", available: true };

// Komponen CRUD untuk mengelola Menu dari Admin Panel
function MenuManager() {
  const [menus, setMenus] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);

  const loadMenus = async () => {
    const { data } = await api.get("/menu");
    setMenus(data);
  };

  useEffect(() => {
    loadMenus();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const payload = { ...form, price: Number(form.price) };
      if (editingId) {
        await api.put(`/menu/${editingId}`, payload);
        setMessage({ type: "success", text: "Menu berhasil diupdate." });
      } else {
        await api.post("/menu", payload);
        setMessage({ type: "success", text: "Menu berhasil ditambahkan." });
      }
      resetForm();
      loadMenus();
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Gagal menyimpan menu." });
    }
  };

  const handleEdit = (menu) => {
    setEditingId(menu.id);
    setForm({
      name: menu.name,
      description: menu.description,
      price: menu.price,
      emoji: menu.emoji,
      category: menu.category,
      available: menu.available,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus menu ini?")) return;
    try {
      await api.delete(`/menu/${id}`);
      loadMenus();
    } catch (err) {
      setMessage({ type: "error", text: "Gagal menghapus menu." });
    }
  };

  return (
    <div className="admin-panel-block">
      <h3>Kelola Menu</h3>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Nama menu" value={form.name} onChange={handleChange} required />
        <input name="description" placeholder="Deskripsi" value={form.description} onChange={handleChange} />
        <input name="price" type="number" placeholder="Harga" value={form.price} onChange={handleChange} required />
        <input name="emoji" placeholder="Emoji (opsional)" value={form.emoji} onChange={handleChange} />
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="Makanan">Makanan</option>
          <option value="Minuman">Minuman</option>
        </select>
        <label className="checkbox-label">
          <input type="checkbox" name="available" checked={form.available} onChange={handleChange} />
          Tersedia
        </label>
        <div className="admin-form-actions">
          <button type="submit" className="btn-main">{editingId ? "Update Menu" : "Tambah Menu"}</button>
          {editingId && <button type="button" onClick={resetForm}>Batal</button>}
        </div>
      </form>

      {message && (
        <p className={`status-text ${message.type === "error" ? "error" : "success"}`}>{message.text}</p>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Kategori</th>
            <th>Harga</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu.id}>
              <td>{menu.emoji} {menu.name}</td>
              <td>{menu.category}</td>
              <td>Rp {menu.price.toLocaleString("id-ID")}</td>
              <td>{menu.available ? "Tersedia" : "Habis"}</td>
              <td>
                <button onClick={() => handleEdit(menu)}>Edit</button>
                <button className="btn-remove" onClick={() => handleDelete(menu.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MenuManager;
