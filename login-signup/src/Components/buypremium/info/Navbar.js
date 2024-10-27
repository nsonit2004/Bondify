import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css'; // Đảm bảo đã import CSS

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand href="/" className="brand">Bondify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"> {/* Đẩy các link sang trái */}
            <Nav.Link href="/" className="nav-link-custom">Homepage</Nav.Link>
            <Nav.Link href="/premium" className="nav-link-custom">Premium</Nav.Link>
          </Nav>
          <Nav>
            <button className="logout-button">Log Out</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
