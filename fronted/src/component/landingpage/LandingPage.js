import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

const LandingPage = ({ addToCart }) => {
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddToCart = (product) => {
    addToCart(product);
    setSuccessMessage(`${product} successfully added to the cart!`);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="container">
      <h1>Landing Page</h1>
      <div>
        <h2>Products</h2>
        <ul>
          <li>
            Product 1 - $10
            <button onClick={() => handleAddToCart('Product 1')}>Add to Cart</button>
          </li>
          <li>
            Product 2 - $20
            <button onClick={() => handleAddToCart('Product 2')}>Add to Cart</button>
          </li>
          <li>
            Product 3 - $30
            <button onClick={() => handleAddToCart('Product 3')}>Add to Cart</button>
          </li>
        </ul>
        <Link to="/cart" className="link">Go to Cart</Link>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default LandingPage;
