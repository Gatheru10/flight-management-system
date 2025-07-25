const Hotel = require('../models/Hotel');
const updateUserActivity = require('../utils/activityTracker');

// Get all hotels
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one hotel by ID and track view
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    // ✅ Track lastViewed
    await updateUserActivity(req.user, { lastViewed: `Viewed Hotel: ${hotel.name} in ${hotel.location}` });

    res.json(hotel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
