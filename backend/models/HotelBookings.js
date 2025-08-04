const mongoose = require('mongoose');

const hotelBookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  hotelName: { type: String, required: true },
  location: { type: String, required: true },
  price: String,
  rating: String,
  category: String,
  image: String,
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  dateBooked: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('HotelBooking', hotelBookingSchema);
