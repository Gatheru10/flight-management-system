// src/components/HeroSection.jsx
import React from "react";
import { FaPlaneDeparture } from "react-icons/fa";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section
      className="d-flex align-items-center justify-content-center text-center py-5"
      style={{
        minHeight: "70vh",
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        borderRadius: "20px",
        margin: "2rem",
        color: "#fff",
      }}
    >
      <div className="container">
        <h1 className="display-3 fw-bold mb-3">Your Journey Begins Here</h1>
        <p className="lead fs-4 mb-4">
          Discover amazing destinations and book your flights with GDC Airways.
          Seamless travel experiences await you.
        </p>
        <Link
          to="/search" // ✅ Updated from "/booking" to "/search"
          className="btn btn-light btn-lg d-inline-flex align-items-center gap-2"
          style={{ fontWeight: "bold", borderRadius: "10px" }}
        >
          <FaPlaneDeparture />
          Search Flights
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
