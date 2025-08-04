import React, { useContext, useRef, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Badge } from "react-bootstrap";
import { FaUserCircle, FaEnvelope, FaUserShield, FaCalendarAlt, FaUpload } from "react-icons/fa";
import axios from "../axiosConfig";
import { UserContext } from "../context/UserContext";

const ProfilePage = () => {
  const { user } = useContext(UserContext);
  const [preview, setPreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [passwords, setPasswords] = useState({ current: "", new: "" });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  if (!user) {
    return (
      <Container className="text-center mt-5">
        <h4>Please log in to view your profile.</h4>
      </Container>
    );
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append("profileImage", selectedImage);
    try {
      setLoading(true);
      await axios.post("/api/users/upload-profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Profile picture updated!");
      setLoading(false);
    } catch (error) {
      alert("Upload failed");
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put("/api/users/change-password", {
        currentPassword: passwords.current,
        newPassword: passwords.new,
      });
      alert("Password changed successfully!");
      setPasswords({ current: "", new: "" });
    } catch (error) {
      alert("Password change failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Card className="shadow-lg border-0 rounded-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={4} className="text-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile Preview"
                  className="rounded-circle mb-3"
                  width="120"
                  height="120"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <FaUserCircle size={120} className="text-secondary mb-3" />
              )}

              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="d-none"
                />
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FaUpload className="me-2" />
                  Choose Image
                </Button>

                {selectedImage && (
                  <Button
                    variant="primary"
                    size="sm"
                    className="ms-2"
                    onClick={handleImageUpload}
                    disabled={loading}
                  >
                    {loading ? "Uploading..." : "Upload"}
                  </Button>
                )}
              </div>

              <h4 className="mt-3">{user.name}</h4>
              <Badge bg={user.isAdmin ? "danger" : "primary"}>
                {user.isAdmin ? "Admin" : "User"}
              </Badge>
            </Col>

            <Col md={8}>
              <h5 className="mb-4 text-muted">Account Info</h5>
              <p>
                <FaEnvelope className="me-2 text-primary" />
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <FaUserShield className="me-2 text-success" />
                <strong>Role:</strong> {user.isAdmin ? "Administrator" : "Regular User"}
              </p>
              <p>
                <FaCalendarAlt className="me-2 text-warning" />
                <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
              </p>

              <hr />

              <h5 className="mb-3 text-muted">Change Password</h5>
              <Form onSubmit={handlePasswordChange}>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={passwords.current}
                    onChange={(e) =>
                      setPasswords({ ...passwords, current: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={passwords.new}
                    onChange={(e) =>
                      setPasswords({ ...passwords, new: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="success" disabled={loading}>
                  {loading ? "Updating..." : "Change Password"}
                </Button>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
