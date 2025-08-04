import React from 'react';
import { FaSuitcaseRolling, FaWeight, FaPlaneDeparture, FaExclamationCircle } from 'react-icons/fa';

const BaggageSection = () => {
  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">Baggage Allowance</h2>
      <div className="row">
        {/* Carry-on */}
        <div className="col-6 col-md-3">
          <div className="card h-100 shadow-sm border-0 text-center p-2">
            <div className="card-body">
              <FaSuitcaseRolling className="mb-2 fs-3 text-primary" />
              <h6 className="card-title">Carry-on</h6>
              <p className="card-text small">
                One carry-on bag up to <strong>7kg</strong>. Must fit in overhead bin.
              </p>
            </div>
          </div>
        </div>

        {/* Checked Baggage */}
        <div className="col-6 col-md-3">
          <div className="card h-100 shadow-sm border-0 text-center p-2">
            <div className="card-body">
              <FaWeight className="mb-2 fs-3 text-success" />
              <h6 className="card-title">Checked Baggage</h6>
              <p className="card-text small">
                Economy: <strong>1 x 23kg</strong> | Business: <strong>2 x 32kg</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Oversized Items */}
        <div className="col-6 col-md-3">
          <div className="card h-100 shadow-sm border-0 text-center p-2">
            <div className="card-body">
              <FaPlaneDeparture className="mb-2 fs-3 text-danger" />
              <h6 className="card-title">Oversized Items</h6>
              <p className="card-text small">
                Sports gear or oversized items may have extra fees. Notify during booking.
              </p>
            </div>
          </div>
        </div>

        {/* Restricted Items */}
        <div className="col-6 col-md-3">
          <div className="card h-100 shadow-sm border-0 text-center p-2">
            <div className="card-body">
              <FaExclamationCircle className="mb-2 fs-3 text-warning" />
              <h6 className="card-title">Restricted Items</h6>
              <p className="card-text small">
                No sharp objects, flammables, or lithium batteries in checked baggage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BaggageSection;
