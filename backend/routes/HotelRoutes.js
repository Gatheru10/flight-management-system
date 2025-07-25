const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");

// GET distinct hotel locations
router.get("/locations", async (req, res) => {
  try {
    const locations = await Hotel.distinct("location");
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching locations" });
  }
});

// POST /api/hotels - Add a new hotel
router.post("/", async (req, res) => {
  try {
    const {
      name,
      location,
      price,
      rating,
      weather,
      amenities,
      image,
      specialOffer
    } = req.body;

    // Basic validation
    if (!name || !location || !price || !rating) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newHotel = new Hotel({
      name,
      location,
      price,
      rating,
      weather,
      amenities,
      image,
      specialOffer
    });

    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    console.error("Error creating hotel:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/test", (req, res) => {
  res.send("✅ Hotel route test OK");
});
module.exports = router;
