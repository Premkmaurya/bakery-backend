const express = require("express");
const router = express.Router();
const productModel = require("../models/product.model");
const authUserMiddleware = require("../middlewares/auth.user.middleware");
const productController = require("../controllers/product.controller");

router.get("/get", authUserMiddleware, productController.getProducts);

router.post(
  "/create",
  authUserMiddleware,
  productController.createProduct
);

router.patch("/update/:id", authUserMiddleware, productController.updateProduct);

router.delete(
  "/delete/:id",
  authUserMiddleware,
  productController.deleteProduct
)

module.exports = router;
