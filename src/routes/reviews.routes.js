const express = require("express");
const router = express.Router();
const authUserMiddleware = require("../middlewares/auth.user.middleware");
const reviewsController = require("../controllers/reviews.controller");

router.get("/get", authUserMiddleware, reviewsController.getReviews);

router.post(
  "/create",
  authUserMiddleware,
  reviewsController.createReview
);

module.exports = router;