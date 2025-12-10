const express = require("express");
const router = express.Router();
const productModel = require("../models/product.model");
const authMiddleware = require("../middlewares/auth.middleware");
const productController = require("../controllers/product.controller");
const multer = require("multer");

const upload = multer({storage: multer.memoryStorage()})

router.get("/get",productController.getProducts);

router.post(
  "/create",
  authMiddleware,
  upload.single("image"),
  productController.createProduct
);

router.patch(
  "/update/:id", 
  authMiddleware, 
  upload.single("image"),
  productController.updateProduct);

router.delete(
  "/delete/:id",
  authMiddleware,
  productController.deleteProduct
)

module.exports = router;
