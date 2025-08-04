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

  const departure = flight.departureDate
    ? new Date(flight.departureDate).toLocaleString()
    : "Not Available";
  const arrival = flight.estimatedArrival
    ? new Date(flight.estimatedArrival).toLocaleString()
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

        <p><strong>Booking ID:</strong> {booking._id || bookingId || "Unavailable"}</p>
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
