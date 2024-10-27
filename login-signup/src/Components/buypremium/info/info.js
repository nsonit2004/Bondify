import React from 'react';
import './info.css';
import { Button, Table, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons'; // Import the open padlock icon

const PremiumPage = () => {
  return (
    <Container className="premium-page">
      <h1 className="premium-title">
        Bondify Premium <FontAwesomeIcon icon={faLockOpen} style={{ color: 'gold', marginLeft: '10px' }} />
      </h1>
      <p className="premium-description">
        Experience the best of Bondify with exclusive Premium features! Take your journey to finding love to the next level.
      </p>

      <h2 className="comparison-title">Comparison Between Normal and Premium Users</h2>
      <Table bordered hover className="comparison-table">
        <thead>
          <tr>
            <th>Features</th>
            <th>Normal User</th>
            <th>Premium User</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Unlimited Matching</td>
            <td>Limited</td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <td>Profile Customize</td>
            <td>Not Available</td>
            <td>Available</td>
          </tr>
          <tr>
            <td>See Who Liked You</td>
            <td>Not Available</td>
            <td>Available</td>
          </tr>
          <tr>
            <td>Ad-Free Experience</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Advanced Matching Algorithms</td>
            <td>Basic</td>
            <td>Advanced</td>
          </tr>
        </tbody>
      </Table>

      <Button variant="primary" size="lg" className="premium-button" href="/payment">
        Get Premium
      </Button>
    </Container>
  );
};

export default PremiumPage;
