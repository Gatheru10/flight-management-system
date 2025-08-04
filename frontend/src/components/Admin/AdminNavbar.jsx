import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserShield, FaSignOutAlt } from 'react-icons/fa';

const AdminNavbar = ({ onLogout, userName }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-dark text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <NavLink to="/admin" className="navbar-brand text-white">
          <FaUserShield /> <strong>Admin Panel</strong>
        </NavLink>

        <div className="d-flex gap-3 align-items-center">
          <span>{userName}</span>
          <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
