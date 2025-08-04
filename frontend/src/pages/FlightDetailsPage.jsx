import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "../axiosConfig";
import { UserContext } from '../context/UserContext';
import { toast } from "react-toastify";

const hotelDeals = {
  "Nairobi → Malindi": [
    {
      name: "Ocean Beach Resort",
      location: "Malindi",
      rating: "4.5/5",
      category: "Luxury",
      price: "KSh 9,000/night",
      image: "/images/hotel1.jpg",
    },
    {
      name: "Driftwood Club",
      location: "Malindi",
      rating: "4.2/5",
      category: "Midrange",
      price: "KSh 7,500/night",
      image: "/images/hotel2.jpg",
    },
  ],
  "Nairobi → Eldoret": [
    {
      name: "Eka Hotel Eldoret",
      location: "Eldoret",
      rating: "4.6/5",
      category: "Premium",
      price: "KSh 6,500/night",
      image: "/images/eka.jpg",
    },
    {
      name: "Sirikwa Hotel",
      location: "Eldoret",
      rating: "4.0/5",
      category: "Budget",
      price: "KSh 5,200/night",
      image: "/images/Sirikwa.jpg",
    },
  ],
};

const seatAvailability = {
  Economy: 120,
  Business: 30,
  First: 10,
};

export default function FlightDetailsPage() {
  const { state } = useLocation();
  const deal = state?.deal;
  const { user } = useContext(UserContext);

  const [passengers, setPassengers] = useState(1);
  const [flightClass, setFlightClass] = useState("Economy");

  if (!deal) return <h3>Sorry, no deal information found.</h3>;

  const getNumericPrice = () => {
    return parseInt(deal.price.replace(/[^\d]/g, ""));
  };

  const totalPrice = getNumericPrice() * passengers;

  const handleFlightBooking = async () => {
    try {
      await axios.post(
        "/api/bookings",
        {
          flightNumber: `FL${deal.id}`,
          departure: deal.time.split("→")[0].trim(),
          arrival: deal.time.split("→")[1].trim(),
          origin: deal.route.split("→")[0].trim(),
          destination: deal.route.split("→")[1].trim(),
          seatNumber: passengers,
          numberOfGuests: passengers,
          flightClass,
          totalCost: totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success("Flight booked successfully!");
    } catch (err) {
      toast.error("Failed to book flight.");
    }
  };

  const handleHotelBooking = async (hotel) => {
    try {
      await axios.post(
        "/api/bookings/hotels",
        {
          hotelName: hotel.name,
          location: hotel.location,
          price: hotel.price,
          rating: hotel.rating,
          category: hotel.category,
          image: hotel.image,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success("Hotel booked successfully!");
    } catch (err) {
      toast.error("Failed to book hotel.");
    }
  };

  const hotels = hotelDeals[deal.route] || [];

  return (
    <div className="container mt-4">
      <h2>Flight Details</h2>
      <div className="card p-4 mb-4">
        <img src={deal.image} className="img-fluid mb-3" alt="Flight" />
        <h4>{deal.route}</h4>
        <p><strong>Airline:</strong> {deal.airline}</p>
        <p><strong>Time:</strong> {deal.time}</p>
        <p><strong>Duration:</strong> {deal.duration}</p>
        <p>
          <strong>Base Price:</strong>{" "}
          <span className="text-success">{deal.price}</span>{" "}
          <s>{deal.oldPrice}</s>
        </p>
        <p><strong>Offer Valid Until:</strong> {deal.validUntil}</p>

        <div className="row mb-3">
          <div className="col-md-3">
            <label><strong>Passengers:</strong></label>
            <select
              className="form-select"
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label><strong>Class:</strong></label>
            <select
              className="form-select"
              value={flightClass}
              onChange={(e) => setFlightClass(e.target.value)}
            >
              {["Economy", "Business", "First"].map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <p className="mt-4">
              <strong>Available Seats:</strong> {seatAvailability[flightClass]} &nbsp;|&nbsp;
              <strong>Total Price:</strong>{" "}
              <span className="text-success">KSh {totalPrice.toLocaleString()}</span>
            </p>
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleFlightBooking}>
          Confirm Flight Booking
        </button>
      </div>

      {hotels.length > 0 && (
        <>
          <h3>Recommended Hotels</h3>
          <div className="row">
            {hotels.map((hotel, index) => (
              <div className="col-md-6" key={index}>
                <div className="card mb-3">
                  <img src={hotel.image} className="card-img-top" alt={hotel.name} />
                  <div className="card-body">
                    <h5>{hotel.name}</h5>
                    <p>{hotel.location} — {hotel.rating}</p>
                    <p><strong>{hotel.price}</strong></p>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleHotelBooking(hotel)}
                    >
                      Book Hotel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
