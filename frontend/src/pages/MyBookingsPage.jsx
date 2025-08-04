import React, { useEffect, useState } from 'react';
import { 
  FaPlaneDeparture, 
  FaPlaneArrival, 
  FaCalendarAlt, 
  FaClock, 
  FaHotel, 
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaSadTear
} from 'react-icons/fa';
import { Modal, Button, Spinner, Alert, Placeholder } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyBookingsPage.css';
import dayjs from 'dayjs';

// ✅ Add formatDate function here
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const MyBookingsPage = () => {
  const [flightBookings, setFlightBookings] = useState([]);
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [isHotelBooking, setIsHotelBooking] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [currentPageFlight, setCurrentPageFlight] = useState(1);
  const [currentPageHotel, setCurrentPageHotel] = useState(1);
  
  const bookingsPerPage = 2;
  const token = localStorage.getItem('token');
  const BASE_URL = 'http://localhost:5000';
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login', { state: { from: '/my-bookings' } });
      return;
    }

    const fetchAllBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [flightRes, hotelRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/bookings`, { 
            headers: { Authorization: `Bearer ${token}` } 
          }),
          axios.get(`${BASE_URL}/api/hotel-bookings`, { 
            headers: { Authorization: `Bearer ${token}` } 
          })
        ]);
        
        setFlightBookings(flightRes?.data || []);
        setHotelBookings(hotelRes?.data || []);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err.response?.data?.message || 'Failed to load bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllBookings();
  }, [token, navigate]);

  const handleCancelClick = (booking, isHotel) => {
    setBookingToCancel(booking);
    setIsHotelBooking(isHotel);
    setShowModal(true);
  };

  const confirmCancel = async () => {
    const id = bookingToCancel._id;
    try {
      setCancelling(true);
      const url = isHotelBooking
        ? `${BASE_URL}/api/hotel-bookings/${id}/cancel`
        : `${BASE_URL}/api/bookings/${id}/cancel`;

      await axios.put(url, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (isHotelBooking) {
        setHotelBookings(hotelBookings.filter(b => b._id !== id));
      } else {
        setFlightBookings(flightBookings.filter(b => b._id !== id));
      }
    } catch (err) {
      console.error('Error canceling booking:', err);
      setError(err.response?.data?.message || 'Failed to cancel booking. Please try again.');
    } finally {
      setCancelling(false);
      setShowModal(false);
      setBookingToCancel(null);
    }
  };

  const paginate = (bookings, currentPage) => {
    const indexOfLast = currentPage * bookingsPerPage;
    const indexOfFirst = indexOfLast - bookingsPerPage;
    return bookings.slice(indexOfFirst, indexOfLast);
  };

  const totalPagesFlight = Math.ceil(flightBookings.length / bookingsPerPage);
  const totalPagesHotel = Math.ceil(hotelBookings.length / bookingsPerPage);

  // Loading skeleton component
  const BookingSkeleton = () => (
    <div className="col-md-6">
      <div className="card shadow booking-card">
        <div className="card-body">
          <Placeholder as="h5" animation="wave">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as="p" animation="wave">
            <Placeholder xs={7} /> <br />
            <Placeholder xs={4} /> <br />
            <Placeholder xs={8} /> <br />
            <Placeholder xs={5} />
          </Placeholder>
          <div className="d-flex justify-content-end gap-2">
            <Placeholder.Button variant="outline-primary" xs={3} />
            <Placeholder.Button variant="outline-danger" xs={3} />
          </div>
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="container py-5">
        <Alert variant="danger" className="d-flex align-items-center">
          <FaExclamationTriangle className="me-2" size={24} />
          <div>
            <h5>Error Loading Bookings</h5>
            <p className="mb-0">{error}</p>
          </div>
        </Alert>
        <div className="text-center mt-3">
          <Button variant="primary" onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">My Bookings</h2>

      {loading ? (
        <div className="loading-container">
          <div className="text-center mb-4">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Loading your bookings...</p>
          </div>
          
          {/* Flight Bookings Skeleton */}
          <h4 className="mb-3">✈️ Flight Bookings</h4>
          <div className="row g-4">
            <BookingSkeleton />
            <BookingSkeleton />
          </div>
          
          {/* Hotel Bookings Skeleton */}
          <h4 className="mt-5 mb-3">🏨 Hotel Bookings</h4>
          <div className="row g-4">
            <BookingSkeleton />
            <BookingSkeleton />
          </div>
        </div>
      ) : (
        <>
          {/* Flight Bookings */}
          <h4 className="mb-3">✈️ Flight Bookings</h4>
          {flightBookings.length === 0 ? (
            <div className="text-center py-4 empty-state">
              <FaSadTear size={48} className="text-muted mb-3" />
              <h5>No Flight Bookings Found</h5>
              <p className="text-muted">You haven't made any flight bookings yet.</p>
              <Button variant="primary" href="/search">
                Book a Flight
              </Button>
            </div>
          ) : (
            <>
              <div className="row g-4">
                {paginate(flightBookings, currentPageFlight).map((booking) => (
                  <div className="col-md-6" key={booking._id}>
                    <div className="card shadow booking-card">
                      <div className="card-body">
                        <h5 className="card-title">Flight: {booking.flightNumber}</h5>
                        <p className="card-text">
                          <FaPlaneDeparture /> <strong>From:</strong> {booking.origin} <br />
                          <FaPlaneArrival /> <strong>To:</strong> {booking.destination} <br />
                          <FaClock /> <strong>Departure Time:</strong> {booking.departure} <br />
                          <FaClock /> <strong>Arrival Time:</strong> {booking.arrival}
                        </p>
                        <div className="d-flex justify-content-end gap-2">
                          <button className="btn btn-sm btn-outline-primary">View</button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleCancelClick(booking, false)}
                            disabled={cancelling}
                          >
                            {cancelling && bookingToCancel?._id === booking._id ? (
                              <Spinner as="span" size="sm" animation="border" role="status" />
                            ) : 'Cancel'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {totalPagesFlight > 1 && (
                <div className="d-flex justify-content-center mt-3">
                  <ul className="pagination">
                    {[...Array(totalPagesFlight)].map((_, idx) => (
                      <li key={idx} className={`page-item ${idx + 1 === currentPageFlight ? 'active' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => setCurrentPageFlight(idx + 1)}
                        >
                          {idx + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Hotel Bookings */}
          <h4 className="mt-5 mb-3">🏨 Hotel Bookings</h4>
          {hotelBookings.length === 0 ? (
            <div className="text-center py-4 empty-state">
              <FaSadTear size={48} className="text-muted mb-3" />
              <h5>No Hotel Bookings Found</h5>
              <p className="text-muted">You haven't made any hotel bookings yet.</p>
              <Button variant="primary" href="/hotel-deals">
                Find Hotels
              </Button>
            </div>
          ) : (
            <>
              <div className="row g-4">
                {paginate(hotelBookings, currentPageHotel).map((booking) => (
                  <div className="col-md-6" key={booking._id}>
                    <div className="card shadow booking-card">
                      <div className="card-body">
                        <h5 className="card-title"><FaHotel /> {booking.hotelName}</h5>
                        <p className="card-text">
                          <FaMapMarkerAlt /> <strong>Location:</strong> {booking.location} <br />
                          <FaCalendarAlt /> <strong>Check-In:</strong> {formatDate(booking.checkInDate)} <br />
                          <FaCalendarAlt /> <strong>Check-Out:</strong> {formatDate(booking.checkOutDate)}
                        </p>
                        <div className="d-flex justify-content-end gap-2">
                          <button className="btn btn-sm btn-outline-primary">View</button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleCancelClick(booking, true)}
                            disabled={cancelling}
                          >
                            {cancelling && bookingToCancel?._id === booking._id ? (
                              <Spinner as="span" size="sm" animation="border" role="status" />
                            ) : 'Cancel'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPagesHotel > 1 && (
                <div className="d-flex justify-content-center mt-3">
                  <ul className="pagination">
                    {[...Array(totalPagesHotel)].map((_, idx) => (
                      <li key={idx} className={`page-item ${idx + 1 === currentPageHotel ? 'active' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => setCurrentPageHotel(idx + 1)}
                        >
                          {idx + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Cancel Modal */}
          <Modal show={showModal} onHide={() => !cancelling && setShowModal(false)} centered>
            <Modal.Header closeButton={!cancelling}>
              <Modal.Title>Cancel Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to cancel your {isHotelBooking ? 'hotel' : 'flight'} booking?
              {isHotelBooking && (
                <div className="alert alert-warning mt-3">
                  <strong>Note:</strong> Cancellation fees may apply depending on the hotel's policy.
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button 
                variant="secondary" 
                onClick={() => setShowModal(false)}
                disabled={cancelling}
              >
                Close
              </Button>
              <Button 
                variant="danger" 
                onClick={confirmCancel}
                disabled={cancelling}
              >
                {cancelling ? (
                  <>
                    <Spinner as="span" size="sm" animation="border" role="status" />
                    <span className="ms-2">Processing...</span>
                  </>
                ) : 'Confirm Cancel'}
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
}

export default MyBookingsPage;