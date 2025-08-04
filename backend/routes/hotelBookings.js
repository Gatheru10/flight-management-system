const express = require('express');
const router = express.Router();
const HotelBooking = require('../models/HotelBookings');
const { protect } = require('../middlewares/authMiddleware');

// 👉 Create hotel booking
router.post('/', protect, async (req, res) => {
  try {
    const {
      hotelName,
      location,
      price,
      rating,
      category,
      image,
      checkInDate,
      checkOutDate,
    } = req.body;

    const booking = await HotelBooking.create({
      user: req.user.id,
      hotelName,
      location,
      price,
      rating,
      category,
      image,
      checkInDate,
      checkOutDate,
    });

    res.status(201).json({ message: 'Hotel booking successful', booking });
  } catch (error) {
    console.error('Hotel booking error:', error);
    res.status(500).json({ message: 'Hotel booking failed. Please try again.' });
  }
});

// 👉 Get all hotel bookings for logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await HotelBooking.find({ user: req.user.id });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Fetching hotel bookings failed:', error);
    res.status(500).json({ message: 'Failed to fetch hotel bookings' });
  }
});

// 👉 Cancel hotel booking
router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await HotelBooking.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!booking) {
      return res.status(404).json({ message: 'Hotel booking not found' });
    }

    await booking.deleteOne();
    res.status(200).json({ message: 'Hotel booking canceled' });
  } catch (error) {
    console.error('Cancel hotel booking error:', error);
    res.status(500).json({ message: 'Failed to cancel hotel booking' });
  }
});

module.exports = router;
