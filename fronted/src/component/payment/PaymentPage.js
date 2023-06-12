import React from 'react';
import { Link } from 'react-router-dom';
import './payment.css'; // Import the CSS file for styling
import { loadStripe } from '@stripe/stripe-js';

const PaymentPage = () => {
  const handlePayment = async () => {
    const stripe = await loadStripe('YOUR_STRIPE_PUBLIC_KEY');
    // Create a payment intent or perform any necessary steps with your backend

    // Redirect to the Stripe checkout page
    const { error } = await stripe.redirectToCheckout({
      // Include the necessary payment details
      lineItems: [{ price: 'YOUR_PRODUCT_PRICE_ID', quantity: 1 }],
      mode: 'payment',
      successUrl: 'https://your-website.com/success', // Redirect URL after successful payment
      cancelUrl: 'https://your-website.com/cancel', // Redirect URL after canceled payment
    });

    if (error) {
      // Handle the error
      console.error(error);
    } else {
      // Payment succeeded, make an API request to your backend server
      const response = await fetch('https://your-backend-server.com/payment/success', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentId: 'REPLACE_WITH_STRIPE_PAYMENT_ID' }), // Include the Stripe payment ID
      });

      if (response.ok) {
        // Payment details successfully retrieved, handle the response
        const paymentDetails = await response.json();
        console.log(paymentDetails);
      } else {
        // Handle the API request error
        console.error('Failed to retrieve payment details from the backend');
      }
    }
  };

  return (
    <div className="payment-page">
      <h1>Payment Page</h1>
      <div className="payment-container">
        <h2>Choose Payment Method</h2>
        <div className="payment-methods">
          <div className="payment-method">
            <input type="radio" name="paymentMethod" id="paymentMethod1" />
            <label htmlFor="paymentMethod1" className="payment-method-label">Credit Card</label>
          </div>
          <div className="payment-method">
            <input type="radio" name="paymentMethod" id="paymentMethod2" />
            <label htmlFor="paymentMethod2" className="payment-method-label">PayPal</label>
          </div>
          <div className="payment-method">
            <input type="radio" name="paymentMethod" id="paymentMethod3" />
            <label htmlFor="paymentMethod3" className="payment-method-label">Stripe</label>
          </div>
        </div>
        <button className="payment-button" onClick={handlePayment}>Pay Now</button>
      </div>
      <Link to="/" className="go-home-link">Go Back to Home</Link>
    </div>
  );
};

export default PaymentPage;
