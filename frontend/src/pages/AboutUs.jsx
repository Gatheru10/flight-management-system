import React from 'react';
import { FaRoute, FaUserShield, FaHandshake, FaPlane, FaChartLine, FaHeadset } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="row justify-content-center mb-5">
        <div className="col-lg-8 text-center">
          <h1 className="display-5 fw-bold text-primary mb-4">About Our Flight System</h1>
          <p className="lead text-muted mb-4">
            Our Flight Management System connects travelers to top destinations with ease, speed, and reliability. 
            Whether you're traveling for business, vacation, or family visits, we provide the best deals and 
            seamless booking experience.
          </p>
          <div className="d-flex justify-content-center gap-3 mb-4">
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
              <FaPlane className="me-2" /> 100+ Routes
            </span>
            <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
              <FaUserShield className="me-2" /> Trusted Service
            </span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <div className="icon-lg bg-primary bg-opacity-10 text-primary rounded-circle mb-3 mx-auto">
                <FaRoute size={24} />
              </div>
              <h5 className="fw-bold mb-3">Extensive Network</h5>
              <p className="text-muted mb-0">
                Over 100 domestic and international routes to connect you to your desired destinations.
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <div className="icon-lg bg-success bg-opacity-10 text-success rounded-circle mb-3 mx-auto">
                <FaUserShield size={24} />
              </div>
              <h5 className="fw-bold mb-3">Trusted Service</h5>
              <p className="text-muted mb-0">
                Trusted by thousands of users across Kenya for reliable and efficient travel solutions.
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <div className="icon-lg bg-info bg-opacity-10 text-info rounded-circle mb-3 mx-auto">
                <FaHandshake size={24} />
              </div>
              <h5 className="fw-bold mb-3">Premium Partnerships</h5>
              <p className="text-muted mb-0">
                Partnered with leading airlines and hotels to bring you exclusive deals and offers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="row g-4 mb-5">
        <div className="col-md-3 col-6 text-center">
          <h2 className="display-6 fw-bold text-primary">100+</h2>
          <p className="text-muted mb-0">Routes</p>
        </div>
        <div className="col-md-3 col-6 text-center">
          <h2 className="display-6 fw-bold text-primary">10K+</h2>
          <p className="text-muted mb-0">Users</p>
        </div>
        <div className="col-md-3 col-6 text-center">
          <h2 className="display-6 fw-bold text-primary">15+</h2>
          <p className="text-muted mb-0">Airlines</p>
        </div>
        <div className="col-md-3 col-6 text-center">
          <h2 className="display-6 fw-bold text-primary">24/7</h2>
          <p className="text-muted mb-0">Support</p>
        </div>
      </div>

      {/* Additional Services */}
      <div className="row align-items-center g-5 py-4">
        <div className="col-lg-6">
          <img 
            src="/images/about/flight-services.jpg" 
            alt="Flight services" 
            className="img-fluid rounded-3 shadow" 
          />
        </div>
        <div className="col-lg-6">
          <h2 className="fw-bold mb-4">About Our Flight Services</h2>
          <div className="d-flex mb-3">
            <div className="me-4 text-primary">
              <FaChartLine size={24} />
            </div>
            <div>
              <h5 className="fw-bold">Real-time Tracking</h5>
              <p className="text-muted mb-0">
                Track your flights in real-time and get instant updates on any changes.
              </p>
            </div>
          </div>
          <div className="d-flex mb-3">
            <div className="me-4 text-primary">
              <FaHeadset size={24} />
            </div>
            <div>
              <h5 className="fw-bold">24/7 Customer Support</h5>
              <p className="text-muted mb-0">
                Our dedicated support team is available round the clock to assist you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;