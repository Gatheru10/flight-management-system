const Booking = require('../models/Booking');
const HotelBooking = require('../models/HotelBookings');
const updateUserActivity = require('../utils/activityTracker');

// Create flight booking
exports.createBooking = async (req, res) => {
  try {
    const {
      flightNumber,
      departure,
      arrival,
      origin,
      destination,
      seatNumber,
      numberOfGuests,
    } = req.body;

    const booking = await Booking.create({
      user: req.user.id,
      flightNumber,
      departure,
      arrival,
      origin,
      destination,
      seatNumber,
      numberOfGuests,
    });

    // ✅ Track lastAction
    await updateUserActivity(req.user, { lastAction: `Booked Flight ${flightNumber} from ${origin} to ${destination}` });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Fetching bookings error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    await booking.deleteOne();

    // ✅ Track lastAction
    await updateUserActivity(req.user, { lastAction: `Cancelled Booking for Flight ${booking.flightNumber}` });

    res.status(200).json({ message: 'Booking canceled' });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create hotel booking
exports.createHotelBooking = async (req, res) => {
  try {
    const { hotelName, location, price, rating, category, image, numberOfGuests } = req.body;

    const hotelBooking = new HotelBooking({
      user: req.user.id,
      hotelName,
      location,
      price,
      rating,
      category,
      image,
      numberOfGuests,
    });

    const saved = await hotelBooking.save();

    // ✅ Track lastAction
    await updateUserActivity(req.user, { lastAction: `Booked Hotel: ${hotelName} in ${location}` });

    res.status(201).json({ message: 'Hotel booking created successfully', booking: saved });
  } catch (error) {
    console.error("Hotel booking error:", error);
    res.status(500).json({ message: 'Hotel booking failed. Please try again.' });
  }
};
