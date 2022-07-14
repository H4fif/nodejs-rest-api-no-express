const products = require('../data/products.json');

/**
 * @function findAll
 * @description query to get all products
 * @returns {Promise} Promise
 */
const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
};

/**
 * @function findById
 * @description query to get product by ID
 * @returns {Promise} Promise
 */
const findById = (id) => {
  return new Promise((resolve, reject) => {
    const product = products.find(product => product.id === id);
    resolve(product);
  });
};

module.exports = {
  findAll,
  findById,
};