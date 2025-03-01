import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

function Navigator() {
  return (
    <Navbar expand="lg" bg="light" variant="light" className="shadow-sm">
      <Container>
        {/* Logo & Branding */}
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Webshop Logo"
            style={{ width: "50px", height: "50px" }}
            loading="lazy"
          />
          <span className="ms-2 fw-bold">Webshop</span>
        </Navbar.Brand>

        {/* Navbar Toggle Button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navbar Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" className={({ isActive }) => (isActive ? "fw-bold text-primary" : "text-dark")}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products" className={({ isActive }) => (isActive ? "fw-bold text-primary" : "text-dark")}>
              Products
            </Nav.Link>

            {/* Admin Dropdown */}
            <NavDropdown title="Admin" id="admin-dropdown">
              <NavDropdown.Item as={NavLink} to="/create-product" className={({ isActive }) => (isActive ? "fw-bold text-primary" : "text-dark")}>
                Create Product
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/inventory" className={({ isActive }) => (isActive ? "fw-bold text-primary" : "text-dark")}>
                Inventory
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/orderManagement" className={({ isActive }) => (isActive ? "fw-bold text-primary" : "text-dark")}>
                Manage Orders
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Right-Side Links */}
          <Nav>
            <Nav.Link as={NavLink} to="/cart" className={({ isActive }) => (isActive ? "fw-bold text-primary" : "text-dark")}>
              Cart
              <svg
                className="mx-2"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9zM1 7v1h14V7zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5" />
              </svg>
            </Nav.Link>

            <Nav.Link as={NavLink} to="/myOrders" className={({ isActive }) => (isActive ? "fw-bold text-primary" : "text-dark")}>
              My Orders
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigator;
