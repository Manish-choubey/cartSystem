import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './checkoutpage.css';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });

  const Navigate = useNavigate(); // Access the history object

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission and data processing
    console.log(formData);

    // Navigate to the payment page
    Navigate('/payment');
  };

  return (
    <div className="checkout-page">
      <h1>Checkout Page</h1>
      <div className="checkout-container">
        <form onSubmit={handleSubmit} className="checkout-form">
          <div>
            <label>Name:</label>
            <input type="text" name="name" onChange={handleChange} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" onChange={handleChange} required />
          </div>
          <div>
            <label>Address:</label>
            <input type="text" name="address" onChange={handleChange} required />
          </div>
          <button type="submit" className="checkout-button">Place Order</button>
        </form>
        <Link to="/cart" className="go-back-link">Go Back to Cart</Link>
      </div>
    </div>
  );
};

export default CheckoutPage;
