const productModel = require("../models/product.model");
const uploadImage = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid");

async function getProducts(req, res) {
  try {
    const products = await productModel.find({}).skip(0).limit(10);
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
}

async function searchProducts(req, res) {
  const { search, category, maxPrice } = req.query;
  let filter = {};

  // Search filter
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  // Category filter
  if (category && category !== "All") {
    filter.category = category;
  }

  // Price filter
  if (maxPrice) {
    filter.price = { $lte: Number(maxPrice) };
  }

  try {
    const products = await productModel
      .find(filter)
      .sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching products", error });
  }
}

async function createProduct(req, res) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    const image = req.file;
    const { name, price, description, category, inStock } = req.body;
    const result = await uploadImage(image.buffer, `${uuidv4()}`);

    const newProduct = new productModel({
      name,
      price,
      description,
      category,
      imageUrl: result.url,
      inStock,
    });
    await newProduct.save();
    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    const { id } = req.params;
    const image = req.file;
    let imageUrl;
    if (image) {
      const result = await uploadImage(image.buffer, `${uuidv4()}`);
      imageUrl = result.url;
    }
    const { name, price, description, category, inStock } = req.body;
    const updates = { name, price, description, category, inStock, imageUrl };
    const updatedProduct = await productModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    const { id } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
}

module.exports = {
  getProducts,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
