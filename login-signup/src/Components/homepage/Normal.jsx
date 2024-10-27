import React from 'react';
import NavigationField from './NavigationField';
import MainContent from './MainContent';
import SideBar from './SideBar';
import './Normal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';  

function Normal() {
    return (
      <Container fluid className="app-container">
      <Row className="row-container" style={{ flex: 1 }}>
        <Col xs={2} className="custom navigation">
          <NavigationField />
        </Col>
        <Col xs={8} className="custom fullscreen-element maincontent">
          <MainContent />
        </Col>
        <Col xs={2} className="custom element-to-hide sidebar2">
          <SideBar />
        </Col>
      </Row>
    </Container>
    );
  }
  
  export default Normal;
  