const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get(
    "/get-orders", 
    authMiddleware, 
    orderController.getOrders
);
router.post(
    "/createOrder", 
    authMiddleware, 
    orderController.createOrder
);
router.patch(
  "/updateOrderStatus/:orderId",
  authMiddleware,
  orderController.updateOrderStatus
);

module.exports = router;
