const express = require('express');
const ProductsRepo = require('../repositories/products');
const cartsRepo = require('../repositories/cart');
const productsIndexTemplate = require('../views/products/index');

const router = express.Router();

router.get('/', async (req, res) => {
  let noItems = 0;
  const products = await ProductsRepo.getAll();
  const cart = await cartsRepo.getOne(req.session.cartId);
  if (cart) {
    noItems = cart.items.reduce((prev, item) => {
      return prev + item.quanity;
    }, 0);
  }
  res.send(productsIndexTemplate({ products, noItems }));
});
module.exports = router;
