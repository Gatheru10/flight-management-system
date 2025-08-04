// src/routes/PrivateAdminRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateAdminRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return null; // or a loading spinner

  if (!user) return <Navigate to="/login" />;
  if (!user.isAdmin) return <Navigate to="/profile" />;

  return children;
};

export default PrivateAdminRoute;
