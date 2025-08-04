import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Topbar from '../../components/Admin/TopBar';

const DashboardLayout = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/flights', label: 'Flights' },
    { path: '/admin/bookings', label: 'Bookings' },
    { path: '/admin/users', label: 'Users' },
  ];

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div
        className="bg-white shadow-sm border-end"
        style={{ width: '240px', position: 'sticky', top: 0, height: '100vh' }}
      >
        <div className="p-4">
          <h4 className="text-primary mb-4 fw-bold">✈️ GDC Admin</h4>
          <ul className="nav flex-column">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item mb-2">
                <Link
                  to={item.path}
                  className={`nav-link px-3 py-2 rounded ${
                    location.pathname === item.path
                      ? 'bg-primary text-white fw-semibold'
                      : 'text-dark'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        <Topbar />
        <main className="container-fluid py-4 px-4 bg-light" style={{ minHeight: '100%' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
