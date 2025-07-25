const express = require('express');
const router = express.Router();

const {
  getAllFlights,
  createFlights,
  getOrigins,
  getDestinations,
  updateFlight,
  deleteFlight,
} = require('../controllers/flightController');

// GET /api/flights?origin=&destination=&date=
router.get('/', getAllFlights);

// POST /api/flights - Add one or multiple flights
router.post('/', createFlights);

// GET /api/flights/origins - Unique origins
router.get('/origins', getOrigins);

// GET /api/flights/destinations - Unique destinations
router.get('/destinations', getDestinations);

// PUT /api/flights/:id - Update a flight
router.put('/:id', updateFlight);

// DELETE /api/flights/:id - Delete a flight
router.delete('/:id', deleteFlight);

module.exports = router;
