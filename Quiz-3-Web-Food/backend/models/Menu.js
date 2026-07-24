const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Menu = sequelize.define("Menu", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 0 },
  },
  emoji: {
    type: DataTypes.STRING,
    defaultValue: "🍽️",
  },
  category: {
    type: DataTypes.ENUM("Makanan", "Minuman"),
    defaultValue: "Makanan",
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Menu;
