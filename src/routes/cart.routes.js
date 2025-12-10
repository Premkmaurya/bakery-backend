const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const cartController = require("../controllers/cart.controller");

router.get(
    "/getCart", 
    authMiddleware,
    cartController.getCart
);
router.post(
    "/addToCart/:productId",
    authMiddleware,
    cartController.addToCart
);
router.delete(
    "/removeFromCart/:productId",
    authMiddleware,
    cartController.removeFromCart
);


module.exports = router;