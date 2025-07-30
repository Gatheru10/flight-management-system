// middleware/activityLogger.js
const Activity = require('../models/Activity');

const activityLogger = (action = 'Viewed Page') => {
  return async (req, res, next) => {
    if (req.user) {
      await Activity.create({
        userId: req.user._id,
        lastPage: req.originalUrl,
        action,
        timestamp: new Date(),
      });
    }
    next();
  };
};

module.exports = activityLogger;
