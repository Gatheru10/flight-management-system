const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  price: String,
  rating: Number,
  weather: String,
  amenities: [String],
  image: String,
  specialOffer: Boolean
});

module.exports = mongoose.model("Hotel", hotelSchema);
