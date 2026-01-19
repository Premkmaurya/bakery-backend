const orderModel = require("../models/order.model");
const { publishToQueue } = require("../broker/broker");

async function getOrders(req, res) {
  try {
    const order = await orderModel
      .find({ userId: req.user.id })
      .populate("productId")
      .populate("userId")
      .sort({ createdAt: -1 });
    res.status(200).json(order);
  } catch (error) {
    throw new Error("Error fetching order by ID: " + error.message);
  }
}

async function getAllOrders(req, res) {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Only admins can access all orders" });
    }
    const orders = await orderModel
      .find()
      .limit(10)
      .populate("productId")
      .populate("userId")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    throw new Error("Error fetching all orders: " + error.message);
  }
}

async function createOrder(req, res) {
  try {
    const { productId, quantity, status, address, total } = req.body;
    const newOrder = new orderModel({
      productId,
      quantity,
      address,
      total,
      status,
      userId: req.user.id,
    });
    const savedOrder = await newOrder.save();
    const populatedOrder = await savedOrder.populate([
      { path: "productId" },
      { path: "userId" },
    ]);
    const findAddress = populatedOrder.userId.address.find(
      (addr) => addr._id.toString() === address,
    );
    const user =
      populatedOrder.userId.firstName + " " + populatedOrder.userId.lastName;
    const data = {
      findAddress,
      user,
    };
    await publishToQueue("SELLER_ORDER_CREATED_NOTIFICATION", data);
    res.status(201).json(populatedOrder);
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
      { new: true },
    );

    if (status == "cancelled") {
      const populatedOrder = await updatedOrder.populate("userId");
      const data = {
        orderId: updatedOrder._id,
        user:
          populatedOrder.userId.firstName +
          " " +
          populatedOrder.userId.lastName,
      };
      await publishToQueue("SELLER_ORDER_CANCEL_NOTIFICATION", data);
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    throw new Error("Error updating order status: " + error.message);
  }
}

async function deleteOrder(req, res) {
  const { orderId } = req.params;
  try {
    const response = await orderModel.findByIdAndDelete({ _id: orderId });
    res.status(201).json({
      message: "product deleted successfully.",
    });
  } catch (err) {
    throw new Error("Error deleting order: " + err.message);
  }
}

module.exports = {
  getOrders,
  getAllOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
};
