const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ✅ Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// ✅ Register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, isAdmin } = req.body;
  console.log('🔧 [Controller] registerUser called');

  if (!name || !email || !password) {
    console.warn('⚠️ Missing required fields');
    res.status(400);
    throw new Error('Please provide name, email, and password');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    console.warn('⚠️ User already exists:', email);
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || 'user',
    isAdmin: isAdmin || false,
  });

  if (user) {
    console.log('✅ User registered:', user.email);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    console.error('❌ Invalid user data');
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// ✅ Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log('🔐 [Controller] loginUser called for:', email);

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    console.warn('❌ User not found with email:', email);
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    console.warn('❌ Incorrect password for:', email);
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  console.log('✅ User logged in:', email);
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

// ✅ Get logged-in user profile
const getMe = asyncHandler(async (req, res) => {
  console.log(`🙋 [Controller] getMe called by user: ${req.user.id}`);
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    console.warn('❌ User not found');
    res.status(404);
    throw new Error('User not found');
  }
  res.status(200).json(user);
});

// ✅ Update user activity
const updateActivity = asyncHandler(async (req, res) => {
  console.log(`📝 [Controller] updateActivity for user: ${req.user.id}`);
  const user = await User.findById(req.user.id);

  if (user) {
    console.log('📦 Updating activity:', req.body.activity);
    user.activity = req.body.activity;
    await user.save();
    res.status(200).json({ message: 'Activity updated' });
  } else {
    console.warn('❌ User not found for activity update');
    res.status(404);
    throw new Error('User not found');
  }
});

// ✅ Get activity for logged-in user
const getLoggedInUserActivity = asyncHandler(async (req, res) => {
  console.log(`📥 [Controller] getLoggedInUserActivity called by: ${req.user.id}`);
  const user = await User.findById(req.user.id);

  if (user && user.activity) {
    console.log('✅ Activity found:', user.activity);
    res.json(user.activity);
  } else {
    console.warn('📭 No activity found for user:', req.user.id);
    res.status(404).json({ message: 'No activity found' });
  }
});

// ✅ Get activity for specific user (admin only)
const getUserActivity = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  console.log(`🕵️ [Controller] getUserActivity() for userId: ${userId}`);

  const user = await User.findById(userId);

  if (!user) {
    console.warn(`❌ No user found with ID ${userId}`);
    return res.status(404).json({ message: 'User not found' });
  }

  if (!user.activity) {
    console.warn(`📭 No activity data found for user ${userId}`);
    return res.status(404).json({ message: 'No activity found' });
  }

  console.log(`✅ Activity returned for user ${userId}`);
  res.json(user.activity);
});

// ✅ Create Admin User
const createAdminUser = asyncHandler(async (req, res) => {
  console.log('🛠️ [Controller] createAdminUser');

  const { name, email, password } = req.body;

  const existingAdmin = await User.findOne({ email });
  if (existingAdmin) {
    console.warn('⚠️ Admin user already exists:', email);
    return res.status(400).json({ message: 'Admin user already exists' });
  }

  const admin = await User.create({
    name,
    email,
    password,
    role: 'admin',
    isAdmin: true,
  });

  console.log('✅ Admin created:', email);
  res.status(201).json({
    message: 'Admin user created successfully',
    admin: {
      _id: admin._id,
      email: admin.email,
      role: admin.role,
    },
  });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateActivity,
  getLoggedInUserActivity,
  getUserActivity,
  createAdminUser,
};
