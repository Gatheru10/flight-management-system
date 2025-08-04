const express = require('express');
const Deal = require('../models/Deal');
const { getDeals } = require('../controllers/dealController');

const router = express.Router();

// GET all deals
router.get('/', async (req, res) => {
  const deals = await Deal.find().populate('flightRoute');
  res.json(deals);
});

// GET single deal
router.get('/:id', async (req, res) => {
  const deal = await Deal.findById(req.params.id).populate('flightRoute');
  res.json(deal);
});

module.exports = router;
