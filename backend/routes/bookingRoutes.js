const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const logActivity = require('../middlewares/activityLogger');

const {
  createBooking,
  getUserBookings,
  cancelBooking,
  createHotelBooking,
} = require('../controllers/bookingsController');

// ✈️ Flight bookings
router
  .route('/')
  .post(protect, logActivity('Booked a flight'), createBooking) // ✅ Activity logged here
  .get(protect, getUserBookings);

router.route('/:id/cancel')
  .put(protect, logActivity('Cancelled a flight booking'), cancelBooking); // ✅ Optional

// 🏨 Hotel bookings
router.post(
  '/hotels',
  protect,
  logActivity('Booked a hotel'),
  createHotelBooking
);

module.exports = router;
