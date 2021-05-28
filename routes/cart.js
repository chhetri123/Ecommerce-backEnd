const express = require('express');
const cartsRepo = require('../repositories/cart');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');
const router = express.Router();

router.post('/cart/products', async (req, res) => {
  let cart;

  if (!req.session.cartId) {
    // create  new cart object
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  const existingItem = cart.items.find((item) => item.id === req.body.productId);
  if (existingItem) {
    existingItem.quanity++;
  } else {
    cart.items.push({ id: req.body.productId, quanity: 1 });
  }
  await cartsRepo.update(cart.id, {
    items: cart.items,
  });

  res.send('productedcadded');
});

router.get('/cart', async (req, res) => {
  console.log(req.session.cartId);
  if (!req.session.cartId) {
    return res.redirect('/');
  }
  const cart = await cartsRepo.getOne(req.session.cartId);
  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);
    item.product = product;
  }
  res.send(cartShowTemplate({ items: cart.items }));
});

module.exports = router;
