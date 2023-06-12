// server.js
const express = require('express');
const mongoose = require('mongoose');
const productController = require('./controller/productcontroller');
const orderController = require('./controller/ordercontroller');

const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://functionup-cohert:yCRgEggIFfjlaB8o@sl0yd7n.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    
})
    .then(() => console.log('mongodb is Connected'))
    .catch(err => console.log(err))

app.use('/', productController);
app.use('/', orderController);

app.listen(4000, () => {
  console.log('Server is running on port 3000');
});
