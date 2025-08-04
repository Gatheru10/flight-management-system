// routes/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  // If user is not logged in, redirect to login
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
