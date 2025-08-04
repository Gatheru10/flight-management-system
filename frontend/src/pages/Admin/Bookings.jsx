import React, { useEffect, useState, useContext } from 'react';
import { Button, Spinner, Alert, Card } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

const MyBookings = () => {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/bookings', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log("Admin bookings response:", res.data);

      const bookingsData = Array.isArray(res.data.flightBookings)
        ? res.data.flightBookings
        : [];

      setBookings(bookingsData);
    } catch (err) {
      console.error(err);
      setError('Failed to load bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await axios.put(`/api/bookings/${id}/cancel`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: 'cancelled' } : b))
      );
    } catch (err) {
      console.error(err);
      alert('Failed to cancel booking');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDate = (isoDate) => {
    if (!isoDate) return 'N/A';
    const date = new Date(isoDate);
    return isNaN(date) ? isoDate : date.toLocaleString('en-KE', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const getStatusBadge = (status) => {
    const lower = status?.toLowerCase();
    if (lower === 'booked') return <span className="badge bg-success">Booked</span>;
    if (lower === 'cancelled') return <span className="badge bg-danger">Cancelled</span>;
    return <span className="badge bg-secondary">{status}</span>;
  };

  return (
    <Card className="p-4 shadow-lg border-0">
      <h3 className="mb-4 text-primary">All Flight Bookings</h3>

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : bookings.length === 0 ? (
        <p className="text-muted">No bookings available.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Flight No.</th>
                <th>Passenger</th>
                <th>Seat</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.flightNumber || 'N/A'}</td>
                  <td>{booking.user?.name || 'N/A'}</td>
                  <td>{booking.seatNumber || 'Auto-Assign'}</td>
                  <td>{formatDate(booking.departure)}</td>
                  <td>{formatDate(booking.arrival)}</td>
                  <td>{getStatusBadge(booking.status)}</td>
                  <td>
                    {booking.status?.toLowerCase() === 'booked' ? (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleCancel(booking._id)}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <span className="text-muted">No action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default MyBookings;
