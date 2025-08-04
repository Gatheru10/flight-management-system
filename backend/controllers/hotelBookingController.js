const HotelBooking = require('../models/HotelBooking');

exports.createHotelBooking = async (req, res) => {
  try {
    const { hotelName, location, checkInDate, checkOutDate } = req.body;

    const newBooking = new HotelBooking({
      user: req.user.id,
      hotelName,
      location,
      checkInDate,
      checkOutDate
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserHotelBookings = async (req, res) => {
  try {
    const bookings = await HotelBooking.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
