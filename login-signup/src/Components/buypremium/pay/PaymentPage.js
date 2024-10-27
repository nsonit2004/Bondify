import React from 'react';
import './PaymentPage.css';
import PaymentBody from './PaymentBody';
import NavbarComponent from'../info/Navbar'

const PaymentPage = () => {
  return (
    <div>
    <NavbarComponent/>
    <PaymentBody/>
    </div>
  );
};

export default PaymentPage;
