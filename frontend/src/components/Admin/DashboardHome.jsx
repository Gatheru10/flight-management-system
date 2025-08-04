import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Card, Row, Col, Table } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { UserContext } from '../../context/UserContext';
import 'chart.js/auto';

const DashboardHome = () => {
  const { user } = useContext(UserContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setStats(data);
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
      }
    };

    fetchDashboardStats();
  }, [user]);

  if (!stats) return <p>Loading dashboard...</p>;

  const chartData = {
    labels: ['Users', 'Flights', 'Flight Bookings', 'Hotel Bookings'],
    datasets: [
      {
        label: 'Total Count',
        data: [
          stats.totalUsers || 0,
          stats.totalFlights || 0,
           stats.totalBookings || 0,
          stats.totalHotelBookings || 0,
        ],
        backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* Summary Stats */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <h3>{stats.totalUsers}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Flights</Card.Title>
              <h3>{stats.totalFlights}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Flight Bookings</Card.Title>
              <h3>{stats.totalBookings}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Hotel Bookings</Card.Title>
              <h3>{stats.totalHotelBookings}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Chart */}
      <Card className="mb-4 p-3 shadow-sm">
        <h5>System Overview</h5>
        <Bar data={chartData} />
      </Card>

      <Row>
        {/* Recent Users */}
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header>Recent Users</Card.Header>
            <Table striped hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentUsers?.slice(0, 5).map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isActive ? 'Active' : 'Inactive'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>

        {/* Recent Bookings */}
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header>Recent Flight Bookings</Card.Header>
            <Table striped hover>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Flight</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentBookings?.slice(0, 5).map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.user?.name}</td>
                    <td>{booking.flight?.route || booking.flightNumber}</td>
                    <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardHome;
