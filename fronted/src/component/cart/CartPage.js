import React from 'react';
import { Link } from 'react-router-dom';
import './cartPage.css'; // Import the CSS file for CartPage

const CartPage = ({ cart, setCart }) => {
  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart.splice(index, 1);
      return updatedCart;
    });
  };

  const updateQuantity = (index, newQuantity) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index] = { ...updatedCart[index], quantity: newQuantity };
      return updatedCart;
    });
  };

  return (
    <div className="cart-page">
      <h1>Cart Page</h1>
      <div className="cart-container">
        <h2>Cart</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <span className="product-name">{item.product}</span>
              <div className="quantity-container">
                <button className="quantity-button" onClick={() => updateQuantity(index, item.quantity - 1)}>
                  -
                </button>
                <span className="item-quantity">{item.quantity}</span>
                <button className="quantity-button" onClick={() => updateQuantity(index, item.quantity + 1)}>
                  +
                </button>
              </div>
              <button className="remove-button" onClick={() => removeFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <Link className="checkout-button" to="/checkout">Proceed to Checkout</Link>
      </div>
    </div>
  );
};

export default CartPage;
