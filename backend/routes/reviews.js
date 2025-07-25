const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// @desc    Submit a new review
// @route   POST /api/reviews
router.post('/', async (req, res) => {
  try {
    const { reviewer, airline, content, rating, date } = req.body;

    const review = new Review({ reviewer, airline, content, rating, date });
    await review.save();

    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// @desc    Get all reviews
// @route   GET /api/reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;
