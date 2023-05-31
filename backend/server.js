const express = require('express');
const dotenv = required('dotenv');
const products = require('./data/products');

dotenv.config();
const app = express();

app.get('/', (req, res) => {
  res.send('API running...');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const port = process.env.PORT ?? 8080;

app.listen(
  port,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${port}...`)
);
