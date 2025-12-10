const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    status:{
      type: String,
      required: true,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
