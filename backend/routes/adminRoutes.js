const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middlewares/authMiddleware');

const {
  getAllUsers,
  getRecentBookings,
  getRecentHotelBookings,
  getSystemHealth,
  toggleUserStatus,
  getDashboardStats, // ✅ provides full dashboard summary + charts + recent data
} = require('../controllers/adminController');

// ✅ Get all users (admin view)
router.get('/all-users', protect, isAdmin, getAllUsers);

// ✅ Toggle user active status (activate/deactivate)
router.patch('/users/:id/toggle-status', protect, isAdmin, toggleUserStatus);

// ✅ Get recent flight bookings (raw, separate)
router.get('/bookings', protect, isAdmin, getRecentBookings);

// ✅ Get recent hotel bookings (raw, separate)
router.get('/hotel-bookings', protect, isAdmin, getRecentHotelBookings);

// ✅ System health check
router.get('/health', protect, isAdmin, getSystemHealth);

// ✅ Full dashboard data (summary stats, charts, recent users/bookings)
router.get('/dashboard', protect, isAdmin, getDashboardStats);

module.exports = router;
