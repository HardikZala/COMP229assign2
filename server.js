// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Load environment variables
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Import your Product model (adjust the path as needed)
const Product = require('./models/product');

// Define a route to add products to your database
app.post('/api/addProduct', (req, res) => {
  const { name, description, price, quantity, category } = req.body;

  // Create a new product using the Product model
  const newProduct = new Product({ name, description, price, quantity, category });

  // Save the product to the database
  newProduct.save()
    .then(product => {
      console.log('Product added to the database:', product);
      res.status(201).json(product);
    })
    .catch(error => {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Error adding product to the database' });
    });
});

// Routes
app.get('/', (req, res) => {
  res.send('Marketplace App is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});