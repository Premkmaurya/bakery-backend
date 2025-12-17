const cartModel = require("../models/cart.model");

async function getCart(req, res) {
  try {
    const userId = req.user.id;
    const cart = await cartModel
      .findOne({ userId })
      .populate("items.productId");
    res.status(200).json(cart);
  } catch (error) {
    throw new Error("Error fetching cart: " + error.message);
  }
}

async function addToCart(req, res) {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const { quantity = 1 } = req.body;
    let cart = await cartModel.findOne({ userId });
    if (!cart) {
      cart = new cartModel({ userId, items: [] });
    }
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    throw new Error("Error adding item to cart: " + error.message);
  }
}

async function updateCart(req, res) {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json("Nothing found in the cart.");
    }
    console.log(cart.items);
    const existingItemIndex = cart.items.findIndex(
      (item) => item._id.toString() === id
    );
    console.log(existingItemIndex);
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity = quantity;
    }
    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(400).json("update has not successfully happened", err);
  }
}

async function removeFromCart(req, res) {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.items = cart.items.filter(
      (item) => item._id.toString() !== id
    );
    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    throw new Error("Error removing item from cart: " + error.message);
  }
}

module.exports = {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
};
