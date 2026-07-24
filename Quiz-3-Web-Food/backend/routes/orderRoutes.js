const express = require("express");
const router = express.Router();
const {
  getOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getOrders);
router.post("/", createOrder);
router.put("/:id", protect, updateOrderStatus);
router.delete("/:id", protect, deleteOrder);

module.exports = router;
