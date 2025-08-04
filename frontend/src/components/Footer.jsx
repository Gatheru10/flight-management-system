import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          {/* Logo / About */}
          <Col md={4} className="mb-3">
            <h4 className="fw-bold">FlyAway</h4>
            <p>Your trusted platform for exploring, booking, and flying to your dream destinations with comfort.</p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/flights" className="text-light text-decoration-none">Flights</a></li>
              <li><a href="/hotels" className="text-light text-decoration-none">Hotels</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </Col>

          {/* Contact & Social */}
          <Col md={4} className="mb-3">
            <h5>Contact Us</h5>
            <p><FaEnvelope className="me-2" />support@flyaway.com</p>
            <div className="d-flex gap-3 mt-3">
              <a href="https://facebook.com" className="text-light"><FaFacebookF size={20} /></a>
              <a href="https://twitter.com" className="text-light"><FaTwitter size={20} /></a>
              <a href="https://instagram.com" className="text-light"><FaInstagram size={20} /></a>
            </div>
          </Col>
        </Row>

        <hr className="border-light" />

        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} FlyAway. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
