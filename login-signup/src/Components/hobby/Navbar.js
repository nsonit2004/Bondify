import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css'; // Đảm bảo đã import CSS
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../apiService';

const NavbarComponent = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const message = await logoutUser(); // Gọi hàm logout
      console.log(message); // Hiển thị thông báo logout thành công
      // Chuyển hướng về trang login
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error.error);
    }
  };
  return (
      <Navbar expand="lg" className="navbar-custom">
        <Container fluid>
          <Navbar.Brand href="/" className="brand">Bondify</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav> {/* Đẩy Log Out sang phải */}
            <button onClick={handleLogout} className="logout-button">Log Out</button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

export default NavbarComponent;
