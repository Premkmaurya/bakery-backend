const express = require("express");
const router = express.Router();
const productModel = require("../models/product.model");
const authMiddleware = require("../middlewares/auth.middleware");
const productController = require("../controllers/product.controller");

router.get("/get",productController.getProducts);

router.post(
  "/create",
  authMiddleware,
  productController.createProduct
);

router.patch("/update/:id", authMiddleware, productController.updateProduct);

router.delete(
  "/delete/:id",
  authMiddleware,
  productController.deleteProduct
)

module.exports = router;
