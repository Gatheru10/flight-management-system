import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGoogle, FaMoon, FaSun, FaUserShield } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('light');
  const [isAdminLoggingIn, setIsAdminLoggingIn] = useState(false);

  // Auto-redirect if user already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (parsed?.isAdmin) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [navigate]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      setLoading(true);
      const backendUrl = process.env.REACT_APP_BACKEND_URL;

      const { data } = await axios.post(`${backendUrl}/api/users/login`, { email, password });

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      setUser(data);

      window.dispatchEvent(new Event("userLogin"));
      toast.success("Login successful!");

      const destination = data?.isAdmin ? "/admin" : (location.state?.from || "/");
      navigate(destination, { replace: true });

    } catch (err) {
      setError(err.response?.data?.message || "Failed to login.");
      toast.error(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const backgroundImage = theme === 'light'
    ? '/Images/login.jpg'
    : '/Images/night.jpg';

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  };

  const themeButtonStyle = {
    position: 'absolute',
    top: 20,
    right: 20,
    cursor: 'pointer',
    color: '#fff',
    background: 'rgba(0,0,0,0.3)',
    borderRadius: '50%',
    padding: '10px'
  };

  return (
    <div style={backgroundStyle}>
      <div style={themeButtonStyle} onClick={toggleTheme} title="Toggle Theme">
        {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
      </div>

      <Card style={{ width: "24rem" }} className="p-4 shadow">
        <h3 className="mb-3 text-center">Sign in</h3>

        {isAdminLoggingIn && (
          <div className="text-center text-warning mb-2">
            <FaUserShield className="me-1" /> Logging in as Admin
          </div>
        )}

        {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsAdminLoggingIn(e.target.value.toLowerCase().includes("admin"));
              }}
              disabled={loading}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
            <Form.Check
              type="checkbox"
              label="Show password"
              onChange={() => setShowPassword(!showPassword)}
              disabled={loading}
              className="mt-2"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 mb-3"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>

          <div className="text-center my-3">OR</div>

          <Button
            variant="outline-dark"
            className="w-100 mb-2"
            disabled
          >
            <FaGoogle className="me-2" /> Continue with Google (disabled)
          </Button>

          <div className="text-center mt-3">
            Don't have an account?{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => !loading && navigate("/signup")}
            >
              Sign up
            </span>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;