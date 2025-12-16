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

async function toggleWishlist(req, res) {
  try {
    const { productId } = req.body;
    console.log("Toggling wishlist for productId:", productId);
    let wishlist = await wishlistModel.findOne({ userId: req.user.id });
    if (!wishlist) {
      wishlist = new wishlistModel({ userId: req.user.id, products: [] });
    }

    if (
      wishlist.products.some((item) => item.productId.toString() === productId)
    ) {
      wishlist.products = wishlist.products.filter(
        (item) => item.productId.toString() !== productId
      );
      await wishlist.save();
      return res
        .status(200)
        .json({ message: "Product removed from wishlist", wishlist });
    }
    wishlist.products.push({ productId });
    await wishlist.save();
    res.status(200).json({ message: "product added in wishlist", wishlist });
  } catch (error) {
    throw new Error("Error adding to wishlist: " + error.message);
  }
}

module.exports = {
  getWishlist,
  toggleWishlist,
};
