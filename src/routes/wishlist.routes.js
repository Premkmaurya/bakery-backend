const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const wishlistController = require("../controllers/wishlist.controller");

router.get("/getWishlist", authMiddleware, wishlistController.getWishlist);

router.post(
  "/addToWishlist/:productId",
  authMiddleware,
  wishlistController.addToWishlist
);
router.delete(
  "/removeFromWishlist/:productId",
  authMiddleware,
  wishlistController.removeFromWishlist
);

module.exports = router;
