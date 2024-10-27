
import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import './Header.css';
import { LanguageContext } from '../../LanguageContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { language, fontFamily, changeLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();

  // Function to scroll to the "About Bondify" section
  const scrollToAbout = (e) => {
    e.preventDefault(); // Prevent default behavior of link
    const aboutSection = document.getElementById('about-bondify');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <header className="header" style={{ fontFamily }}>
      <Navbar expand="lg" className="navbar-custom">
        <Container fluid>
          <div className="brand-container">
            <Navbar.Brand href="/" className="brand">Bondify</Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" className="nav-link-custom">
                {language === 'en' ? 'HomePage' : 'Trang Chủ'}
              </Nav.Link>
              <Nav.Link
                href="#about-bondify"
                className="nav-link-custom" // Just a standard link without active class
                onClick={scrollToAbout}
              >
                {language === 'en' ? 'About Us' : 'Về Chúng Tôi'}
              </Nav.Link>
              <Nav.Link href="/download" className="nav-link-custom">
                {language === 'en' ? 'Download' : 'Tải Về'}
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <NavDropdown title={language === 'en' ? 'Language' : 'Ngôn Ngữ'} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => changeLanguage('en')}>
                  <img src='/img/uk-flag.png' alt="English" className="flag-icon" /> English
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeLanguage('vi')}>
                  <img src='/img/vn-flag.png' alt="Vietnamese" className="flag-icon" /> Vietnamese
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/loginPage" className="nav-link-custom login-button" >
                {language === 'en' ? 'Login' : 'Đăng Nhập'}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

