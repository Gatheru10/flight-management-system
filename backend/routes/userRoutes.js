const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const {
  registerUser,
  loginUser,
  getMe,
  updateActivity,
  getUserActivity,
  createAdminUser,
} = require('../controllers/userController');
const {
  getLoggedInUserActivity,
  saveActivity,
} = require('../controllers/activityController');
const User = require('../models/User');

// =================== PUBLIC ROUTES ===================

// Register new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Forgot password - send reset link
router.post('/forgot-password', asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const token = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
  await user.save();

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    to: user.email,
    from: process.env.EMAIL_USER,
    subject: 'Password Reset',
    text: `Reset your password here: http://localhost:3000/reset-password/${token}`,
  };

  await transporter.sendMail(mailOptions);
  res.json({ message: 'Password reset email sent' });
}));

// Reset password using token
router.post('/reset-password/:token', asyncHandler(async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.json({ message: 'Password updated successfully' });
}));

// =================== PROTECTED ROUTES ===================

// Get current logged-in user's info
router.get('/me', protect, getMe);

// Log user activity
router.post('/activity', protect, updateActivity);

// Get activity for logged-in user
router.get('/activity', protect, getLoggedInUserActivity);

// =================== ADMIN ROUTES ===================

// Get activity for specific user by ID (admin only)
router.get('/:id/activity', protect, isAdmin, getUserActivity);

// Get all users (admin only)
router.get('/', protect, isAdmin, asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
}));

// Create admin user (admin only)
router.post('/create-admin', createAdminUser);

module.exports = router;
