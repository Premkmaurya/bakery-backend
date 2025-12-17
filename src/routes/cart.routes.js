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

router.patch(
    '/updateCart/:id',
    authMiddleware,
    cartController.updateCart
)

router.delete(
    "/removeFromCart/:id",
    authMiddleware,
    cartController.removeFromCart
);


module.exports = router;