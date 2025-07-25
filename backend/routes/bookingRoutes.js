const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  createBooking,
  getUserBookings,
  cancelBooking,
  createHotelBooking, // ✅ Import this!
} = require('../controllers/bookingsController');

// ✈️ Flight bookings
router.route('/')
  .post(protect, createBooking)
  .get(protect, getUserBookings);

router.route('/:id/cancel').put(protect, cancelBooking);

// 🏨 Hotel bookings
router.post('/hotels', protect, createHotelBooking);

module.exports = router;
