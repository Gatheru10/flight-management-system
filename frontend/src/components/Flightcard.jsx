import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaChair,
  FaClock,
  FaDollarSign,
  FaMapMarkerAlt
} from 'react-icons/fa';
import './Flightcard.css';
import { UserContext } from '../context/UserContext';


const FlightCard = ({ flight }) => {
  const { user } = useContext(UserContext);
  const [confirmed, setConfirmed] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const navigate = useNavigate();

  const handleBooking = async () => {
    try {
      if (!user || !user._id) {
        alert("You must be logged in to book a flight.");
        return;
      }

      const token = localStorage.getItem("token");

      const response = await axios.post(
        'https://final-project-2-ie9y.onrender.com/api/bookings',
        {
          user: user._id,
          flight: flight._id,
          flightNumber: flight.flightNumber || flight.number || "UNKNOWN",
          origin: flight.origin,
          destination: flight.destination,
          departure: flight.departureDate,
          arrival: flight.estimatedArrival,
          seatNumber: "Auto-Assign",
          numberOfGuests: passengers
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const bookingData = response.data;
      setConfirmed(true);

      setTimeout(() => {
        navigate(`/receipt/${bookingData._id}`, {
          state: {
            booking: bookingData,
            flight,
            passengers
          }
        });
      }, 1500); // Delay to allow success message to show

    } catch (err) {
      console.error("Booking error:", err);
      alert('Booking failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="flight-card shadow-sm rounded p-4 mb-4 bg-white">
      <h5 className="mb-3 text-primary">{flight.airline}</h5>

      <p>
        <FaMapMarkerAlt style={{ color: "#0d6efd", marginRight: 8 }} />
        {flight.origin} → {flight.destination}
      </p>

      <p>
        <FaPlaneDeparture style={{ color: "#0d6efd", marginRight: 8 }} />
        Departure: {flight.departureDate ? dayjs(flight.departureDate).format("MMM D, YYYY h:mm A") : "Invalid Date"}
      </p>

      <p>
        <FaPlaneArrival style={{ color: "#198754", marginRight: 8 }} />
        Arrival: {flight.estimatedArrival ? dayjs(flight.estimatedArrival).format("MMM D, YYYY h:mm A") : "Invalid Date"}
      </p>

      <p>
        <FaChair style={{ color: "#6f42c1", marginRight: 8 }} />
        Class: {flight.travelClass || "N/A"}
      </p>

      <p>
        <FaClock style={{ color: "#fd7e14", marginRight: 8 }} />
        Duration: {flight.duration || "N/A"}
      </p>

      {flight.stops && flight.stops.length > 0 && (
        <p>
          <FaMapMarkerAlt style={{ color: "#ffc107", marginRight: 8 }} />
          Stops: {flight.stops.join(', ')}
        </p>
      )}

      <p>
        <FaDollarSign style={{ color: "#dc3545", marginRight: 8 }} />
        Price: ${flight.price}
      </p>

      <div className="mb-3">
        <label htmlFor="passengers">Passengers:</label>
        <input
          type="number"
          id="passengers"
          min="1"
          value={passengers}
          onChange={(e) => setPassengers(Math.max(1, parseInt(e.target.value)))}
          style={{ width: "60px", marginLeft: "10px" }}
        />
      </div>

      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-outline-secondary">View Details</button>
        <button className="btn btn-primary" onClick={handleBooking}>Book Now</button>
      </div>

      {confirmed && (
        <div className="alert alert-success mt-3">
          🎉 Booking confirmed! Redirecting to receipt...
        </div>
      )}
    </div>
  );
};

export default FlightCard;
