const reviewModel = require("../models/reviews.model");

async function createReview(req, res) {
  try {
    const { productId, rating, comment } = req.body;
    const newReview = new reviewModel({
      productId,
      userId: req.user.id,
      rating,
      comment,
    });
    await newReview.save();
    res.status(201).json({
      message: "Review created successfully",
      review: newReview,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating review", error: error.message });
  }
}

async function getReviews(req, res) {
  try {
    const reviews = await reviewModel.find({}).skip(0).limit(10);
    res.status(200).json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reviews", error: error.message });
  }
}

module.exports = {
  createReview,
  getReviews,
};
