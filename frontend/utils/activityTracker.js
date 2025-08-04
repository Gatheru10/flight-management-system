// utils/activityTracker.js
const updateUserActivity = async (user, activityData) => {
  if (!user) return;

  user.activity = {
    ...user.activity,
    ...activityData,
  };

  try {
    await user.save();
  } catch (err) {
    console.error('Activity tracking failed:', err);
  }
};

module.exports = updateUserActivity;
