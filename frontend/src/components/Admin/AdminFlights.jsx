import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Card, Form, Button, Row, Col, Table, Spinner, Alert } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';

const AdminFlights = () => {
  const { user } = useContext(UserContext);
  const [flights, setFlights] = useState([]);
  const [form, setForm] = useState({
    flightNumber: '',
    airline: '',
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    price: '',
    stops: '',
    travelClass: 'Economy',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:5000/api/flights', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setFlights(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load flights.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddFlight = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/flights',
        { ...form, stops: form.stops.split(',').map(s => s.trim()) },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setForm({
        flightNumber: '',
        airline: '',
        origin: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        price: '',
        stops: '',
        travelClass: 'Economy',
      });
      fetchFlights(); // refresh list
    } catch (err) {
      console.error(err);
      setError('Failed to add flight.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">✈️ Flights Management</h2>

      <Card className="mb-4 shadow-sm p-3">
        <h5>Add New Flight</h5>
        <Form onSubmit={handleAddFlight}>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Control
                name="flightNumber"
                placeholder="Flight Number"
                value={form.flightNumber}
                onChange={handleChange}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                name="airline"
                placeholder="Airline"
                value={form.airline}
                onChange={handleChange}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                name="origin"
                placeholder="Origin"
                value={form.origin}
                onChange={handleChange}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                name="destination"
                placeholder="Destination"
                value={form.destination}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col md={3}>
              <Form.Control
                type="datetime-local"
                name="departureTime"
                value={form.departureTime}
                onChange={handleChange}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="datetime-local"
                name="arrivalTime"
                value={form.arrivalTime}
                onChange={handleChange}
              />
            </Col>
            <Col md={2}>
              <Form.Control
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
              />
            </Col>
            <Col md={2}>
              <Form.Control
                name="stops"
                placeholder="Stops (comma-separated)"
                value={form.stops}
                onChange={handleChange}
              />
            </Col>
            <Col md={2}>
              <Form.Select name="travelClass" value={form.travelClass} onChange={handleChange}>
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                <option value="First">First Class</option>
              </Form.Select>
            </Col>
          </Row>
          <Button type="submit" variant="primary">Add Flight</Button>
        </Form>
      </Card>

      <h4>All Flights</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Flight No.</th>
              <th>Airline</th>
              <th>From</th>
              <th>To</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Price</th>
              <th>Stops</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            {flights.length > 0 ? (
              flights.map((flight) => (
                <tr key={flight._id}>
                  <td>{flight.flightNumber}</td>
                  <td>{flight.airline}</td>
                  <td>{flight.origin}</td>
                  <td>{flight.destination}</td>
                  <td>{new Date(flight.departureTime).toLocaleString()}</td>
                  <td>{new Date(flight.arrivalTime).toLocaleString()}</td>
                  <td>${flight.price}</td>
                  <td>{flight.stops?.join(', ') || 'None'}</td>
                  <td>{flight.travelClass}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">No flights found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AdminFlights;
