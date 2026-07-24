const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

// Tabel penghubung: detail item di dalam satu Order (relasi many-to-many Order <-> Menu)
const OrderItem = sequelize.define("OrderItem", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 },
  },
});

module.exports = OrderItem;
