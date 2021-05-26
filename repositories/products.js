const Repository = require('./repositories');

class ProductRepository extends Repository {}

module.exports = new ProductRepository(
  'products.json',
);
