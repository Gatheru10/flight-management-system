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
  const activities = await Activity.find({ userId: req.user._id }).sort({ timestamp: -1 });

  if (activities.length === 0) {
    return res.status(200).json(null); // So frontend shows "No recent activity found"
  }

  const latest = activities[0];

  res.status(200).json({
    lastPage: latest.lastPage,
    action: latest.action,
    timestamp: latest.timestamp,
  });
});

module.exports = {
  saveActivity,
  getLoggedInUserActivity,
};
