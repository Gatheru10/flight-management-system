import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlightCard from "../components/Flightcard";
import "./FlightResultsPage.css";

const FlightResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { origin, destination, date, travelClass, passengers } = location.state || {};

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!origin || !destination || !date || !travelClass) {
      navigate("/");
    }
  }, [origin, destination, date, travelClass, navigate]);

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({ origin, destination, date });
        const res = await fetch(`https://final-project-2-ie9y.onrender.com/api/flights?${params}`);
        if (!res.ok) throw new Error("Failed to fetch flights");
        const data = await res.json();
        setFlights(data);
      } catch (err) {
        console.error(err);
        setError("Error loading flights");
      } finally {
        setLoading(false);
      }
    };

    if (origin && destination && date && travelClass) {
      fetchFlights();
    }
  }, [origin, destination, date, travelClass]);

  const nonStopFlights = flights.filter(f => Array.isArray(f.stops) && f.stops.length === 0);
  const stopoverFlights = flights.filter(f => Array.isArray(f.stops) && f.stops.length > 0);

  return (
    <div className="results-page container">
      <h2 className="text-center mb-4">Flight Results</h2>

      {loading && <p className="text-center">Loading flights...</p>}
      {error && <p className="text-danger text-center">{error}</p>}
      {!loading && !error && flights.length === 0 && <p className="text-center">No flights found.</p>}

      {!loading && !error && flights.length > 0 && (
        <div className="results-grid">
          <div className="flight-column">
            <h3>Non-stop Flights</h3>
            {nonStopFlights.length > 0 ? (
              nonStopFlights.map(flight => (
                <FlightCard key={flight._id} flight={flight} />
              ))
            ) : (
              <p>No non-stop flights available.</p>
            )}
          </div>

          <div className="flight-column">
            <h3>Stopover Flights</h3>
            {stopoverFlights.length > 0 ? (
              stopoverFlights.map(flight => (
                <FlightCard key={flight._id} flight={flight} />
              ))
            ) : (
              <p>No stopover flights available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightResultsPage;
