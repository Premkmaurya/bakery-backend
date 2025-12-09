const orderModel = require("../models/order.model");

async function getOrderById(req,res) {
    try {
        const { orderId } = req.params;
        const order = await orderModel.findById(orderId).populate('productId').populate('user');
        return order;
    } catch (error) {
        throw new Error("Error fetching order by ID: " + error.message);
    }
}