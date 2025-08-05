import React from 'react';
import { FaGlobeAfrica, FaUsers, FaCheckCircle } from 'react-icons/fa';

const AboutSection = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center mb-5">
            <h2 className="fw-bold mb-3">About Our Flight System</h2>
            <p className="lead text-muted">
              Our Flight Management System connects travelers to top destinations with ease, speed, and reliability. Whether you're traveling for business, vacation, or family visits, we provide the best deals and seamless booking experience.
            </p>
          </div>
        </div>
        
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <img
              src="/Images/about-flight.jpg"
              alt="About our flight services"
              className="img-fluid rounded-3 shadow-lg"
            />
          </div>
          <div className="col-lg-6">
            <div className="ps-lg-5">
              <h3 className="h4 mb-4">Key Features</h3>
              <ul className="list-unstyled">
                <li className="d-flex align-items-start mb-3">
                  <span className="me-3">
                    <FaCheckCircle className="text-primary fs-4" />
                  </span>
                  <span>Over 100 domestic and international routes</span>
                </li>
                <li className="d-flex align-items-start mb-3">
                  <span className="me-3">
                    <FaUsers className="text-primary fs-4" />
                  </span>
                  <span>Trusted by thousands of users across Kenya</span>
                </li>
                <li className="d-flex align-items-start mb-3">
                  <span className="me-3">
                    <FaGlobeAfrica className="text-primary fs-4" />
                  </span>
                  <span>Partnered with leading airlines and hotels</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;