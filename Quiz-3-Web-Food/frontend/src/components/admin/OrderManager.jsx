import React, { useEffect, useState } from "react";
import api from "../../api/api";

const statusOptions = ["Pending", "Diproses", "Selesai"];

// Komponen untuk mengelola status Order (Pending -> Diproses -> Selesai) dari Admin Panel
function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      setOrders(data);
    } catch (err) {
      setError("Gagal memuat data order.");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, { status });
      loadOrders();
    } catch (err) {
      setError("Gagal mengupdate status order.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus order ini?")) return;
    await api.delete(`/orders/${id}`);
    loadOrders();
  };

  return (
    <div className="admin-panel-block">
      <h3>Kelola Order</h3>
      {error && <p className="status-text error">{error}</p>}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Pemesan</th>
            <th>Item</th>
            <th>Total</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.customerName}</td>
              <td>
                {order.items.map((it) => `${it.name} x${it.quantity}`).join(", ")}
              </td>
              <td>Rp {order.totalPrice.toLocaleString("id-ID")}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </td>
              <td>
                <button className="btn-remove" onClick={() => handleDelete(order.id)}>Hapus</button>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr><td colSpan="5">Belum ada order.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderManager;
