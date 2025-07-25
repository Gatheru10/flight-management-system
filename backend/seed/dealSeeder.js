// dealSeeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Deal = require('../models/Deal');

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const deals = [
  {
    title: 'Summer Special to Mombasa',
    description: 'Get 15% off on flights to Mombasa until end of August.',
    discountPercentage: 15,
    validForRoute: 'Nairobi - Mombasa',
    expiresAt: new Date('2025-08-31'),
  },
  {
    title: 'Early Bird Nairobi - Kisumu',
    description: 'Book early and get 10% off!',
    discountPercentage: 10,
    validForRoute: 'Nairobi - Kisumu',
    expiresAt: new Date('2025-09-15'),
  },
  {
    title: 'Weekend Deal: Eldoret Express',
    description: 'Enjoy 20% discount on weekend flights.',
    discountPercentage: 20,
    validForRoute: 'Nairobi - Eldoret',
    expiresAt: new Date('2025-07-31'),
  },
];

const seedDeals = async () => {
  try {
    await Deal.deleteMany(); // optional: clears existing
    await Deal.insertMany(deals);
    console.log('Deals inserted successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding deals:', error);
    process.exit(1);
  }
};

seedDeals();
