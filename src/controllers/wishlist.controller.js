const wishlistModel = require("../models/wishlist.model");

async function getWishlist(req, res) {
  try {
    const wishlist = await wishlistModel
      .findOne({ userId: req.user.id })
      .populate("products.productId");
    res.status(200).json(wishlist);
  } catch (error) {
    throw new Error("Error fetching wishlist: " + error.message);
  }
}

async function addToWishlist(req, res) {
  try {
    const { productId } = req.params;
    let wishlist = await wishlistModel.findOne({ userId: req.user.id });
    if (!wishlist) {
        wishlist = new wishlistModel({ userId: req.user.id, products: [] });
    }

    if (wishlist.products.some(item => item.productId.toString() === productId)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }
    wishlist.products.push({ productId });
    await wishlist.save();
    res.status(200).json(wishlist);
    } catch (error) {
    throw new Error("Error adding to wishlist: " + error.message);
  }
}

async function removeFromWishlist(req, res) {
    try {
        const { productId } = req.params;
        const wishlist = await wishlistModel.findOne({ userId: req.user.id });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        wishlist.products = wishlist.products.filter(
            item => item.productId.toString() !== productId
        );
        await wishlist.save();
        res.status(200).json(wishlist);
    }
    catch (error) {
        throw new Error("Error removing from wishlist: " + error.message);
    }
}
module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};