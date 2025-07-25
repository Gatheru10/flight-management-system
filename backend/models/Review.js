// models/Review.js

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewer: { type: String, required: true }, // User's name
  airline: { type: String, required: true },  // Airline & flight name
  content: { type: String, required: true },  // Review message
  rating: { type: Number, required: true },   // Star rating
  date: { type: Date, default: Date.now }     // Review date
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
