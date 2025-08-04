import React, { useState, useEffect } from 'react';
import { FaSearch, FaExchangeAlt, FaCalendarAlt, FaUser, FaChair } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FlightSearchForm = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState('economy');
  const [origins, setOrigins] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const res1 = await fetch('http://localhost:5000/api/flights/origins');
        const res2 = await fetch('http://localhost:5000/api/flights/destinations');
        const data1 = await res1.json();
        const data2 = await res2.json();
        setOrigins(data1);
        setDestinations(data2);
      } catch (error) {
        console.error('Error fetching airport data:', error);
      }
    };
    fetchAirports();
  }, []);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchData = {
      origin: from,
      destination: to,
      date: departDate,
      passengers,
      travelClass,
    };

    navigate('/search-results', {
      state: searchData,
    });
  };

  return (
    <div className="flight-search-form">
      <div className="container">
        <div className="search-card bg-white rounded-3 shadow-lg p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-3 align-items-end">
              {/* From / To Dropdowns */}
              <div className="col-md-4">
                <div className="location-fields d-flex gap-2">
                  <div className="form-floating w-100">
                    <select
                      className="form-select"
                      id="from"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      required
                    >
                      <option value="">Select origin</option>
                      {origins.map((origin, idx) => (
                        <option key={idx} value={origin}>{origin}</option>
                      ))}
                    </select>
                    <label htmlFor="from">From</label>
                  </div>
                  <button
                    type="button"
                    className="btn btn-light align-self-center"
                    onClick={handleSwap}
                    title="Swap"
                  >
                    <FaExchangeAlt />
                  </button>
                  <div className="form-floating w-100">
                    <select
                      className="form-select"
                      id="to"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      required
                    >
                      <option value="">Select destination</option>
                      {destinations.map((dest, idx) => (
                        <option key={idx} value={dest}>{dest}</option>
                      ))}
                    </select>
                    <label htmlFor="to">To</label>
                  </div>
                </div>
              </div>

              {/* Departure Date */}
              <div className="col-md-2">
                <div className="form-floating">
                  <input
                    type="date"
                    className="form-control"
                    id="departDate"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    required
                  />
                  <label htmlFor="departDate">
                    <FaCalendarAlt className="me-2" />
                    Departure
                  </label>
                </div>
              </div>

              {/* Travel Class */}
              <div className="col-md-2">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="travelClass"
                    value={travelClass}
                    onChange={(e) => setTravelClass(e.target.value)}
                    required
                  >
                    <option value="economy">Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                  <label htmlFor="travelClass">
                    <FaChair className="me-2" />
                    Class
                  </label>
                </div>
              </div>

              {/* Passengers */}
              <div className="col-md-2">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="passengers"
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value))}
                  >
                    {[...Array(9).keys()].map(i => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="passengers">
                    <FaUser className="me-2" />
                    Passengers
                  </label>
                </div>
              </div>

              {/* Search Button */}
              <div className="col-md-2">
                <button type="submit" className="btn btn-primary w-100 h-100">
                  <FaSearch className="me-2" />
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchForm;
