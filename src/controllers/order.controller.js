const orderModel = require("../models/order.model");

async function getOrders(req, res) {
  try {
    const order = await orderModel
      .find({ userId: req.user.id })
      .populate("productId")
      .populate("userId");
    res.status(200).json(order);
  } catch (error) {
    throw new Error("Error fetching order by ID: " + error.message);
  }
}

async function createOrder(req, res) {
  try {
    const { productId, quantity, status } = req.body;
    const newOrder = new orderModel({
      productId,
      quantity,
      status,
      userId: req.user.id,
    });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    throw new Error("Error creating order: " + error.message);
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (
        req.user.role !== "admin" &&
      (status === "shipped" || status === "delivered")
    ) {
      return res
        .status(403)
        .json({ error: "Only admins can update order status" });
    }


    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    throw new Error("Error updating order status: " + error.message);
  }
}

module.exports = {
  getOrders,
  createOrder,
  updateOrderStatus,
};
