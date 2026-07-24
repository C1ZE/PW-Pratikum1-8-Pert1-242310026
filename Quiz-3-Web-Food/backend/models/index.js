const Admin = require("./Admin");
const Menu = require("./Menu");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

// Relasi: 1 Order punya banyak OrderItem, alias "items" biar shape JSON-nya
// tetap sama seperti sebelumnya di frontend (order.items[...])
Order.hasMany(OrderItem, { as: "items", foreignKey: "orderId", onDelete: "CASCADE" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

// Relasi: 1 Menu bisa muncul di banyak OrderItem
Menu.hasMany(OrderItem, { foreignKey: "menuId" });
OrderItem.belongsTo(Menu, { foreignKey: "menuId" });

module.exports = { Admin, Menu, Order, OrderItem };
