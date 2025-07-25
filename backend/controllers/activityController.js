// controllers/activityController.js
const asyncHandler = require('express-async-handler');
const Activity = require('../models/Activity');

// ✅ Save user activity
const saveActivity = asyncHandler(async (req, res) => {
  const { lastPage, action } = req.body;

  await Activity.create({
    userId: req.user._id,
    lastPage,
    action,
    timestamp: new Date(),
  });

  res.status(200).json({ message: 'Activity saved' });
});

// ✅ GET /api/users/activity for logged-in user (updated)
const getLoggedInUserActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.find({ userId: req.user._id }).sort({ timestamp: -1 });

  // 🔁 Return empty array with 200 instead of 404
  res.status(200).json(activity);
});

module.exports = {
  saveActivity,
  getLoggedInUserActivity,
};
