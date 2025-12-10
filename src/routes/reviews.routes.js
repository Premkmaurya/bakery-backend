const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const reviewsController = require("../controllers/reviews.controller");

router.get("/get", reviewsController.getReviews);

router.post(
  "/create",
  authMiddleware,
  reviewsController.createReview
);

module.exports = router;