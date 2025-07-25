const mongoose = require('mongoose');

const hotelBookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  hotelName: String,
  location: String,
  price: String,
  rating: String,
  category: String,
  image: String,
  dateBooked: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('HotelBooking', hotelBookingSchema);
