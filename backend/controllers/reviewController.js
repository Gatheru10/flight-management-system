const Review = require("../models/Review");

// @desc    Get all reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

// @desc    Add a review
const addReview = async (req, res) => {
  try {
    const { text, rating } = req.body;

    if (!text || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const review = await Review.create({
      user: req.user._id,
      name: req.user.name,
      text,
      rating,
    });

    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit review" });
  }
};

module.exports = { getReviews, addReview };
