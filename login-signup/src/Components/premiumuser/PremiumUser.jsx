import React from 'react';
import NavigationFieldPremium from './NavigationFieldPremium'
import MainContentPremium from './MainContentPremium';
import SideBarPremium from './SideBarPremium';
import './PremiumUser.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';  

function PremiumUser() {
    return (
      <Container fluid className="app-container">
      <Row className="row-container" style={{ flex: 1 }}>
        <Col xs={2} className="custom navigation">
          <NavigationFieldPremium />
        </Col>
        <Col xs={8} className="custom fullscreen-element maincontent">
          <MainContentPremium />
        </Col>
        <Col xs={2} className="custom element-to-hide sidebar2">
          <SideBarPremium />
        </Col>
      </Row>
    </Container>
    );
  }
  
  export default PremiumUser;
  