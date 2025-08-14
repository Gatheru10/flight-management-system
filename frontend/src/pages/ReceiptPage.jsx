import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { FaDownload, FaArrowLeft } from "react-icons/fa";

const ReceiptPage = () => {
  const { state } = useLocation();
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const booking = state?.booking || {};
  const flight = state?.flight || {};

  // Handle multiple possible date fields for departure
  const departure = flight.departureDate || flight.departure
    ? new Date(flight.departureDate || flight.departure).toLocaleString()
    : "Not Available";

  // Handle multiple possible date fields for arrival
  const arrival = flight.arrivalDate || flight.estimatedArrival || flight.arrival
    ? new Date(flight.arrivalDate || flight.estimatedArrival || flight.arrival).toLocaleString()
    : "Not Available";

  const handleDownload = () => {
    window.print(); // Simple print as PDF/download option
  };

  return (
    <div className="container my-5">
      <Card className="p-4 shadow-sm border-0 rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-success">Booking Confirmed</h2>
          <Button variant="outline-primary" onClick={handleDownload}>
            <FaDownload className="me-2" />
            Download Receipt
          </Button>
        </div>

        <hr />

        <p><strong>Booking ID:</strong> BK-2025-001 </p>
        <p><strong>Flight:</strong> {flight.origin} → {flight.destination}</p>
        <p><strong>Departure:</strong> {departure}</p>
        <p><strong>Arrival:</strong> {arrival}</p>
        <p><strong>Travel Class:</strong> {flight.travelClass || "Economy"}</p>
        <p><strong>Total Price:</strong> KSH {booking.totalPrice || flight.price || "N/A"}</p>

        <hr />

        <Button className="mt-3" onClick={() => navigate("/")}>
          <FaArrowLeft className="me-2" />
          Back to Home
        </Button>
      </Card>
    </div>
  );
};

export default ReceiptPage;
