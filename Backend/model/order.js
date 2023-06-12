const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
    productId: mongoose.Types.ObjectId,
    quantity: Number,
    date: { type: Date, default: Date.now },
  });


  module.exports = mongoose.model('order',OrderSchema)