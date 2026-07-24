const { Order: OrderModel, OrderItem: OrderItemModel, Menu: MenuModel } = require("../models");
const { sequelize: db } = require("../config/db");

// @desc    Ambil semua order (untuk Admin Panel)
// @route   GET /api/orders
// @access  Private (Admin)
const getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.findAll({
      include: [{ model: OrderItemModel, as: "items" }],
      order: [["createdAt", "DESC"]],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data order", error: error.message });
  }
};

// @desc    Buat order baru (user memesan menu)
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  const t = await db.transaction();
  try {
    const { customerName, items } = req.body;

    if (!customerName || !items || items.length === 0) {
      await t.rollback();
      return res.status(400).json({ message: "Nama pemesan dan minimal 1 item wajib diisi" });
    }

    // Validasi & hitung ulang harga dari database (bukan dari input client) agar aman
    let totalPrice = 0;
    const validatedItems = [];

    for (const item of items) {
      const menu = await MenuModel.findByPk(item.menuId);
      if (!menu) {
        await t.rollback();
        return res.status(404).json({ message: `Menu dengan id ${item.menuId} tidak ditemukan` });
      }
      const quantity = item.quantity || 1;
      totalPrice += menu.price * quantity;
      validatedItems.push({
        menuId: menu.id,
        name: menu.name,
        price: menu.price,
        quantity,
      });
    }

    const order = await OrderModel.create(
      { customerName, totalPrice, status: "Pending" },
      { transaction: t }
    );

    await OrderItemModel.bulkCreate(
      validatedItems.map((item) => ({ ...item, orderId: order.id })),
      { transaction: t }
    );

    await t.commit();

    const fullOrder = await OrderModel.findByPk(order.id, {
      include: [{ model: OrderItemModel, as: "items" }],
    });

    res.status(201).json(fullOrder);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: "Gagal membuat order", error: error.message });
  }
};

// @desc    Update status order (Pending -> Diproses -> Selesai)
// @route   PUT /api/orders/:id
// @access  Private (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatus = ["Pending", "Diproses", "Selesai"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Status tidak valid" });
    }

    const order = await OrderModel.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Order tidak ditemukan" });

    await order.update({ status });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate order", error: error.message });
  }
};

// @desc    Hapus order
// @route   DELETE /api/orders/:id
// @access  Private (Admin)
const deleteOrder = async (req, res) => {
  try {
    const order = await OrderModel.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Order tidak ditemukan" });

    await order.destroy();
    res.json({ message: "Order berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus order", error: error.message });
  }
};

module.exports = { getOrders, createOrder, updateOrderStatus, deleteOrder };
