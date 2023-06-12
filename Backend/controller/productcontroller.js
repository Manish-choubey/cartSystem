// productController.js
const express = require('express');
const router = express.Router();
const  Product  = require('../model/Product');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/create', async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = new Product({ name, price, description });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const product = await Product.findByIdAndUpdate(id, {
      name,
      price,
      description,
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
