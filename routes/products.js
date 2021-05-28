const express = require('express');
const ProductsRepo = require('../repositories/products');
const productsIndexTemplate = require('../views/products/index');

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await ProductsRepo.getAll();
  res.send(productsIndexTemplate({ products }));
});
module.exports = router;
