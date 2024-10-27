// src/components/PaymentPage.js
import React, { useState } from 'react';
import './PaymentBody.css';


const PaymentPage = () => {
  const plans = [
    {
      id: 1,
      title: "1 Month / $5",
      description: "Get full access to all premium features for one month.",
      qrCode: `${process.env.PUBLIC_URL}/img/qrcode1.jpg`, // QR code for 1 month
    },
    {
      id: 2,
      title: "2 Months / $10",
      description: "Enjoy two months of premium features at a discounted rate.",
      qrCode: `${process.env.PUBLIC_URL}/img/qrcode2.jpg`, // QR code for 2 months
    },
    {
      id: 3,
      title: "3 Months / $12",
      description: "Subscribe for three months and save even more!",
      qrCode: `${process.env.PUBLIC_URL}/img/qrcode3.jpg`, // QR code for 3 months
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState(plans[0]); // Default to 1 Month plan

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="payment-page">
      <h1 className="payment-title">Complete Your Payment</h1>
      <p className="payment-description">
        To complete your purchase, please scan the QR code below using your mobile banking app or QR code scanner.
      </p>

      <div className="qr-code-container">
        <img
          src={selectedPlan.qrCode} // Use the QR code of the selected plan
          alt="QR Code"
          className="qr-code"
        />
      </div>

      <p className="instructions">
        After scanning, follow the instructions on your mobile device to complete the payment.
      </p>

      <div className="subscription-options">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`subscription-card ${selectedPlan.id === plan.id ? 'selected' : ''}`} // Add selected class
            onClick={() => handleSelectPlan(plan)} // Set selected plan on click
          >
            <h2 className="subscription-title">{plan.title}</h2>
            <p className="subscription-description">{plan.description}</p>
            <button className="select-plan-button">Select Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentPage;
