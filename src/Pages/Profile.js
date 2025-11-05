import React, { useContext } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout, error, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (isLoading) {
    return (
      <Container className="py-5">
        <h4 className="text-center mb-4 fw-bold">Profile</h4>
        <div className="text-center">
          <p>Loading profile...</p>
        </div>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container className="py-5">
        <h4 className="text-center mb-4 fw-bold">Profile</h4>
        <div className="text-center">
          {error ? <Alert variant="danger">{error}</Alert> : <p>No profile data available. Please log in.</p>}
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h4 className="text-center mb-4 fw-bold">Profile</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="text-center">
        <img
          src={user.avatar}
          alt="Avatar"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
        <h5 className="mt-3">{user.name}</h5>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <Button variant="outline-danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Container>
  );
};

export default Profile;