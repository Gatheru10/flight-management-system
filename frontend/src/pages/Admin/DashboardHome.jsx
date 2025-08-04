import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const DashboardHome = () => {
  const [stats, setStats] = useState({
    flights: 0,
    users: 0,
    bookings: 0,
    hotels: 0,
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/dashboard');
        setStats(res.data.stats);
        setRecentUsers(res.data.recentUsers);
        setRecentBookings(res.data.recentBookings);
        setChartData(res.data.chartData);
      } catch (err) {
        console.error('Dashboard fetch failed:', err);
        setError('Failed to load dashboard data. Please check your connection or try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Loading dashboard...</p>;
  }

  if (error) {
    return (
      <div className="container mt-4 text-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button className="btn btn-outline-primary mt-2" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard Overview</h2>

      <div className="row g-4 mb-4">
        {[
          { label: 'Flights', value: stats.flights, color: 'primary' },
          { label: 'Users', value: stats.users, color: 'success' },
          { label: 'Bookings', value: stats.bookings, color: 'warning' },
          { label: 'Hotels', value: stats.hotels, color: 'danger' },
        ].map((item, idx) => (
          <div className="col-md-3" key={idx}>
            <div className={`card border-${item.color} shadow-sm`}>
              <div className="card-body">
                <h5 className="card-title">{item.label}</h5>
                <p className={`card-text display-6 fw-bold text-${item.color}`}>
                  {item.value}
                </p>
                <small className="text-muted">Total {item.label.toLowerCase()}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-5">
        <h5 className="mb-3">System Activity</h5>
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: { legend: { position: 'bottom' } },
          }}
        />
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <h5>Recent Bookings</h5>
          <ul className="list-group">
            {recentBookings.map((booking, idx) => (
              <li className="list-group-item" key={idx}>
                <strong>{booking.userName}</strong> booked <em>{booking.flightNumber}</em> on {new Date(booking.createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-6">
          <h5>Recent Users</h5>
          <ul className="list-group">
            {recentUsers.map((user, idx) => (
              <li className="list-group-item" key={idx}>
                <strong>{user.name}</strong> ({user.email}) joined on {new Date(user.createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
