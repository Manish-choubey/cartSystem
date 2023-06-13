// App.js (or your main component)
import React, { useState } from 'react';
import {  Routes, Route } from 'react-router-dom';
import LandingPage from './component/landingpage/LandingPage';
import CartPage from './component/cart/CartPage';
import CheckoutPage from './component/checkout/CheckoutPage';
import PaymentPage from './component/payment/PaymentPage';
import SuccessPage from './SuccessPage';
import CancelPage from './CancelPage';

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, { product, quantity: 1 }]);
  };
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage/>} />
        <Route path="/cancel" element={<CancelPage/>} />
      </Routes>
    </div>
  );
};

export default App;
