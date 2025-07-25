const User = require('../models/User');
const Booking = require('../models/Booking');
const HotelBooking = require('../models/HotelBookings');
const Flight = require('../models/flight');
const Hotel = require('../models/Hotel');
const mongoose = require('mongoose');

// ✅ Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Recent Flight Bookings
const getRecentBookings = async (req, res) => {
  try {
    console.log("📥 [ADMIN] Fetching Recent Flight Bookings");
    const limit = parseInt(req.query.limit) || 10;
    const flightBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('user', 'name email');
    res.json({ flightBookings });
  } catch (err) {
    console.error("❌ Error fetching flight bookings:", err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ Recent Hotel Bookings
const getRecentHotelBookings = async (req, res) => {
  try {
    console.log("📥 [ADMIN] Fetching Recent Hotel Bookings");
    const limit = parseInt(req.query.limit) || 10;
    const hotelBookings = await HotelBooking.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('user', 'name email');
    res.json({ hotelBookings });
  } catch (err) {
    console.error("❌ Error fetching hotel bookings:", err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ System Health Check
const getSystemHealth = async (req, res) => {
  console.log("📥 [ADMIN] Health Check Requested");

  const healthStatus = {
    server: '🟢 Online',
    database: mongoose.connection.readyState === 1 ? '🟢 Connected' : '🔴 Disconnected',
    emailService: process.env.EMAIL_USER ? '🟢 Configured' : '🔴 Not Configured',
  };

  console.log("✅ System Health Status:", healthStatus);
  res.json(healthStatus);
};

// ✅ Toggle User Status (Activate/Deactivate)
const toggleUserStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({ message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully.` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Full Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalFlights = await Flight.countDocuments();
    const totalHotels = await Hotel.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalHotelBookings = await HotelBooking.countDocuments();

    // ✅ Last 5 registered users
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select('-password');

    // ✅ Last 5 recent combined bookings (hotel + flight)
    const recentFlightBookings = await Booking.find().sort({ createdAt: -1 }).limit(10).populate('user flight');
    const recentHotelBookings = await HotelBooking.find().sort({ createdAt: -1 }).limit(10).populate('user');

    const recentCombined = [...recentFlightBookings, ...recentHotelBookings]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    // ✅ User registrations by month
    const userRegistrations = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // ✅ Booking trends by month
    const bookingTrends = await Booking.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // ✅ Pie chart data
    const bookingDistribution = {
      flight: totalBookings,
      hotel: totalHotelBookings,
    };

    res.json({
      totalUsers,
      totalFlights,
      totalHotels,
      totalBookings,
      totalHotelBookings,
      recentUsers,
      recentBookings: recentCombined,
      charts: {
        userRegistrations,
        bookingTrends,
        bookingDistribution,
      },
    });
  } catch (error) {
    console.error('❌ Dashboard stats error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard stats' });
  }
};


// ✅ Export everything
module.exports = {
  getAllUsers,
  getRecentBookings,
  getRecentHotelBookings,
  getSystemHealth,
  toggleUserStatus,
  getDashboardStats,
};
