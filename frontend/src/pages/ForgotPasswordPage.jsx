import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email) return setError('Please enter your email');

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/users/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to send reset link');

      toast.success('Reset link sent to your email');
      setSubmitted(true);

    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card style={{ width: '24rem' }} className="p-4 shadow">
        <h4 className="mb-3 text-center">Forgot Password</h4>

        {error && <Alert variant="danger">{error}</Alert>}
        {submitted ? (
          <Alert variant="success">Check your email for the reset link</Alert>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Enter your email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
