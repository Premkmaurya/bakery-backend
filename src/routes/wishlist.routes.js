const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const wishlistController = require("../controllers/wishlist.controller");

router.get("/getWishlist", authMiddleware, wishlistController.getWishlist);

router.post(
  "/toggleWishlist/:productId",
  authMiddleware,
  wishlistController.toggleWishlist
);


module.exports = router;
