// orderController.js
const express = require('express');
const router = express.Router();
const  Order  = require('../model/order');

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/creatoder', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const order = new Order({ productId, quantity });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
