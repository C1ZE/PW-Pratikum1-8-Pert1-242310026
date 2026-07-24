import React, { useState } from "react";
import api from "../api/api";

// Komponen fitur pemesanan sederhana: user pilih menu -> buat order -> tersimpan di DB
function OrderCart({ cart, setCart }) {
  const [customerName, setCustomerName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.menuId === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.menuId !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || cart.length === 0) {
      setMessage({ type: "error", text: "Isi nama dan pilih minimal 1 menu." });
      return;
    }

    setSubmitting(true);
    setMessage(null);
    try {
      await api.post("/orders", {
        customerName,
        items: cart.map((item) => ({
          menuId: item.menuId,
          quantity: item.quantity,
        })),
      });
      setMessage({ type: "success", text: "Order berhasil dibuat! Status: Pending." });
      setCart([]);
      setCustomerName("");
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Gagal membuat order.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="order" className="order-section">
      <h2 className="section-title">Keranjang Pesanan</h2>
      <div className="container order-box">
        {cart.length === 0 ? (
          <p className="status-text">Keranjang masih kosong. Pilih menu di atas.</p>
        ) : (
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.menuId} className="cart-item">
                <span>{item.name}</span>
                <div className="qty-control">
                  <button type="button" onClick={() => updateQty(item.menuId, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => updateQty(item.menuId, 1)}>+</button>
                </div>
                <span>Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
                <button type="button" className="btn-remove" onClick={() => removeItem(item.menuId)}>✕</button>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <p className="cart-total">Total: Rp {total.toLocaleString("id-ID")}</p>
        )}

        <form onSubmit={handleSubmit} className="order-form">
          <input
            type="text"
            placeholder="Nama Pemesan"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <button type="submit" disabled={submitting} className="btn-main">
            {submitting ? "Memproses..." : "Buat Pesanan"}
          </button>
        </form>

        {message && (
          <p className={`status-text ${message.type === "error" ? "error" : "success"}`}>
            {message.text}
          </p>
        )}
      </div>
    </section>
  );
}

export default OrderCart;
