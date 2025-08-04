const Flight = require('./models/Flight');

// GET /api/flights?origin=&destination=&date=
const getAllFlights = async (req, res) => {
  const { origin, destination, date } = req.query;

  try {
    const query = {};
    if (origin) query.origin = { $regex: new RegExp(`^${origin}$`, "i") };
    if (destination) query.destination = { $regex: new RegExp(`^${destination}$`, "i") };
    if (date) {
      const searchDate = new Date(date);
      const nextDay = new Date(searchDate);
      nextDay.setDate(searchDate.getDate() + 1);
      query.departureDate = { $gte: searchDate, $lt: nextDay };
    }

    const flights = await Flight.find(query);
    res.json(flights);
  } catch (error) {
    console.error('Flight search error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/flights
const createFlights = async (req, res) => {
  try {
    const flightsData = req.body;
    let flightsToInsert = Array.isArray(flightsData) ? flightsData : [flightsData];

    // Normalize stops
    flightsToInsert = flightsToInsert.map(flight => ({
      ...flight,
      stops: Array.isArray(flight.stops) ? flight.stops : [],
    }));

    const savedFlights = await Flight.insertMany(flightsToInsert);
    res.status(201).json(savedFlights);
  } catch (error) {
    console.error('Error creating flights:', error);
    res.status(500).json({ error: 'Failed to create flights' });
  }
};

// GET /api/flights/origins
const getOrigins = async (req, res) => {
  try {
    const origins = await Flight.distinct('origin');
    res.json(origins);
  } catch (error) {
    console.error('Error fetching origins:', error);
    res.status(500).json({ error: 'Server error fetching origins' });
  }
};

// GET /api/flights/destinations
const getDestinations = async (req, res) => {
  try {
    const destinations = await Flight.distinct('destination');
    res.json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).json({ error: 'Server error fetching destinations' });
  }
};

// PUT /api/flights/:id
const updateFlight = async (req, res) => {
  try {
    const updated = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: 'Flight not found' });
    res.json(updated);
  } catch (error) {
    console.error('Error updating flight:', error);
    res.status(500).json({ message: 'Server error updating flight' });
  }
};

// DELETE /api/flights/:id
const deleteFlight = async (req, res) => {
  try {
    const deleted = await Flight.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Flight not found' });

    res.json({ message: 'Flight deleted successfully' });
  } catch (error) {
    console.error('Error deleting flight:', error);
    res.status(500).json({ message: 'Server error deleting flight' });
  }
};

module.exports = {
  getAllFlights,
  createFlights,
  getOrigins,
  getDestinations,
  updateFlight,
  deleteFlight,
};
