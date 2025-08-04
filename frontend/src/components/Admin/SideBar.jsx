import { Link } from 'react-router-dom';
import '../Pages/DashboardLayout.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>FMS Admin</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/admin">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/users">
            <i className="fas fa-users"></i> Users
          </Link>
        </li>
        <li>
          <Link to="/admin/flights">
            <i className="fas fa-plane"></i> Flights
          </Link>
        </li>
        <li>
          <Link to="/admin/hotels">
            <i className="fas fa-hotel"></i> Hotels
          </Link>
        </li>
        <li>
          <Link to="/admin/bookings">
            <i className="fas fa-calendar-check"></i> Bookings
          </Link>
        </li>
        {/* Logout removed */}
      </ul>
    </div>
  );
};

export default Sidebar;
