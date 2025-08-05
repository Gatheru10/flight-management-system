import React from 'react';
import {
  FaRoute,
  FaUserShield,
  FaHandshake,
  FaPlane,
  FaChartLine,
  FaHeadset,
} from 'react-icons/fa';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="row justify-content-center mb-5 text-center">
        <div className="col-lg-8">
          <h1 className="display-5 fw-bold text-primary mb-4">About Our Flight System</h1>
          <p className="lead text-muted mb-4">
            Our Flight Management System connects travelers to top destinations with ease,
            speed, and reliability. Whether you're traveling for business, vacation, or
            family visits, we provide the best deals and seamless booking experience.
          </p>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
              <FaPlane className="me-2" /> 100+ Routes
            </span>
            <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
              <FaUserShield className="me-2" /> Trusted Service
            </span>
          </div>
        </div>
      </div>

      {/* Features Section - Updated for proper row alignment */}
      <div className="row mb-5">
        {[
          {
            icon: <FaRoute size={24} />,
            title: 'Extensive Network',
            desc: 'Over 100 domestic and international routes to connect you to your desired destinations.',
            color: 'primary',
          },
          {
            icon: <FaHandshake size={24} />,
            title: 'Premium Partnerships',
            desc: 'Partnered with leading airlines and hotels to bring you exclusive deals and offers.',
            color: 'info',
          },
          {
            icon: <FaUserShield size={24} />,
            title: 'Trusted Service',
            desc: 'Trusted by thousands of users across Kenya for reliable and efficient travel solutions.',
            color: 'success',
          },
        ].map((feature, index) => (
          <div className="col-md-4 mb-4 mb-md-0" key={index}>
            <div className="card h-100 border-0 shadow-sm p-4 feature-card">
              <div className={`icon-container bg-${feature.color}-subtle text-${feature.color} mb-3`}>
                {feature.icon}
              </div>
              <h5 className="fw-bold mb-3">{feature.title}</h5>
              <p className="text-muted">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="row justify-content-center text-center bg-light rounded-4 py-5 mb-5">
        {[
          { stat: '100+', label: 'Routes' },
          { stat: '10K+', label: 'Users' },
          { stat: '15+', label: 'Airlines' },
          { stat: '24/7', label: 'Support' },
        ].map((item, idx) => (
          <div className="col-6 col-md-3 mb-4 mb-md-0" key={idx}>
            <h2 className="display-6 fw-bold text-primary">{item.stat}</h2>
            <p className="text-muted mb-0">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Additional Services */}
      <div className="row align-items-center g-5 py-4">
        <div className="col-lg-6">
          <img
            src="/Images/about-flight.jpg"
            alt="Flight services"
            className="img-fluid rounded-3 shadow"
          />
        </div>
        <div className="col-lg-6">
          <h2 className="fw-bold mb-4">About Our Flight Services</h2>
          <div className="d-flex mb-4">
            <div className="icon-text me-4 text-primary">
              <FaChartLine size={24} />
            </div>
            <div>
              <h5 className="fw-bold">Real-time Tracking</h5>
              <p className="text-muted mb-0">
                Track your flights in real-time and get instant updates on any changes.
              </p>
            </div>
          </div>
          <div className="d-flex">
            <div className="icon-text me-4 text-primary">
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