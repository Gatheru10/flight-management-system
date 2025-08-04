import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';
import { MdSupportAgent } from 'react-icons/md';

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Your message has been sent! We will contact you soon.');
  };

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="row justify-content-center mb-5">
        <div className="col-lg-8 text-center">
          <h1 className="display-5 fw-bold text-primary mb-3">Contact Us</h1>
          <p className="lead text-muted">
            Have questions or need assistance? Our team is ready to help you with all your travel needs.
          </p>
        </div>
      </div>

      <div className="row g-5">
        {/* Contact Information */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4 p-lg-5">
              <h3 className="h4 fw-bold mb-4">Get in Touch</h3>
              
              <div className="d-flex mb-4">
                <div className="me-3 text-primary">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Our Location</h5>
                  <p className="text-muted mb-0">
                    Aviation House, 4th Floor<br />
                    Moi Avenue, Nairobi, Kenya
                  </p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="me-3 text-primary">
                  <FaPhoneAlt size={20} />
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Phone Number</h5>
                  <p className="text-muted mb-0">
                    <a href="tel:+254700123456" className="text-decoration-none">+254 700 123 456</a><br />
                    <a href="tel:+254733987654" className="text-decoration-none">+254 733 987 654</a>
                  </p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="me-3 text-primary">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Email Address</h5>
                  <p className="text-muted mb-0">
                    <a href="mailto:info@flightkenya.com" className="text-decoration-none">info@flightkenya.com</a><br />
                    <a href="mailto:support@flightkenya.com" className="text-decoration-none">support@flightkenya.com</a>
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <div className="me-3 text-primary">
                  <FaClock size={20} />
                </div>
                <div>
                  <h5 className="fw-bold mb-1">Working Hours</h5>
                  <p className="text-muted mb-0">
                    Monday - Friday: 8:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-lg-5">
              <h3 className="h4 fw-bold mb-4">Send Us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label fw-bold">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name" 
                      placeholder="Your name" 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label fw-bold">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      placeholder="Your email" 
                      required 
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="subject" className="form-label fw-bold">Subject</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="subject" 
                      placeholder="Subject" 
                      required 
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="message" className="form-label fw-bold">Message</label>
                    <textarea 
                      className="form-control" 
                      id="message" 
                      rows="5" 
                      placeholder="Your message here..." 
                      required
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary px-4 py-2">
                      <FaPaperPlane className="me-2" />
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card border-0 bg-primary text-white">
            <div className="card-body p-4 p-lg-5">
              <div className="row align-items-center">
                <div className="col-lg-8 mb-4 mb-lg-0">
                  <div className="d-flex align-items-center">
                    <div className="me-4">
                      <MdSupportAgent size={48} />
                    </div>
                    <div>
                      <h3 className="fw-bold mb-2">Need immediate assistance?</h3>
                      <p className="mb-0">Our customer support team is available 24/7 to help you with urgent matters.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 text-lg-end">
                  <a href="tel:+254700123456" className="btn btn-light btn-lg px-4">
                    <FaPhoneAlt className="me-2" />
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              <iframe 
                title="Our Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.808559559897!2d36.82160931475395!3d-1.286899835980925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d664f5a9a7%3A0x1d9f4a0a4b9f4b0a!2sAviation%20House%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske"
                width="100%" 
                height="400" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;