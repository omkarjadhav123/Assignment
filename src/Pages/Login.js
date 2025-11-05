import React, { useState, useContext } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading, error: authError } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    localStorage.clear(); // Clear stale tokens before login
    const success = await login(email, password);
    if (success) {
      navigate("/home");
    } else {
      setError(authError || "Invalid email or password");
    }
  };

  return (
    <Container className="py-5">
      <h4 className="text-center mb-4 fw-bold">Login</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form className="w-50 mx-auto" onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </Form>
    </Container>
  );
};

export default Login;