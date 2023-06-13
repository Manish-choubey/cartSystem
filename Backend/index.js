// server.js
const express = require('express');
const mongoose = require('mongoose');
const productController = require('./controller/productcontroller');
const orderController = require('./controller/ordercontroller');
const stripe = require('stripe')('pk_test_51NI47USGWlkgXwLzApiQKKVZckRCR7cVcmLHxDq7BqMLdb1KR7FQgrognX4pq2B1TrEMLvHn4ql7kPIlYInUeWEb00cLxdpiQM');

const cors = require('cors');



const app = express();
app.use(cors());

app.use(express.json());

mongoose.connect("mongodb+srv://functionup-cohert:yCRgEggIFfjlaB8o@sl0yd7n.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    
})



    .then(() => console.log('mongodb is Connected'))
    .catch(err => console.log(err))




    app.post('/create-payment-intent', async (req, res) => {
      try {
        // Calculate the payment amount or retrieve it from the request body
        const amount = 1000; // $10 in cents
        const paymentMethods = await stripe.paymentMethods.list();
        console.log(paymentMethods);
        
        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: 'usd',
        });
    
        // Create an order in your backend
        const order = await createOrder(req.body); // Implement your order creation logic here
    
        res.json({ clientSecret: paymentIntent.client_secret, orderId: order.id });
      } catch (error) {
        res.status(500).json({ error: 'Failed to create payment intent' });
      }
    });
    
    // Endpoint for successful payment
    app.get('/success', (req, res) => {
      const { orderId } = req.query;
    
      // Retrieve the order from your backend database
      const order = getOrder(orderId); // Implement your logic to retrieve the order here
    
      // Update the order status to "Paid" or perform any additional actions
    
      res.send('Payment Successful! Order created: ' + orderId);
    });
    
    // Endpoint for canceled payment
    app.get('/cancel', (req, res) => {
      res.send('Payment Canceled!');
    });
    

app.use('/', productController);
app.use('/', orderController);

app.listen(4000, () => {
  console.log('Server is running on port 3000');
});
