const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: true, // ✅ ensures password comes back from DB
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, { timestamps: true });

// ✅ Pre-save hash logic
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  console.log('🔄 [pre-save] Password is being hashed...');
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log('✅ [pre-save] Hashed password:', this.password);
  next();
});

// ✅ Match password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log('🔑 [matchPassword] Comparing:', enteredPassword);
  console.log('🔐 [matchPassword] Hashed in DB:', this.password);

  const result = await bcrypt.compare(enteredPassword, this.password);
  console.log('🎯 [matchPassword] Match result:', result);
  return result;
};

module.exports = mongoose.model('User', userSchema);
