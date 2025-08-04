import React, { useEffect, useState, useRef, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaPlane } from 'react-icons/fa';
import { UserContext } from '../context/UserContext';
import './Navbar.css';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const syncUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setIsLoggedIn(true);
          setUserName(parsedUser.name || 'User');
          setUser(parsedUser);
        } catch (e) {
          handleLogout();
        }
      } else {
        setIsLoggedIn(false);
        setUserName('');
        setUser(null);
      }
    };

    syncUser();

    window.addEventListener('userLogin', syncUser);
    window.addEventListener('storage', syncUser);

    return () => {
      window.removeEventListener('userLogin', syncUser);
      window.removeEventListener('storage', syncUser);
    };
  }, [setUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserName('');
    setUser(null);
    setDropdownOpen(false);
    navigate('/login');
  };

  // Check if the current user is an admin
  const isAdmin = user?.role === 'admin';

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <NavLink to={isAdmin ? '/admin' : '/'} className="navbar-brand d-flex align-items-center gap-2">
          <FaPlane className="text-primary" />
          <span className="fw-bold text-primary fs-4">GDC</span>
          <span className="fw-normal fs-5 text-dark">Airways</span>
        </NavLink>

        {/* Only show navigation links and user dropdown if not admin */}
        {!isAdmin && (
          <div className="d-flex gap-4 align-items-center">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/search" className="nav-link">Search Flights</NavLink>
            <NavLink to="/about" className="nav-link">About Us</NavLink>
            <NavLink to="/contact" className="nav-link">Contact</NavLink>

            {!isLoggedIn ? (
              <NavLink to="/login" className="btn btn-outline-primary d-flex align-items-center gap-2">
                <FaUser />
                Login
              </NavLink>
            ) : (
              <div className="dropdown" ref={dropdownRef}>
                <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <FaUser className="me-1" />
                  {userName}
                </button>
                <ul className={`dropdown-menu dropdown-menu-end${dropdownOpen ? ' show' : ''}`}>
                  <li><NavLink className="dropdown-item" to="/profile" onClick={() => setDropdownOpen(false)}>View Profile</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/my-bookings" onClick={() => setDropdownOpen(false)}>My Bookings</NavLink></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;