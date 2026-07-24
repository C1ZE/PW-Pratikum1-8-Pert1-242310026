const { Menu } = require("../models");

// @desc    Ambil semua menu
// @route   GET /api/menu
// @access  Public
const getMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll({ order: [["createdAt", "DESC"]] });
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data menu", error: error.message });
  }
};

// @desc    Ambil satu menu berdasarkan ID
// @route   GET /api/menu/:id
// @access  Public
const getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu tidak ditemukan" });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data menu", error: error.message });
  }
};

// @desc    Tambah menu baru
// @route   POST /api/menu
// @access  Private (Admin)
const createMenu = async (req, res) => {
  try {
    const { name, description, price, emoji, category, available } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ message: "Nama dan harga menu wajib diisi" });
    }

    const menu = await Menu.create({ name, description, price, emoji, category, available });
    res.status(201).json(menu);
  } catch (error) {
    res.status(500).json({ message: "Gagal menambah menu", error: error.message });
  }
};

// @desc    Update menu
// @route   PUT /api/menu/:id
// @access  Private (Admin)
const updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu tidak ditemukan" });

    await menu.update(req.body);
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate menu", error: error.message });
  }
};

// @desc    Hapus menu
// @route   DELETE /api/menu/:id
// @access  Private (Admin)
const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu tidak ditemukan" });

    await menu.destroy();
    res.json({ message: "Menu berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus menu", error: error.message });
  }
};

module.exports = { getMenus, getMenuById, createMenu, updateMenu, deleteMenu };
