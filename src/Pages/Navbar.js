import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { AuthContext } from "../AuthContext";

const NavigationBar = ({ cartCount }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm fixed-top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold fs-4">
          Shopi
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>
            {user && (
              <Nav.Link as={NavLink} to="/profile">
                Profile
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {user ? (
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
            )}
            <Nav.Link as={NavLink} to="/cart">
              Cart {cartCount > 0 && <span className="badge bg-secondary">{cartCount}</span>}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;