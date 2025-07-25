const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
  flightNumber: { type: String, required: true },
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  seatNumber: { type: String, required: true },
  status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' },
  createdAt: { type: Date, default: Date.now },
  numberOfGuests: { type: Number, required: true },
  dateBooked: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', BookingSchema); // ✅ FIXED
