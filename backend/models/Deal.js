const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  discount: Number, // e.g. 20% off
  validUntil: Date,
  flightRoute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight'
  },
  terms: String,
});

module.exports = mongoose.model('Deal', dealSchema);
