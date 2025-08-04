import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const Flights = () => {
  const [flights, setFlights] = useState([
    { id: 1, flightNumber: 'GDC101', origin: 'Nairobi', destination: 'Mombasa', date: '2025-08-01', seats: 150 },
    { id: 2, flightNumber: 'GDC202', origin: 'Nairobi', destination: 'Kisumu', date: '2025-08-02', seats: 180 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ flightNumber: '', origin: '', destination: '', date: '', seats: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddFlight = () => {
    const newFlight = { ...form, id: Date.now() };
    setFlights([...flights, newFlight]);
    setForm({ flightNumber: '', origin: '', destination: '', date: '', seats: '' });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this flight?');
    if (confirm) {
      setFlights(flights.filter(flight => flight.id !== id));
    }
  };

  return (
    <div>
      <h2 className="mb-4">Manage Flights</h2>

      <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
        + Add Flight
      </Button>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Flight Number</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Seats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={flight.id}>
              <td>{index + 1}</td>
              <td>{flight.flightNumber}</td>
              <td>{flight.origin}</td>
              <td>{flight.destination}</td>
              <td>{flight.date}</td>
              <td>{flight.seats}</td>
              <td>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(flight.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Flight Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Flight</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Flight Number</Form.Label>
              <Form.Control
                type="text"
                name="flightNumber"
                value={form.flightNumber}
                onChange={handleChange}
                placeholder="e.g. GDC101"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Origin</Form.Label>
              <Form.Control
                type="text"
                name="origin"
                value={form.origin}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Destination</Form.Label>
              <Form.Control
                type="text"
                name="destination"
                value={form.destination}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Seats</Form.Label>
              <Form.Control
                type="number"
                name="seats"
                value={form.seats}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddFlight}>
            Save Flight
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Flights;
