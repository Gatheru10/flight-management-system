const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ✅ Protect middleware — checks JWT and attaches user to request
const protect = async (req, res, next) => {
  let token;

  console.log("🔐 Incoming request headers:", req.headers); // 🔍 Debug incoming headers

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    console.log("🔑 Extracted token:", token); // 🔍 Debug token
  }

  if (!token) {
    console.warn("🚫 No token provided");
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded token payload:", decoded); // 🔍 Debug decoded token

    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      console.warn("🚫 User not found for decoded token ID");
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    console.log("👤 Authenticated user:", req.user.email);
    next();
  } catch (error) {
    console.error("❌ Token verification failed:", error.message);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// ✅ isAdmin middleware — checks if user has isAdmin: true
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    console.log("🛡️ Admin access granted");
    next();
  } else {
    console.warn("⛔ Admin access denied");
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

module.exports = { protect, isAdmin };
