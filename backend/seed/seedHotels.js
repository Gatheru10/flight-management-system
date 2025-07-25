// seed/seedHotels.js
const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');
require('dotenv').config();

const hotels = [
  {
    name: "Safari Lodge",
    location: "Nairobi",
    price: 150,
    description: "Located near the national park.",
    image: "https://via.placeholder.com/300x200"
  },
  {
    name: "Coastal Breeze",
    location: "Mombasa",
    price: 200,
    description: "Beachside luxury hotel with great views.",
    image: "https://via.placeholder.com/300x200"
  },
  {
    name: "Mount View Inn",
    location: "Naivasha",
    price: 90,
    description: "Quiet getaway near the lake.",
    image: "https://via.placeholder.com/300x200"
  }
];

const seedHotels = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Hotel.deleteMany(); // Clear existing
    await Hotel.insertMany(hotels); // Insert new
    console.log("✅ Hotels seeded!");

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding hotels:", err);
  }
};

seedHotels();
