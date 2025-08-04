import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { UserProvider } from './context/UserContext';

// Components & Pages
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Login';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import MyBookingsPage from './pages/MyBookingsPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import PrivateAdminRoute from './components/PrivateAdminRoute';

import SearchPage from './pages/SearchPage';
import AboutUs from './pages/AboutUs';
import ContactPage from './pages/ContactPage';
import FlightResultsPage from './pages/FlightResultsPage';
import RouteDetailsPage from './pages/RouteDetailsPage';
import HotelDetailsPage from './pages/HotelDetailsPage';
import HotelDealsPage from './pages/HotelDealsPage';
import HotelTeaserDetailPage from './pages/HotelTeaserDetailPage';
import FlightDetailsPage from './pages/FlightDetailsPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ReceiptPage from './pages/ReceiptPage';

// Admin Dashboard Pages
import DashboardLayout from './pages/Admin/DashboardLayout';
import DashboardHome from './components/Admin/DashboardHome';
import Users from './pages/Admin/Users';
import Bookings from './pages/Admin/Bookings';
import Hotels from './pages/Admin/Hotels';
import AdminFlightsPage from './components/Admin/AdminFlights'; // ✅ Correct for default export


function AppWrapper() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/search-results" element={<FlightResultsPage />} />
        <Route path="/routes/:routeId" element={<RouteDetailsPage />} />
        <Route path="/route-details/:dealId" element={<RouteDetailsPage />} />
        <Route path="/hotels/:hotelId" element={<HotelDetailsPage />} />
        <Route path="/hotel-deals" element={<HotelDealsPage />} />
        <Route path="/hotel-teaser/:id" element={<HotelTeaserDetailPage />} />
        <Route path="/flight-details/:flightId" element={<FlightDetailsPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/receipt/:bookingId" element={<ReceiptPage />} />
        <Route path="/MyBookings" element={<MyBookingsPage />} />

        {/* User Protected Routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <PrivateRoute>
              <MyBookingsPage />
            </PrivateRoute>
          }
        />

        {/* Admin Protected Dashboard Layout */}
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute>
              <DashboardLayout />
            </PrivateAdminRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<Users />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="flights" element={<AdminFlightsPage />} />
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppWrapper />
      </Router>
    </UserProvider>
  );
}

export default App;
