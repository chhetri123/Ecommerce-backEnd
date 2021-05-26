const express = require('express');
const {
  validationResult,
} = require('express-validator');
const ProductRepo = require('../../repositories/products');
const {
  requireTittle,
  requirePrice,
} = require('./validators');
const productsNewTemplates = require('../../views/admin/products/new');
const router = express.Router();

router.get('/admin/products', (req, res) => {
  res.send(productsNewTemplates({}));
});
router.get(
  '/admin/products/new',
  (req, res) => {},
);
router.post(
  '/admin/products',
  [requireTittle, requirePrice],
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    res.send('submitted');
  },
);
module.exports = router;
