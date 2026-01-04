const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    details:{
      type:String,
      trim:true
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Popular cakes",
        "Celebration cakes",
        "Baby cakes",
        "Wedding cakes",
        "Special cakes",
        "Breads",
        "Muffins",
      ],
    },
    imageUrl: {
      type: String,
      required: true,
    },
    isFeatured:{
      type:Boolean,
      default:false
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", details: "text",});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
