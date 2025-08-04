const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const { getAllBookings, deleteBooking } = require('../controllers/adminBookingController');

// Test route (Optional)
router.get('/test', (req, res) => {
  res.json({ message: 'Admin Test Route Working!' });
});

// Use protect first, then isAdmin
router.get('/bookings', protect, isAdmin, getAllBookings);
router.delete('/bookings/:id', protect, isAdmin, deleteBooking);

module.exports = router;
