const Repository = require('./repositories');
class CartsRepository extends Repository {}
module.exports = new CartsRepository('carts.json');
