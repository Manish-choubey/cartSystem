import React from 'react';
import { Link } from 'react-router-dom';
import './payment.css'; // Import the CSS file for styling
import { loadStripe } from '@stripe/stripe-js';

const PaymentPage = () => {
  const handlePayment = async () => {
    const stripe = await loadStripe('pk_test_51NI47USGWlkgXwLzApiQKKVZckRCR7cVcmLHxDq7BqMLdb1KR7FQgrognX4pq2B1TrEMLvHn4ql7kPIlYInUeWEb00cLxdpiQM');

    try {
      // Create a payment intent or perform any necessary steps with your backend
      const response = await fetch('http://localhost:4000/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Include any additional payment details you need to pass to the backend
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      // Redirect to the Stripe checkout page
      const { error } = await stripe.redirectToCheckout({
        clientSecret,
        // Include the necessary payment details
        lineItems: [{ price: 'YOUR_PRODUCT_PRICE_ID', quantity: 1 }],
        mode: 'payment',
        successUrl: 'http://localhost:4000/success', // Redirect URL after successful payment
        cancelUrl: 'http://localhost:4000/cancel', // Redirect URL after canceled payment
      });

      if (error) {
        // Handle the error
        console.error(error);
      }
    } catch (error) {
      console.error(error);
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
