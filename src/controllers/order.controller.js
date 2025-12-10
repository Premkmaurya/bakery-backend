const orderModel = require("../models/order.model");

async function getOrders(req, res) {
  try {
    const order = await orderModel
      .find({})
      .populate("productId")
      .populate("user");
    res.status(200).json(order);
  } catch (error) {
    throw new Error("Error fetching order by ID: " + error.message);
  }
}

async function createOrder(req, res) {
    try {
        const orderData = req.body;
        const newOrder = new orderModel(orderData);
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
        
        if (status !== "cancelled") {
            return res.status(400).json({ error: "Only 'cancelled' status is allowed" });
        }
        if(req.user.role !== "admin" && (status === "shipped" || status === "delivered")) {
            return res.status(403).json({ error: "Only admins can update order status" });
        }
        
        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    }
    catch (error) {
        throw new Error("Error updating order status: " + error.message);
    }
}

module.exports = {
    getOrders,
    createOrder,
    updateOrderStatus
};