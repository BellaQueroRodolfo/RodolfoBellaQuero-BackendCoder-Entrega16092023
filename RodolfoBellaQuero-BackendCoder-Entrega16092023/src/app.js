// src/app.js
const express = require('express');
const app = express();
const ProductManager = require('./productManager');
const path = require('path');
const productManager = new ProductManager('./data/products.json');

app.get('/products', async (req, res) => {
  const { limit } = req.query;
  const products = await productManager.getProducts();

  if (limit) {
    const limitedProducts = products.slice(0, parseInt(limit, 10));
    return res.json({ products: limitedProducts });
  }

  res.json({ products });
});

app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid, 10);
  const product = await productManager.getProductById(productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json({ product });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
