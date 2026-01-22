const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/create/orderId", authMiddleware, paymentController.createPayment);

router.post("/verify/payment", authMiddleware, paymentController.verifyPayment);

module.exports = router;
