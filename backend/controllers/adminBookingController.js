const Booking = require('../models/Booking');
const HotelBooking = require('../models/HotelBookings');
const User = require('../models/User');

exports.getAllBookings = async (req, res) => {
  try {
    console.log(`📥 [ADMIN] GET /api/admin/bookings called by ${req.user.email}`);

    const flightBookings = await Booking.find()
      .populate('user', 'name email'); // ✅ Only populate user

    const hotelBookings = await HotelBooking.find()
      .populate('user', 'name email');

    console.log(`✅ Found ${flightBookings.length} flight bookings`);
    console.log(`✅ Found ${hotelBookings.length} hotel bookings`);

    res.status(200).json({ flightBookings, hotelBookings });
  } catch (err) {
    console.error('❌ [ADMIN] Error fetching bookings:', err.message);
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`🗑️ [ADMIN] Delete booking request for ID: ${id}`);

    const deletedBooking = await Booking.findByIdAndDelete(id) 
      || await HotelBooking.findByIdAndDelete(id);

    if (!deletedBooking) {
      console.warn(`⚠️ Booking with ID ${id} not found`);
      return res.status(404).json({ message: 'Booking not found' });
    }

    console.log(`✅ Booking with ID ${id} deleted successfully`);
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error(`❌ [ADMIN] Error deleting booking:`, err.message);
    res.status(500).json({ message: 'Error deleting booking', error: err.message });
  }
};
